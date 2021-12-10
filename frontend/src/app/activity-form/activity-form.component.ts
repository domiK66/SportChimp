import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityService} from "../services/activity.service";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  activityFormGroup: FormGroup;
  submitButtonText = 'Create';

  constructor(private http: HttpClient, private route: ActivatedRoute, private activityService: ActivityService, private router: Router) {
    this.activityFormGroup = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(new Date()),
      location: new FormControl(''),
      is_public: new FormControl(false),
      sport_genre: new FormControl([])
    })
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.submitButtonText = 'Update';
      this.activityService.getActivity(id).subscribe(activity => {
        this.activityFormGroup.patchValue(activity);
      })
    } else {
      this.submitButtonText = 'Create';
    }
  }
  createOrUpdateActivity() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.updateActivity(this.activityFormGroup.value).subscribe(() => {
        alert('Sport updated successfully!');
      })
      this.router.navigate(['/activity-list']);
    } else {
      this.activityService.createActivity(this.activityFormGroup.value).subscribe(() => {
        alert('Sport created successfully!');
      })
      this.router.navigate(['/activity-list']);
    }
  }

}
