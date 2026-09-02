import { Directive, forwardRef} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

import { titulo } from './validator';

const TITULO_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => TITULOValidator),
    multi: true
};

@Directive({
  standalone: true,
    // tslint:disable-next-line:directive-selector
    selector: '[titulo][formControlName],[titulo][formControl],[titulo][ngModel]',
    providers: [TITULO_VALIDATOR]
})
export class TITULOValidator implements Validator {
    validate(c: AbstractControl): ValidationErrors | null {
        return titulo(c);
    }
}
