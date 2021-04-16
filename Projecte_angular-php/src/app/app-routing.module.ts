import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { VistaRankingComponent } from './components/vista-ranking/vista-ranking.component';
import { FormRankingComponent } from './components/form-ranking/form-ranking.component';
import { ModificarRankingComponent } from './components/modificar-ranking/modificar-ranking.component';
import { FormRankingAlumnoComponent } from './components/form-ranking-alumno/form-ranking-alumno.component';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo:"login"},
  {path: 'registro', component: RegistroComponent},
  { path: 'login' , component: LoginComponent },
  {path: 'perfil', component: PerfilComponent},
  {path: 'vista', component: VistaRankingComponent},
  {path: 'modificarRanking', component: ModificarRankingComponent},
  {path: 'formRanking', component: FormRankingComponent},
  {path: 'formRankingAlumno', component: FormRankingAlumnoComponent},
  {path: "**" , redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
