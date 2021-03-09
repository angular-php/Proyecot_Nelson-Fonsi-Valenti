<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: text/html;charset=utf-8");

  require("db.php");

  // Obtengo los datos cargados en el formulario de login.
  $cadena = file_get_contents('php://input');
  $json = json_decode($cadena, true);

  $nombreRanking = $json['name'];
  $codigo = $json['codigo'];
  $idProfe = $json['idProfe'];

  $con = retornarConexion();
  class Result {}
  $response = new Result();

  $instruccion = "select count(*) as cuantos from rankings where nombreRanking = '$nombreRanking'";
  $resultado = mysqli_query($con, $instruccion);

  //Comprovar que exista
  while ($fila = $resultado->fetch_array()) {
    $numero = $fila["cuantos"];
  }

  if ($numero == 0) {
    //Generar codigo y comprovar que no exista
    do {
      $pattern = '1234567890abcdefghijklmnopqrstuvwxyz';
      $max = strlen($pattern)-1;
      for($i=0;$i < 6;$i++) $codigo .= $pattern{mt_rand(0,$max)};
      $codigo = strtoupper ( $codigo );

      //Comprovar que exista
      $instruccion = "select count(*) as cuantos from rankings where codigo = '$codigo'";
      $resultado = mysqli_query($con, $instruccion);

      while ($fila = $resultado->fetch_array()) {
        $numero = $fila["cuantos"];
      }
    } while ($numero != 0);

    //Comprovar que exista
    $instruccion = "INSERT INTO rankings(`nombreRanking`, `idProfe`, `codigo`) VALUES ('".$nombreRanking."', ".$idProfe.", '".$codigo."');";
    $resultado = mysqli_query($con, $instruccion);

    $response->resultado = 'OK';
    $response->mensaje = 'Ranking creado!';
    $response->codigo = 'Codigo: '.$codigo;
  }else if ($numero > 0) {
    $response->resultado = 'KO';
    $response->mensaje = 'Ya exise un ranking con ese nombre!';
  }else {
    $response->resultado = 'ERR';
    $response->mensaje = 'Error inesperado!';
  }

  header('Content-Type: application/json');
  echo json_encode($response);
?>
