  import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ModificarComponent } from './components/modificar/modificar.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ApuestaComponent } from './components/apuesta/apuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarComponent,
    InicioComponent,
    ModificarComponent,
    ApuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
