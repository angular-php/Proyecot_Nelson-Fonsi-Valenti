import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';

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
    email : new FormControl('' , [Validators.required,Validators.email]),
    firstname : new FormControl('' , [Validators.required,Validators.minLength(3)]),
    lastname : new FormControl('' , [Validators.required,Validators.minLength(3)]),
    centro : new FormControl('' , Validators.required)

  });

  sweetAlertRegistrarte() {
    Swal.fire({
      icon: 'success',
      text: 'Usuaro registrado!',
    })
  }

  sweetAlertLogin() {
    Swal.fire({
      title: 'Estas seguro que tienes cuenta?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Perfecto!', 'Vamos al registro....', 'success')
      } else if (result.isDenied) {
        Swal.fire('Registrate primero!', '', 'info')
      }
    })
  }

  ngOnInit(): void {
  }

}
