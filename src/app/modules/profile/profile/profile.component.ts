import { EventsService } from 'src/app/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: any;
  personal: FormGroup;
  serverMessage: string;
  update: any;
  constructor(
    public afAuth: AngularFireAuth,
    public service: EventsService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.personal = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }
}
