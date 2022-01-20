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
  displayedColumns = ['id','image', 'title', 'sport_genre', 'date', 'location', 'is_public','participants','created_by_user', 'view'];
  activities: Activity[] = [];
  myActivities: Activity[] = [];
  attendActivities: Activity[] = [];

  user: any | User = {};
  age: number | null = null;

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
        this.filter2(this.user.username);
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
  filter2(username: string) {
    this.attendActivities = this.activities.filter(a => {
      return a.participants.some(function(user) { return !username || user.username.toLowerCase() == username.toLowerCase()})
          && a.created_by_user.username.toLowerCase() != username.toLowerCase()
      }
    );
  }

  getUser(){
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUsers().subscribe(users => {
      this.user = users.find(u => u.username == username)
      if (this.user.birthday != null) {
        let timeDiff = Math.abs(Date.now() - new Date(this.user.birthday).getTime());
        this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      }
    });
  }
}
