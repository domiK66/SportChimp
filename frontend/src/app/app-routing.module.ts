import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth.guard";

import {SportListComponent} from "./sport-list/sport-list.component";
import {SportFormComponent} from "./sport-form/sport-form.component";
import {ActivityListComponent} from "./activity-list/activity-list.component";
import {ActivityFormComponent} from "./activity-form/activity-form.component";
import {IndexComponent} from "./index/index.component";
import {ActivityViewComponent} from "./activity-view/activity-view.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {AdminGuard} from "./admin.guard";
import {ActivityDetailsComponent} from "./activity-details/activity-details.component";
import {AccountSettingsComponent} from "./account-settings/account-settings.component";
import {FriendsComponent} from "./friends/friends.component";

const routes: Routes = [
  // index page
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent },

  //admin
  {path: 'sport-list', component: SportListComponent, canActivate: [AdminGuard]},
  {path: 'activity-list', component: ActivityListComponent, canActivate: [AdminGuard] },
  {path: 'activity-list:filter', component: ActivityListComponent, canActivate: [AdminGuard]},
  {path: 'sport-form', component: SportFormComponent, canActivate: [AdminGuard] },
  {path: 'sport-form/:id', component: SportFormComponent, canActivate: [AdminGuard]},

  //forms
  {path: 'activity-form', component: ActivityFormComponent, canActivate: [AuthGuard] },
  {path: 'activity-form/:id', component: ActivityFormComponent, canActivate: [AuthGuard] },

  //profile
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/:username', component: ProfileComponent},

  //account-settings
  {path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGuard]},

  //activity views
  {path: 'activity-view', component: ActivityViewComponent},
  {path: 'activity-view/:filter', component: ActivityViewComponent},

  // activity-details
  {path: 'activity-details/:id', component: ActivityDetailsComponent, canActivate: [AuthGuard]},

  // friends
  {path: 'friends', component: FriendsComponent},

  //login
  {path: 'login', component: LoginComponent},

  //register
  {path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
