import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {SportService} from "../services/sport.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileUploadService} from "../services/file-upload.service";

@Component({
  selector: 'app-sport-form',
  templateUrl: './sport-form.component.html',
  styleUrls: ['./sport-form.component.scss']
})
export class SportFormComponent implements OnInit {

  sportFormGroup: FormGroup;
  submitButtonText = '';

  //file upload
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private sportService: SportService,
    private snackbar: MatSnackBar,
    private fileUploadService: FileUploadService
  ) {
    this.sportFormGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required], [this.nameValidator()]),
      description: new FormControl('', [Validators.required]),
      //todo: image: new FormData()
      }
    )
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    //get files
    this.imageInfos = this.fileUploadService.getFiles();

    if (id) {
      this.submitButtonText = 'Update';
      this.sportService.getSport(id).subscribe(sport => { this.sportFormGroup.patchValue(sport) });
    } else {
      this.submitButtonText = 'Create';
    }
  }

  createOrUpdateSport() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sportService.updateSport(this.sportFormGroup.value).subscribe(() => {
        this.snackbar.open('Sport updated successfully!', 'OK',{duration:3000})
      })
      this.router.navigate(['/sport-list']);
    } else {
      this.sportService.createSport(this.sportFormGroup.value).subscribe(() => {
        this.snackbar.open('Sport created successfully!', 'OK',{duration:3000})
      })
      this.router.navigate(['/sport-list']);
    }
  }
  //File Upload
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.fileUploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.fileUploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        });
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

