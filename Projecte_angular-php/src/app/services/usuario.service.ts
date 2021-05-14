import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { alumnoRanking } from '../models/alumnosRanking.model';
import { alumnoSkills } from '../models/alumnosSkills.model';

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
    return this.http.post(`${api}server/registroAlumno.php`, JSON.stringify(registro));
  }

  login(usuario: String, passw: String) {
    return this.http.post(`${api}server/login.php`, { usuario, passw });
  }

  getAlumno(id: number) {
    return this.http.get(`${api}server/seleccionarAlumno.php?id=${id}`);
  }

  updateAlumno(user: Usuario) {
    return this.http.post(`${api}server/modificarAlumno.php`, JSON.stringify(user));
  }

  setMemoryUsuario(id: number, student: boolean) {
    this.id = id;
    this.student = student;
  }

  getMemoryID() {
    return this.id;
  }

  getMemoryStudent() {
    return this.student;
  }

  verRanking(id: number){
    return this.http.get(`${api}server/verRanking.php?id=${id}`);
  }

  listarRankingsAlumno(id: number): Promise<any> {
    return this.http.get(`${api}server/verRankingAlumno.php?id=${id}`).toPromise();
  }

  verAlumnosRanking(id: number): Promise<any> {
    return this.http.get(`${api}server/verDetalleRanking.php?id=${id}`).toPromise();
  }

  verAlumnosRankingModificar(idRank: number, idEj: number): Promise<any> {
    return this.http.get(`${api}server/verRankingModificar.php?idRank=${idRank}&idEj=${idEj}`).toPromise();
  }

  verAlumnosRankingSkills(idRank: number): Promise<any> {
    return this.http.get(`${api}server/verRankingSkills.php?idRank=${idRank}`).toPromise();
  }

  modificarPuntuacionesRanking(alumnoRanking: alumnoRanking) {
    return this.http.post(`${api}server/modificarPuntuacionesRanking.php`, JSON.stringify(alumnoRanking));
  }

  modificarSkills(alumnoSkills: alumnoSkills, idRank: number){
    return this.http.post(`${api}server/modificarSkillsRanking.php?id=${idRank}`, JSON.stringify(alumnoSkills));
  }

  modificarPuntosAlumno(puntosAlumno: any){
    return this.http.post(`${api}server/modificarPuntosSkill.php`, JSON.stringify(puntosAlumno));
  }

}

