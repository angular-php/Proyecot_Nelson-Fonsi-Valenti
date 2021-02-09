<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  require("db.php");
  session_start();

  $nick;
  $password;
  $con=retornarConexion();

  echo "hola";

  if (!$con) {
    die("No se ha podido realizar la corrección ERROR:" . mysqli_connect_error() . "<br>");
  }else {
    mysqli_set_charset ($con, "utf8");
    echo "Se ha conectado a la base de datos" . "<br>";
  }

  $resultado = mysqli_query($con, $registros);
    while ($fila = $resultado->fetch_assoc()) {
    $numero=$fila["cuantos"];
  }

  if($numero==0){
    echo "El usuario no existe";
  }else {
    $registros = "select password as cuantos from profesores where nick = '$nick'";
    $resultado = mysqli_query($con, $registros);

    while ($fila = $resultado->fetch_assoc()) {
      $password2=$fila["cuantos"];
    }

    if (!strcmp($password2 , $password) == 0){
      echo "Contraseña incorrecta";
      $json = json_encode('ko '+$nick);
    }else {
      $json = json_encode('ok '+$nick);
      echo "Login OK";
      $_SESSION["nick_logueado"]=$nick;
      ?>
        <a href="menu_profesor.php">Acceder al menu</a>
      <?php
    }
  }

  echo $json;
  header('Content-Type: application/json');
?>
