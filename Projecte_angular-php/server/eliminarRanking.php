<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: text/html;charset=utf-8");
  require("db.php");

  $con = retornarConexion();

  $sql = "delete from equipos where idRanking=$_GET[id]";
  mysqli_query($con, $sql);

  $sql = "delete from rankingalumnos where idRanking=$_GET[id]";
  mysqli_query($con, $sql);

  $sql = "delete from rankings where idRanking=$_GET[id]";
  mysqli_query($con, $sql);

  class Result {}
  $resp = new Result();
  $resp->resultado = 'OK';
  $resp->mensaje = 'Ranking eliminado!';

  header('Content-Type: application/json');
  echo json_encode($resp);

?>
