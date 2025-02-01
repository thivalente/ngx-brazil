import { Validator, AbstractControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class NUMBERValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<NUMBERValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NUMBERValidator, "[number][formControlName],[number][formControl],[number][ngModel]", never, {}, {}, never, never, true, never>;
}
