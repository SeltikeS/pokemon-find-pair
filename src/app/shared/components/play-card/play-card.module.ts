import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayCardComponent } from './play-card.component';



@NgModule({
  declarations: [
    PlayCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PlayCardComponent],
})
export class PlayCardModule { }
