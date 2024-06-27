import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgxBrazil, TextMask } from '../../ngx-brazil/src/public_api';
import { DemoComponent } from './demo/demo.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path: '', component: DemoComponent }
];

@NgModule({
  declarations: [
    AppComponent, DemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMask.TextMaskModule,
    NgxBrazil,
    RouterModule.forRoot(routes, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
