import { Validator, AbstractControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class CEPValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CEPValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CEPValidator, "[cep][formControlName],[cep][formControl],[cep][ngModel]", never, {}, {}, never, never, true, never>;
}
