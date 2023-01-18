import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, map, mergeMap, Observable, range, tap } from 'rxjs';
import { ICardData } from 'src/app/entities/interfaces/card-data.interface';
import { PokemonService } from './pokemon.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CardsUtil } from '../utils/cards.util';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CardService {
  private deckSize = 6;
  private deck$: BehaviorSubject<ICardData[]> = new BehaviorSubject<ICardData[]>([]);

  constructor(private pokemonService: PokemonService) {
    this.newDeck();
  }

  public newDeck(): void {
    const newDeck: ICardData[] = [];

    range(0, this.deckSize)
      .pipe(
        mergeMap(() => this.getPokemonCard()),
        tap((card: ICardData) => newDeck.push(card)),
        untilDestroyed(this),
      )
      .subscribe({
        complete: () => {
          this.deck$.next(CardsUtil.shuffle([...newDeck, ...newDeck]));
        },
      });
  }

  public getPokemonCard(): Observable<ICardData> {
    return this.pokemonService.getPokemonById(this.getRandomInt()).pipe(
      map((data) => {
        return {
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          state: 'default',
        } as ICardData;
      }),
    );
  }

  public getDeck(): Observable<ICardData[]> {
    return this.deck$.asObservable();
  }

  public updateCard(index: number, state: ICardData): Observable<void> {
    const newState: ICardData[] = this.deck$.value;
    newState[index] = state;
    this.deck$.next(newState);

    return EMPTY;
  }

  private getRandomInt(): number {
    return Math.floor(Math.random() * this.pokemonService.pokemonsNumber);
  }
}
