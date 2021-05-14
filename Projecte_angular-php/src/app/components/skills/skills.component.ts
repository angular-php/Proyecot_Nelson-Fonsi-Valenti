import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { alumnoRanking } from 'src/app/models/alumnosRanking.model';
import { alumnoSkills } from 'src/app/models/alumnosSkills.model';
import { Ejercicio } from 'src/app/models/ejercicio.model';
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
  alumnos: alumnoSkills[] = [];
  nombreRanking: string;
  posicion: number = 0;
  url: string = "";

  puntosRepartidos: number = 0;

  result: string;
  msg: string;

  //skills: string[] = ['Cooperacion', 'Emociones', 'Iniciativa', 'Pensamiento', 'Responsabilidad'];

  //idSkill: number = 0;

  puntos: number;

  constructor(private router: Router, private usuarioService: UsuarioService, private route: ActivatedRoute, private rankingService: RankingService) {
    this.idRanking = parseInt(this.route.snapshot.queryParamMap.get('id'));
    this.id = this.usuarioService.getMemoryID();
    this.student = this.usuarioService.getMemoryStudent();
  }

  ngOnInit(): void {
    this.getAlumnosRanking();
    this.getRanking();
    this.getPuntosSkills();
  }

  btnAtras() {
    this.router.navigate(['/perfil'], { queryParams: { id: this.id, student: this.student } });
  }

  btnGuardar() {
    for(let i=0;i<this.alumnos.length; i++) {
      console.log(this.alumnos[i]);
      const a = this.alumnos[i].cooperacion;
      const e = this.alumnos[i].emociones;
      const s = this.alumnos[i].iniciativa;
      const o = this.alumnos[i].pensamiento;
      const u = this.alumnos[i].responsabilidad;
      this.puntosRepartidos = this.puntosRepartidos + a + e + s + o + u;
      this.usuarioService.modificarSkills(this.alumnos[i], this.idRanking).subscribe(res => {
        console.log(this.puntosRepartidos);
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

    const puntosAlumno = {
      id: this.id,
      idRank: this.idRanking,
      puntosRepartidos : this.puntosRepartidos,
    }

    console.log(puntosAlumno);

    this.usuarioService.modificarPuntosAlumno(puntosAlumno).subscribe(resp => {
      this.getPuntosSkills();
    })

  }

  getRanking() {
    this.usuarioService.verRanking(this.idRanking).subscribe(res => {
      this.nombreRanking = res[0].nombreRanking;
      this.ranking = new Ranking(res[0].nombreRanking, res[0].codigo, res[0].idRanking, res[0].idProfe, null, this.alumnos);
    });
  }

  getPuntosSkills(){
    this.rankingService.getPuntosRepartir(this.id, this.idRanking).subscribe(res => {
      this.puntos = res[0].puntosSkills;
    })
  }

  /*cambiarSkill(value: any){
    console.log(value);
    this.idSkill = value;
    this.getAlumnosRanking(this.idSkill);
  }*/


  getAlumnosRanking(){
    this.alumnos = [];
    this.usuarioService.verAlumnosRankingSkills(this.idRanking).then(alum => {
      console.log(alum);
      for(let i=0;i<alum.length; i++) {
        this.posicion = i+1;
        this.alumnos.push(new alumnoSkills(alum[i]));
        this.alumnos[i].posicion = this.posicion;
        console.log(this.alumnos);
        this.alumnos[i].cooperacion = 0;
        this.alumnos[i].emociones = 0;
        this.alumnos[i].responsabilidad = 0;
        this.alumnos[i].pensamiento = 0;
        this.alumnos[i].iniciativa = 0;
      }
    })
  }


}
