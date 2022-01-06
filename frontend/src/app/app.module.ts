import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SportListComponent } from './sport-list/sport-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { SportFormComponent } from './sport-form/sport-form.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import { IndexComponent } from './index/index.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ActivityViewComponent } from './activity-view/activity-view.component';
import { MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DateComponent} from "./date/date.component";
import {JwtModule} from "@auth0/angular-jwt";
import { LoginComponent } from './login/login.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";


export function tokenGetter() {
  return localStorage.getItem('access_token')
}

@NgModule({
  declarations: [
    AppComponent,
    SportListComponent,
    SportFormComponent,
    ActivityListComponent,
    ActivityFormComponent,
    IndexComponent,
    ActivityViewComponent,
    DateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ActivityDetailsComponent,

  ],
  imports: [
    JwtModule.forRoot({config: {tokenGetter: tokenGetter}}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,

    BrowserAnimationsModule,

    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatProgressBarModule,

    MatDatepickerModule,
    MatNativeDateModule,

    MatSnackBarModule,

    MatPaginatorModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
