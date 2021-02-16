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

  validation_messages = {
    fname: [
      { type: 'required', message: 'El campo nombre es obligatorio' }
    ],
    password: [
      { type: 'required', message: 'El campo contraseña es obligatorio' }
    ],
  };

  constructor(private readonly fb: FormBuilder, private loginService: UsuarioService, private router: Router) {
    this.formLogin = this.fb.group({
      fname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLogin() {
    if (this.formLogin.valid) {
        console.log(this.formLogin.getRawValue());
        try {
          this.loginService.login(this.formLogin.controls.fname.value, this.formLogin.controls.password.value).subscribe(
            value => {

            if (value['resultado'] == "OK") {
              let id = value["id"];
              this.router.navigateByUrl('/perfil/'+id);
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
    } else {
        console.log('There is a problem with the form');
        this.router.navigateByUrl('/perfil');
    }
  }

}
