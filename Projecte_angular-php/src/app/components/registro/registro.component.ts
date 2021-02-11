import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  mostrar: boolean = true;
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
    centro: new FormControl('', Validators.required),
  });

  // sweetAlertRegistrarte() {
  //   Swal.fire({
  //     icon: 'success',
  //     text: 'Usuaro registrado!',
  //   });
  // }

  botonRegistroAlum() {
    this.usuarioService
      .RegistrarAlumno(
        new Usuario(
          this.registro.controls.nick.value,
          this.registro.controls.firstname.value,
          this.registro.controls.lastname.value,
          this.registro.controls.email.value,
          this.registro.controls.pass.value
        )
      )
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  ngOnInit(): void {}

  //Mostrar Formulari PROF-ALUMNO
  mostrarProf() {
    this.mostrar = false;
  }

  mostrarAlum() {
    this.mostrar = true;
  }

  //Boton Registrar
  botonRegistrarProf() {

  }

  botonRegistrarAlum() {

  }
}
