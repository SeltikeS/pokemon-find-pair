import { Injectable } from '@angular/core';
import { of, switchMap, tap } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private deckSize: number = 5;

  constructor(private pokemonService: PokemonService) {}

  public getNewDeck() {

  }

  public getPokemonCard() {
    return this.pokemonService.getPokemonById(this.getRandomInt()).pipe(
      switchMap((data) =>  of({
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        state: 'default',
      })),
    );
  }

  private getRandomInt(): number {
    return Math.floor(Math.random() * this.pokemonService.pokemonsNumber);
  }
}
