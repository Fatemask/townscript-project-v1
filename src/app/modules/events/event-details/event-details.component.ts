import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  ed;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventService.getEventById(id)
    .subscribe(
      {
        next: et => {
          this.ed = et;
          this.ed.id = id;
          this.loading = true;
        },
      error: err => console.log(err),
      complete: () => this.loading = false,
    });
    this.eventService.getEventDetails(id).subscribe(eventDetails => { 
      this.ed.eventDetails = eventDetails[0];
      console.log(eventDetails) 
    });
    console.log(id);
    console.log(this.ed);
  }

  joinEvent(id: string) {
    this.eventService.joinEvent(id);
  }

}
