import { Component } from '@angular/core';
import { NgxBrazilMASKS } from '../../../ngx-brazil/src/public_api';

@Component({ selector: 'app-demo', templateUrl: './demo.component.html', styleUrls: ['./demo.component.scss']})
export class DemoComponent {
    public MASKS = NgxBrazilMASKS;
    
    public currencyNumber: number = 123456;
}
