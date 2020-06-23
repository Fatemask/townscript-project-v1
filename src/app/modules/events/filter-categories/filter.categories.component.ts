import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter.categories.component.html',
  styleUrls: ['./filter.categories.component.css'],
})
export class FilterCategoriesComponent implements OnInit {
  events;
  name;

  messages = [
    {
      text: 'latest',
    },
    {
      text: 'old',
    },
  ];
  constructor(
    private route: ActivatedRoute,
    public eventService: EventsService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.eventService
      .getCategoryViseEvents(this.name)
      .subscribe((data) => (this.events = data));
  }
}
//   logMessageId(el) {
//     let messageId = el.getAttribute('data-message-id');
//     //let messageId = el.dataset.messageId;
//     console.log('Message Id: ', messageId);
//     if (messageId == 'latest') {
//       this.getLatestEvents(name);
//     }

//     if (messageId === 'old') {
//       this.getLatestEvents(name);
//     }
//   }

//   getLatestEvents(name: string) {
//     return this.db
//       .collection('events', ref => ref.where('eventCategory', '==', name).orderBy('name'))
//       .valueChanges({idField: 'id'}).subscribe(data => this.events = data)
//   }
// }
