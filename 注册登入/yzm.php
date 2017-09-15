<?php
$r = rand(1,20);
$conn = new PDO("mysql:host=localhost;dbname=login", "root", "mysql");
$c = $conn->exec("INSERT INTO `login`.`yzm` (`yzm`) VALUES ('".$r."');");
//$conn->lastInsertId();
if($c){
    $j = ['id'=>$conn->lastInsertId(),'yzm'=>$r];
    echo json_encode($j);
} else {
    echo "获取失败";
}








?>