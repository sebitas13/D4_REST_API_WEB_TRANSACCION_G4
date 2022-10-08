import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoService } from 'src/app/services/equipo.service';
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public usuario : any = {};
  public token:any;


  constructor(
    private _equipoService : EquipoService,
    private _router : Router
  ) { 
    this.token  = localStorage.getItem('token');
    if(this.token){
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  login(loginForm:any){
    if(loginForm.valid){
      console.log(this.user);
      let datau = {
        username : this.user.username,
        password: this.user.password
      }

      

      this._equipoService.login_cliente(datau).subscribe(
        res=>{
          if(res.data == undefined){
            console.log('error undefinido');
            

          //   iziToast.show({
          //     title:'ERROR',
          //     titleColor:'red',
          //     class:'text-danger',
          //     position:'topRight',
          //     message : res.message
          // });
          }else{
            // iziToast.show({
            //   title:'SUCCESS',
            //   titleColor:'#1DC74C',
            //   class:'text-success',
            //   position:'topRight',
            //   message : 'Login exitoso :)'
            // });
            console.log('bien a inicio');
            
              this.usuario = res.data;
              localStorage.setItem('token',res.token);
              localStorage.setItem('_id',res.data._id);

              this._router.navigate(['/']);
             
          }
          //console.log(response);
         
        },
        error=> {
          console.log('error');
          
          console.log(error);
          
        }
      );
      
    }else{
    //   iziToast.show({
    //     title:'ERROR',
    //     titleColor:'red',
    //     class:'text-danger',
    //     position:'topRight',
    //     message : 'Datos no validos del formulario'
    // });
    }
  }

}
