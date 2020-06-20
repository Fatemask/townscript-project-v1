import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public afAuth: AngularFireAuth) {}
}
