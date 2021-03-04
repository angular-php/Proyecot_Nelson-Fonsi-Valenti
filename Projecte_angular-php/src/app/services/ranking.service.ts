import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  formRankingUsuario(usuario) {
    return this.http.post(`server/modificarProfesor.php`, JSON.stringify(usuario));
  }

  constructor(private http: HttpClient) { }
}
