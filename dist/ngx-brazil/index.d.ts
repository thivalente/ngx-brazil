import * as i0 from '@angular/core';
import { PipeTransform, OnChanges, RendererFactory2, ElementRef, SimpleChanges, ModuleWithProviders } from '@angular/core';
import { Validator, AbstractControl, ControlValueAccessor, ValidatorFn } from '@angular/forms';

interface BigObject<T> {
    [index: string]: T;
}
interface MaskType {
    text?: string;
    textMask: false | (string | RegExp)[] | ((raw: string) => (string | RegExp)[]);
    numberToString?: Function;
    textMaskFunction?: Function;
}

declare class CPFValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CPFValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CPFValidator, "[cpf][formControlName],[cpf][formControl],[cpf][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class CPFPipe implements PipeTransform {
    transform(cpfValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CPFPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CPFPipe, "cpf", true>;
}

declare class CNPJValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CNPJValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CNPJValidator, "[cnpj][formControlName],[cnpj][formControl],[cnpj][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class CNPJPipe implements PipeTransform {
    transform(cnpjValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CNPJPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CNPJPipe, "cnpj", true>;
}

declare class PhoneNumberValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<PhoneNumberValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PhoneNumberValidator, "[phoneNumber][formControlName],[phoneNumber][formControl],[phoneNumber][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class PhoneNumberPipe implements PipeTransform {
    transform(phoneNumberValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PhoneNumberPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<PhoneNumberPipe, "phoneNumber", true>;
}

declare class CellphoneValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CellphoneValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CellphoneValidator, "[cellphone][formControlName],[cellphone][formControl],[cellphone][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class CellphonePipe implements PipeTransform {
    transform(cellphoneValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellphonePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CellphonePipe, "cellphone", true>;
}

declare class InscricaoEstadualValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<InscricaoEstadualValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InscricaoEstadualValidator, "[inscricaoestadual][formControlName],[inscricaoestadual][formControl],[inscricaoestadual][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class InscricaoEstadualPipe implements PipeTransform {
    transform(inscricaoestadualValue: any, estado: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<InscricaoEstadualPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<InscricaoEstadualPipe, "inscricaoestadual", true>;
}

declare class CEPValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CEPValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CEPValidator, "[cep][formControlName],[cep][formControl],[cep][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class CEPPipe implements PipeTransform {
    transform(cepValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CEPPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CEPPipe, "cep", true>;
}

declare class CURRENCYValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CURRENCYValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CURRENCYValidator, "[currency][formControlName],[currency][formControl],[currency][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class CURRENCYPipe implements PipeTransform {
    transform(currencyValue: any, decimalValue?: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CURRENCYPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CURRENCYPipe, "currencyBrazil", true>;
}

declare class NUMBERValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<NUMBERValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NUMBERValidator, "[number][formControlName],[number][formControl],[number][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class NUMBERPipe implements PipeTransform {
    transform(numberValue: any, decimalValue?: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NUMBERPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NUMBERPipe, "numberBrazil", true>;
}

declare class LICENSEPLATEValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<LICENSEPLATEValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LICENSEPLATEValidator, "[license-plate][formControlName],[license-plate][formControl],[license-plate][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class LICENSEPLATEPipe implements PipeTransform {
    transform(licensePlateValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<LICENSEPLATEPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<LICENSEPLATEPipe, "licensePlate", true>;
}

declare class PERCENTAGEValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<PERCENTAGEValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PERCENTAGEValidator, "[percentage][formControlName],[percentage][formControl],[percentage][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class PERCENTAGEPipe implements PipeTransform {
    transform(percentageValue: any, decimalValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PERCENTAGEPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<PERCENTAGEPipe, "percentage", true>;
}

declare class RenavamValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<RenavamValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RenavamValidator, "[renavam][formControlName],[renavam][formControl],[renavam][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class RenavamPipe implements PipeTransform {
    transform(renavamValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RenavamPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RenavamPipe, "renavam", true>;
}

declare class PispasepValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<PispasepValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PispasepValidator, "[pispasep][formControlName],[pispasep][formControl],[pispasep][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class PispasepPipe implements PipeTransform {
    transform(pispasepValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PispasepPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<PispasepPipe, "pispasep", true>;
}

declare class RGValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<RGValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RGValidator, "[rg][formControlName],[rg][formControl],[rg][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class RGPipe implements PipeTransform {
    transform(rgValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RGPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RGPipe, "rg", true>;
}

declare class TIMEValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<TIMEValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TIMEValidator, "[time][formControlName],[time][formControl],[time][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class TIMEPipe implements PipeTransform {
    transform(timeValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TIMEPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TIMEPipe, "time", true>;
}

declare class TITULOValidator implements Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<TITULOValidator, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TITULOValidator, "[titulo][formControlName],[titulo][formControl],[titulo][ngModel]", never, {}, {}, never, never, true, never>;
}

declare class TITULOPipe implements PipeTransform {
    transform(tituloValue: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TITULOPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TITULOPipe, "titulo", true>;
}

declare class TextMaskConfig {
    mask: Array<string | RegExp> | ((raw: string) => Array<string | RegExp>) | false;
    guide?: boolean;
    placeholderChar?: string;
    pipe?: (conformedValue: string, config: TextMaskConfig) => false | string | object;
    keepCharPositions?: boolean;
    showMask?: boolean;
}
declare class MaskedInputDirective implements ControlValueAccessor, OnChanges {
    private _elementRef;
    private _compositionMode;
    textMaskConfig: TextMaskConfig;
    private textMaskInputElement;
    private inputElement;
    private _renderer;
    /** Whether the user is creating a composition string (IME events). */
    private _composing;
    constructor(rendererFactory: RendererFactory2, _elementRef: ElementRef, _compositionMode: boolean);
    onChange: (_: any) => void;
    onTouched: () => void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    _handleInput(value: any): void;
    _setupMask(create?: boolean): void;
    _compositionStart(): void;
    _compositionEnd(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MaskedInputDirective, [null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MaskedInputDirective, "[textMask]", ["textMask"], { "textMaskConfig": { "alias": "textMask"; "required": false; }; }, {}, never, never, true, never>;
}

declare const cpf: ValidatorFn;

declare const cnpj: ValidatorFn;

declare const phoneNumber: ValidatorFn;

declare const cellphone: ValidatorFn;

declare const inscricaoestadual: (estado: string) => ValidatorFn;

declare const cep: ValidatorFn;

declare const currency: ValidatorFn;

declare const number: ValidatorFn;

declare const licensePlate: ValidatorFn;

declare const percentage: ValidatorFn;

declare const renavam: ValidatorFn;

declare const pispasep: ValidatorFn;

declare const rg: ValidatorFn;

declare const time: ValidatorFn;

declare const titulo: ValidatorFn;

declare const NgxBrazilValidators: any;
declare const NgxBrazilMASKS: BigObject<MaskType>;
declare const NgxBrazilMASKSIE: BigObject<any>;

declare const NgxBrazilCustomDirectives: (typeof CPFValidator | typeof CURRENCYPipe | typeof MaskedInputDirective)[];
declare const NgxBrazilDirectives: {
    CellphoneValidator: typeof CellphoneValidator;
    CellphonePipe: typeof CellphonePipe;
    CEPValidator: typeof CEPValidator;
    CEPPipe: typeof CEPPipe;
    CNPJValidator: typeof CNPJValidator;
    CNPJPipe: typeof CNPJPipe;
    CPFValidator: typeof CPFValidator;
    CPFPipe: typeof CPFPipe;
    CURRENCYValidator: typeof CURRENCYValidator;
    CURRENCYPipe: typeof CURRENCYPipe;
    InscricaoEstadualValidator: typeof InscricaoEstadualValidator;
    InscricaoEstadualPipe: typeof InscricaoEstadualPipe;
    NUMBERValidator: typeof NUMBERValidator;
    NUMBERPipe: typeof NUMBERPipe;
    PERCENTAGEValidator: typeof PERCENTAGEValidator;
    PERCENTAGEPipe: typeof PERCENTAGEPipe;
    PispasepValidator: typeof PispasepValidator;
    PispasepPipe: typeof PispasepPipe;
    LICENSEPLATEValidator: typeof LICENSEPLATEValidator;
    LICENSEPLATEPipe: typeof LICENSEPLATEPipe;
    RGValidator: typeof RGValidator;
    RGPipe: typeof RGPipe;
    RenavamValidator: typeof RenavamValidator;
    RenavamPipe: typeof RenavamPipe;
    PhoneNumberValidator: typeof PhoneNumberValidator;
    PhoneNumberPipe: typeof PhoneNumberPipe;
    TIMEValidator: typeof TIMEValidator;
    TIMEPipe: typeof TIMEPipe;
    TITULOValidator: typeof TITULOValidator;
    TITULOPipe: typeof TITULOPipe;
};
declare class NgxBrazil {
    static forRoot(): ModuleWithProviders<NgxBrazil>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxBrazil, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxBrazil, never, [typeof CellphoneValidator, typeof CellphonePipe, typeof CEPValidator, typeof CEPPipe, typeof CNPJValidator, typeof CNPJPipe, typeof CPFValidator, typeof CPFPipe, typeof CURRENCYValidator, typeof CURRENCYPipe, typeof InscricaoEstadualValidator, typeof InscricaoEstadualPipe, typeof NUMBERValidator, typeof NUMBERPipe, typeof PERCENTAGEValidator, typeof PERCENTAGEPipe, typeof PispasepValidator, typeof PispasepPipe, typeof LICENSEPLATEValidator, typeof LICENSEPLATEPipe, typeof RGValidator, typeof RGPipe, typeof RenavamValidator, typeof RenavamPipe, typeof PhoneNumberValidator, typeof PhoneNumberPipe, typeof TIMEValidator, typeof TIMEPipe, typeof TITULOValidator, typeof TITULOPipe, typeof MaskedInputDirective], [typeof CellphoneValidator, typeof CellphonePipe, typeof CEPValidator, typeof CEPPipe, typeof CNPJValidator, typeof CNPJPipe, typeof CPFValidator, typeof CPFPipe, typeof CURRENCYValidator, typeof CURRENCYPipe, typeof InscricaoEstadualValidator, typeof InscricaoEstadualPipe, typeof NUMBERValidator, typeof NUMBERPipe, typeof PERCENTAGEValidator, typeof PERCENTAGEPipe, typeof PispasepValidator, typeof PispasepPipe, typeof LICENSEPLATEValidator, typeof LICENSEPLATEPipe, typeof RGValidator, typeof RGPipe, typeof RenavamValidator, typeof RenavamPipe, typeof PhoneNumberValidator, typeof PhoneNumberPipe, typeof TIMEValidator, typeof TIMEPipe, typeof TITULOValidator, typeof TITULOPipe, typeof MaskedInputDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxBrazil>;
}

export { CEPPipe, CEPValidator, CNPJPipe, CNPJValidator, CPFPipe, CPFValidator, CURRENCYPipe, CURRENCYValidator, CellphonePipe, CellphoneValidator, InscricaoEstadualPipe, InscricaoEstadualValidator, LICENSEPLATEPipe, LICENSEPLATEValidator, MaskedInputDirective, NUMBERPipe, NUMBERValidator, NgxBrazil, NgxBrazilCustomDirectives, NgxBrazilDirectives, NgxBrazilMASKS, NgxBrazilMASKSIE, NgxBrazilValidators, PERCENTAGEPipe, PERCENTAGEValidator, PhoneNumberPipe, PhoneNumberValidator, PispasepPipe, PispasepValidator, RGPipe, RGValidator, RenavamPipe, RenavamValidator, TIMEPipe, TIMEValidator, TITULOPipe, TITULOValidator, cellphone, cep, cnpj, cpf, currency, inscricaoestadual, licensePlate, number, percentage, phoneNumber, pispasep, renavam, rg, time, titulo };
