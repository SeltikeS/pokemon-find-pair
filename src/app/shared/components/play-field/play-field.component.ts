import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { ICardData } from 'src/app/entities/interfaces/card-data.interface';
import { CardService } from '../../services/card.service';

@UntilDestroy()
@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayFieldComponent implements OnInit {
  public deck$ = new Observable<ICardData[]>();
  public isGameWinner$ = new Observable<boolean>();
  public deckState: ICardData[] = [];

  constructor(private cardService: CardService) {}

  public ngOnInit(): void {
    this.deck$ = this.cardService.getDeck();
    this.isGameWinner$ = this.cardService.getGameWinner();
  }

  public newGame(): void {
    this.cardService.newDeck();
  }

  public trackByFn(index: number) {
    return index;
  }
}
