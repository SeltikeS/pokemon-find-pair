import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PagesEnum } from 'src/app/entities/enums/pages.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  @Input() title = '';

  public pages = PagesEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
