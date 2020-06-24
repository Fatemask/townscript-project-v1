import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  ed;
  loading: boolean = true;
  joined: boolean = true;
  pending: boolean = false;
  visited = false;
  user:any;

  liked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private eventService: EventsService
  ) { 
    this.afAuth.authState.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventService.getAttendees(id).subscribe((data:any) => {
      console.log(this.loading)
      data.joinedUsers.forEach(element => {
        if(element.uid == this.user.uid){
          this.joined = false;
          this.visited = true;
          // this.pending = true;
        }
      })
    }, () => { console.log(this.loading);this.loading = false })

    this.eventService.getEventById(id).subscribe(et => {
      this.ed = et;
      this.ed.id = id;
      this.loading = false;
    });
    this.eventService.getEventDetails(id).subscribe(eventDetails => { 
      this.ed.eventDetails = eventDetails[0];
      console.log(eventDetails) 
    });

    this.authService.user$.subscribe((data:any) => {
      data.likedEvents.forEach(element => {
        if(element.eid == this.ed.id) {
          this.liked = true;
        } else {
          this.liked = false;
        }
      })
    })
      
  }

  joinEvent(id: string) {
    this.eventService.joinEvent(id);
    this.joined = false;
    this.visited = true;
  }

  like(eid) {
    this.eventService.addLike(eid);
    this.liked = true;
  }

  dislike(eid) {
    this.eventService.removeLike(eid);
    this.liked = false;
  }

}
