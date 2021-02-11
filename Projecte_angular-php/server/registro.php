<?php

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');//Recibe el json de angular
  $params = json_decode($json);

  require("db.php");
  session_start();

  $con = retornarConexion();

  //Comprovacion Conexion BBDD
  if (!$con) {
    die("No se ha podido realizar la corrección ERROR:" . mysqli_connect_error() . "<br>");
  }else {
    mysqli_set_charset ($con, "utf8");
    echo "Se ha conectado a la base de datos" . "<br>";
  }

  

?>
