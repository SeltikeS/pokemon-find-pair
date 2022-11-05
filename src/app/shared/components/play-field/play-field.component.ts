import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ICardData } from 'src/app/entities/interfaces/card-data.interface';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayFieldComponent implements OnInit {
  public cardInfo: ICardData = {
    name: 'Pokemon',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
    state: 'default',
  };

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  public getCard() {
    this.cardService.getPokemonCard().subscribe(
      (data) => {
        this.cardInfo = data as ICardData;
      }
    );
  }
}
