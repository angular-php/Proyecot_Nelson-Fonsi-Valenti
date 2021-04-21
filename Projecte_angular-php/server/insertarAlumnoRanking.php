<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: text/html;charset=utf-8");

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

    //INSTRUCCIO PER SUMAR PUNTOS(AL VER DETALLE RANKING)
    $instruccion = "SELECT SUM(puntos) AS TotalPuntos FROM ejerciciosranking WHERE idRanking = ".$idRanking." AND idAlumno = ".$idAlumno.";";
    $resultado = mysqli_query($con, $instruccion);
    while ($fila = $resultado->fetch_array()) {
      $totalPuntos = $fila["TotalPuntos"];
    }

    $instruccion = "INSERT INTO rankingalumnos (idRanking, idAlumno, puntos) VALUES ('".$idRanking."', ".$idAlumno.", '".$totalPuntos."');";
    $resultado = mysqli_query($con, $instruccion);
    $response->resultado = "OK";
    $response->mensaje = "Alumno insertado en ranking";

    for ($i=1; $i <= 50; $i++) {
      $instruccion2 = "SELECT COUNT(*) AS cuantos FROM ejerciciosranking WHERE idEjercicio = ".$i." AND idRanking = ".$idRanking." AND idAlumno = ".$idAlumno.";";
      $resultado2 = mysqli_query($con, $instruccion2);
      //Comprovar que exista
      while ($fila = $resultado2->fetch_array()) {
        $numero2 = $fila["cuantos"];
      }
      if($numero2 == 0){
        $instruccion3 = "INSERT ejerciciosranking VALUES (".$i.", 0 ,". $idRanking.", ".$idAlumno.");";
        $resultado3 = mysqli_query($con, $instruccion3);
      }
    }

  }elseif($numero != 0){

    $response->resultado = "KO";
    $response->mensaje = "Este alumno ya esta en este ranking";

  }

  header('Content-Type: application/json');
  echo json_encode($response);
?>
