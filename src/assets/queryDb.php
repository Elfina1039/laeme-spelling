
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
  //other SURROUNDING TEXTS: 138,11,64 , 67
 header("Content-Type: text/html; charset=UTF-8");
     
     $c="host=localhost port=5432 dbname=postgres user=postgres password=postgrass";

$pg=pg_connect($c);

if(!$pg) 
{
echo "Nepovedlo se pripojit!";
}

pg_set_client_encoding($pg, "UNICODE");


$fnc=$_GET["fnc"];
$args=explode(";",$_GET["args"]);

$rows = call_user_func_array($fnc,$args);

echo("[".implode(",",$rows)."]");


// queries returning LITTERAE
function getAdjacent($littera,$shift){
global $pg;

    $prep = pg_prepare($pg,"getAdjacent","SELECT laeme.get_adjacent($1,$2)");
    $ex = pg_execute($pg,"getAdjacent",array($littera,$shift));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}

function getAdjacentByText($littera,$shift,$textId){
global $pg;

    $prep = pg_prepare($pg,"getAdjacent","SELECT laeme.get_adjacent($1,$2,$3)");
    $ex = pg_execute($pg,"getAdjacent",array($littera,$shift,$textId));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}

function getAlternattves($littera){
global $pg;

    $prep = pg_prepare($pg,"getAlternatives","SELECT laeme.get_alternatives($1)");
    $ex = pg_execute($pg,"getAlternatives",array($littera));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}

function getInventory($textId){
global $pg;

    $prep = pg_prepare($pg,"getInventory","SELECT laeme.get_inventory($1)");
    $ex = pg_execute($pg,"getInventory",array($textId));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}

function getDigraphInventory($lit){
global $pg;

    $prep = pg_prepare($pg,"getInventory","SELECT laeme.get_inventory($1)");
    $ex = pg_execute($pg,"getInventory",array($lit));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}



// queries returning SETs

function getSetsOverview(){
global $pg;

    $prep = pg_prepare($pg,"getSets","SELECT laeme.get_sets_overview()");
    $ex = pg_execute($pg,"getSets",array());
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}


function getSetsByText($textId){
global $pg;

    $prep = pg_prepare($pg,"getSets","SELECT laeme.get_sets($1)");
    $ex = pg_execute($pg,"getSets",array($textId));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}

function getSetsByLits($lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSets","SELECT laeme.get_sets($1::text[])");
    $ex = pg_execute($pg,"getSets",array(pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}

function getSetsByTextAndLits($textId,$lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSets","SELECT laeme.get_sets($1::integer,$2::text[])");
    $ex = pg_execute($pg,"getSets",array($textId,pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}


//functions returning slots
function getSlotsByLits($lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSlots","SELECT laeme.get_slots($1::text[])");
    $ex = pg_execute($pg,"getSlots",array(pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
    
}

function getSlotsByText($textId){
global $pg;

    $prep = pg_prepare($pg,"getSlots","SELECT laeme.get_slots($1::integer)");
    $ex = pg_execute($pg,"getSlots",array($textId));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows; 
}

function getSlotsByTextAndLits($textId,$lits){
global $pg;
    $lits=explode(",",$lits);
    $prep = pg_prepare($pg,"getSlots","SELECT laeme.get_slots($1::integer,$2::text[])");
    $ex = pg_execute($pg,"getSlots",array($textId,pg_arr($lits)));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows; 
}


//queries returning splits
function getSplitsByLexel($lexel){
global $pg;
    $prep = pg_prepare($pg,"getSplitsByLexel","SELECT laeme.get_splits($1)");
    $ex = pg_execute($pg,"getSplitsByLexel",array($lexel));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
}

function getSplitsByMorphid($morphid){
global $pg;
    $prep = pg_prepare($pg,"getSplits","SELECT laeme.get_splits($1)");
    $ex = pg_execute($pg,"getSplits",array($morphid));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows;
}

//queries returning map data

function mapSlot($morphid,$pos){
global $pg;
    $prep = pg_prepare($pg,"mapSlot","SELECT laeme.map_slot($1::integer,$2::integer)");
    $ex = pg_execute($pg,"mapSlot",array($morphid,$pos));
    $rows = pg_fetch_all_columns($ex,0);
    return $rows; 
}



function pg_arr($arr){
    return "{".implode(",",$arr)."}";
}
    
       
?>