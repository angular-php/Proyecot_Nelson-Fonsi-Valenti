import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder,  FormControl,  FormGroup,  Validators,} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {

  usuario : Usuario;
  mostrar: boolean = true;
  hiddenCentro: boolean = true;
  submitted = false;

  constructor(private usuarioService: UsuarioService) {}

  registro = new FormGroup({
    nick: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),
    cpass: new FormControl('', [
      Validators.required,
      RxwebValidators.compare({ fieldName: 'pass' }),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    centro: new FormControl(''),
  });

  botonRegistro() {
    this.usuario = new Usuario(
      this.registro.controls.nick.value,
      this.registro.controls.firstname.value,
      this.registro.controls.lastname.value,
      this.registro.controls.email.value,
      this.registro.controls.pass.value
    )
    this.usuarioService
      .registroUsuario(
        this.usuario
      )
      .subscribe((datos) =>
        {
          if(datos['resultado'] == 'OK') {
            alert(datos['mensaje']);
          }else if (datos['resultado'] == 'KO') {
            alert(datos['mensaje']);
          }
        });
  }

  ngOnInit(): void {}

  //Mostrar Formulari PROF-ALUMNO
  mostrarProf() {
    this.mostrar = false;
    this.hiddenCentro = false;
  }

  mostrarAlum() {
    this.mostrar = true;
    this.hiddenCentro = true;
  }

  //Boton Registrar
  botonRegistrarProf() {}

}
