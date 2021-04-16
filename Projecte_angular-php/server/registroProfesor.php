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

  $instruccion2 = "select count(*) as 'rows2' from alumnos where nickname = '$params->nickname'";
  $res2 = mysqli_query($con, $instruccion2);
  $datos2 = mysqli_fetch_assoc($res2);
  $paswEnc = password_hash($params->password, PASSWORD_DEFAULT);

  if ($datos['rows'] == 0 && $datos2['rows2'] == 0) {
    //QUERY Insert BBDD
    mysqli_query($con,
    "insert into profesores(nickname, password, email, firstname, lastname, centro)
    values ('$params->nickname', '$paswEnc','$params->email','$params->firstname','$params->lastname', '$params->center')"
    );

    // GENERA LOS DATOS DE RESPUESTA
    $response->resultado = 'OK';
    $response->mensaje = 'Profesor registrado!';
  }else if($datos['rows'] != 0){
    // GENERA LOS DATOS DE RESPUESTA
    $response->resultado = 'KO';
    $response->mensaje = 'Profesor ya registrado';
  }else {
    // GENERA LOS DATOS DE RESPUESTA
    $response->resultado = 'KO';
    $response->mensaje = 'Este nickname ya existe';
  }

  header('Content-Type: application/json');
  echo json_encode($response); // MUESTRA EL JSON GENERADO


?>
