import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  url = '/api/equipo';
  constructor(private http : HttpClient) { }

  //Listar todos los equipos

  getEquipos(){
    return this.http.get(this.url);
   }

   //Obtener un equipo

   getEquipo(id:string){
    return this.http.get<Equipo[]>(this.url+'/'+id);
   }

   //Agregar un equipo

   adEquipo(equipo:Equipo){
    return this.http.post(this.url,equipo);
   }

   //Eliminar un equipo

   deleteEquipo(id:string){
      return this.http.delete(this.url+'/'+id);
   }

   //Modificar un equipo

   editEquipo(id:string,equipo:Equipo){
    return this.http.put(this.url+'/'+id,equipo);
   }

   adApuesta(apuesta:Apuesta){
    return this.http.post(this.url+ '/apuesta',apuesta);
   }

   login_cliente(data:any): Observable<any>{
    return this.http.post('/api/login',data);
   }

}

export interface Equipo{
  _id? :string,
  nombre? : string,
  entrenador? : string,
  logo? : string,

}

export interface Apuesta{
  email? :string,
  equipo? : string,
  monto? : Number,

}


