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
    //document.getElementById("content")?.addEventListener("scroll", this.header());

    console.log(window.onscroll);

  }
  ngOnInit(){


  }
  menuOnClick(){
    const menu = document.getElementById('menu')
    menu?.classList.toggle('opened');
    // @ts-ignore
    menu?.setAttribute('aria-expanded', menu?.classList.contains('opened'));
  }
  header() {
    const header = document.getElementById('header')
    const sticky = header?.offsetTop;
    if (sticky != undefined && window.pageYOffset > sticky) {
      header?.classList.add("sticky");
    } else {
      header?.classList.remove("sticky");
    }
  }




}
