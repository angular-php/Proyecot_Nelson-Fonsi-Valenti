import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  formLogin: FormGroup;
  constructor(private readonly fb: FormBuilder, private router: Router) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      passw: ['', Validators.required]
    });
  }

  submitLogin() {
    if (this.formLogin.valid) {
        console.log(this.formLogin.getRawValue());
        this.router.navigateByUrl('/perfil');
    } else {
        console.log('There is a problem with the form');
        this.router.navigateByUrl('/perfil');
    }
  }

}
