import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const api = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) { }

  getProfesor(id: number) {
    return this.http.get(`${api}server/seleccionarProfesor.php?id=${id}`);
  }

  updateProfesor(user: Usuario) {
    return this.http.post(`${api}server/modificarProfesor.php`, JSON.stringify(user));
  }

  registroProfesor(registro){
    return this.http.post(`${api}server/registroProfesor.php`, JSON.stringify(registro));
  }

  listarRankings(id: number): Promise<any> {
    return this.http.get(`${api}server/verRankingProfe.php?id=${id}`).toPromise();
  }

}
