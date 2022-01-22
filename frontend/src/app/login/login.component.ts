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
  public showPassword = false;

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

  login(): void {
    this.userService.login(this.loginFormGroup.value)
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
