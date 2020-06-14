import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user.routing.module';
import { GoogleSigninDirective } from './google-signin.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { DisableControlDirective } from './disable-control.directive';

@NgModule({
  declarations: [
    LoginComponent, 
    ProfileComponent, 
    DisableControlDirective,
    GoogleSigninDirective],
  imports: [
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
