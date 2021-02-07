import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  [x: string]: any;

  URL = "http://localhost:80/Proyecto_Nelson-Fonsi-Valenti/Projecte_angular-php/";

  constructor(private http: HttpClient) { }

  getUsuario(id: number) {
    return this.http.get(`${this.URL}server/seleccionarUsuario.php?id=${id}`);
  }
}
