<?php
  //$casa = "oracle.ilerna.com";
  //$clase = "192.168.3.26";

  function retornarConexion() {

    $con=mysqli_connect("oracle.ilerna.com","DAW2_GamifikG2","aGamifikG21","daw2_gamifikg2");

    return $con;
  }
?>
