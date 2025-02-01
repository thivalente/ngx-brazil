import { BigObject } from './interfaces';
export declare function validateAih(aih: string): boolean;
export declare function validateCellphone(cel: any): boolean;
export declare const CEPRange: BigObject<RegExp>;
export declare function validateCep(cep: string): boolean;
export declare function cepRanges(cep: string | number): boolean;
export declare function validateCertidao(value: string): boolean;
export declare function validateChassi(chassi: string): boolean;
export declare function validateCnae(number: any): boolean;
export declare function validateCnh(value: string): boolean;
export declare function validateCnhEspelho(value: string): boolean;
export declare function validateRenachEstadual(value: string): boolean;
export declare function validateRenachSeguranca(value: string): boolean;
export declare function validateCnpj(cnpj: string): boolean;
export declare function validateCpf(strCpf: any): boolean;
export declare function validateCpfCnpj(number: any): boolean;
export declare function validateCartaoCredito(input: string | number): boolean;
/**
 *     A hash of valid CC abbreviations and regular expressions
    mc: Mastercard
    ec: Eurocard
    vi: Visa
    ax: American Express
    dc: Diners Club
    bl: Carte Blanch
    di: Discover
    jcb: JCB
    er: Enroute
*/
export declare const creditCardValidator: BigObject<RegExp>;
export declare function validateCns(value: string): boolean;
export declare function validateTitulo(titulo: any): boolean;
export declare function validateProcesso(processo: any): boolean;
export declare function validateRenavam(renavam: any): boolean;
export declare function validateRg(rg: string): any;
export declare function validateSenha(value: string, options?: any): boolean;
export declare function validateSite(value: any): boolean;
export declare function validateSped(sped: string): boolean;
export declare function validatePhoneNumber(tel: any): boolean;
export declare function validateTime(time: string | number, options?: any): boolean;
export declare function validateCurrency(currency: string | number): boolean;
export declare function validateContaBanco(number: any): boolean;
export declare function validateData(value: string | null): boolean;
export declare function validateDate(value: string | null): boolean;
export declare function validateDatetime(time: string | number, options?: any): boolean;
export declare function validateDataHora(time: string | number, options?: any): boolean;
export declare function validateEct(number: string): boolean;
export declare function validateEmail(email: any): boolean;
export declare function validateEndereco(number: any): boolean;
export declare function validateNumber(number: string): boolean;
export declare function validatePorcentagem(porcentagem: string): boolean;
export declare function validatePispasep(number: string): boolean;
export declare function validateUsername(value: any): boolean;
export declare const LICENSEPLATES_RANGE: string[][];
export declare const LICENSEPLATES_INVALID: {
    start: string;
    end: string;
};
export declare function validateLicensePlate(licensePlate: string | number, includesMercosul?: boolean): boolean;
export declare function rgSP(number: string): any;
export declare function rgRJ(number: string): number;
declare const RG: BigObject<Function>;
export default RG;
export declare const validateBr: BigObject<Function>;
