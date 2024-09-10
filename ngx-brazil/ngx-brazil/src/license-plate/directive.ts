import { Directive, forwardRef} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { licensePlate } from './validator';

const LICENSEPLATE_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    /* tslint:disable: no-use-before-declare */
    useExisting: forwardRef(() => LICENSEPLATEValidator),
    multi: true
};

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[license-plate][formControlName],[license-plate][formControl],[license-plate][ngModel]',
    providers: [LICENSEPLATE_VALIDATOR]
})
export class LICENSEPLATEValidator implements Validator {
    validate(c: AbstractControl): {[key: string]: any} {
        return licensePlate(c);
    }
}
