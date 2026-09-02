import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

import { rg } from './validator';

const RG_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => RGValidator),
  multi: true
};

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[rg][formControlName],[rg][formControl],[rg][ngModel]',
  providers: [RG_VALIDATOR]
})
export class RGValidator implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    return rg(c);
  }
}
