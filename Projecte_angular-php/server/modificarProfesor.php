<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  $json = file_get_contents('php://input');

  $params = json_decode($json);


  require("db.php");
  $con=retornarConexion();

  mysqli_query($con,"update profesores set nickname='$params->nickname',
                                        password='".password_hash($params->password, PASSWORD_DEFAULT)."',
                                        firstname='$params->firstname',
                                        lastname='$params->lastname',
                                        email='$params->email',
                                        centro='$params->center'
                                        where idProf=$params->id");


  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Datos guardados';

  echo json_encode($response);
?>
