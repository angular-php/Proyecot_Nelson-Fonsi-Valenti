<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);


  require("db.php");
  $con=retornarConexion();

  mysqli_query($con, "update rankingalumnos set puntos = $params->puntos
                      where idAlumno = $params->idAlum AND idRanking = $params->idRank");


  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Se han guardado las puntuaciones';

  header('Content-Type: application/json');
  echo json_encode($response);
?>
