import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {formatDate} from "@angular/common";
import {HttpClient} from "@angular/common/http";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  userFormGroup: FormGroup
  selectedFile: ImageSnippet | undefined;


  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private http: HttpClient
  ) {
    this.userFormGroup = new FormGroup({
        id: new FormControl(null),
        first_name: new FormControl(null),
        last_name: new FormControl(null),
        bio: new FormControl(null),
        birthday: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
        profile_image: new FormControl(null)
      }
    )


  }


  ngOnInit(): void {
    if (this.userService.userId )
    this.userService.getUser(this.userService.userId).subscribe(user => {
      this.userFormGroup.patchValue(user);
    })
  }

  updateUser(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.userFormGroup.value.profile_image = new FormControl(this.selectedFile.file);
      this.userFormGroup.value.birthday = formatDate(new Date(this.userFormGroup.value.birthday), 'yyyy-MM-dd', 'en')
      console.log(this.userFormGroup.value.birthday)


      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.uploadImage(this.selectedFile.file).subscribe(
        (res:any) => {

        },
        (err:any) => {

        })

      // this.userService.updateUser(this.userFormGroup.value).subscribe( () =>
      //   this.snackbar.open('updated!', 'OK', {duration: 3000})
      // )
    });

    reader.readAsDataURL(file);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('profile_image', image);
    formData.append('first_name', this.userFormGroup.value.first_name);
    formData.append('last_name', this.userFormGroup.value.last_name);
    formData.append('bio', this.userFormGroup.value.bio);
    formData.append('birthday', this.userFormGroup.value.birthday);
    console.log(image)

    return this.http.put(`/api/users/${this.userService.user.id}/`, formData);
  }

}

