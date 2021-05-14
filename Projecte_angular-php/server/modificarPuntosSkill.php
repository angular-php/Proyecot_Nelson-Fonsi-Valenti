<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  $json = file_get_contents('php://input');

  $params = json_decode($json);

  require("db.php");
  $con=retornarConexion();

  mysqli_query($con, "UPDATE rankingalumnos SET puntosSkills = puntosSkills - $params->puntosRepartidos WHERE idRanking =  $params->idRank AND idAlumno = $params->id");

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Se han modificado los puntos del alumno';

  echo json_encode($response);
?>

