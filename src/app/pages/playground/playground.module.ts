import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { PlaygroundRoutingModule } from './playground-routing.module';



@NgModule({
  declarations: [
    PlaygroundComponent
  ],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
  ],
  exports: [PlaygroundComponent],
})
export class PlaygroundModule { }
