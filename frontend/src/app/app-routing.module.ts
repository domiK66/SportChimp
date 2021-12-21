import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SportListComponent} from "./sport-list/sport-list.component";
import {SportFormComponent} from "./sport-form/sport-form.component";
import {ActivityListComponent} from "./activity-list/activity-list.component";
import {ActivityFormComponent} from "./activity-form/activity-form.component";
import {IndexComponent} from "./index/index.component";
import {ActivityViewComponent} from "./activity-view/activity-view.component";

const routes: Routes = [
  // index page
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent },

  //admin
  {path: 'sport-list', component: SportListComponent },
  {path: 'activity-list', component: ActivityListComponent },
  {path: 'activity-list:filter', component: ActivityListComponent},

  //forms
  {path: 'sport-form', component: SportFormComponent },
  {path: 'sport-form/:id', component: SportFormComponent},
  {path: 'activity-form', component: ActivityFormComponent },
  {path: 'activity-form/:id', component: ActivityFormComponent },

  //register

  //activity views
  {path: 'activity-view', component: ActivityViewComponent },
  {path: 'activity-view:filter', component: ActivityListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
