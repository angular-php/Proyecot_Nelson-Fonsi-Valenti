<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  require("db.php");
  $con=retornarConexion();

  $registros=mysqli_query($con,"select a.*, ae.idEquipo, e.nombreEquipo, ra.puntos FROM rankings r INNER JOIN rankingalumnos ra ON r.idRanking = ra.idRanking INNER JOIN alumnos a ON a.idusu = ra.idAlumno INNER JOIN alumnosequipos ae ON ae.idAlumno = a.idusu INNER JOIN equipos e ON e.idEquipo = ae.idEquipo WHERE r.idRanking=$_GET[id]");

  $vec=[];
  while ($reg=mysqli_fetch_assoc($registros))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;
  header('Content-Type: application/json');
?>




