import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  liked = false;
  count: number = 0;
  constructor(
    private authService: AuthService,
    private eventService: EventsService) { }

  @Input() event:any;
  ngOnInit(): void {
    this.authService.user$.subscribe((data:any) => {
      data.likedEvents.forEach(element => {
        if(element.eid == this.event.id) {
          this.liked = true;
        }
      });
    })
  }

}
