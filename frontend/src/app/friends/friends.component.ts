import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../services/user.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  searchFilterFormControl = new FormControl('');
  users: User[] = [];
  filteredUsers: User[] = [];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.searchFilter(this.searchFilterFormControl.value);
    } )

    this.searchFilterFormControl.valueChanges.subscribe(value => this.searchFilter(value));
    this.route.paramMap.subscribe(params => this.searchFilterFormControl.setValue(params.get('')) );


  }
  searchFilter(filterValue: string) {
    this.filteredUsers = this.users.filter(u => {
      return !filterValue || u.username.toLowerCase().includes(filterValue.toLowerCase())
    });

  }

}
