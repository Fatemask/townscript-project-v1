import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navToggle = false;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit(): void { }
}
