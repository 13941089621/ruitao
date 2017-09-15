<?php
include 'Father.php';
include "Son.php";
$fa = new Father();
Father::$a;
//echo $fa->getname();
$s = new Son();
echo $s->getname();
echo $s->getage();
?>