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
  loading = false;

  constructor(
    public eventService: EventsService
  ) { }

  ngOnInit(): void {
    if (window.screen.width === 375) { // 768px portrait
      this.mobile = true;
    }
    this.events = this.eventService.getEventCategories();
    
  }

  getCategory($event) {
    this.loading = true;
    this.eventService.getCategoryViseEvents($event.target.id).subscribe(events => {
      this.events = events;
    })
    console.log(this.events);
    this.loading = false;
  }

}