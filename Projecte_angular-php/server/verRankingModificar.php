<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  require("db.php");
  $con=retornarConexion();


  $registros=mysqli_query(
    $con,
    // " SELECT a.*, ejr.puntos, eq.nombreEquipo FROM ejercicios e
    //   INNER JOIN ejerciciosranking ejr ON e.idEjercicio = ejr.idEjercicio
    //   INNER JOIN alumnos a ON a.idusu = ejr.idAlumno
    //   INNER JOIN alumnosequipos ae ON a.idusu = ae.idAlumno
    //   INNER JOIN equipos eq ON eq.idEquipo = ae.idEquipo
    //   WHERE idRanking=$_GET[idRank] AND e.idEjercicio=$_GET[idEj]
    //   ORDER BY a.lastname");
    "SELECT a.*, ejr.puntos FROM ejercicios e
    INNER JOIN ejerciciosranking ejr ON e.idEjercicio = ejr.idEjercicio
    INNER JOIN alumnos a ON a.idusu = ejr.idAlumno
    WHERE idRanking=$_GET[idRank] AND e.idEjercicio=$_GET[idEj]
    ORDER BY a.lastname");

  $vec=[];
  while ($reg=mysqli_fetch_assoc($registros))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;
  header('Content-Type: application/json');
?>


