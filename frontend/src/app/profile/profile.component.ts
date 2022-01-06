import { Component, OnInit } from '@angular/core';
import {User, UserService} from "../services/user.service";
import {Activity, ActivityService} from "../services/activity.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayedColumns = ['id', 'title', 'sport_genre', 'date', 'location', 'is_public', 'created_by_user', 'view'];
  activities: Activity[] = [];
  myActivities: Activity[] = [];

  user: any | User = {};

  constructor(
    public userService: UserService,
    public activityService: ActivityService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getUser()
    this.activityService.getActivities().subscribe(activities => {
        this.activities = activities;
        this.filter(this.user.username);
      }
    );
  }

  filter(username: string) {
    this.myActivities = this.activities.filter(a => {
      if (a.created_by_user != null) {
          return !username || a.created_by_user.username.toLowerCase().includes(username.toLowerCase())
        }
      }
    );
  }

  getUser(){
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUsers().subscribe(users => this.user = users.find(u => u.username == username));
  }

}
