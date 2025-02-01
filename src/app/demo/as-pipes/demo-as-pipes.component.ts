import { Component } from '@angular/core';
import { DATARAW } from './_models/dataraw';

@Component({
    selector: 'app-as-pipes', templateUrl: './demo-as-pipes.component.html', styleUrls: ['./demo-as-pipes.component.scss'],
    standalone: false
})
export class DemoAsPipesComponent {
    public DATARAW = DATARAW;
}
