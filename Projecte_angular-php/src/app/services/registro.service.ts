import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const api = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  

}
