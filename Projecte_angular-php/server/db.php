<?php

  function retornarConexion() {
    $con=mysqli_connect("localhost","root","usbw","angularphp");
    return $con;
  }
?>
