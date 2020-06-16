import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrPageComponent } from './err-page/err-page.component';
import { AdminGuard } from './core/admin.guard';

import { redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  { path: 'events',
    loadChildren: () => import('./modules/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(p => p.DashboardModule),
      canActivate: [AdminGuard]
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: ErrPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
