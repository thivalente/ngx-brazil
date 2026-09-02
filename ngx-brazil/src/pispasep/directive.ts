import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { pispasep } from './validator';

const PISPASE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => PispasepValidator),
  multi: true
};

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[pispasep][formControlName],[pispasep][formControl],[pispasep][ngModel]',
  providers: [PISPASE_VALIDATOR]
})
export class PispasepValidator implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    return pispasep(c);
  }
}
