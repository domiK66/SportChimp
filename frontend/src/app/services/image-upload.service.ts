import { Injectable } from '@angular/core';

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  selectedFile: ImageSnippet | undefined

  constructor(
  )
  { }
  ImageInputOnClick(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

}
