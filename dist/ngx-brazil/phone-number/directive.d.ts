import { Validator, AbstractControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class PhoneNumberValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<PhoneNumberValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PhoneNumberValidator, "[phoneNumber][formControlName],[phoneNumber][formControl],[phoneNumber][ngModel]", never, {}, {}, never, never, true, never>;
}
