import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DemoRoutingModule } from './demo-routing.module';

import { NgxBrazil, NgxBrazilMASKS } from 'ngx-brazil';
import { DemoAsPipesComponent } from './as-pipes/demo-as-pipes.component';
import { DemoWithoutMaskComponent } from './without-mask/demo-without-mask.component';
import { DemoWithReactiveFormsComponent } from './with-reactive-forms/demo-with-reactive-forms.component';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrl: './demo.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DemoRoutingModule,
        NgxBrazil,
        DemoAsPipesComponent,
        DemoWithoutMaskComponent,
        DemoWithReactiveFormsComponent
    ]
})
export class DemoComponent {
  public MASKS: any = NgxBrazilMASKS;
  public currencyNumber: number = 123456;
}
