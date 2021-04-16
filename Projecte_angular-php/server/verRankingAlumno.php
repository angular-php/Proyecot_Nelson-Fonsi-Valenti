<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

  require("db.php");
  $con=retornarConexion();

  $registros=mysqli_query($con,
    "SELECT ra.*, r.idRanking, r.nombreRanking, r.codigo
    FROM rankingalumnos ra
	  INNER JOIN rankings r ON ra.idRanking = r.idRanking
    WHERE idAlumno = $_GET[id]
    ORDER BY r.nombreRanking
    ");

  $vec=[];
  while ($reg=mysqli_fetch_assoc($registros))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;

?>
