<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  $json = file_get_contents('php://input');

  $params = json_decode($json);


  require("db.php");
  $con=retornarConexion();

  mysqli_query($con, "update ejerciciosranking set puntos = $params->puntos WHERE idRanking = $params->idRank AND idAlumno = $params->idAlum AND idEjercicio = $params->idEj");


  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Se han guardado las puntuaciones';

  echo json_encode($response);
?>
