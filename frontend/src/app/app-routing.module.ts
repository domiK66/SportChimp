import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SportListComponent} from "./sport-list/sport-list.component";
import {SportFormComponent} from "./sport-form/sport-form.component";
import {ActivityListComponent} from "./activity-list/activity-list.component";
import {ActivityFormComponent} from "./activity-form/activity-form.component";

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'sport-list', component: SportListComponent },
  {path: 'sport-form', component: SportFormComponent },
  {path: 'sport-form/:id', component: SportFormComponent},
  {path: 'activity-list', component: ActivityListComponent },
  {path: 'activity-list:filter', component: ActivityListComponent},
  {path: 'activity-form', component: ActivityFormComponent },
  {path: 'activity-form/:id', component: ActivityFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
