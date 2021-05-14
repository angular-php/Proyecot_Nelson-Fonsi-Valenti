<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');

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
    "SELECT a.idusu, a.nickname, a.firstname, a.lastname, ra.cooperacion, ra.emociones, ra.iniciativa, ra.pensamiento, ra.responsabilidad, ra.puntosSkills
     FROM alumnos a
     INNER JOIN rankingalumnos ra ON ra.idAlumno = a.idusu
     WHERE ra.idRanking = $_GET[idRank]");

  $vec=[];
  while ($reg=mysqli_fetch_assoc($registros))
  {
    $vec[]=$reg;
  }

  $cad=json_encode($vec);
  echo $cad;
?>


