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
    public authService: AuthService,
    private router: Router,
    private eventService: EventsService) { }

  @Input() event:any;
  ngOnInit(): void {
    this.authService.user$.subscribe((userData:any) => {
      if (!(userData.likedEvents === undefined)) {
        if(userData.likedEvents.some(e => e.eid === this.event.id)) {
          this.liked = true;
        }
      }
      userData.likedEvents = null;
      
    })
    this.eventService.getAllLikes(this.event.id).subscribe((likes:any) => {
      if(likes) {
        this.count = likes.totalLikes;
      }

    });
  }

  redirect() {
    this.router.navigate(['events/details', this.event.id])
  }

  like(id: string) {
    this.eventService.addLike(id)
    this.liked = true;
  }

  dislike(id: string) {
    this.eventService.removeLike(id);
    this.liked = false;
  }
  
}
