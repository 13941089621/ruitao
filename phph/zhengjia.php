<?php
$a=$_GET['name'];
$b=$_GET['word'];


$servername = 'localhost:3306';
$username = 'root';
$password = 'asdfasdf';

try{
    $conn =new PDO("mysql:host=$servername;dbname=biaoge", $username, $password);


$e = $conn->exec("INSERT INTO `biaoge`.`neme` (`name`, `age`) VALUES ('".$a."', '".$b."');");
}catch(PDOException $e){
    echo $e->getMessage();
}

?>