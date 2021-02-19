<?php

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');//Recibe el json de angular
  $params = json_decode($json);

  require("db.php");
  session_start();

  $con = retornarConexion();

  class Result {}
  $response = new Result();

  $instruccion = "select count(*) as 'rows' from profesores where nickname = '$params->nickname'";
  $res = mysqli_query($con, $instruccion);
  $datos = mysqli_fetch_assoc($res);

  if ($datos['rows'] == 0) {
    //QUERY Insert BBDD
    mysqli_query($con,
    "insert into profesores(nickname, password, email, firstname, lastname, centro)
    values ('$params->nickname','$params->password','$params->email','$params->firstname','$params->lastname', '$params->center')"
    );

    // GENERA LOS DATOS DE RESPUESTA

    $response->resultado = 'OK';
    $response->mensaje = 'Profesor registrado OK';

  }else {

    // GENERA LOS DATOS DE RESPUESTA
    $response->resultado = 'KO';
    $response->mensaje = 'Profesor ya registrado';

  }

  header('Content-Type: application/json');
  echo json_encode($response); // MUESTRA EL JSON GENERADO


?>
