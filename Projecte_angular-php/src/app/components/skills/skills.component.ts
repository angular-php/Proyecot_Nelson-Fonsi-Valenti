import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { alumnoRanking } from 'src/app/models/alumnosRanking.model';
import { Ranking } from 'src/app/models/ranking.model';
import { RankingService } from 'src/app/services/ranking.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

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
    this.id = this.usuarioService.getMemoryID();
    this.student = this.usuarioService.getMemoryStudent();
  }

  ngOnInit(): void {
    this.getAlumnosRanking(this.idEj);
    this.getRanking();
    this.dropdownEjercicios();
  }

  btnGuardar() {
    for(let i=0;i<this.alumnos.length; i++) {
      this.usuarioService.modificarPuntuacionesRanking(this.alumnos[i]).subscribe(res => {
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
    });
  }

  dropdownEjercicios(){
    this.rankingService.selectEjercicios().then(values => {
      for(const value of values){
        this.ejercicios.push(value);
      }
    });
  }

  cambiarEjercicio(value: any){
    console.log(value);
    this.idEj = value;
    this.getAlumnosRanking(this.idEj);
  }


  getAlumnosRanking(idEj: number){
    this.alumnos = [];
    this.usuarioService.verAlumnosRankingModificar(this.idRanking, idEj).then(alum => {
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
            alum[i].actual,
            this.idRanking,
            this.idEj
        ));
      }
    })
  }


}
