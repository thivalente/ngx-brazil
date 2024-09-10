import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DemoAsPipesComponent } from './demo/as-pipes/demo-as-pipes.component';
import { DemoComponent } from './demo/demo.component';
import { DemoWithReactiveFormsComponent } from './demo/with-reactive-forms/demo-with-reactive-forms.component';
import { ErrorContainerComponent } from './demo/errors-area/error-container.component';

import { DemoWithoutMaskComponent } from './demo/without-mask/demo-without-mask.component';
import { DemoService } from './demo/demo.service';
import { NgxBrazil } from '../../ngx-brazil/src/public_api';

export const routes: Routes = [
  { path: '', component: DemoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DemoAsPipesComponent,
    DemoComponent,
    DemoWithoutMaskComponent,
    DemoWithReactiveFormsComponent,
    ErrorContainerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxBrazil,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {})
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
