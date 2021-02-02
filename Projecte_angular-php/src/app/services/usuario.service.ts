import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = "http://localhost:8080/server/";
  constructor(private http: HttpClient) { }

  RegistrarUsuario(usuario) {
    return this.http.post("${this.url}altaUsuario.php", JSON.stringify(usuario));
  }

}
