import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SportListComponent} from "./sport-list/sport-list.component";
import {SportFormComponent} from "./sport-form/sport-form.component";
import {ActivityListComponent} from "./activity-list/activity-list.component";

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'sport-list', component: SportListComponent },
  {path: 'sport-form', component: SportFormComponent },
  {path: 'sport-form/:id', component: SportFormComponent},
  {path: 'activity-list', component: ActivityListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
