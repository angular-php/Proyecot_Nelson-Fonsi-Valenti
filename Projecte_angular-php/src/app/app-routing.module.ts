import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { VistaRankingComponent } from './components/vista-ranking/vista-ranking.component';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo:"login"},
  {path: 'registro', component: RegistroComponent},
  { path: 'login' , component: LoginComponent },
  {path: 'perfil', component: PerfilComponent},
  {path: 'vista', component: VistaRankingComponent},
  {path: "**" , redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
