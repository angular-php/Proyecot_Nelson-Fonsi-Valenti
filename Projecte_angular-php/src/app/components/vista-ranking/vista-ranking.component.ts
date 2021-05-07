import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { alumnoRanking } from 'src/app/models/alumnosRanking.model';
import { Ranking } from 'src/app/models/ranking.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-ranking',
  templateUrl: './vista-ranking.component.html',
  styleUrls: ['./vista-ranking.component.css']
})
export class VistaRankingComponent implements OnInit {

  idRanking: number;
  id: number;
  idComparar: number;
  student: boolean;
  ranking: Ranking;
  alumnos: alumnoRanking[] = [];
  nombreRanking: string;
  posicion: number = 0;
  url: string = "";
  alumActualColor: string = "";
  lvlCooperacion: String;


  constructor(private router: Router, private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.idRanking = parseInt(this.route.snapshot.queryParamMap.get('id'));
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
    });
  }

  getAlumnosRanking(){
    this.usuarioService.verAlumnosRanking(this.idRanking).then(alum => {
      for(let i=0;i<alum.length; i++) {

        /* Set Insignia */
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

        /* Set IMG Cooperacion*/
        if (alum[i].cooperacion >= 1000 ) {
          alum[i].lvlCooperacion = 1;
          alum[i].cooperacion = "assets/Skills/Cooperacion/Cooperacion1.png";
        }else if (alum[i].cooperacion >= 2000) {
          alum[i].lvlCooperacion = 2;
          alum[i].cooperacion = "assets/Skills/Cooperacion/Cooperacion2.png";
        } else if (alum[i].cooperacion >= 4000) {
          alum[i].lvlCooperacion = 3;
          alum[i].cooperacion = "assets/Skills/Cooperacion/Cooperacion3.png";
        }else if (alum[i].cooperacion >= 7000) {
          alum[i].lvlCooperacion = 4;
          alum[i].cooperacion = "assets/Skills/Cooperacion/Cooperacion4.png";
        }else if (alum[i].cooperacion >= 10000) {
          alum[i].lvlCooperacion = 5;
          alum[i].cooperacion = "assets/Skills/Cooperacion/Cooperacion5.png";
        }else {
          alum[i].lvlCooperacion < 1000;
          alum[i].cooperacion = "assets/Skills/Cooperacion/Cooperacion0.png";
        }

        /* Set IMG Emociones*/
        if (alum[i].emociones >= 1000 ) {
          alum[i].lvlEmociones = 1;
          alum[i].emociones = "assets/Skills/Emociones/Emociones1.png";
        }else if (alum[i].emociones >= 2000) {
          alum[i].lvlEmociones = 2;
          alum[i].emociones = "assets/Skills/Emociones/Emociones2.png";
        } else if (alum[i].emociones >= 4000) {
          alum[i].lvlEmociones = 3;
          alum[i].emociones = "assets/Skills/Emociones/Emociones3.png";
        }else if (alum[i].emociones >= 7000) {
          alum[i].lvlEmociones = 4;
          alum[i].emociones = "assets/Skills/Emociones/Emociones4.png";
        }else if (alum[i].emociones >= 10000) {
          alum[i].lvlEmociones = 5;
          alum[i].emociones = "assets/Skills/Emociones/Emociones5.png";
        }else {
          alum[i].lvlEmociones < 1000;
          alum[i].emociones = "assets/Skills/Emociones/Emociones0.png";
        }

        /* Set IMG Iniciativa*/
        if (alum[i].iniciativa >= 1000 ) {
          alum[i].lvlIniciativa = 1;
          alum[i].iniciativa = "assets/Skills/Iniciativa/Iniciativa1.png";
        }else if (alum[i].iniciativa >= 2000) {
          alum[i].lvlIniciativa = 2;
          alum[i].iniciativa = "assets/Skills/Iniciativa/Iniciativa2.png";
        } else if (alum[i].iniciativa >= 4000) {
          alum[i].lvlIniciativa = 3;
          alum[i].iniciativa = "assets/Skills/Iniciativa/Iniciativa3.png";
        }else if (alum[i].iniciativa >= 7000) {
          alum[i].lvlIniciativa = 4;
          alum[i].iniciativa = "assets/Skills/Iniciativa/Iniciativa4.png";
        }else if (alum[i].iniciativa >= 10000) {
          alum[i].lvlIniciativa = 5;
          alum[i].iniciativa = "assets/Skills/Iniciativa/Iniciativa5.png";
        }else {
          alum[i].lvlIniciativa < 1000;
          alum[i].iniciativa = "assets/Skills/Iniciativa/Iniciativa0.png";
        }

        /* Set IMG Pensamiento*/
        if (alum[i].pensamiento >= 1000 ) {
          alum[i].lvlPensamiento = 1;
          alum[i].pensamiento = "assets/Skills/Pensamiento/Pensamiento1.png";
        }else if (alum[i].pensamiento >= 2000) {
          alum[i].lvlPensamiento = 2;
          alum[i].pensamiento = "assets/Skills/Pensamiento/Pensamiento2.png";
        } else if (alum[i].pensamiento >= 4000) {
          alum[i].lvlPensamiento = 3;
          alum[i].pensamiento = "assets/Skills/Pensamiento/Pensamiento3.png";
        }else if (alum[i].pensamiento >= 7000) {
          alum[i].lvlPensamiento = 4;
          alum[i].pensamiento = "assets/Skills/Pensamiento/Pensamiento4.png";
        }else if (alum[i].pensamiento >= 10000) {
          alum[i].lvlPensamiento = 5;
          alum[i].pensamiento = "assets/Skills/Pensamiento/Pensamiento5.png";
        }else {
          alum[i].lvlPensamiento < 1000;
          alum[i].pensamiento = "assets/Skills/Pensamiento/Pensamiento0.png";
        }

        /* Set IMG Responsabilidad*/
        if (alum[i].responsabilidad >= 1000 ) {
          alum[i].lvlResponsabilidad = 1;
          alum[i].responsabilidad = "assets/Skills/Responsabilidad/Responsabilidad1.png";
        }else if (alum[i].responsabilidad >= 2000) {
          alum[i].lvlResponsabilidad = 2;
          alum[i].responsabilidad = "assets/Skills/Responsabilidad/Responsabilidad2.png";
        } else if (alum[i].responsabilidad >= 4000) {
          alum[i].lvlResponsabilidad = 3;
          alum[i].responsabilidad = "assets/Skills/Responsabilidad/Responsabilidad3.png";
        }else if (alum[i].responsabilidad >= 7000) {
          alum[i].lvlResponsabilidad = 4;
          alum[i].responsabilidad = "assets/Skills/Responsabilidad/Responsabilidad4.png";
        }else if (alum[i].responsabilidad >= 10000) {
          alum[i].lvlResponsabilidad = 5;
          alum[i].responsabilidad = "assets/Skills/Responsabilidad/Responsabilidad5.png";
        }else {
          alum[i].lvlResponsabilidad < 1000;
          alum[i].responsabilidad = "assets/Skills/Responsabilidad/Responsabilidad0.png";
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
            alum.img,
            alum[i].idusu,
            alum[i].actual = false,
            alum[i].cooperacion,
            alum[i].emociones,
            alum[i].iniciativa,
            alum[i].pensamiento,
            alum[i].responsabilidad,
            alum[i].lvlCooperacion,
            alum[i].lvlEmociones,
            alum[i].lvlIniciativa,
            alum[i].lvlPensamiento,
            alum[i].lvlResponsabilidad
        ));
        if(this.id == this.alumnos[i].idAlum) {
          this.alumnos[i].actual = true;
        }

      }
    });
  }

  // Mostrar info Skills
  infoCooperacionBtn() {
    Swal.fire({
      title: 'Cooperacion',
      html: '<p>Habilidad de interaccionar de forma constructiva y a partir de la escucha, con el objetivo de conseguir una meta común y consensuada.<ul> <li>Trabaja de forma constante.</li> <li>Se mantiene conectado/a a la actividad  del grupo. </li> <li>Hace comentarios relacionados con la tarea  a realizar.</li> <li>Realiza las tareas de forma eficiente.</li> <li>Realiza las tareas con cuidado.</li> <li>Persevera ante las dificultades.</li> <li>Respeta las normas. </ul> </p>' + '</pre>',
    })
  }

  infoEmocionesBtn() {
    Swal.fire({
      title: 'Emociones',
      html: '<p>Habilidad de percibir y aceptar las emociones propias y las de los demás, con el objetivo de desarrollar  estrategias de gestión personal eficaces</p> <ul> <li>Escucha a los demás </li> <li>Incorpora lo que dicen los demás</li> <li>Fomenta la participación de los miembros del grupo</li> <li>Participa en la toma de decisiones consensuadas</li> <li>Ayuda a resolver conflictos</li> <li>Reconoce sus responsabilidades y las de los demás</li> <li>Ayuda a los demás de forma desinteresada</li> </ul>',
    })
  }

  infoIniciativaBtn() {
    Swal.fire({
      title: 'Iniciativa',
      html: '<p>Habilidad de emprender acciones e implicarse en las actividades,  utilizando los recursos propios, y de saber  cuándo pedir ayuda.</p> <ul> <li>Escucha a los demás </li> <li>Incorpora lo que dicen los demás</li> <li>Fomenta la participación de los miembros del grupo</li> <li>Participa en la toma de decisiones consensuadas</li> <li>Ayuda a resolver conflictos</li> <li>Reconoce sus responsabilidades y las de los demás</li> <li>Ayuda a los demás de forma desinteresada</li> </ul>',
    })
  }

  infoPensamientoBtn() {
    Swal.fire({
      title: 'Pensamiento',
      html: '<p>Habilidad de relacionar, cuestionar, generar y exponer ideas.</p> <ul> <li>Escucha a los demás </li> <li>Incorpora lo que dicen los demás</li> <li>Fomenta la participación de los miembros del grupo</li> <li>Participa en la toma de decisiones consensuadas</li> <li>Ayuda a resolver conflictos</li> <li>Reconoce sus responsabilidades y las de los demás</li> <li>Ayuda a los demás de forma desinteresada</li> </ul>',
    })
  }

  infoResponsabilidadBtn() {
    Swal.fire({
      title: 'Responsabilidad',
      html: '<p>Habilidad de lograr con calidad las tareas asignadas, en  el lugar y el momento adecuados, con el objetivo de responder  a nuestros compromisos y respetando las normas acordadas.</p> <ul> <li>Escucha a los demás </li> <li>Incorpora lo que dicen los demás</li> <li>Fomenta la participación de los miembros del grupo</li> <li>Participa en la toma de decisiones consensuadas</li> <li>Ayuda a resolver conflictos</li> <li>Reconoce sus responsabilidades y las de los demás</li> <li>Ayuda a los demás de forma desinteresada</li> </ul>',
    })
  }
}
