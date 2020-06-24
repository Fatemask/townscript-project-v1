import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  createEventForm: FormGroup;
  serverMessage: string;
  loading: boolean = true;
  poster;
  banner;
  error: boolean;
  isCreator: boolean;
  data;
  id;
  creatorVerified;
  msg = 'Loading'
  today;
  meridian = true;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  constructor(
    public eventsService: EventsService,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    public calender: NgbCalendar
  ) {
    this.eventsService.getEventCategories();
  }
  ngOnInit(): void {
    this.createEventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventOrganizedBy: ['', [Validators.required]],
      eventCategory: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      eventTiming: ['', [Validators.required]],
      eventTickets: ['', [Validators.required, Validators.maxLength(4)]],
      eventTicketPrice: ['', [Validators.required]],
      eventRedirectUrl: ['', [Validators.required]],
      eventDetails: this.fb.group({
        eventEmail: ['', [Validators.required, Validators.email]],
        eventPhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        eventAddress: ['', [Validators.required]],
        eventCity: ['', [Validators.required]],
        eventZip: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        eventSocialInstagram: ['', []],
        eventSocialFacebook: ['', []],
        eventFaq: ['', []]
      })
    });
    this.eventsService.userData();
    setTimeout(() => {
      this.data = this.eventsService.data;
      if (this.data.isCreator == true) {
        this.isCreator = true;
      }
      if (this.data.creatorVerified) {
        this.creatorVerified = true;
      }
      this.loading = false;
    }, 2000);
    /* this.db
    .collection('users')
    .doc(this.id)
    .valueChanges()
    .subscribe(u => (this.data = u));
    console.log(this.data);
    if (this.data.isCreator == true) {
      this.isCreator = true;
    } */

    this.today = this.calender.getToday()
  }

  toggleMeridian() {
    this.meridian = !this.meridian
  }
  // form control of event formGroup
  get fc(): any {
    return this.createEventForm['controls'];
  }

  //form control of details formGroup
  get dfc(): any {
    return this.createEventForm['controls'].eventDetails['controls'];
  }

  getPoster(file) {
    this.poster = file;
  }

  getBanner(file) {
    this.banner = file;
  }

  async onSubmit() {
    this.loading = true;
    this.msg = 'Creating Event...'
    const data = this.createEventForm.value;
    data.eventCity = data.eventDetails.eventCity;
    data.eventName = data.eventName.toLowerCase();
    data.eventDetails.eventDescription = data.eventDescription;
    delete data.eventDetails.eventCity;
    delete data.eventDescription;
    if (this.createEventForm.valid) {
      await this.eventsService.createEvent(data);
      await this.eventsService.uploadFile(this.banner, 'banner');
      await this.eventsService.uploadFile(this.poster, 'poster');
    }
    this.msg = 'Event Created'
    setTimeout(() =>
      this.router.navigateByUrl(''), 800)
    /* this.createEventForm.reset(); */
  }
}
