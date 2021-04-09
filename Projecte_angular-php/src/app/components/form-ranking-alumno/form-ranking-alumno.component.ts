import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ranking } from 'src/app/models/ranking.model';
import { Usuario } from 'src/app/models/usuario.model';
import { RankingService } from 'src/app/services/ranking.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ranking-alumno',
  templateUrl: './form-ranking-alumno.component.html',
  styleUrls: ['./form-ranking-alumno.component.css']
})
export class FormRankingAlumnoComponent implements OnInit {

  formRankingAlumno: FormGroup;
  usuario: Usuario;
  ranking: Ranking;
  id: number;
  student: boolean;
  codigo: string;
  idProfe: number;

  // Mensajes de validator
  validation_messages = {
    cRanking: [
      { type: 'required', message: 'El campo Codigo Ranking es obligatorio' }
    ]
  };

  constructor(private readonly fb: FormBuilder, private frService: RankingService, private router: Router, private usuarioService: UsuarioService) {
    this.formRankingAlumno = this.fb.group({
      cRanking: new FormControl('', [Validators.required]),
    });

    this.id = this.usuarioService.getMemoryID();
    this.student = this.usuarioService.getMemoryStudent();
  }

  ngOnInit(): void {
  }

  btnInscribirse(){
    console.log('Funcione');
    console.log(this.formRankingAlumno.controls.cRanking.value);

    if (this.formRankingAlumno.valid) {
      try {
        this.frService.comprobarCodigo(this.formRankingAlumno.controls.cRanking.value).subscribe((value) =>{
          if (value['resultado'] === "OK") {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: value['mensaje'],
              showConfirmButton: false,
              timer: 1500,
            })
            this.insertAlum();
          }else if (value['resultado'] === "KO") {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Oops...',
              text: value['mensaje'],
              showConfirmButton: false,
              timer: 1500,
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
    }
  }

  insertAlum(){
    console.log('Ara el insert');

  }

  btnAtras() {
    this.router.navigate(['/perfil'], { queryParams: { id: this.id, student: this.student } });
  }

}
