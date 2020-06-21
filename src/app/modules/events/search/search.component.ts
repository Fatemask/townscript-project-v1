import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Observable, combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data$: Observable<any[]>;

  startAt = new Subject();
  endAt = new Subject();

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(private eventService: EventsService, private router: Router) {}

  ngOnInit() {
    const comb = combineLatest(
      this.startobs.pipe(debounceTime(500), distinctUntilChanged()),
      this.endobs.pipe(debounceTime(500), distinctUntilChanged())
    );
    comb.subscribe((value) => {
      this.data$ = this.eventService.getSearchedEvent(value[0], value[1]);
      // console.log(value[0], value[1]);
    });
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
