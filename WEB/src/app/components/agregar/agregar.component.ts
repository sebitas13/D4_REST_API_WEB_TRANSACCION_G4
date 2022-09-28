import { Component, OnInit } from '@angular/core';
import {EquipoService,Equipo} from '../../services/equipo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  equipo : Equipo = {
    _id: '',
    nombre : '',
    entrenador : '',
    logo : ''
  };

  constructor(private equipoService:EquipoService,private router:Router) { }

  ngOnInit(): void {
  }

  agregar(){
    delete this.equipo._id;

    this.equipoService.adEquipo(this.equipo).subscribe();
    this.router.navigate(['/inicio']);
  }

}

