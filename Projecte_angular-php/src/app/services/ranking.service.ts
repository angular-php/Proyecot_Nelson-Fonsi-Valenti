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

  eliminarRanking(ranking: Ranking) {
    console.log(ranking.idRank);
    const id = ranking.idRank;
    return this.http.post(`${api}server/login.php`, { id });
  }

}
