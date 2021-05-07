import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FormRankingComponent } from './components/form-ranking/form-ranking.component';
import { VistaRankingComponent } from './components/vista-ranking/vista-ranking.component';
import { ModificarRankingComponent } from './components/modificar-ranking/modificar-ranking.component';
import { FormRankingAlumnoComponent } from './components/form-ranking-alumno/form-ranking-alumno.component';
import { SkillsComponent } from './components/skills/skills.component';
import { HistorialComponent } from './components/historial/historial.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    VistaRankingComponent,
    FormRankingComponent,
    ModificarRankingComponent,
    FormRankingAlumnoComponent,
    HistorialComponent,
    SkillsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
