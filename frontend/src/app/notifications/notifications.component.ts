import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";

interface Notification {
  to_user: number;
  from_user: number;

}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  unreadNotifications: [] = [];

  constructor(
    private http: HttpClient,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  onClick(not_id: number) {
    this.userService.readUserNotification(not_id).subscribe(() => {
      console.log("success");
    });
  }

}
