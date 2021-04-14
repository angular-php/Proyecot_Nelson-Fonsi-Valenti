import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder,  FormControl,  FormGroup,  Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Usuario } from 'src/app/models/usuario.model';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuario: Usuario;
  alumno: boolean = true;
  mostrar: boolean = true;
  hiddenCentro: boolean = true;
  submitted = false;

  constructor(private usuarioService: UsuarioService, private profesorService: ProfesorService, private router: Router) {}

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

    //REGISTRO EN LA TABLA ALUMNOS
    if (this.alumno == true) {
      this.usuario = new Usuario(
        this.registro.controls.nick.value,
        this.registro.controls.pass.value,
        this.registro.controls.firstname.value,
        this.registro.controls.lastname.value,
        this.registro.controls.email.value
      );
      this.usuarioService.registroUsuario(this.usuario).subscribe((datos) => {
        const $mensaje = '';
        // TODO HA IDO BIEN EN EL INSERT
        if (datos['resultado'] == 'OK') {
          let $mensaje = datos['mensaje'];
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Perfecto',
            text: $mensaje,
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1500);

        // ERROR EN EL INSERT
        } else if (datos['resultado'] == 'KO') {
          let $mensaje = datos['mensaje'];
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ups... algo ha ido mal',
            text: $mensaje,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    // REGISTRO TABLA PROFESORES
    } else if (this.alumno == false) {

      this.usuario = new Usuario(

        this.registro.controls.nick.value,
        this.registro.controls.pass.value,
        this.registro.controls.firstname.value,
        this.registro.controls.lastname.value,
        this.registro.controls.email.value,
        this.registro.controls.centro.value
      );

      this.profesorService.registroProfesor(this.usuario).subscribe((datos) => {
        const $mensaje = '';
        // TODO HA IDO BIEN EN EL INSERT
        if (datos['resultado'] == 'OK') {
          let $mensaje = datos['mensaje'];
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Perfecto',
            text: $mensaje,
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1500);

        // ERROR EN EL INSERT
        } else if (datos['resultado'] == 'KO') {
          let $mensaje = datos['mensaje'];
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ups... algo ha ido mal',
            text: $mensaje,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  }


  ngOnInit(): void {}

  //Mostrar Formulari PROF-ALUMNO
  mostrarProf(event) {
    this.mostrar = false;
    this.hiddenCentro = false;
    this.alumno = false;

    this.registro.controls['centro'].setValidators(Validators.required);
    this.registro.controls['centro'].updateValueAndValidity();

    document.getElementById('btnP').classList.add('activado');
    document.getElementById('btnA').classList.remove('activado');
  }

  mostrarAlum(event) {
    this.mostrar = true;
    this.hiddenCentro = true;
    this.alumno = true;

    this.registro.controls['centro'].setValidators([]);
    this.registro.controls['centro'].updateValueAndValidity();

    document.getElementById('btnA').classList.add('activado');
    document.getElementById('btnP').classList.remove('activado');
  }

}
