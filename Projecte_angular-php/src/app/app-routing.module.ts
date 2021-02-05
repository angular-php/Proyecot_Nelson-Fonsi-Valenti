import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo:"perfil"},
  {path: 'perfil', component: PerfilComponent},
  {path: "**" , redirectTo:"perifl"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
