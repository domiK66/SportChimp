import { Component, OnInit } from '@angular/core';
import {Sport, SportService} from "../services/sport.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from 'rxjs/operators';
import {Activity, ActivityService} from "../services/activity.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 8
      },
      940: {
        items: 8
      }
    },
    nav: true
  }


  sports: Sport[] = [];
  activities: Activity[] = [];

  cols$: Observable<number> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          return 2;
        } else if (result.breakpoints[Breakpoints.Small]) {
          return 4;
        } else {
          return 10;
        }
      }),
      shareReplay()
    );

  constructor(private sportService: SportService,
              private activityService: ActivityService,
              private breakpointObserver: BreakpointObserver
  )
  {

  }

  ngOnInit(): void {
    this.sportService.getSports().subscribe( sports => this.sports = sports)
    const sortByDate = function (a: { date: any; }, b: { date: any; }) {
      // @ts-ignore
      return new Date((b.date)) - new Date(a.date);

    };
    this.activityService.getActivities().subscribe( activities => this.activities = activities.sort(sortByDate))
  }

}
