import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATARAW } from './_models/dataraw';
import { NgxBrazil } from 'ngx-brazil';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-as-pipes',
  templateUrl: './demo-as-pipes.component.html',
  styleUrls: ['./demo-as-pipes.component.scss'],
  imports: [NgxBrazil]
})
export class DemoAsPipesComponent {
  readonly DATARAW = DATARAW;
}
