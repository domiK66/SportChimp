import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SportListComponent} from "./sport-list/sport-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/sport-list', pathMatch: 'full'},
  {path: 'sport-list', component: SportListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
