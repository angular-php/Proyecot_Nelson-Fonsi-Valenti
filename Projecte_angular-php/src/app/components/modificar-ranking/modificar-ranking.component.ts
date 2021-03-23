import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { alumnoRanking } from 'src/app/models/alumnosRanking.model';
import { Ejercicio } from 'src/app/models/ejercicio.model';
import { Ranking } from 'src/app/models/ranking.model';
import { RankingService } from 'src/app/services/ranking.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-ranking',
  templateUrl: './modificar-ranking.component.html',
  styleUrls: ['./modificar-ranking.component.css']
})
export class ModificarRankingComponent implements OnInit {

  idRanking: number;
  id: number;
  student: boolean;
  ranking: Ranking;
  alumnos: alumnoRanking[] = [];
  nombreRanking: string;
  posicion: number = 0;
  url: string = "";

  result: string;
  msg: string;

  ejercicios: Ejercicio[] = [];

  idEj: number = 1;

  constructor(private router: Router, private usuarioService: UsuarioService, private route: ActivatedRoute, private rankingService: RankingService) {
    this.idRanking = parseInt(this.route.snapshot.queryParamMap.get('id'));
    console.log(this.idRanking);
    this.id = this.usuarioService.getMemoryID();
    this.student = this.usuarioService.getMemoryStudent();
  }

  ngOnInit(): void {
    this.getAlumnosRanking();
    this.getRanking();
    this.dropdownEjercicios();
  }

  btnAtras() {
    this.router.navigate(['/perfil'], { queryParams: { id: this.id, student: this.student } });
  }


  btnGuardar() {

    for(let i=0;i<this.alumnos.length; i++) {
      this.usuarioService.modificarPuntuacionesRanking(this.alumnos[i]).subscribe(res => {
        console.log(res);
        const result = res['resultado'];
        const msg = res['mensaje'];
        if(i==0) {
          if(result === 'OK'){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Puntuaciones modificadas!',
              text: msg,
              showConfirmButton: false,
              timer: 1500,
            });
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error al modificar puntuaciones!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
    }

  }

  getRanking() {
    this.usuarioService.verRanking(this.idRanking).subscribe(res => {
      this.nombreRanking = res[0].nombreRanking;
      this.ranking = new Ranking(res[0].nombreRanking, res[0].codigo, res[0].idRanking, res[0].idProfe, this.alumnos);
      console.log(this.ranking);
    });
  }

  dropdownEjercicios(){
    this.rankingService.selectEjercicios().then(values => {
      for(const value of values){
        this.ejercicios.push(value);
      }
    });
    console.log(this.ejercicios);
  }

  cambiarEjercicio(value: any){
    this.idEj = value;
    this.getAlumnosRanking();
  }


  getAlumnosRanking(){
    this.alumnos = [];
    this.usuarioService.verAlumnosRankingModificar(this.idRanking, this.idEj).then(alum => {

      console.log(alum);


      for(let i=0;i<alum.length; i++) {

        this.posicion = i+1;
        this.alumnos.push(
          new alumnoRanking(
            alum[i].nickname,
            alum[i].password,
            alum[i].email,
            alum[i].firstname,
            alum[i].lastname,
            alum[i].nombreEquipo,
            alum[i].puntos,
            alum.posicion = this.posicion,
            alum.img,
            alum[i].idusu,
            this.idRanking,
            this.idEj
        ));

      }
      console.log(this.alumnos);

    })

  }




}
