import { Component, OnInit } from '@angular/core';
import {Activity, ActivityService} from "../services/activity.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Sport, SportService} from "../services/sport.service";
import {User, UserService} from "../services/user.service";
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
interface Comment {
  text: string;
  created_at: Date;
  activity: Activity;
  created_by_user : User;
}
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
  comments: Comment[] = []
  attendButton: string = ''
  isNotTheOwner: boolean = true
  commentFormGroup: FormGroup = new FormGroup({text: new FormControl('')})

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

    this.getComments()

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
      this.commentFormGroup = new FormGroup({
          text: new FormControl(''),
          created_by_user: new FormControl(this.user.id),
          activity: new FormControl(this.activity.id)
        }
      )

    })
  }
  attendActivity() {
    this.activityService.attendActivity(this.activity).subscribe(() => {
        this.snackbar.open('Attended successfully!', 'OK',{duration:3000})
        this.getActivity()
      }
    )
  }
  getComments() {
    this.http.get<[]>(`http://localhost:4200/api/comments/`).subscribe(comments => {
      this.comments = comments
      this.comments = this.comments.filter(com => com.activity == this.activity.id)
    });
  }
  createComment(){
    this.http.post(`http://localhost:4200/api/comments/`, this.commentFormGroup.value).subscribe(() => {
      this.snackbar.open('Comment successfully!', 'OK',{duration:3000})
    })
  }
}
