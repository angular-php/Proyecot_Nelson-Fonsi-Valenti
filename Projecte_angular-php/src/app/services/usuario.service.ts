import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = "http://localhost:5500/";
  constructor(private http: HttpClient) { }


  RegistrarAlumno(usuario) {
    let payload = JSON.stringify(usuario);
    return this.http
    .post(`${this.url}Proyecto_Nelson-Fonsi-Valenti/Projecte_angular-php/server/altaUsuario.php`, payload ,{responseType: 'text'});  }
}
