<?
$conn_user = "onlineenglish";
$conn_pass = "hafr3254";
$conn_server = "localhost";	
$dbf = "onlineenglish";

@$cn = mysql_connect($conn_server, $conn_user, $conn_pass);
if(!$cn)
{
    die("<p>Litujeme.</p>");
}
mysql_select_db($dbf);
mysql_query("SET sql_mode = ''");
mysql_query("SET NAMES utf8");

$f = FOpen("iskolicka.log", "a");
fputs ($f,$_SERVER["SCRIPT_FILENAME"]."\n");
fputs ($f,$sql."\n");
foreach ($_GET as $key => $value){
    fputs ($f,Date("Y-m-d H:i:s GET:")." ".$key.": ".$value."\n");
}
foreach ($_POST as $key => $value){
    fputs ($f,Date("Y-m-d H:i:s POST:")." ".$key.": ".$value."\n");
}
foreach ($_POST["data"] as $key => $value){
    fputs ($f,Date("Y-m-d H:i:s POST:")." ".$key.": ".$value."\n");
    if(is_array($_POST["data"][$key]))
    {
        foreach ($_POST["data"][$key] as $key1 => $value1){
            fputs ($f,Date("Y-m-d H:i:s DATA:")." ".$key1.": ".$value1."\n");
        }
    }

}

fputs ($f,"\n");
fclose($f);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');




?>