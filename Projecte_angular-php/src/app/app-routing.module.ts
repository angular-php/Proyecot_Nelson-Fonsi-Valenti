import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo:"registro"},
  {path: 'registro', component: RegistroComponent},
  {path: "**" , redirectTo:"registro"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
