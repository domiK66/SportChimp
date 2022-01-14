import { Component } from '@angular/core';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(public userService: UserService){

  }

  menuOnClick(){
    const menu = document.getElementById('menu')
    menu?.classList.toggle('opened');
    // @ts-ignore
    menu?.setAttribute('aria-expanded', menu?.classList.contains('opened'));
  }
}
