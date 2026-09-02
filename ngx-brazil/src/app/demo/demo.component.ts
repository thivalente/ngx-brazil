import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { NgxBrazilMASKS } from 'public_api';
import { DATARAW } from './as-pipes/_models/dataraw';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: false
})
export class DemoComponent {
  readonly MASKS: any = NgxBrazilMASKS;
  readonly currencyNumber = signal(123456);
  readonly currencyDisplay = computed(() =>
    this.MASKS.utils.numberToString(this.currencyNumber())
  );
}
