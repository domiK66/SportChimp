import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {formatDate} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {PasswordService} from "../services/password.service";
import {Router} from "@angular/router";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  userFormGroup: FormGroup
  selectedFile: ImageSnippet | undefined;
  public showPassword = false; //todo password change
  userName: string | undefined;

  minDate: Date;
  maxDate: Date;

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private passwordService: PasswordService
  ) {
    this.userFormGroup = new FormGroup({
        id: new FormControl(this.userService.userId),
        first_name: new FormControl(null),
        last_name: new FormControl(null),
        bio: new FormControl(''),
        birthday: new FormControl(''),
        profile_image: new FormControl(null),
        password: new FormControl("",[passwordService.confirmPassword]),
        confirmPassword: new FormControl("", [passwordService.confirmPassword])
      },
      {validators: passwordService.confirmPassword()}
    )
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const currentYear = new Date().getFullYear();
    const currentMonth= new Date().getMonth()+1;
    const currentDay = +today.slice(8, 10);
    this.minDate = new Date(currentYear - 120, currentMonth, currentDay);
    this.maxDate = new Date(currentYear - 19, currentMonth, currentDay);
  }


  ngOnInit(): void {
    if (this.userService.userId)
      this.userService.getUser(this.userService.userId).subscribe(user => {
        this.userFormGroup.patchValue(user);
        this.userName = user.username
      })

  }

  ImageInputOnClick(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  updateUser() {
    console.log(this.selectedFile)
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('profile_image', this.selectedFile.file);
    } else {
      formData.append('profile_image', "");
    }

    if (this.userFormGroup.value.password) {
      formData.append('password', this.userFormGroup.value.password);
    } else {
      formData.append('password', "");
    }
    formData.append('first_name', this.userFormGroup.value.first_name);
    formData.append('last_name', this.userFormGroup.value.last_name);
    formData.append('bio', this.userFormGroup.value.bio);
    if(this.userFormGroup.value.birthday)
    this.userFormGroup.value.birthday = formatDate(new Date(this.userFormGroup.value.birthday), 'yyyy-MM-dd', 'en')
    formData.append('birthday', this.userFormGroup.value.birthday);

    this.http.put(`/api/users/${this.userService.user.id}/`, formData).subscribe(() => {
        this.snackbar.open('Account Settings updated!', 'OK', {duration: 3000})
        this.userService.getUserData()
      }
    )
    this.router.navigate(['/profile/' + this.userName]);
  }
}

