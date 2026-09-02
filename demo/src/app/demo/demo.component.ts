import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxBrazil, NgxBrazilMASKS } from 'ngx-brazil';
import { DemoAsPipesComponent } from './as-pipes/demo-as-pipes.component';
import { DemoWithoutMaskComponent } from './without-mask/demo-without-mask.component';
import { DemoWithReactiveFormsComponent } from './with-reactive-forms/demo-with-reactive-forms.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo',
  standalone: true,
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  imports: [
    FormsModule,
    NgxBrazil,
    DemoAsPipesComponent,
    DemoWithoutMaskComponent,
    DemoWithReactiveFormsComponent
  ]
})
export class DemoComponent {
  readonly MASKS: any = NgxBrazilMASKS;
  readonly currencyNumber = signal(123456);
  readonly currencyDisplay = computed(() =>
    this.MASKS.utils.numberToString(this.currencyNumber())
  );
}
