<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: text/html;charset=utf-8");

  require("db.php");

  // Obtengo los datos cargados en el formulario de login.
  // $cadena = file_get_contents('php://input');

  $con = retornarConexion();
  class Result {}
  $response = new Result();

  // $codigo = $_GET[codigo];
  // echo $codigo;

  $instruccion = "select count(*) as cuantos from rankings where codigo = '$_GET[codigo]'";
  $resultado = mysqli_query($con, $instruccion);

  //Comprovar que exista
  while ($fila = $resultado->fetch_array()) {
    $numero = $fila["cuantos"];
  }

  if ($numero != 0) {
    $response->resultado = 'OK';
    $response->mensaje = 'Codigo de Ranking Correcto!';

  }elseif ($numero == 0) {
    $response->resultado = 'KO';
    $response->mensaje = 'No exise este Codigo de Ranking!';
  }else {
    $response->resultado = 'ERR';
    $response->mensaje = 'Error inesperado!';
  }

  header('Content-Type: application/json');
  echo json_encode($response);
?>
