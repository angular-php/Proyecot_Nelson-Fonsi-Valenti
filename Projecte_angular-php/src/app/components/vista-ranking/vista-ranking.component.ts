import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { alumnoRanking } from 'src/app/models/alumnosRanking.model';
import { Ranking } from 'src/app/models/ranking.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-vista-ranking',
  templateUrl: './vista-ranking.component.html',
  styleUrls: ['./vista-ranking.component.css']
})
export class VistaRankingComponent implements OnInit {

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

  getRanking() {
    this.usuarioService.verRanking(this.idRanking).subscribe(res => {
      this.nombreRanking = res[0].nombreRanking;
      this.ranking = new Ranking(res[0].nombreRanking, res[0].codigo, res[0].idRanking, res[0].idProfe, this.alumnos);
      console.log(this.ranking);
    });

  }

  getAlumnosRanking(){

    this.usuarioService.verAlumnosRanking(this.idRanking).then(alum => {

      for(let i=0;i<alum.length; i++) {

        this.posicion = i+1;
        if (this.posicion == 1 ) {
          alum.img = "assets/img/Insignias/radiant.png";
        }else if (this.posicion == 2) {
          alum.img = "assets/img/Insignias/inmortal.png";
        } else if (this.posicion == 3 || this.posicion == 4) {
          alum.img = "assets/img/Insignias/diamante.png";
        }else if (this.posicion == 5 || this.posicion == 6) {
          alum.img = "assets/img/Insignias/platino.png";
        }else if (this.posicion > 7 || this.posicion <= 10) {
          alum.img = "assets/img/Insignias/oro.png";
        }else if (this.posicion>10) {
          alum.img = "assets/img/Insignias/plata.png";
        }

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
            alum.img
        ));

      }

    })

  }

}
