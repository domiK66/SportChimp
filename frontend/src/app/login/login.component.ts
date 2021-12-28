import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public userService: UserService
  ) {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  /*
 login(): void {
   this.http.post('/api/api-token-auth/', this.loginFormGroup.value)
     .subscribe((res: any) => {
       localStorage.setItem('access_token', res.token);
       this.router.navigate(['movie-list']);
       this.snackbar.open('Successfully logged in', 'OK',{duration:3000})
     }, () => {
       this.snackbar.open('Invalid credentials', 'OK',{duration:3000})
     });
 }
 */
  login(): void {
    this.userService.login(this.loginFormGroup.value)
  }

}
