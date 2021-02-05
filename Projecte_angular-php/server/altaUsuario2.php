<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);

  require("db.php");
  $con=BasedeDatos::Conectar();


  mysqli_query($con,"INSERT INTO alumnos(nick, password, email, firstName, lastName) VALUES
                  ('$params->nick',$params->pass, '$params->)");


  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'datos grabados';

  header('Content-Type: application/json');
  echo json_encode($response);
?>
