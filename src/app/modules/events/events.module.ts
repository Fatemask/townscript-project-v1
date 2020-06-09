import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventsRoutingModule } from './events.routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent
  ],
  imports: [
    SharedModule,
    EventsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EventsModule { }