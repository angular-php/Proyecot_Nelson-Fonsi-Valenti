<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: text/html;charset=utf-8");
  require("db.php");

  // Obtengo los datos cargados en el formulario de login.
  $cadena = file_get_contents('php://input');
  $json = json_decode($cadena, true);

  $id = $json['idRank'];

  $con = retornarConexion();
  class Result {}
  $resp = new Result();

  $sql = "DELETE FROM rankings where idRanking=$id";

  if (mysqli_query($con, $sql) === TRUE) {
    $resp->resultado = "OK";
  } else {
    $resp->resultado = "KO".$id;
  }

  header('Content-Type: application/json');
  echo json_encode($resp);

?>
