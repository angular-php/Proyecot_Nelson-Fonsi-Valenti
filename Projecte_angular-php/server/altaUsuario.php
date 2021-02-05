<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  //header('Content-Type: text/html; charset=UTF-8');
  echo 'ghdfhgsdf';


  class Usuario{

    //Para guardar la conexion con la BBDD
    private $pdo;

    // Variables usuarios
    public $nickname;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $student;
    public $ranking;
    public $image;
    public $center;

    //Constructor Usuario
    public function __construct() {
      $this->pdo = BasedeDatos::Conectar();
    }

    //Insertar usuario
    public function InsertarAlumno(Usuario $u) {
      try {
          $consulta="INSERT INTO alumnos(nick, password, email, firstName, lastName) VALUES (?,?,?,?,?);";
          $this->pdo->prepare($consulta)->execute(array(
              $u->getNick(),
              $u->getPassword(),
              $u->getEmail(),
              $u->getFirstName(),
              $u->getLastName()
          ));
          $this->pdo->Insertar($u);
      } catch (Exception $e) {
          die($e->getMessage());
      }
    }

    // Getters Setters
    public function getNick() {
      return $this->nickname;
    }

    public function setNick($nickname) {
        $this->nickname = $nickname;
    }

    public function getFirstName() {
      return $this->firstname;
    }

    public function setFirstName($firstname) {
        $this->firstname = $firstname;
    }

    public function getLastName() {
      return $this->lastname;
    }

    public function setLastName($lastname) {
        $this->lastname = $lastname;
    }

    public function getEmail() {
      return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getPassword() {
      return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function getStudent() {
      return $this->student;
    }

    public function setStudent($student) {
        $this->student = $student;
    }

    public function getRanking() {
      return $this->ranking;
    }

    public function setRanking($ranking) {
        $this->ranking = $ranking;
    }

    public function getImage() {
      return $this->image;
    }

    public function setImage($image) {
        $this->image = $image;
    }

    public function getCenter() {
      return $this->center;
    }

    public function setCenter($center) {
        $this->center = $center;
    }

  }

?>
