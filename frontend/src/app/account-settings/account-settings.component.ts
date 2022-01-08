import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  userFormGroup: FormGroup


  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {
    this.userFormGroup = new FormGroup({
        id: new FormControl(null),
        first_name: new FormControl(null),
        last_name: new FormControl(null)
      }
    )


  }


  ngOnInit(): void {
    if (this.userService.userId )
    this.userService.getUser(this.userService.userId).subscribe(user => {
      console.log(user)
      this.userFormGroup.patchValue(user);
    })
  }

  updateUser(){
    this.userService.updateUser(this.userFormGroup.value).subscribe( () =>
      this.snackbar.open('updated!', 'OK', {duration: 3000})
    )
  }

}

