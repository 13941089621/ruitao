<?php

$id =$_GET[id];

$servername = 'localhost:3306';
$username = 'root';
$password = 'asdfasdf';

try{
    $conn =new PDO("mysql:host=$servername;dbname=biaoge", $username, $password);
    echo ok;

    $e = $conn->exec("DELETE FROM `biaoge`.`neme` WHERE `id`='".$id."';");
}catch(PDOException $e){
    echo $e->getMessage();
}

?>