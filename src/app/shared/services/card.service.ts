import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, range, repeat, switchMap, tap } from 'rxjs';
import { ICardData } from 'src/app/entities/interfaces/card-data.interface';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private deckSize: number = 6;
  private deck$ = new BehaviorSubject<ICardData[]>([]);

  constructor(private pokemonService: PokemonService) {}

  public newDeck(): void {
    const newDeck: ICardData[] = [];

    of(5)
      .pipe(
        switchMap(() => {
          return this.getPokemonCard();
        }),
        repeat(this.deckSize),
        tap((card) => {
          newDeck.push(card);
          newDeck.push(card);
        }),
      )
      .subscribe(() => {
        this.deck$.next(this.shuffle(newDeck));
      });
  }

  public getPokemonCard(): Observable<ICardData> {
    return this.pokemonService.getPokemonById(this.getRandomInt()).pipe(
      switchMap((data) =>  of({
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        state: 'default',
      })),
    ) as Observable<ICardData>;
  }

  public getDeck(): Observable<ICardData[]> {
    return this.deck$;
  }

  private getRandomInt(): number {
    return Math.floor(Math.random() * this.pokemonService.pokemonsNumber);
  }

  private shuffle(array: ICardData[]): ICardData[] {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
