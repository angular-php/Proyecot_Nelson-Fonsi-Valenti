import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  formLogin: FormGroup;

  constructor(private readonly fb: FormBuilder, private loginService: UsuarioService) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLogin() {
    if (this.formLogin.valid) {
        console.log(this.formLogin.getRawValue());
        try {
          this.loginService.login(this.formLogin.controls.username.value, this.formLogin.controls.password.value).subscribe(value => {
            console.log(value);
          });
        } catch (error) {
          //Sweetalert
        }
    } else {
        console.log('There is a problem with the form');
    }
  }

}
