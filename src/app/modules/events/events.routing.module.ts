import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventComponent } from './create-event/create-event.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import { SearchComponent } from './search/search.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: EventsListComponent },
  {
    path: 'create-event',
    component: CreateEventComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'details/:id',
    component: EventDetailsComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
