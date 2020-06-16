import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {
  uploadPercent: Observable<number>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  @Input() name: string;
  @Input() id: string;

  constructor(private storage: AngularFireStorage) {}
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `event-images/${this.id}/${this.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes and progress
    this.uploadPercent = task.percentageChanges();
    this.uploadProgress = task
      .snapshotChanges()
      .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
      .subscribe();
  }
}
