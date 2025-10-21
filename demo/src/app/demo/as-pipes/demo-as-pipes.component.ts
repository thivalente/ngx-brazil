import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DATARAW } from './_models/dataraw';
import { NgxBrazil } from 'ngx-brazil';

@Component({
    selector: 'app-as-pipes',
    templateUrl: './demo-as-pipes.component.html',
    styleUrls: ['./demo-as-pipes.component.scss'],
    imports: [
        CommonModule,
        NgxBrazil
    ]
})
export class DemoAsPipesComponent {
    public DATARAW = DATARAW;
}
