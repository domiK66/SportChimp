import { Component, OnInit } from '@angular/core';
import {Activity, ActivityService} from "../services/activity.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Sport, SportService} from "../services/sport.service";
import {User, UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {

  editable = false; // Todo: datum verstecken
  user: User | any = {}
  activity: Activity | any = {}
  sport : Sport | any = {}
  attendButton: string = ''
  isNotTheOwner: boolean = true

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,

    private activityService: ActivityService,
    public sportService: SportService,
    public userService: UserService

  ) {
  }
  ngOnInit(): void {
    this.getActivity()
  }
  getActivity() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.getActivity(id).subscribe(activity => {
        this.activity = activity;
        this.sportService.getSport(`${this.activity.sport_genre}`).subscribe(sport => this.sport = sport)
        this.getUser()
        if (this.activity.participants.filter( (user: { [x: string]: number; }) => user['id'] === this.userService.user.id ).length > 0)
          this.attendButton = 'Un-attend'
        else
          this.attendButton = 'Attend'

        if (this.activity.created_by_user === this.userService.user.id)
          this.isNotTheOwner = false
      })
    }

  }
  getUser() {
    const id = this.activity.created_by_user
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
    })
  }
  attendActivity() {
    this.activityService.attendActivity(this.activity).subscribe(() => {
        this.snackbar.open('Attended successfully!', 'OK',{duration:3000})
        this.getActivity()
      }
    )
  }
}
