<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: text/html;charset=utf-8");

  require("db.php");
  session_start();

  // Obtengo los datos cargados en el formulario de login.
  $cadena = file_get_contents('php://input');
  $json = json_decode($cadena, true);

  $nombre = $json['usuario'];
  $password = $json['passw'];

  $con = retornarConexion();
  class Result {}
  $response = new Result();


/*******************    ALUMNO      ********************/
  $instruccion = "select count(*) as cuantos from alumnos where nickname = '$nombre'";
  $resultado = mysqli_query($con, $instruccion);

  //Comprovar que exista
  while ($fila = $resultado->fetch_array()) {
    $numero = $fila["cuantos"];
  }

  //Si no existe
  if ($numero == 0) {
    /*******************    PROFE      ********************/
    $instruccion = "select count(*) as cuantos from profesores where nickname = '$nombre'";
    $resultado = mysqli_query($con, $instruccion);

    //Comprovar que exista
    while ($fila = $resultado->fetch_array()) {
      $numero = $fila["cuantos"];
    }

    //Si no existe
    if ($numero == 0) {
      $response->resultado = 'NE';
    //Si existe
    }else {
      $instruccion = "select password as cuantos from profesores where nickname = '$nombre'";
      $resultado = mysqli_query($con, $instruccion);
      while ($fila = $resultado->fetch_array()) {
        $password2 = $fila["cuantos"];
      }

      //Comprovar si coincide el password
      if (!strcmp($password2, $password) == 0) {
        $response->resultado = 'CKO';
        $response->mensaje = 'Contraseña profesor incorrecta';
      } else {

        $instruccion = "select idProf as cuantos from profesores where nickname = '$nombre'";
        $resultado = mysqli_query($con, $instruccion);
        while ($fila = $resultado->fetch_array()) {
          $response->id = $fila["cuantos"];
          $response->student = false;
        }

        $response->mensaje = 'Login profe OK';
        $response->resultado = 'OK';
        $_SESSION["nombre_logueado"] = $nombre;
      }
    }
  //Si existe
  }else {
    $instruccion = "select password as cuantos from alumnos where nickname = '$nombre'";
    $resultado = mysqli_query($con, $instruccion);
    while ($fila = $resultado->fetch_array()) {
      $password2 = $fila["cuantos"];
    }

    //Comprovar si coincide el password
    if (!strcmp($password2, $password) == 0) {
      $response->resultado = 'CKO';
      $response->mensaje = 'Contraseña alumno incorrecta';
    } else {
      $instruccion = "select idusu as cuantos from alumnos where nickname = '$nombre'";
      $resultado = mysqli_query($con, $instruccion);
      while ($fila = $resultado->fetch_array()) {
        $response->id = $fila["cuantos"];
        $response->student = true;
      }

      $response->mensaje = 'Login alumno OK';
      $response->resultado = 'OK';
      $_SESSION["nombre_logueado"] = $nombre;
    }
  }

  header('Content-Type: application/json');
  echo json_encode($response);
?>
