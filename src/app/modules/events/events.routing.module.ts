import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [
    { path: '', component: EventsListComponent },
    { path: 'create-event', component: CreateEventComponent },
    { path: 'details', component: EventDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventsRoutingModule { }