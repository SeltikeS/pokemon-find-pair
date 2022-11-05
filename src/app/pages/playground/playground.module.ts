import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlayFieldModule } from 'src/app/shared/components/play-field/play-field.module';



@NgModule({
  declarations: [
    PlaygroundComponent
  ],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    PlayFieldModule,
  ],
  exports: [PlaygroundComponent],
})
export class PlaygroundModule { }
