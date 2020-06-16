import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(
    public eventsService: EventsService,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
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
      eventDueDate: ['', [Validators.required]],
      eventThumbnailUrl: ['', [Validators.required]],
      eventBannerUrl: ['', [Validators.required]],
      eventTickets: ['', [Validators.required]],
      eventTicketPrice: ['', [Validators.required]],
      eventRedirectUrl: ['', [Validators.required]],
      eventDetails: this.fb.group({
        eventEmail: ['', [Validators.required, Validators.email]],
        eventPhoneNumber: ['', [Validators.required]],
        eventAddress: ['', [Validators.required]],
        eventCity: ['', [Validators.required]],
        eventZip: ['', [Validators.required, Validators.maxLength(6)]],
        eventSocialInstagram: ['', [Validators.required]],
        eventSocialFacebook: ['', [Validators.required]],
        eventFaq: ['', [Validators.required]]
      })
    });
    this.eventsService.userData();
    setTimeout(() => {
      this.data = this.eventsService.data;
      console.log(this.data);
      if (this.data.isCreator == true) {
        this.isCreator = true;
      }
      if (this.data.creatorVerified) {
        this.creatorVerified = true;
      }
      this.loading = false;
    }, 1000);
    /* this.db
    .collection('users')
    .doc(this.id)
    .valueChanges()
    .subscribe(u => (this.data = u));
    console.log(this.data);
    if (this.data.isCreator == true) {
      this.isCreator = true;
    } */
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
    const data = this.createEventForm.value;
    data.eventCity = data.eventDetails.eventCity;
    data.eventDetails.eventDescription = data.eventDescription;
    delete data.eventDetails.eventCity;
    delete data.eventDescription;
    if (this.createEventForm.valid) {
      await this.eventsService.createEvent(data);
      await this.eventsService.uploadFile(this.banner, 'banner');
      await this.eventsService.uploadFile(this.poster, 'poster');
    }
    console.log(data);
    this.loading = false;
    /* this.createEventForm.reset(); */
  }
}
