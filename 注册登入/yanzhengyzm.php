<?php
$r = $_GET["r"];
$id = $_GET["id"];
$conn = new PDO("mysql:host=localhost;dbname=login", "root", "mysql");

$c = $conn->query("select * from yzm where id = $id and yzm = $r;")->fetchAll();
if(count($c) == 0){
    echo "错误";
} else {

    $rand = rand(100,200);
    $cr = $conn->exec("INSERT INTO `login`.`dx` (`dx`) VALUES ('".$rand."');");
    if($cr){
        $j = ['id'=>$conn->lastInsertId(),'dx'=>$rand];
        echo json_encode($j);
    } else {
        echo "发送短信失败";
    }
}



?>