<?php
 header("Content-Type: text/html; charset=UTF-8");


     $c="host=localhost port=5432 dbname=postgres user=postgres password=postgrass";

$pg=pg_connect($c);

if(!$pg) 
{
echo "Nepovedlo se pripojit!";
}

pg_set_client_encoding($pg, "UNICODE");

//echo("new version");

$login = $_GET["login"];
$password = $_GET["password"];

//echo("login");

$verify = pg_prepare($pg,"verify", "SELECT * FROM laeme.users WHERE login=$1 AND pass_word=$2");

$verified = pg_execute($pg, "verify", array($login, md5($password)));
$resp = pg_fetch_array($verified);

if($login==$resp["login"] && !empty($login) && !empty($password)){
    $jwt = generateToken($login);
    echo(json_encode(array("result"=>"200", "login"=>$login, "jwt"=>$jwt)));
}else{
     echo(json_encode(array("result"=>"400", "login"=>$login)));
}

function generateToken($login){
    
    // Create token header as a JSON string
$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

// Create token payload as a JSON string
$payload = json_encode(['user_id' => $login]);
    

// Encode Header to Base64Url String
$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

// Encode Payload to Base64Url String
$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    
    return $jwt;
    
}


?>