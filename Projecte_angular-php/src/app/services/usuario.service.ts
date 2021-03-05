import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const api = environment.url;
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  id: number;
  student: boolean;

  constructor(private http: HttpClient) { }

  getUsuario(id: number) {
    return this.http.get(`${api}server/seleccionarUsuario.php?id=${id}`);
  }

  registroUsuario(registro) {
    // console.log(JSON.stringify(registro));
    return this.http.post(`${api}server/registroAlumno.php`, JSON.stringify(registro));
  }

  login(usuario: String, passw: String) {
    return this.http.post(`${api}server/login.php`, { usuario, passw });
  }

  getAlumno(id: number) {
    console.log(id);
    return this.http.get(`${api}server/seleccionarAlumno.php?id=${id}`);
  }

  updateAlumno(user: Usuario) {
    return this.http.post(`${api}server/modificarAlumno.php`, JSON.stringify(user));
  }

  setMemoryUsuario(id: number, student: boolean) {
    this.id = id;
    this.student = student;
  }

  getMemoryId() {
    return this.id;
  }

  getMemoryStudent() {
    return this.student;
  }



}

