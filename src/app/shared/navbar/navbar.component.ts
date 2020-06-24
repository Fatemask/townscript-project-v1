import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navToggle = false;
  dropSearch = false;

  data$: Observable<any[]>;

  startAt = new Subject();
  endAt = new Subject();

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();


  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private eventService: EventsService
  ) { }

  ngOnInit(): void {
    const comb = combineLatest(
      this.startobs.pipe(debounceTime(500), distinctUntilChanged()),
      this.endobs.pipe(debounceTime(500), distinctUntilChanged())
    );
    comb.subscribe((value) => {
      this.data$ = this.eventService.getSearchedEvent(value[0], value[1]);
      // console.log(value[0], value[1]);
    });
   }

   blurFunction() {
     setTimeout(() => {
      this.dropSearch = !this.dropSearch;
     }, 300);
   }

  
   onkeyup($event) {
      let q = $event.target.value;
      if (q != '') {
        this.startAt.next(q);
        this.endAt.next(q + '\uf8ff');
      }
    }

    redirect(id: string) {
      this.router.navigate(['events/details', id])
  }
  
}


