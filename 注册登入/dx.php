<?php
$r = $_GET["r"];
$id = $_GET["id"];
$conn = new PDO("mysql:host=pengyaoli.top:12321;dbname=login", "root", "mysql");

$c = $conn->query("select * from dx where id = $id and dx = $r;")->fetchAll();
if(count($c) == 0){
    echo "错误";
} else {

    echo "正确";
}



?>