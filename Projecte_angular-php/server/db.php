<?php
  //$casa = "oracle.ilerna.com";
  //$clase = "192.168.3.26";

  function retornarConexion() {

    $con=mysqli_connect("localhost","root","usbw","angularphp");

    return $con;
  }
?>
