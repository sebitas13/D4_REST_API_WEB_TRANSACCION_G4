import { Component, OnInit } from '@angular/core';
import {EquipoService,Equipo,Apuesta} from '../../services/equipo.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-apuesta',
  templateUrl: './apuesta.component.html',
  styleUrls: ['./apuesta.component.css']
})
export class ApuestaComponent implements OnInit {

  equipo : any| Equipo = {
    _id : '',
    nombre : '',
    entrenador: '',
    logo : '',

  };

  apuesta: any | Apuesta = {
    email : '',
    equipo : '',
    monto : 0,
  }

  constructor(private equipoService:EquipoService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const id_entrada =  <string>this.activatedRoute.snapshot.params['id'];
    console.log('ID de entrada: '+id_entrada);

    if(id_entrada){
      this.equipoService.getEquipo(id_entrada).subscribe(
        res=>{
          console.log(res);
          
          
          this.equipo = res; //res[0] cuando es mysql
          // console.log(this.equipo);
          // console.log(this.equipo.nombre);
          this.apuesta['equipo'] = this.equipo['nombre'];
          console.log(this.apuesta);
          
        },
        err=>{
          console.log(err);
          
        }
      );
    }
  }

  modificar(){

    this.equipoService.adApuesta(this.apuesta).subscribe(
      res=>{
        console.log(this.apuesta);
        
        console.log(res);
        
      },
      err=>{
        console.log(err);
        
      }
 
    );

    this.router.navigate(['/inicio']);
  }

}
