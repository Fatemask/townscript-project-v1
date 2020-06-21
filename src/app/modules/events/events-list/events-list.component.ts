import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events: any;
  mobile = false;
  loading = true;
  displayAll = true;
  filterEvent: any = [];

  constructor(public eventService: EventsService) {}

  mobileSize = [425, 375, 320]
  ngOnInit(): void {
    this.mobileSize.forEach(width => {
      if (window.screen.width === width) {
        // 768px portrait
        this.mobile = true;
      }
    })
    

    this.eventService.getEventCategories();
    this.eventService.getAllEvents().subscribe(ev => {
      this.loading = false;
      this.events = ev;
    })
  }

  getCategory($event) {
    this.filterEvent = [];
    this.displayAll = false;
    if ($event.target.checked) {
     this.events.filter(data => {
       if(data.eventCategory == $event.target.id) {
        this.filterEvent.push(data);
       }
     })
    }
  }

  seeAll() {
    this.filterEvent = [];
    this.displayAll = true;
  }

}
