<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: text/html;charset=utf-8");

  require("db.php");
  session_start();

  // Obtengo los datos cargados en el formulario de login.
  $cadena = file_get_contents('php://input');
  $json = json_decode($cadena, true);

  $nombre = $json['usuario'];
  $password = $json['passw'];

  $con = retornarConexion();
  class Result {}
  $response = new Result();

  $instruccion = "select count(*) as cuantos from alumnos where nickname = '$nombre'";
  $resultado = mysqli_query($con, $instruccion);

  //Comprovar que exista
  while ($fila = $resultado->fetch_array()) {
    $numero = $fila["cuantos"];
  }

  $response->resultado = 'CKO';
  $response->mensaje = 'Contraseña profesor incorrecta';    

  header('Content-Type: application/json');
  echo json_encode($response);
?>