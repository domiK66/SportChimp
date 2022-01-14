import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserService} from "../services/user.service";
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
        bio: new FormControl(null),
        birthday: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
        profile_image: new FormControl(null),
        password: new FormControl("",[passwordService.confirmPassword]),
        confirmPassword: new FormControl("", [passwordService.confirmPassword])
        //TODO: password change
      },
      {validators: passwordService.confirmPassword()}
    )


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
    this.userFormGroup.value.birthday = formatDate(new Date(this.userFormGroup.value.birthday), 'yyyy-MM-dd', 'en')
    formData.append('birthday', this.userFormGroup.value.birthday);

    this.http.put(`/api/users/${this.userService.user.id}/`, formData).subscribe(() => {
        this.snackbar.open('updated!', 'OK', {duration: 3000})
      }
    )
    this.router.navigate(['/profile/' + this.userName]);
  }
}

