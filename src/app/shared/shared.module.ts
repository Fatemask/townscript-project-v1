import { UploaderComponent } from './uploader/uploader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './event-card/event-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

const components = [
  EventCardComponent,
  NavbarComponent,
  FooterComponent,
  UploaderComponent
];
const modules = [CommonModule, RouterModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules]
})
export class SharedModule {}
