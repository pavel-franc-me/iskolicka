<?
$conn_user = "iskolicka";
$conn_pass = "hafr3254";
$conn_server = "localhost";

$dbf = "iskolicka";

@$cn = mysql_connect($conn_server, $conn_user, $conn_pass);
if(!$cn)
{
    die("<p>Litujeme.</p>");
}
mysql_select_db($dbf);
mysql_query("SET sql_mode = ''");
mysql_query("SET NAMES utf8");
if(isset($_GET["id"]))
{
    switch($_GET["title"])
    {
        case "Detail":
            $rs = mysql_query("select * from english_podcast where kod=".$_GET["id"]);
            $z = mysql_fetch_array($rs);
            $result = $z["text"];
            break;
        case "Dictionary":
            $result = "<table>";
            $rs = mysql_query("select * from english_dictionary_user where document=".$_GET["id"]);
            while($z = mysql_fetch_array($rs))
            {
                $result .= "<tr><td style='width:50%'>".$z["cz"]."</td><td style='width:50%'>".$z["en"]."</td></tr>";
            }
            $result .= "</table>";
            break;
        case "Test":
            break;
        default:
    }
}
else
{
    $rs = mysql_query("select * from english_podcast where upper=1 order by kod desc");
    while($z = mysql_fetch_array($rs))
    {
        $text[] = array("firstName"=>$z["kod"],"lastName"=>$z["name"]);
    }
    $result = json_encode($text);

}
header('Access-Control-Allow-Origin: *');
echo $result;



?>