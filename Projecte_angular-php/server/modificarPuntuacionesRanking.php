<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  $json = file_get_contents('php://input');

  $params = json_decode($json);


  require("db.php");
  $con=retornarConexion();

  mysqli_query($con, "update ejerciciosranking set puntos = $params->puntos WHERE idRanking = $params->idRank AND idAlumno = $params->idAlum AND idEjercicio = $params->idEj");

  $instruccion = mysqli_query($con, "SELECT SUM(er.puntos) AS 'totalP' FROM ejerciciosranking er, alumnos a WHERE er.idAlumno = a.idusu AND er.idRanking = $params->idRank AND er.idAlumno = $params->idAlum");

  while ($fila = $instruccion->fetch_array()) {
    $totalPuntos = $fila["totalP"];
  }

  mysqli_query($con, "UPDATE rankingalumnos SET puntos = $totalPuntos WHERE idAlumno = $params->idAlum AND idRanking = $params->idRank;");



  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Se han guardado las puntuaciones';

  echo json_encode($response);
?>
