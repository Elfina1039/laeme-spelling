
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
  //other SURROUNDING TEXTS: 138,11,64 , 67
 header("Content-Type: text/html; charset=UTF-8");
 
 
 $queries=array();

$queries["filteredSets"]="SELECT json_build_object('simple', smaller_set, 'types',types, 'tokens', tokens,'members', full_set )FROM
(SELECT  sub.lit_set AS smaller_set, count(*) As tokens, count(DISTINCT (morphid,pos)) AS types, count_elements(array_agg(members)) AS full_set FROM
(SELECT l.morphid, pos, array_agg(DISTINCT l.char) AS lit_set, unnest(array_agg(l.char)) AS members, count(DISTINCT l.char) AS small_count FROM laeme.lit_grams l
INNER JOIN laeme.morphemes_texts m ON m.formid=l.formid
 WHERE @FILTERS@
GROUP BY l.morphid, pos
ORDER BY lit_set) AS sub WHERE lit_set@>$1::text[]																	
GROUp BY lit_set ORDER BY types DESC) As sets;";

$queries["filteredSlots"]="SELECT json_build_object('morphid',morphid,'pos',pos,'lexel',lexel,'wordClass',word_class,'litterae',full_set)FROM
(SELECT sub.lit_set AS lit_set,  lexel, word_class, morphid, pos, full_set FROM
(SELECT l.morphid, pos, array_agg(char) AS lit_set,count_elements(array_agg(char)) AS full_set  FROM laeme.lit_grams l 
		INNER JOIN laeme.morphemes_texts m ON m.formid=l.formid
 WHERE 		@FILTERS@										
	 GROUP BY l.morphid, pos
HAVING array_agg(DISTINCT char)@>$1::text[]	
ORDER BY morphid) AS sub
 INNER JOIN laeme.morpheme_index mi ON mi.id=sub.morphid) AS sub";


$queries["filteredSplits"]="  SELECT json_build_object('formid',sub.formid,'split',sub.split, 'tokens', tokens) FROM
 (SELECT sub.formid, array_agg( sub.char) AS split, tokens  FROM 
(SELECT l.morphid, l.formid, l.pos, l.char, count(DISTINCT m.id) AS tokens FROM laeme.lit_grams l
INNER JOIN laeme.morphemes_texts m ON m.formid=l.formid
WHERE l.morphid=$1 AND @FILTERS@
GROUP BY l.morphid, l.formid, l.pos, l.char
 ORDER BY l.morphid,l.formid,l.pos) AS sub
 GROUP BY sub.formid, sub.tokens) As sub ORDER BY tokens DESC;";
 
$queries["filteredMap"]="SELECT json_build_object('id',text,'litterae',litterae,'tokens',tokens) AS result FROM
(SELECT m.text_id As text, count_elements(array_agg(l.char)) AS litterae, count(*) As tokens FROM 
(SELECT morphid, pos, array_agg(char) AS lit_set  FROM laeme.litterae 	
GROUP BY morphid, pos
HAVING array_agg(DISTINCT char)@>$1::text[]) AS slots
INNER JOIN laeme.lit_grams l ON l.morphid=slots.morphid AND l.pos=slots.pos
INNER JOIN laeme.morphemes_texts m ON m.formid=l.formid	
WHERE @FILTERS@
GROUP BY m.text_id) AS sub;";
 

$queries["filteredMapStats"]="SELECT json_build_object('str',char, 'tokens', tokens) AS result FROM
(SELECT l.char, count(*) As tokens FROM 
(SELECT morphid, pos, array_agg(char) AS lit_set  FROM laeme.litterae  	 									  
GROUP BY morphid, pos
HAVING array_agg(DISTINCT char)@>$1::text[]) AS slots
INNER JOIN laeme.lit_grams l ON l.morphid=slots.morphid AND l.pos=slots.pos	
INNER JOIN laeme.morphemes_texts m ON m.formid=l.formid
 WHERE @FILTERS@
GROUP BY l.char) AS sub;";

$queries["filteredSetsForText"]="SELECT json_build_object('morphid',sub.morphid,'pos',sub.pos,'lexel',sub.lexel,'wordClass',word_class,'litterae',litterae)FROM
(SELECT m.morphid, m.lexel,l.pos, m.word_class, count_elements(array_agg(l.char)) AS litterae, count(*) As tokens FROM
(SELECT morphid, pos, array_agg(char) AS lit_set  FROM laeme.litterae  	 						
GROUP BY morphid, pos
HAVING array_agg(DISTINCT char)@>$2::text[]) AS slots
INNER JOIN laeme.lit_grams l ON l.morphid=slots.morphid AND l.pos=slots.pos
INNER JOIN laeme.morphemes_texts m ON m.formid=l.formid	
	WHERE m.text_id=$1 AND @FILTERS@
GROUP BY m.morphid, m.lexel, l.pos, m.word_class) As sub;
";
 
$operators = array();
$operators["contains"]=array("str"=>"@>", "type"=>"array");
$operators["overlap"]=array("str"=>"&&", "type"=>"array");
$operators["equals"]=array("str"=>"=", "type"=>"string");


//addFilters("filteredSets", array(array("level"=>"l","field"=>"pos_tags","values"=>["V"]),array("level"=>"m","field"=>"text_tags","values"=>["Not Placed"])),2);

function addFilters($base, $filterList, $s){
    global $queries, $operators;
    
    //echo(json_encode($operators));
    
    $filters = [];
    $args = [];
    foreach($filterList as $fi=>$f){
      //  echo(json_encode($f)."<br>");
        $nFilter = $f->level.".".$f->field.$operators[$f->operator]["str"]."$".($fi+$s);
        
      //  echo($nFilter."<br>");
        $filters[] = $nFilter;
        if($operators[$f->operator]["type"]=="array"){
          //  echo("---<br>");
           $args[] = pg_arr($f->values); 
        }else{
          //  echo("NOT FOUND: ".strpos($f->operator,"@")."<br>");
            $args[] = $f->values[0]; 
        }
        
    }
    
    // echo(json_encode($filters)."<br>");
    
    $sql = implode(" AND ",$filters);
    // echo($sql."<br>");
    $query = str_replace("@FILTERS@",$sql,$queries[$base]);
    
  //  echo($query."<hr>".json_encode($args));
    
    return array("q"=>$query, "args"=>$args);
    
}
 


function pg_arr($arr){
    //echo("arr = " . $arr ."<br>");
    if($arr==""){
        return "{}";
    }else
        return "{".implode(",",$arr)."}";
}
 
 ?>