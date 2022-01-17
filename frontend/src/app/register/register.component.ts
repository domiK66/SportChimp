import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {User, UserService} from "../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PasswordService} from "../services/password.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup;
  submitButtonText = 'Register';
  users: number = 0;
  public showPassword = true;


  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private passwordService: PasswordService
  ) {
    this.registerFormGroup = new FormGroup({
        id: new FormControl(null),
        username: new FormControl('', [Validators.required]),
        password: new FormControl(null,
          [
            Validators.required, passwordService.confirmPassword()
          ]),
        confirmPassword: new FormControl(null,
          [
            Validators.required, passwordService.confirmPassword()
          ]
        ),
        email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
        first_name: new FormControl(null),
        last_name: new FormControl(null)
      },
      {validators: passwordService.confirmPassword()}
    )
  }


  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users.length)
    this.togglePasswordVisibility()
  }

  createUser() {
    this.userService.createUser(this.registerFormGroup.value).subscribe(() => {
        this.snackbar.open('registered!', 'OK', {duration: 3000})
        let userData = {
          username: this.registerFormGroup.value.username,
          password: this.registerFormGroup.value.password,
        }
        this.userService.login(userData)
      }
    )
    this.router.navigate(['/index']);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Validators
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  get emailValidation() {
    return this.registerFormGroup.get('email');
  }

}
