import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SportListComponent} from "./sport-list/sport-list.component";
import {SportFormComponent} from "./sport-form/sport-form.component";

const routes: Routes = [
  {path: '', redirectTo: '/sport-list', pathMatch: 'full'},
  {path: 'sport-list', component: SportListComponent },
  {path: 'sport-form', component: SportFormComponent },
  {path: 'sport-form/:id', component: SportFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
