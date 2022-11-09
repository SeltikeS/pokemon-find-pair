import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICardData } from 'src/app/entities/interfaces/card-data.interface';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayFieldComponent implements OnInit {
  public deck$: Observable<ICardData[]> = new Observable<ICardData[]>;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.deck$ = this.cardService.getDeck();
    this.newGame();
  }

  public newGame() {
    this.cardService.newDeck();
  }
}
