
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
  //other SURROUNDING TEXTS: 138,11,64 , 67
 header("Content-Type: text/html; charset=UTF-8");

//$allowed_domains = ["http://localhost:4200", "http://spelling-db.delfiin.net"];

//if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_domains)) {
 //   header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
//}

header('Access-Control-Allow-Origin: http://localhost:4200');
//header('Access-Control-Allow-Origin: http://spelling-db.delfiin.net');
     
include("queryBuilder.php");

     $c="host=localhost port=5432 dbname=postgres user=postgres password=postgrass";

$pg=pg_connect($c);

if(!$pg) 
{
echo "Nepovedlo se pripojit!";
}

pg_set_client_encoding($pg, "UNICODE");

//echo("new version");

$fnc=$_GET["fnc"];


if(empty($_GET["args"])){
    $args=[];
}else{
   $args=explode(";",$_GET["args"]);

}


$result = call_user_func_array($fnc,$args);

echo('{"rows" : ['.implode(',',$result["rows"]).'],"queryData" : '.json_encode($result["queryData"]).'}');


// queries returning LITTERAE
function getAdjacent($littera,$shift){
global $pg;

    $prep = pg_prepare($pg,"getAdjacent","SELECT laeme.get_adjacent($1,$2)");
    $ex = pg_execute($pg,"getAdjacent",array($littera,$shift));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
    
}

function getAdjacentByText($littera,$shift,$textId){
global $pg;

    $prep = pg_prepare($pg,"getAdjacent","SELECT laeme.get_adjacent($1,$2,$3)");
    $ex = pg_execute($pg,"getAdjacent",array($littera,$shift,$textId));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
    
}

function getAlternatives($littera){
global $pg;

    $prep = pg_prepare($pg,"getAlternatives","SELECT laeme.get_alternatives($1)");
    $ex = pg_execute($pg,"getAlternatives",array($littera));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
    
}

function getInventory($textId){
global $pg;

    $prep = pg_prepare($pg,"getInventory","SELECT laeme.get_inventory($1::integer)");
    $ex = pg_execute($pg,"getInventory",array($textId));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
    
}

function getAllLitterae(){
global $pg;

    $prep = pg_prepare($pg,"getInventory","SELECT laeme.get_inventory()");
    $ex = pg_execute($pg,"getInventory",array());
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
    
}

function getInventoryExtended($textId){
global $pg;

    $prep = pg_prepare($pg,"getInventory","SELECT laeme.get_inventory_extended($1::integer)");
    $ex = pg_execute($pg,"getInventory",array($textId));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
    
}

function getDigraphInventory($lit){
global $pg;

    $prep = pg_prepare($pg,"getInventory","SELECT laeme.get_inventory($1)");
    $ex = pg_execute($pg,"getInventory",array($lit));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
    
}

function mapSlotStats($slot){
global $pg;

    $prep = pg_prepare($pg,"getStatistics","SELECT laeme.get_map_statistics($1::integer, $2::integer)");
    $slotParts = explode("-",$slot);
    $ex = pg_execute($pg,"getStatistics",$slotParts);
    $rows = pg_fetch_all_columns($ex,0);
    
    $lexels = findLexels(array($slotParts[0]));
    
    return array("rows"=>$rows, "queryData"=>array("legend"=>$lexels));
    
}

function mapSlotsStats($slots){
global $pg;
    $slots = explode(",", $slots);
    $prep = pg_prepare($pg,"getStatistics","SELECT laeme.get_map_statistics($1::text[], $2::text)");
    $ex = pg_execute($pg,"getStatistics",array(pg_arr($slots),"N"));
    $rows = pg_fetch_all_columns($ex,0);
    
    $morphids  = array_map($slots, "readMorphids");
    
    $lexels = findLexels($morphids);
    
    return array("rows"=>$rows, "queryData"=>array("legend"=>$lexels));
    
}

function mapSetStats($lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getStatistics","SELECT laeme.get_map_statistics($1::text[])");
    $ex = pg_execute($pg,"getStatistics",array(pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array()); 
}

function mapFilteredSetStats($lits,$filters){
global $pg;
    $lits=explode(",",$lits);
    $filters = json_decode($filters);
    $query = addFilters("filteredMapStats",$filters,2);
    array_unshift($query["args"], pg_arr($lits));
    
    $prep = pg_prepare($pg,"getMapStats",$query["q"]);
    $ex = pg_execute($pg,"getMapStats",$query["args"]);
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"????",
                      "args"=>array(),
                      "filters"=>$filters);
    return array("rows"=>$rows, "queryData"=>$queryData);
    
}

function mapSetExactStats($lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getStatistics","SELECT laeme.get_map_statistics_exact($1::text[])");
    $ex = pg_execute($pg,"getStatistics",array(pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array()); 
}



// queries returning SETs

function getSetsOverview(){
global $pg;

    $prep = pg_prepare($pg,"getSets","SELECT laeme.get_sets_overview()");
    $ex = pg_execute($pg,"getSets",array());
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
    
}


function getSetsByText($textId){
global $pg;

    $prep = pg_prepare($pg,"getSets","SELECT laeme.get_sets($1::integer)");
    $ex = pg_execute($pg,"getSets",array($textId));
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"getFilteredSlots",
                      "args"=>array($textId),
                      "filters"=>array(array("level"=>"m",
                                            "field"=>"text_id",
                                             "operator"=>"equals",
                                            "values"=>[$textId])));
    return array("rows"=>$rows, "queryData"=>$queryData);
    
}

function getSetsByLits($lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSets","SELECT laeme.get_sets($1::text[])");
    $ex = pg_execute($pg,"getSets",array(pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"getSlotsByLits",
                      "args"=>array(),
                      "filters"=>array());
    return array("rows"=>$rows, "queryData"=>$queryData);
    
}

function getSetsByTextAndLits($textId,$lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSets","SELECT laeme.get_sets($1::integer,$2::text[])");
    $ex = pg_execute($pg,"getSets",array($textId,pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"getSlotsByTextAndLits",
                      "args"=>array($textId),
                      "filters"=>array(array("level"=>"text",
                                            "field"=>"id",
                                            "value"=>$textId)));
    return array("rows"=>$rows, "queryData"=>$queryData);
    
}

//[{"level":"l","field":"pos_tags", "values":["wI"], "operator":"@>"},{"level":"m","field":"text_tags", "values":["Not placed"],"operator":"@>"},{"level":"m","field":"text_id", "values":8,"operator":"="}]

function getFilteredSets($lits,$filters){
global $pg;
    $lits=explode(",",$lits);
    $filters = json_decode($filters);
    $query = addFilters("filteredSets",$filters,2);
    array_unshift($query["args"], pg_arr($lits));
    
    $prep = pg_prepare($pg,"getSets",$query["q"]);
    $ex = pg_execute($pg,"getSets",$query["args"]);
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"getFilteredSlots",
                      "args"=>array(),
                      "filters"=>$filters);
    return array("rows"=>$rows, "queryData"=>$queryData);
    
}


//functions returning slots
function getSlotsByLits($lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSlots","SELECT laeme.get_slots($1::text[])");
    $ex = pg_execute($pg,"getSlots",array(pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"getSplitsByMorphid",
                      "args"=>array(),
                      "filters"=>array());
    return array("rows"=>$rows, "queryData"=>$queryData);
    
}

function getSlotsByText($textId){
global $pg;

    $prep = pg_prepare($pg,"getSlots","SELECT laeme.get_slots($1::integer)");
    $ex = pg_execute($pg,"getSlots",array($textId));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array()); 
}

function getSlotsByTextAndLits($textId,$lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSlots","SELECT laeme.get_slots($1::integer,$2::text[])");
    $ex = pg_execute($pg,"getSlots",array($textId,pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"getSplitsByTextAndMorphid",
                      "args"=>array($textId),
                      "filters"=>array(array("level"=>"text",
                                            "field"=>"id",
                                            "value"=>$textId)));
    return array("rows"=>$rows, "queryData"=>$queryData); 
}

function getRareSlots($textId,$lit){
global $pg;
    $prep = pg_prepare($pg,"getSlots","SELECT laeme.get_rare_slots($1::integer,$2::text)");
    $ex = pg_execute($pg,"getSlots",array($textId,$lit));
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"getFilteredSplits",
                      "args"=>array($textId),
                      "filters"=>array(array("level"=>"m",
                                            "field"=>"text_id",
                                             "operator"=>"equals",
                                            "values"=>[$textId])));
    return array("rows"=>$rows, "queryData"=>$queryData); 
}



function getFilteredSlots($lits,$filters){
global $pg;
    $lits=explode(",",$lits);
    $filters = json_decode($filters);
    $query = addFilters("filteredSlots",$filters,2);
    array_unshift($query["args"], pg_arr($lits));
    
    $prep = pg_prepare($pg,"getSlots",$query["q"]);
    $ex = pg_execute($pg,"getSlots",$query["args"]);
    $rows = pg_fetch_all_columns($ex,0);
    
   // $filters = array_filter($filters, "filterLevel");
    
    if(count($filters)>0){
        $fnc = "getFilteredSplits";
    }
    else
    {
        $fnc = "getSplitsByMorphid";
    }
    
    
    $queryData = array("fnc"=>$fnc,
                      "args"=>array(),
                      "filters"=>$filters);
    return array("rows"=>$rows, "queryData"=>$queryData);
    
  
    
}


function mapSetForText($textId,$lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSlots","SELECT laeme.get_mapped_slots($1::integer,$2::text[])");
    $ex = pg_execute($pg,"getSlots",array($textId,pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
     $queryData = array("fnc"=>"getSplitsByTextAndMorphid",
                      "args"=>array($textId),
                      "filters"=>array(array("level"=>"text",
                                            "field"=>"id",
                                            "values"=>[$textId])));
    return array("rows"=>$rows, "queryData"=>$queryData);
}

function mapSetExactForText($textId,$lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSlots","SELECT laeme.get_mapped_slots_exact($1::integer,$2::text[])");
    $ex = pg_execute($pg,"getSlots",array($textId,pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
     $queryData = array("fnc"=>"getSplitsByTextAndMorphid",
                      "args"=>array($textId),
                      "filters"=>array(array("level"=>"text",
                                            "field"=>"id",
                                            "values"=>[$textId])));
    return array("rows"=>$rows, "queryData"=>$queryData);
}



//queries returning splits
function getSplitsByLexel($lexel){
global $pg;
    $prep = pg_prepare($pg,"getSplitsByLexel","SELECT laeme.get_splits($1::text)");
    $ex = pg_execute($pg,"getSplitsByLexel",array($lexel));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
}

function getSplitsByMorphid($morphid){
global $pg;
    $prep = pg_prepare($pg,"getSplits","SELECT laeme.get_splits($1::integer)");
    $ex = pg_execute($pg,"getSplits",array($morphid));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
}

function getSplitsEditByMorphid($morphid){
global $pg;
    $prep = pg_prepare($pg,"getSplits","SELECT laeme.get_splits_edit($1::integer)");
    $ex = pg_execute($pg,"getSplits",array($morphid));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
}

function getSplitsByTextAndMorphid($textId,$morphid){
global $pg;
    $prep = pg_prepare($pg,"getSplits","SELECT laeme.get_splits($1::integer,$2::integer)");
    $ex = pg_execute($pg,"getSplits",array($morphid,$textId));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array());
}

function getFilteredSplits($morphid,$filters){
global $pg;
    $filters = json_decode($filters);
    $query = addFilters("filteredSplits",$filters,2);
    array_unshift($query["args"], $morphid);
    
    $prep = pg_prepare($pg,"getSplits",$query["q"]);
    $ex = pg_execute($pg,"getSplits",$query["args"]);
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"????",
                      "args"=>array(),
                      "filters"=>$filters);
    return array("rows"=>$rows, "queryData"=>$queryData);
    
}

//queries returning map data


function mapSlot($slot){
global $pg;
    
    $prep = pg_prepare($pg,"mapSlot","SELECT laeme.map_slot($1::integer,$2::integer)");
    $ex = pg_execute($pg,"mapSlot",explode("-",$slot));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array()); 
}

function mapSlots($slots){
global $pg;
     $slots=explode(",",$slots);
    $prep = pg_prepare($pg,"mapSlots","SELECT laeme.map_slots($1::text[])");
    $ex = pg_execute($pg,"mapSlots",array(pg_arr($slots)));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array()); 
}

function mapSet($lits, $tags = ""){
global $pg;
    $lits=explode(",",$lits);
    $tags=explode(",",$tags);
    $prep = pg_prepare($pg,"mapSet","SELECT laeme.map_set($1::text[],$2::text[])");
    $ex = pg_execute($pg,"mapSet",array(pg_arr($lits),pg_arr($tags)));
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"getSetsByLits",
                      "args"=>array(),
                      "filters"=>[]);
    return array("rows"=>$rows, "queryData"=>$queryData); 
}


function mapFilteredSet($lits,$filters){
global $pg;
    $lits=explode(",",$lits);
    $filters = json_decode($filters);
    $query = addFilters("filteredMap",$filters,2);
    array_unshift($query["args"], pg_arr($lits));
    
    $prep = pg_prepare($pg,"getMap",$query["q"]);
    $ex = pg_execute($pg,"getMap",$query["args"]);
    $rows = pg_fetch_all_columns($ex,0);
    $queryData = array("fnc"=>"getFilteredSets",
                      "args"=>array(),
                      "filters"=>$filters);
    return array("rows"=>$rows, "queryData"=>$queryData);
    
}

function mapFilteredSetForText($textId,$lits,$filters){
global $pg;
    $lits=explode(",",$lits);
    $filters = json_decode($filters);
    $query = addFilters("filteredSetsForText",$filters,3);
    array_unshift($query["args"], pg_arr($lits));
    array_unshift($query["args"], $textId);
    
    $prep = pg_prepare($pg,"getMap",$query["q"]);
    $ex = pg_execute($pg,"getMap",$query["args"]);
    $rows = pg_fetch_all_columns($ex,0);
   $queryData = array("fnc"=>"getSplitsByTextAndMorphid",
                      "args"=>array($textId),
                      "filters"=>array(array("level"=>"text",
                                            "field"=>"id",
                                            "value"=>$textId)));
    return array("rows"=>$rows, "queryData"=>$queryData);
    
}

function mapSetExact($lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"mapSet","SELECT laeme.map_set_exact($1::text[])");
    $ex = pg_execute($pg,"mapSet",array(pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array()); 
}

function mapSetPos($lits,$pos){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"mapSet","SELECT laeme.map_set($1::text[],$2::integer)");
    $ex = pg_execute($pg,"mapSet",array(pg_arr($lits),$pos));
    $rows = pg_fetch_all_columns($ex,0);
    return array("rows"=>$rows, "queryData"=>array()); 
}

// queries returning MS data

function getMs($textId){
    global $pg;
     $prep = pg_prepare($pg,"getMs","SELECT laeme.get_ms_tokens($1::integer)");
    $ex = pg_execute($pg,"getMs",array($textId));
    $rows = pg_fetch_all_columns($ex,0);
    
    return array("rows"=>$rows, "queryData"=>array());
}

function getKwic($formid,$range){
    global $pg;
     $prep = pg_prepare($pg,"getKwic","SELECT laeme.get_kwic($1::integer,$2::integer)");
    $ex = pg_execute($pg,"getKwic",array($formid,$range));
    $rows = pg_fetch_all_columns($ex,0);
    
    return array("rows"=>$rows, "queryData"=>array());
}



function getMsMeta($textIds){
    global $pg;
    $textIds=explode(",",$textIds);
     $prep = pg_prepare($pg,"getMsMeta","SELECT laeme.get_ms_meta($1::integer[])");
    $ex = pg_execute($pg,"getMsMeta",array(pg_arr($textIds)));
    $rows = pg_fetch_all_columns($ex,0);
    
    return array("rows"=>$rows, "queryData"=>array());
}

function getAllMss(){
    global $pg;
     $prep = pg_prepare($pg,"getMsMeta","SELECT laeme.get_ms_meta()");
    $ex = pg_execute($pg,"getMsMeta",array());
    $rows = pg_fetch_all_columns($ex,0);
    
    return array("rows"=>$rows, "queryData"=>array());
}

//queries returning network data
function getCorresp($aId,$bId){
    global $pg;
     $prep = pg_prepare($pg,"getCorresp","SELECT laeme.get_corresp($1::integer, $2::integer)");
    $ex = pg_execute($pg,"getCorresp",array($aId,$bId));
    $rows = pg_fetch_all_columns($ex,0);
    
    return array("rows"=>$rows, "queryData"=>array());
}

function getMsCorresp($textId){
    global $pg;
     $prep = pg_prepare($pg,"getCorresp","SELECT laeme.get_corresp($1::integer)");
    $ex = pg_execute($pg,"getCorresp",array($textId));
    $rows = pg_fetch_all_columns($ex,0);
    
    return array("rows"=>$rows, "queryData"=>array());
}

function getAllCorresp(){
    global $pg;
     $prep = pg_prepare($pg,"getCorresp","SELECT laeme.get_corresp()");
    $ex = pg_execute($pg,"getCorresp",array());
    $rows = pg_fetch_all_columns($ex,0);
    
    return array("rows"=>$rows, "queryData"=>array());
}


//update FNCs
function saveLitterae($split,$morphid,$pattern){
    global $pg;
     $split = explode(",",$split);
     $prep = pg_prepare($pg,"saveLitterae","SELECT save_Litterae($1::text[], $2::integer, $3::text)");
    $ex = pg_execute($pg,"saveLitterae",array(pg_arr($split), $morphid, $pattern));
    $rows = pg_fetch_all_columns($ex,0);
    
    return array("rows"=>array("Item saved"), "queryData"=>array());
}




  function filterLevel($i){
        return $i->level!="l";
    }

function readMorphids($slot){
    $rsl = explode("-",$slot);
    return $rsl[0];
}

function findLexels($morphids){
    global $pg;
     $prep = pg_prepare($pg,"findLexels","SELECT laeme.find_lexels($1::integer[])");
    $ex = pg_execute($pg,"findLexels",array(pg_arr($morphids)));
    $rows = pg_fetch_all_columns($ex,0);
    
    return $rows[0];
}


    
       
?>