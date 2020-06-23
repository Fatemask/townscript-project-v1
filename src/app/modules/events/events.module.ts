import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventsRoutingModule } from './events.routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './categories/categories.component';
import { FilterCategoriesComponent } from './filter-categories/filter.categories.component';

@NgModule({
  declarations: [
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CategoriesComponent,
    FilterCategoriesComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ]
})
export class EventsModule { }
