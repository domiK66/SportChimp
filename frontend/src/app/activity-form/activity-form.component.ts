import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityService} from "../services/activity.service";
import {Sport, SportService} from "../services/sport.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/user.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  activityFormGroup: FormGroup;
  submitButtonText = 'Create';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,

    private activityService: ActivityService,
    public sportService: SportService,
    public userService: UserService

  ) {
    this.activityFormGroup = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('',[Validators.required]),
      sport_genre: new FormControl([]),
      description: new FormControl(''),
      date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
      location: new FormControl(''),
      is_public: new FormControl(false)
      }
    )
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.submitButtonText = 'Update';
      this.activityService.getActivity(id).subscribe(activity => { this.activityFormGroup.patchValue(activity); })
    } else {
      this.submitButtonText = 'Create';
    }
  }
  createOrUpdateActivity() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.updateActivity(this.activityFormGroup.value).subscribe(() => this.snackbar.open('Activity updated successfully!', 'OK',{duration:3000}))
      this.router.navigate(['/activity-list']);
    } else {
      this.activityService.createActivity(this.activityFormGroup.value).subscribe(() => this.snackbar.open('Activity created successfully!', 'OK',{duration:3000}))
      this.router.navigate(['/activity-list']);
    }
  }
}
