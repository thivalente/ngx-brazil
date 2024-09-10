import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { cellphone } from './validator';

const CELLPHONE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CellphoneValidator),
  multi: true
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cellphone][formControlName],[cellphone][formControl],[cellphone][ngModel]',
  providers: [CELLPHONE_VALIDATOR]
})
export class CellphoneValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    return cellphone(c);
  }
}
