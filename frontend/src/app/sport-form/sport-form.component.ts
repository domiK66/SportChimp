import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {SportService} from "../services/sport.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";


class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-sport-form',
  templateUrl: './sport-form.component.html',
  styleUrls: ['./sport-form.component.scss']
})
export class SportFormComponent implements OnInit {

  sportFormGroup: FormGroup;
  submitButtonText = '';
  selectedFile: ImageSnippet | undefined;

  //fileSelected: boolean;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sportService: SportService,
    private snackbar: MatSnackBar
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
      this.sportService.updateSport(this.sportFormGroup.value).subscribe(() => {
        this.snackbar.open('Sport updated successfully!', 'OK', {duration: 3000})
      })
      this.router.navigate(['/sport-list']);
    } else {
      this.sportService.createSport(this.sportFormGroup.value).subscribe(() => {
        this.snackbar.open('Sport created successfully!', 'OK', {duration: 3000})
      })
      this.router.navigate(['/sport-list']);
    }
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', this.sportFormGroup.value.name);
    formData.append('description', this.sportFormGroup.value.description);
    console.log(image)

    return this.http.post('/api/sports/', formData);
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

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.uploadImage(this.selectedFile.file).subscribe(
        (res: any) => {

        },
        (err: any) => {

        })
    });

    reader.readAsDataURL(file);
  }
}

