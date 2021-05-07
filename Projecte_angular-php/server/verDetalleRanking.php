<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  require("db.php");
  $con=retornarConexion();

  $registros=mysqli_query(
    $con,
    "	select a.*, ra.puntos, ra.cooperacion, ra.emociones, ra.iniciativa, ra.pensamiento, ra.responsabilidad
    FROM rankings r INNER JOIN rankingalumnos ra ON r.idRanking = ra.idRanking
    INNER JOIN alumnos a ON a.idusu = ra.idAlumno
    WHERE r.idRanking=$_GET[id]
    ORDER BY ra.puntos DESC");

  $vec=[];
  while ($reg=mysqli_fetch_assoc($registros))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;
?>




