import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const api = environment.url;
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuario(id: number) {
    return this.http.get(`${api}server/seleccionarUsuario.php?id=${id}`);
  }

  login(usuario: String, passw: String, id: number, student: boolean) {
    return this.http.post(`${api}server/login.php`, { usuario, passw, id, student });
  }

  getAlumno(id: number) {
    return this.http.get(`${api}server/seleccionarAlumno.php?id=${id}`);
  }

  getProfesor(id: number) {
    return this.http.get(`${api}server/seleccionarProfesor.php?id=${id}`);
  }

  updateAlumno(user: Usuario) {
    return this.http.post(`${api}server/modificarAlumno.php`, JSON.stringify(user));
  }

  updateProfesor(user: Usuario) {
    return this.http.post(`${api}server/modificarProfesor.php`, JSON.stringify(user));
  }
}
