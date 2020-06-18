import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navToggle = false;

  searchData: any;

  constructor(
    public afAuth: AngularFireAuth,
    private eventService: EventsService
  ) { }

  ngOnInit(): void {
  
  }

  search($event) {
    this.eventService.getSearchedEvent($event.target.value).subscribe(searcheData => {
      this.searchData = searcheData;
    })
  }
}
