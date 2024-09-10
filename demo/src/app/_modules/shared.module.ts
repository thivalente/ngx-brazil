import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBrazil } from 'ngx-brazil';

@NgModule({
  imports: [
    NgxBrazil.forRoot(),
    NgxBrazil.TextMaskModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    NgxBrazil,
    NgxBrazil.TextMaskModule
  ]
})
export class SharedModule { }