import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  ed;
  loading: boolean = true;
  joined: boolean = false;
  paid= false;
  user:any;

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
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
          this.joined = true;
        }
        if(element.isPaid == true && (element.uid == this.user.uid)){
          this.joined = false;
          this.paid = true;
        }
      })
    }, () => { console.log(this.loading);this.loading = false })

    this.eventService.getEventById(id)
    .subscribe(
      {
        next: et => {
          this.ed = et;
          this.ed.id = id;
          this.loading = true;
        },
      error: err => console.log(err),
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
