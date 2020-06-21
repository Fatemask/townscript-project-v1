import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';

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
    private router: Router,
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

  redirect() {
    this.router.navigate(['events/details', this.event.id])
  }

}
