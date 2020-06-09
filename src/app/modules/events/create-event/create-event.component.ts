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
  loading: boolean = false;

  constructor(
    public eventsService: EventsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createEventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventOrganizedBy: ['', [Validators.required]],
      eventCategory: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventDate: ['', [Validators.required,]],
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
    this.eventsService.getEventCategories();
  }

  // form control of event formGroup
  get fc(): any {
    return this.createEventForm['controls'];
  }

  //form control of details formGroup
  get dfc(): any {
    return this.createEventForm['controls'].eventDetails['controls'];
  }

  
  onSubmit() {
    this.loading = true;
    const data = this.createEventForm.value;
    data.eventCity = data.eventDetails.eventCity;
    data.eventDetails.eventDescription = data.eventDescription;
    delete data.eventDetails.eventCity;
    delete data.eventDescription;
    if(this.createEventForm.valid) {
      this.eventsService.createEvent(data);
    }
    console.log(data);
    this.loading = false; 
    this.createEventForm.reset();
  }
}
