import { Injectable } from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";
import {group} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() { }

  confirmPassword(): ValidatorFn {
    return (group: AbstractControl) => {
      let pass = group.get('password')?.value;
      let confPass = group.get('confirmPassword')?.value;
      return pass !== confPass ? {'notSame': true} : null
    }
  }
}
