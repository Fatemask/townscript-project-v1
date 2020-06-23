import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories;
  categorySize;
  events;

  constructor(
    public eventService: EventsService,
    private router: Router,
    private db: AngularFirestore
  ) { }


  ngOnInit() { 
    this.db.collection('categories').valueChanges().subscribe(data => {
      this.categories = data
      this.categories.forEach(element => {
       this.db.collection('events', ref => ref.where('eventCategory', '==', element.name)).valueChanges()
       .subscribe(snap => element.size = snap.length )
      });
    })   
  }

  redirect(name: string) {
    this.router.navigate(['events/categories', name])
  }
}


