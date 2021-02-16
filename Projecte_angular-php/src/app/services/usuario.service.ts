import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const api = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getUsuario(id: number) {
    return this.http.get(`${api}server/seleccionarUsuario.php?id=${id}`);
  }

  registroUsuario(registro) {
    // console.log(JSON.stringify(registro));
    return this.http.post(`${api}server/registroAlumno.php`, JSON.stringify(registro));
  }

  registroProfesor(registro){
    return this.http.post(`${api}server/registroProfesor.php`, JSON.stringify(registro));
  }

}
