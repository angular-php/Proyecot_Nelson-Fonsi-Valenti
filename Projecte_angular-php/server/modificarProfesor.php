<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $json = file_get_contents('php://input');

  $params = json_decode($json);


  require("db.php");
  $con=retornarConexion();

  mysqli_query($con,"update profesores set nick='$params->nickname',
                                        password='$params->password',
                                        firstname='$params->firstname',
                                        lastname='$params->lastname',
                                        email='$params->email',
                                        centro='$params->center'
                                        where id=$params->id");


  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Datos guardados';

  header('Content-Type: application/json');
  echo json_encode($response);
?>
