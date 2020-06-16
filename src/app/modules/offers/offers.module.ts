import { OffersComponent } from './offers/offers.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';

@NgModule({
  declarations: [OffersComponent],
  imports: [CommonModule, OffersRoutingModule, RouterModule]
})
export class OffersModule {}
