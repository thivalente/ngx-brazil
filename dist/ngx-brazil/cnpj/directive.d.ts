import { Validator, AbstractControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class CNPJValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CNPJValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CNPJValidator, "[cnpj][formControlName],[cnpj][formControl],[cnpj][ngModel]", never, {}, {}, never, never, true, never>;
}
