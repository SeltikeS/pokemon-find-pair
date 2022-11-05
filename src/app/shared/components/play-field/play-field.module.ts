import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayFieldComponent } from './play-field.component';
import { PlayCardModule } from '../play-card/play-card.module';



@NgModule({
  declarations: [
    PlayFieldComponent
  ],
  imports: [
    CommonModule,
    PlayCardModule,
  ],
  exports: [PlayFieldComponent],
})
export class PlayFieldModule { }
