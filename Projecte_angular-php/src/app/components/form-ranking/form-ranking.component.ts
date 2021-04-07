import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ranking } from 'src/app/models/ranking.model';
import { Usuario } from 'src/app/models/usuario.model';
import { RankingService } from 'src/app/services/ranking.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ranking',
  templateUrl: './form-ranking.component.html',
  styleUrls: ['./form-ranking.component.css']
})
export class FormRankingComponent implements OnInit {

  formRanking: FormGroup;
  usuario: Usuario;
  ranking: Ranking;
  id: number;
  student: boolean;
  codigo: string;
  idProfe: number;

  // Mensajes de validator
  validation_messages = {
    nRanking: [
      { type: 'required', message: 'El campo nombre es obligatorio' }
    ]
  };

  constructor(private readonly fb: FormBuilder, private formRankingService: RankingService, private router: Router, private usuarioService: UsuarioService) {
    this.formRanking = this.fb.group({
      nRanking: new FormControl('', [Validators.required]),
    });

    this.id = this.usuarioService.getMemoryID();
    this.student = this.usuarioService.getMemoryStudent();
  }

  ngOnInit(): void {

  }

  btnAnadir() {
    if (this.formRanking.valid) {
      this.ranking = new Ranking(
        this.formRanking.controls.nRanking.value,
        this.codigo = '',
        null,
        this.id
      );

      console.log(this.ranking);



      try {
        this.formRankingService.crearRanking(this.ranking).subscribe((value) => {
          //Alertas i redireccionamiento
          if (value['resultado'] === "OK") {
            Swal.fire({
              icon: 'success',
              title: value['mensaje'],
              text: value['codigo']
            })
            this.router.navigate(['/perfil'], { queryParams: { id: this.id, student: this.student } });
          } else if (value['resultado'] === 'KO') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: value['mensaje']
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo ha ido mal!'
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

  btnAtras() {
    this.router.navigate(['/perfil'], { queryParams: { id: this.id, student: this.student } });
  }
}
