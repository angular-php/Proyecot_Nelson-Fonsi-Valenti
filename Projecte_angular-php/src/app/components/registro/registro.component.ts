import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }

  registro = new FormGroup({

    nick : new FormControl('' , [Validators.required,Validators.minLength(4),Validators.maxLength(15)]),
    pass : new FormControl('' , [Validators.required,Validators.minLength(4),Validators.maxLength(15)]),
    cpass : new FormControl('' , [Validators.required, RxwebValidators.compare({fieldName:'pass'})]),
    email : new FormControl('' , Validators.required),
    firstname : new FormControl('' , [Validators.required,Validators.minLength(3)]),
    lastname : new FormControl('' , [Validators.required,Validators.minLength(3)]),
    centro : new FormControl('' , Validators.required)

  });

  ngOnInit(): void {
  }

}
