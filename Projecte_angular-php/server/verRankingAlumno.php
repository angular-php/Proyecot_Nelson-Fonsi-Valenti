<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  require("db.php");
  $con=retornarConexion();

  $registros=mysqli_query($con,
    "SELECT ra.*, r.idRanking, r.nombreRanking, r.codigo
    FROM rankingalumnos ra
	  INNER JOIN rankings r ON ra.idRanking = r.idRanking
    WHERE idAlumno = $_GET[id]");

  $vec=[];
  while ($reg=mysqli_fetch_assoc($registros))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;
  header('Content-Type: application/json');

?>
