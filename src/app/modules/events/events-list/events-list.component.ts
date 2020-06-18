import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events:any;
  mobile = false;
  loading = true;

  constructor(
    public eventService: EventsService
  ) { }

  ngOnInit(): void {
    if (window.screen.width === 375) { // 768px portrait
      this.mobile = true;
    }

    this.eventService.getEventCategories();
    this.eventService.getAllEvents().subscribe(ev => {
      this.loading = false;
      this.events = ev;
    })
    
  }

  getCategory($event) {
    this.loading = true;
    if ($event.target.checked) {
      this.eventService.getCategoryViseEvents($event.target.id).subscribe(events => {
        this.events = events;
        this.loading = false;
      })
    } else {
      this.loading = false;
    }
  }
}
