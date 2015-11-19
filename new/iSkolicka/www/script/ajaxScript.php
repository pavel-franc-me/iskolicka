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
if(isset($_GET["id"])&&$_GET["action"]=="detail")
{
    $rs = mysql_query("select * from english_podcast where kod=".$_GET["id"]);
    $z = mysql_fetch_array($rs);
    $result = $z["text"];

}
elseif(isset($_GET["id"])&&$_GET["action"]=="dictionary")
{
    $rs = mysql_query("select * from english_dictionary_user where document=".$_GET["id"]);
    while($z = mysql_fetch_array($rs))
    {
        $text[] = array("id"=>$z["kod"],"en"=>$z["en"],"cz"=>$z["cz"]);
    }
    $result = json_encode($text);
}
else
{
    $rs = mysql_query("select distinct p.kod,p.name from english_podcast p, english_dictionary_user d where p.kod=d.document and p.upper>1 and p.user=3 order by p.upper desc, p.kod desc");
    while($z = mysql_fetch_array($rs))
    {
        $text[] = array("firstName"=>$z["kod"],"lastName"=>$z["name"]);
    }
    $result = json_encode($text);

}
header('Access-Control-Allow-Origin: *');
echo $result;



?>