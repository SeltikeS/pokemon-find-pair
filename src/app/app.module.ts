import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './pages/main/main.module';
import { PlaygroundModule } from './pages/playground/playground.module';
import { SettingsModule } from './pages/settings/settings.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './shared/services/pokemon.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainModule,
    PlaygroundModule,
    SettingsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
