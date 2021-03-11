import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { alumnoRanking } from 'src/app/models/alumnosRanking.model';
import { Ranking } from 'src/app/models/ranking.model';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private router: Router, private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.idRanking = parseInt(this.route.snapshot.queryParamMap.get('id'));
    console.log(this.idRanking);

    this.id = this.usuarioService.getMemoryID();
    this.student = this.usuarioService.getMemoryStudent();
  }

  ngOnInit(): void {
    this.getAlumnosRanking();
    this.getRanking();
  }


  btnAtras() {
    this.router.navigate(['/perfil'], { queryParams: { id: this.id, student: this.student } });
  }

  onSubmitPoints(ev) {
    const points = ev.target.points.value;
    console.log(points);
    //this.alumnos.map(alum => alum.puntos = points)
  }

  btnGuardar() {

    for(let i=0;i<this.alumnos.length; i++) {
      this.usuarioService.modificarPuntuacionesRanking(this.alumnos[i]).subscribe(puntuaciones => {
        console.log(puntuaciones)
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

  getAlumnosRanking(){

    this.usuarioService.verAlumnosRankingModificar(this.idRanking).then(alum => {

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
            alum[i].idAlumno,
            this.idRanking
        ));

      }
      console.log(this.alumnos);

    })

  }


}
