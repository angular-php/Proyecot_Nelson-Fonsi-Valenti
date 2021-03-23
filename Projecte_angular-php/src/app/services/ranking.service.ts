import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ranking } from '../models/ranking.model';

const api = environment.url;

@Injectable({
  providedIn: 'root'
})

export class RankingService {

  constructor(private http: HttpClient) { }

  crearRanking(ranking: Ranking) {
    return this.http.post(`${api}server/anadirRanking.php`, JSON.stringify(ranking));
  }

  selectEjercicios(): Promise<any> {
    return this.http.get(`${api}server/seleccionarEjercicios.php`).toPromise();
  }
  eliminarRanking(id: number) {
    return this.http.get(`${api}server/eliminarRanking.php?id=${id}`);
  }

}
