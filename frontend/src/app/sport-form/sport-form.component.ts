import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Sport, SportService} from "../services/sport.service";

@Component({
  selector: 'app-sport-form',
  templateUrl: './sport-form.component.html',
  styleUrls: ['./sport-form.component.scss']
})
export class SportFormComponent implements OnInit {

  sportFormGroup: FormGroup;
  buttonText = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private sportService: SportService, private router: Router) {
    this.sportFormGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(''),
      description: new FormControl('')
    })
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buttonText = 'Update';
      this.sportService.getSport(id).subscribe(sport => {
        this.sportFormGroup.patchValue(sport);
      })
    } else {
      this.buttonText = 'Create';
    }
  }
  createOrUpdateSport() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.put(`/api/sports/${id}/`, this.sportFormGroup.value).subscribe(() => {
        alert('Movie updated successfully!');
      })
      /*
      this.sportService.updateSport(this.sportFormGroup.value).subscribe(() => {
        alert('Sport updated successfully!');
      })
      */
      this.router.navigate(['/sport-list']);
    } else {
      this.sportService.createSport(this.sportFormGroup.value).subscribe(() => {
        alert('Sport created successfully!');
      })
      this.router.navigate(['/sport-list']);
    }
  }
}

