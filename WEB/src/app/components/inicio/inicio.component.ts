import { Component, OnInit } from '@angular/core';
import {EquipoService,Equipo} from '../../services/equipo.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public ListarEquipo : Array<Equipo>;
  //zpublic id : any;

  constructor( private equipoService : EquipoService, private router:Router) {
      this.ListarEquipo = [] ;
   }

   ngOnInit(): void {
    this.listarEquipos();
  }

  listarEquipos(){
    this.equipoService.getEquipos().subscribe(
      res=>{
        console.log(res);
        this.ListarEquipo = <any>res;  
          
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  eliminar(id:any){
    this.equipoService.deleteEquipo(id).subscribe(
      res=>{
        console.log('Equipo eliminado');
        this.listarEquipos();
      },
      error=>{
        console.log(error);
        
      }
    );
  }


  modificar(id:any){
    this.router.navigate(['/edit/'+id]);
  }

  apuesta(id:any){
    this.router.navigate(['/apuesta/'+id]);
  }


}
