import { AngularFireAuth } from '@angular/fire/auth';
import { EventsService } from 'src/app/services/events.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navToggle = false;

  focus = false;
  results: any;
  latestKeypress: number = 0;

  startAt = new Subject();
  endAt = new Subject();

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private eventService: EventsService,
  ) { }

  ngOnInit(): void {
    const combine = combineLatest(this.startobs, this.endobs);
    combine.subscribe(value => {
      this.eventService.getSearchedEvent(value[0], value[1]).subscribe(results => {
        this.results = results;
        console.log(this.results);
      });
    })
  }

  search($event) {
    if($event.timeStamp - this.latestKeypress > 1000) {
      let q = $event.target.value;
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");  
    }
    this.latestKeypress = $event.timeStamp;
  }

  onBlur() {
    setTimeout(() => { this.focus = !this.focus }, 500);
  }
}
