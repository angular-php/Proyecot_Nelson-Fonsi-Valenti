<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  $json = file_get_contents('php://input');

  $params = json_decode($json);

  $idRank = $_GET['id'];

  require("db.php");
  $con=retornarConexion();

  mysqli_query($con, "UPDATE rankingalumnos
  SET cooperacion = cooperacion+$params->cooperacion,
      emociones = emociones+$params->emociones,
      iniciativa = iniciativa+$params->iniciativa,
      pensamiento = pensamiento+$params->pensamiento ,
      responsabilidad = responsabilidad+$params->responsabilidad
  WHERE idRanking = $idRank AND idAlumno = $params->idusu");

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Se han guardado las skills';

  echo json_encode($response);
?>

