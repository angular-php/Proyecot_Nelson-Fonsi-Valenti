<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: text/html;charset=utf-8");
  header('Content-Type: application/json');

  require("db.php");

  $cadena = file_get_contents('php://input');
  $json = json_decode($cadena, true);

  $idAlumno = $json['id'];
  $codigo = $json['codigo'];

  $con = retornarConexion();
  class Result {}
  $response = new Result();

  $selectIdRanking = "select idRanking from rankings where codigo = '$codigo'";
  $res= mysqli_query($con,$selectIdRanking);
  $datos = mysqli_fetch_assoc($res);
  $idRanking = $datos['idRanking'];

  $instruccion = "select count(*) as cuantos from rankingalumnos where idRanking = '$idRanking' AND idAlumno = '$idAlumno'";
  $resultado = mysqli_query($con, $instruccion);

  //Comprovar que exista
  while ($fila = $resultado->fetch_array()) {
    $numero = $fila["cuantos"];
  }

  if ($numero == 0) {
    $instruccion = "INSERT INTO rankingalumnos (idRanking, idAlumno, puntos) VALUES ('".$idRanking."', ".$idAlumno.", '".$codigo."');";
    $resultado = mysqli_query($con, $instruccion);

    $response->resultado = "OK";
    $response->mensaje = "Alumno insertado en ranking";

  }elseif($numero != 0){

    $response->resultado = "KO";
    $response->mensaje = "Este alumno ya esta en este ranking";

  }

  echo json_encode($response);
?>
