import { Component, OnInit } from '@angular/core';
import {ActivityService} from "../services/activity.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SportService} from "../services/sport.service";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {

  activityDetailFormGroup: FormGroup;
  editable = false; // Todo: datum verstecken


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,

    private activityService: ActivityService,
    public sportService: SportService,
    public userService: UserService

  ) {
    this.activityDetailFormGroup = new FormGroup({
        id: new FormControl(null),
        title: new FormControl('',[Validators.required]),
        sport_genre: new FormControl([]),
        description: new FormControl(''),
        date: new FormControl(new Date()),
        location: new FormControl(''),
        is_public: new FormControl(false),
        created_by_user: new FormControl(userService.userId)
      }
    )
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.getActivity(id).subscribe(activity => { this.activityDetailFormGroup.patchValue(activity); })
    }else{
      this.router.navigate(['/activity-list/']);
    }
  }
}
