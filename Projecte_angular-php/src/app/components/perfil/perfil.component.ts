import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Ranking } from 'src/app/models/ranking.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  alumno: Alumno;
  rankingArray: Ranking[] = [];

  constructor() {
    this.rankingArray.push(new Ranking('BONUS_DAW', 16));
    this.rankingArray.push(new Ranking('BONUS_DAM', 21));
    this.alumno = new Alumno('QuimMP','Quim','Martinez Pique', 'qmartinez@useit.es', '123456', this.rankingArray);
  }

  ngOnInit(): void {
  }

}
