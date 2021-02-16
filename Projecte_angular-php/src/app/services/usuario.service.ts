import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = "http://localhost/Proyecto_Nelson-Fonsi-Valenti/Projecte_angular-php/server/";

  constructor(private http: HttpClient) { }

  getAlumno(id: number) {
    return this.http.get(`${this.URL}seleccionarAlumno.php?id=${id}`);
  }

  getProfesor(id: number) {
    return this.http.get(`${this.URL}seleccionarProfesor.php?id=${id}`);
  }

  updateAlumno(user: Usuario) {
    return this.http.post(`${this.URL}modificarAlumno.php`, JSON.stringify(user));
  }

  updateProfesor(user: Usuario) {
    return this.http.post(`${this.URL}modificarProfesor.php`, JSON.stringify(user));
  }
}
