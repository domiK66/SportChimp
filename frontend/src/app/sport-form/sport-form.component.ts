import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {SportService} from "../services/sport.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageUploadService} from "../services/image-upload.service";

@Component({
  selector: 'app-sport-form',
  templateUrl: './sport-form.component.html',
  styleUrls: ['./sport-form.component.scss']
})
export class SportFormComponent implements OnInit {

  sportFormGroup: FormGroup;
  submitButtonText = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sportService: SportService,
    private snackbar: MatSnackBar,
    public imageUploadService : ImageUploadService
  ) {
    this.sportFormGroup = new FormGroup({
        id: new FormControl(null),
        name: new FormControl('', [Validators.required], [this.nameValidator()]),
        description: new FormControl('', [Validators.required])
      }
    )
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.submitButtonText = 'Update';
      this.sportService.getSport(id).subscribe(sport => {
        this.sportFormGroup.patchValue(sport)
      });
    } else {
      this.submitButtonText = 'Create';
    }
  }

  createOrUpdateSport() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const formData = new FormData();
      if (this.imageUploadService.selectedFile) {
        formData.append('image', this.imageUploadService.selectedFile.file);
      } else {
        formData.append('image', "");
      }
      formData.append('name', this.sportFormGroup.value.name);
      formData.append('description', this.sportFormGroup.value.description);

      this.http.put(`/api/sports/${id}/`, formData).subscribe(() => {
          this.snackbar.open('Sport updated successfully.', 'OK', {duration: 3000})
        }
      )
    } else {
      const formData = new FormData();
      if (this.imageUploadService.selectedFile) {
        formData.append('image', this.imageUploadService.selectedFile.file);
      } else {
        formData.append('image', "");
      }
      formData.append('name', this.sportFormGroup.value.name);
      formData.append('description', this.sportFormGroup.value.description);

      this.http.post(`/api/sports/`, formData).subscribe(() => {
          this.snackbar.open('Sport created successfully.', 'OK', {duration: 3000})
          this.router.navigate(['/sport-list']);
        }
      )
    }
  }

  // Validators
  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.sportService.getSports().pipe(map(sports => {
        const currentId = this.sportFormGroup.controls['id'].value;
        const currentName = this.sportFormGroup.controls['name'].value;
        const existingSport = sports.find(sport => sport.name === currentName);
        return existingSport && existingSport.id !== currentId ? {nameAlreadyExists: true} : null
      }))
    }
  }


}

