import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, of, range, tap } from 'rxjs';
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
  private deck$ = new BehaviorSubject<ICardData[]>([]);
  private isGameWinner$ = new BehaviorSubject<boolean>(false);

  public get deck(): ICardData[] {
    return this.deck$.value;
  }

  constructor(private pokemonService: PokemonService) {
    this.newDeck();
  }

  public newDeck(): void {
    this.isGameWinner$.next(false);
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

  public updateCard(index: number, state: ICardData): Observable<ICardData[]> {
    const newState: ICardData[] = this.deck;
    newState[index] = state;
    this.deck$.next(newState);
    this.checkDeck();

    return of(newState);
  }

  public checkDeck(): Observable<ICardData[]> {
    let newDeck = this.deck;
    const flippedCards: ICardData[] = this.deck.filter(
      (card: ICardData) => card.state === 'flipped',
    );
    if (flippedCards.length >= 2) {
      setTimeout(() => {
        if (flippedCards[0].name === flippedCards[1].name) {
          newDeck = newDeck.map((card: ICardData) => {
            return {
              ...card,
              state:
                card.name === flippedCards[0].name || card.state === 'founded'
                  ? 'founded'
                  : 'default',
            };
          });
        } else {
          newDeck = newDeck.map((card: ICardData) => {
            return {
              ...card,
              state: card.state === 'founded' ? 'founded' : 'default',
            };
          });
        }
        this.deck$.next(newDeck);
        if (!newDeck.find((card) => card.state === 'default')) {
          this.isGameWinner$.next(true);
        }
      }, 500);
    }

    return of(newDeck);
  }

  public getGameWinner(): Observable<boolean> {
    return this.isGameWinner$.asObservable();
  }

  private getRandomInt(): number {
    return Math.floor(Math.random() * this.pokemonService.pokemonsNumber);
  }
}
