import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { utilsBr } from '../_utils/utils';
import { validateBr } from '../_utils/validate';

export const cpf: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value;
  return validateBr.cpf(v) ? null : {cpf: true};
}
