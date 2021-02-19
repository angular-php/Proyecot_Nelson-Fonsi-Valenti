import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
  }

  formLogin: FormGroup;

  // Mensajes de validator
  validation_messages = {
    fname: [
      { type: 'required', message: 'El campo nombre es obligatorio' }
    ],
    password: [
      { type: 'required', message: 'El campo contraseña es obligatorio' }
    ],
  };

  //Requisitos validators
  constructor(private readonly fb: FormBuilder, private loginService: UsuarioService, private router: Router) {
    this.formLogin = this.fb.group({
      fname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Boton login
  submitLogin() {
    //Si el formulario es correcto
    if (this.formLogin.valid) {
        try {
          //Llamamos al service
          this.loginService.login(this.formLogin.controls.fname.value, this.formLogin.controls.password.value, null, null).subscribe(
            value => {

              console.log(value['resultado']);

            //Alertas i redireccionamiento
            if (value['resultado'] == "OK") {
              let id = value["id"];
              let student = value["student"];
              //this.router.navigate(['/perfil', id, student]);
              this.router.navigate(['/perfil'], { queryParams: { id: id, student: student } });
              //this.router.navigateByUrl('/perfil/'+id+'/'+value["student"]);
            }else if(value['resultado'] == 'CKO') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña incorrecta!'
              })
            }else if(value['resultado'] == "NE"){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que este usuario no existe!'
              })
            }
          });
        } catch (error) {
          //Sweetalert
          Swal.fire({
            icon: 'error',
            title: 'Algo ha ido mal',
            text: 'Vuelve a intentarlo en un rato!'
          })
        }
    }
  }

}
