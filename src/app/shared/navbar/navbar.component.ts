import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navToggle = false;

  userName: {
    firstName?: string;
    lastName?: string;
  };

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      this.userName.firstName = JSON.parse(localStorage.getItem('user')).firstName;
      this.userName.lastName = JSON.parse(localStorage.getItem('user')).lastName;
    }
  }

}
