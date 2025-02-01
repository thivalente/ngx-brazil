import { BigObject } from "./interfaces";
/**
 * Funções utilitárias
 */
export declare function isPresent(obj: any): boolean;
export declare function isArray(value: any): value is any[];
export declare function isString(value: any): value is string | String;
export declare function isNumber(value: any): boolean;
export declare function isNil(value: any): boolean;
export declare function processCaretTraps(mask: any): {
    maskWithoutCaretTraps: any;
    indexes: any[];
};
/**
 * Funções para cálculo de dígito verificador usando módulo 11
 */
export declare const modulo11: (value: string) => number;
export declare const modulo11Custom: (string: string, size: number, maxMult?: number, by10?: boolean) => string;
/**
 * Verifica se todos os números de uma string são iguais
 */
export declare function allNumbersAreSame(inputValue: string): boolean;
/**
 * Extrai todos os dígitos de uma string
 */
export declare function getAllDigits(input: string): string;
/**
 * Extrai todas as palavras de uma string
 */
export declare function getAllWords(input: string): string;
/**
 * Converte uma string de moeda para número
 */
export declare function currencyToNumber(input: string | number): number;
export declare const makeGenericFaker: (val: any, options?: BigObject<Function> | null) => () => any;
/**
 * Converte número para formato de moeda
 */
export declare function numberToCurrency(value: number): string;
/**
 * Slugify - transforma uma string em um formato "slug" (usado em URLs amigáveis)
 */
export declare function slugify(value: string): string;
export declare function fillString(string: string, size: number, fill: string): string;
/**
 * Funções para gerar strings aleatórias
 */
export declare function randArray(array: string | any[]): any;
export declare function rand(length: number, ...ranges: any[]): string;
export declare function randomNumber(begin: number, end: number): number;
export declare function randomLetter(size?: number, onlyCapitals?: boolean): string;
export declare function randomLetterOrNumber(size?: number, onlyCapitals?: boolean): string;
export declare const randomStateAcronym: () => any;
export declare const CORES: string[];
export declare function getSpecialProperty<TModel, TKey extends keyof TModel>(model: TModel, key: TKey): TModel[TKey];
/**
 * Exportação de todas as funções como utilitário
 */
export declare const utilsBr: {
    isPresent: typeof isPresent;
    isArray: typeof isArray;
    isString: typeof isString;
    isNumber: typeof isNumber;
    isNil: typeof isNil;
    processCaretTraps: typeof processCaretTraps;
    allNumbersAreSame: typeof allNumbersAreSame;
    fillString: typeof fillString;
    getAllDigits: typeof getAllDigits;
    getAllWords: typeof getAllWords;
    getSpecialProperty: typeof getSpecialProperty;
    currencyToNumber: typeof currencyToNumber;
    makeGenericFaker: (val: any, options?: BigObject<Function> | null) => () => any;
    numberToCurrency: typeof numberToCurrency;
    slugify: typeof slugify;
    randomNumber: typeof randomNumber;
    randomLetter: typeof randomLetter;
    modulo11: (value: string) => number;
    modulo11Custom: (string: string, size: number, maxMult?: number, by10?: boolean) => string;
    randomLetterOrNumber: typeof randomLetterOrNumber;
    randomEstadoSigla: () => any;
    randArray: typeof randArray;
    rand: typeof rand;
};
