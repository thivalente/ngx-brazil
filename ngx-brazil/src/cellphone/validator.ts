import { AbstractControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { utilsBr } from '../_utils/utils';
import { validateBr } from '../_utils/validate';

export const cellphone: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value;
  return validateBr.cellphone(v) ? null : { cellphone: true };
}
