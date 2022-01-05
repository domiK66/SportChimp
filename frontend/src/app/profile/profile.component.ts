import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import {Activity, ActivityService} from "../services/activity.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayedColumns = ['id', 'title', 'sport_genre', 'date', 'location', 'is_public', 'created_by_user', 'participants', 'view'];
  activities: Activity[] = [];
  myActivities: Activity[] = [];
  constructor(
    public userService: UserService,
    public activityService: ActivityService
  ) {
  }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe(activities => {
        this.activities = activities;
        this.filter(this.userService.user.username);
      }
    );
  }

  filter(username: string) {
    this.myActivities = this.activities.filter(a => {
        return !username || a.created_by_user.username.toLowerCase().includes(username.toLowerCase())
      }
    );
  }

}
