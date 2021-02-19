import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo:"login"},
  {path: 'registro', component: RegistroComponent},
  {path: 'perfil', component: PerfilComponent},
  { path: 'login' , component: LoginComponent },
  {path: "**" , redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
