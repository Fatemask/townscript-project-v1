import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrPageComponent } from './err-page/err-page.component';
import { AdminGuard } from './core/admin.guard';

import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  canActivate
} from '@angular/fire/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(p => p.HomeModule),
    data: { title: 'Townscript' },
    pathMatch: 'full'
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./modules/events/events.module').then(p => p.EventsModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then(m => m.UserModule)
    /* ...canActivate(redirectLoggedInToHome) */
  },
  {
    path: '404',
    component: ErrPageComponent
  },

  //Unknown paths redirect to 404 page
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
