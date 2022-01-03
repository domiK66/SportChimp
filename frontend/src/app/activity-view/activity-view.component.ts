import { Component, OnInit } from '@angular/core';
import {Sport, SportService} from "../services/sport.service";
import {Activity, ActivityService} from "../services/activity.service";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import { FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements OnInit {

  activities: Activity[] = [];
  sports: Sport[] = [];

  filteredActivities: Activity[] = [];

  searchFilterFormControl = new FormControl('');
  sportFilterFormControl = new FormControl('');

  curPage = 1;
  pageSize = 6;
  pageSizeOptions = [3, 6, 12, 24, 32];

  pageSizeFormControl = new FormControl(this.pageSize);

  cols$: Observable<number> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(map((result) => {
    if (result.breakpoints[Breakpoints.XSmall]) {
      return 1;
    } else if (result.breakpoints[Breakpoints.Small]) {
      return 2;
    } else {
      return 3;
    }
  }), shareReplay());

  constructor(
    private sportService: SportService,
    private activityService: ActivityService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute
  ) { }

  numberOfPages(){
    return Math.ceil(this.filteredActivities.length / this.pageSize);
  }

  ngOnInit(): void {
    this.activityService.getActivities().subscribe(activities => {
        this.activities = activities;
        this.searchFilter(this.searchFilterFormControl.value);
        this.sportFilter(this.sportFilterFormControl.value);
      }
    )

    this.sportService.getSports().subscribe(sports => this.sports = sports);

    this.sportFilterFormControl.valueChanges.subscribe(value => this.sportFilter(value));
    this.route.paramMap.subscribe(params => this.sportFilterFormControl.setValue(params.get('filter')) );

    this.searchFilterFormControl.valueChanges.subscribe(value => this.searchFilter(value));
    this.route.paramMap.subscribe(params => this.searchFilterFormControl.setValue(params.get('filter')) );

    this.pageSizeFormControl.valueChanges.subscribe(value => this.pageSize = value);

  }

  searchFilter(filterValue: string) {
    this.filteredActivities = this.activities.filter(a => {
      return !filterValue || a.title.toLowerCase().includes(filterValue.toLowerCase())
    });
    this.curPage = 1;
    this.numberOfPages();
  }

  sportFilter(filterValue: []) {
    if (filterValue == null || filterValue.length == 0) {
      this.filteredActivities = this.activities
    } else {
      this.filteredActivities = this.activities.filter((el) => {
        return filterValue.some((f) => {
          return !filterValue || f === el.sport_genre.name;
        })
      });
    }


    this.curPage = 1;
    this.numberOfPages();
  }
}
