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

  
  onSubmit() {
    const data = this.createEventForm.value;
    if(this.createEventForm.valid) {
      this.eventsService.createEvent(data);
    }
  }
}
