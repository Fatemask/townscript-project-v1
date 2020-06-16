import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  events: any;
  loading = true;
  constructor(private eventService: EventsService) {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.loading = false;
    });
  }
}
