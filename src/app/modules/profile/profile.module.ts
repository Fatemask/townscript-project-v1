import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, RouterModule]
})
export class ProfileModule {}
