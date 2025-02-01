import { Validator, AbstractControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class RGValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<RGValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RGValidator, "[rg][formControlName],[rg][formControl],[rg][ngModel]", never, {}, {}, never, never, true, never>;
}
