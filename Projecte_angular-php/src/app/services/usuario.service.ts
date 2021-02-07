import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = "http://localhost/Proyecto_Nelson-Fonsi-Valenti/Projecte_angular-php/server/";

  constructor(private http: HttpClient) { }

  getUsuario(id: number) {
    return this.http.get(`${this.URL}seleccionarUsuarios.php?id=${id}`);
  }
}
