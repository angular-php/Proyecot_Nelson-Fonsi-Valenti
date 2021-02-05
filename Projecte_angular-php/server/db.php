<?php

  function retornarConexion() {
    $con=mysqli_connect("localhost","root","","angularphp");
    return $con;
  }
?>
