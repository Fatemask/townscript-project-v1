import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['user']);

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
