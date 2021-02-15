<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: text/html;charset=utf-8");

  require("db.php");
  session_start();

  // Obtengo los datos cargados en el formulario de login.
  $nombre = $_GET['usuario'];
  $password = $_GET['password'];
  $con = retornarConexion();
  $instruccion = "select count(*) as cuantos from usuario where nombre = '$nombre'";
  $resultado = mysqli_query($con, $instruccion);




  //Comprovar que exista el usuario
  while ($fila = $resultado->fetch_array()) {
    $numero = $fila["cuantos"];
  }

  //Si no existe
  if ($numero == 0) {
    echo "El usuario no existe";
  //Si existe
  }else {
    $instruccion = "select password as cuantos from usuario where nombre = '$nombre'";
    $resultado = mysqli_query($con, $instruccion);
    while ($fila = $resultado->fetch_array()) {
      $password2 = $fila["cuantos"];
    }

    //Comprovar si coincide el password
    if (!strcmp($password2, $password) == 0) {
      echo "Contraseña incorrecta";
    } else {
      echo "Login OK";
      $_SESSION["nombre_logueado"] = $nombre;
    }
  }
?>
