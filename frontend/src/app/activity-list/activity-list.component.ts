import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Activity, ActivityService} from "../services/activity.service";
import {Sport, SportService} from "../services/sport.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  displayedColumns = ['id', 'title', 'sport_genre', 'date', 'location', 'is_public', 'created_by_user', 'participants', 'edit', 'view'];
  activities: Activity[] = [];
  filteredActivities: Activity[] = [];
  filterFormControl = new FormControl('');

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private activityService: ActivityService
  ) {

  }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe(activities => {
        this.activities = activities;
        this.filter(this.filterFormControl.value);
      }
    );
    this.filterFormControl.valueChanges.subscribe(value => this.filter(value));
    this.route.paramMap.subscribe(params => { this.filterFormControl.setValue(params.get('filter')) });
  }

  filter(filterValue: string) {
    this.filteredActivities = this.activities.filter(a => {
        return !filterValue || a.title.toLowerCase().includes(filterValue.toLowerCase())
      }
    );
  }
}


