import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { phoneNumber } from './validator';

const PHONENUMBER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => PhoneNumberValidator),
  multi: true
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[phoneNumber][formControlName],[phoneNumber][formControl],[phoneNumber][ngModel]',
  providers: [PHONENUMBER_VALIDATOR]
})
export class PhoneNumberValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    return phoneNumber(c);
  }
}
