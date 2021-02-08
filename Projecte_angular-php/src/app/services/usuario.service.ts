import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  [x: string]: any;

  URL = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getUsuario(id: number) {
    return this.http.get(`${this.URL}server/seleccionarUsuario.php?id=${id}`);
  }
}
