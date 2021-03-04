import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { RankingService } from 'src/app/services/ranking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ranking',
  templateUrl: './form-ranking.component.html',
  styleUrls: ['./form-ranking.component.css']
})
export class FormRankingComponent implements OnInit {

  formRanking: FormGroup;
  usuario: Usuario;

  // Mensajes de validator
  validation_messages = {
    nranking: [
      { type: 'required', message: 'El campo nombre es obligatorio' }
    ],
    alumnos: [
      { type: 'required', message: 'El campo nickname es obligatorio' }
    ],
  };

  constructor(private readonly fb: FormBuilder, private formRankingService: RankingService, private router: Router) {
    this.formRanking = this.fb.group({
      nickname: ['', Validators.required],
      nomUsuari: ['', Validators.required],
      cognom1: ['', Validators.required],
      cognom2: ['', Validators.required],
      email: ['', Validators.required],
      contrasenya: ['', Validators.required],
      confContrasenya: ['', Validators.required],
      dataNaixement: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  btnAnadir() {
    if (this.formRanking.valid) {
      this.usuario = new Usuario(
        this.formRanking.controls.nickname.value,
        this.formRanking.controls.contrasenya.value,
        this.formRanking.controls.nomUsuari.value,
        this.formRanking.controls.cognom1.value,
        this.formRanking.controls.cognom2.value,
        this.formRanking.controls.email.value,
        this.formRanking.controls.dataNaixement.value
      );
      try {
        this.formRankingService.formRankingUsuario(this.usuario).subscribe((value) => {
          //Alertas i redireccionamiento
          if (value['resultado'] === "OK") {
            Swal.fire({
              icon: 'success',
              title: 'Genial',
              text: value['mensaje']
            })
          } else if (value['resultado'] === 'KO') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: value['mensaje']
            })
          }
        }), (e => {
          console.log(e);
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
      //Sweetalert
      Swal.fire({
        icon: 'error',
        title: 'Algo ha ido mal',
        text: 'Revisa los campos del formulario!'
      })
    }
  }



}
