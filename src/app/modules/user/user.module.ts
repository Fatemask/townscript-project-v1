import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user.routing.module';
import { GoogleSigninDirective } from './google-signin.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, GoogleSigninDirective],
  imports: [
    SharedModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
