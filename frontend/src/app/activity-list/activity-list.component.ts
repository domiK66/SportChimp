import { Component, OnInit } from '@angular/core';
import {Sport, SportService} from "../services/sport.service";
import {HttpClient} from "@angular/common/http";
import {Activity, ActivityService} from "../services/activity.service";

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  activities: Activity[] = []

  constructor(private http: HttpClient, private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((response: any[]) => {
      this.activities = response
    })
  }

}
