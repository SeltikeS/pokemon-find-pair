import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICardData } from 'src/app/entities/interfaces/card-data.interface';
import { CardService } from '../../services/card.service';

@UntilDestroy()
@Component({
  selector: 'app-play-card',
  templateUrl: './play-card.component.html',
  styleUrls: ['./play-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cardFlip', [
      state(
        'default',
        style({
          transform: 'none',
        }),
      ),
      state(
        'flipped',
        style({
          transform: 'rotateY(180deg)',
        }),
      ),
      transition('default => *', [animate('400ms')]),
      transition('* => default', [animate('200ms')]),
    ]),
  ],
})
export class PlayCardComponent implements OnInit {
  @Input() public card!: ICardData;
  @Input() public index: number = 0;

  public backsideData: ICardData = {
    name: 'Pokemon',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
    state: 'default',
  };

  constructor(private cardService: CardService) {}

  public ngOnInit(): void {}

  public cardClicked() {
    this.cardService
      .updateCard(this.index, {
        ...this.card,
        state: this.card.state === 'default' ? 'flipped' : 'default',
      })
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
