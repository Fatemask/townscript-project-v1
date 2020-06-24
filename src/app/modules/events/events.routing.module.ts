import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsListComponent } from './events-list/events-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CategoriesComponent } from './categories/categories.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { FilterCategoriesComponent } from './filter-categories/filter.categories.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['user/login']);

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
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'categories/:name',
    component: FilterCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
