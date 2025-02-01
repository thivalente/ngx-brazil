import { BigObject, MaskType } from './interfaces';
export declare const MASKS: BigObject<MaskType>;
export declare const maskBr: {
    aih: (value: string) => string;
    cartaocredito: (value: string) => string;
    cellphone: (value: string) => string;
    cep: (value: string) => string;
    certidao: (value: string) => string;
    chassi: (value: string) => string;
    cnae: (value: string) => string;
    cnh: (value: string) => string;
    renachseguranca: (value: string) => string;
    renachestadual: (value: string) => string;
    cnhespelho: (value: string) => string;
    cnpj: (value: string) => string;
    cns: (value: string) => string;
    contabanco: (value: string) => string;
    cpf: (value: string) => string;
    cpfcnpj: (value: string) => string;
    currency: (currencyValueInput: string | number, decimalsFormat?: number) => string;
    data: (value: string) => string;
    date: (value: string) => string;
    datetime: (value: string) => string;
    datahora: (value: string) => string;
    ect: (value: string) => string;
    endereco: (value: string) => string;
    inscricaoestadual: (inscricaoestadualValue: string, estado: string) => string;
    iptu: (iptuValue: string, estado: string, cidade: string) => string;
    number: (numberValue: any, decimalsFormat?: number) => string;
    porcentagem: (porcentagemValue: string, decimalsFormat?: number) => string;
    pispasep: (value: string) => string;
    licensePlate: (value: string) => string;
    processo: (value: string) => string;
    renavam: (value: string) => string;
    rg: (value: string) => string;
    sped: (value: string) => string;
    phoneNumber: (value: string) => string;
    time: (value: string | Date) => string;
    titulo: (value: string) => string;
};
/**
 * FROM TEXT-MASK
 */
export declare const placeholderChar = "_";
export declare const strFunction = "function";
export declare function conformToMask(inputValue?: String | Date, mask?: any, config?: any): {
    conformedValue: string;
    meta: {
        someCharsRejected: boolean;
    };
};
export declare function convertMaskToPlaceholder(mask?: any, placeholderChar?: string): string;
