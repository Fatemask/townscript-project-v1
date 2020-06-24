import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  events: any;
  tempEvents = [];
  loading = true;
  categories;
  categoriesCarousal = [];
  featuredEvents = [];
  constructor(private eventService: EventsService, private db: AngularFirestore) {
    /* .toPromise().then(() => location.reload()) */
    this.eventService.getEventCategories()
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.categories = this.eventService.categories
      //Sort events Category wise
      for (let a = 0; a < this.categories.length; a++) {
        let count = 0
        for (let b = 0; b < this.events.length; b++) {
          if (this.events[b].eventCategory == this.categories[a].name && this.events[b].featured != true) {
            this.tempEvents[count] = this.events[b]
            count = count + 1
          }
          //Featured events sorting
          if (this.events[b].featured == true && !(this.featuredEvents.includes(this.events[b]))) {
            this.featuredEvents.push(this.events[b])
          }
        }
        count = 0
        //If a certain category have more than one events then only add else skip
        if (this.tempEvents.length > 0) {
          this.categoriesCarousal.push({
            category: this.categories[a].name,
            data: [...this.tempEvents]
          })
        }
        this.tempEvents = []
      }
      console.log(this.featuredEvents)
      this.loading = false;
    });
  }
  customOptions: OwlOptions = {
    center: true,
    items: 2,
    loop: true,
    margin: 10,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  };
  
  customOptionsFeatured: OwlOptions = {
    center: true,
    loop: true,
    margin: 10,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    }
  };
}
