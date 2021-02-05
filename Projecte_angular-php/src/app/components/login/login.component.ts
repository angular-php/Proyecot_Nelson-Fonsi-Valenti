import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  formLogin: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      passw: ['', Validators.required]
    });
  }

  submitLogin() {
    if (this.formLogin.valid) {
        console.log(this.formLogin.getRawValue());
    } else {
        console.log('There is a problem with the form');
    }
  }

}
