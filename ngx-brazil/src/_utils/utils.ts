import { STATE_ACRONYMS } from "./states";
import { BigObject } from "./interfaces";

/**
 * Funções utilitárias
 */
export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function isArray(value: any) {
  return (Array.isArray && Array.isArray(value)) || value instanceof Array;
}

export function isString(value: any) {
  return typeof value === 'string' || value instanceof String;
}

export function isNumber(value: any) {
  return typeof value === 'number' && !isNaN(value);
}

export function isNil(value: any) {
  return typeof value === 'undefined' || value === null;
}

/**
 * Processa Caret Traps (para máscaras de entrada)
 */
const strCaretTrap = '[]';
export function processCaretTraps(mask: any) {
  const indexes = [];
  let indexOfCaretTrap: number;
  while ((indexOfCaretTrap = mask.indexOf(strCaretTrap)) !== -1) {
    indexes.push(indexOfCaretTrap);
    mask.splice(indexOfCaretTrap, 1);
  }
  return { maskWithoutCaretTraps: mask, indexes };
}

/**
 * Funções para cálculo de dígito verificador usando módulo 11
 */
export const modulo11 = (value: string) => {
  let mults: any = [];
  let weightVal = 2;
  for (let i = 0; i < value.length; i++) {
    mults.push(weightVal);
    weightVal++;
    if (weightVal > 9) weightVal = 2;
  }

  mults = mults.reverse();

  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    sum += parseInt(value[i]) * mults[i];
  }
  const digit = (sum * 10) % 11;
  return digit;
};

export const modulo11Custom = (string: string, size: number, maxMult = string.length, by10 = true) => {
  if (!by10) size = 1;
  for (let n = 1; n <= size; n++) {
    let soma = 0;
    let mult = 2;
    for (let i = string.length - 1; i >= 0; i--) {
      soma += mult * parseInt(string.charAt(i));
      mult++;
      if (mult > maxMult) mult = 2;
    }
    let dig = by10 ? ((soma * 10) % 11) % 10 : soma % 11;
    if (dig === 10) dig = 0;
    string += dig;
  }
  return string.substr(string.length - size, size);
};

/**
 * Verifica se todos os números de uma string são iguais
 */
export function allNumbersAreSame(inputValue: string) {
  const input: string | void = getAllDigits(inputValue);
  if (typeof input === 'string') {
    const reg = new RegExp('^(\\d)(?!\\1+$)\\d{' + (input.length - 1) + '}$');
    return reg.test(input);
  }
  return false;
}

/**
 * Extrai todos os dígitos de uma string
 */
export function getAllDigits(input: string) {
  if (!input.match) {
    input = input.toString();
  }
  const match = input.match(/\d/g);
  return match ? match.join('') : '';
}

/**
 * Extrai todas as palavras de uma string
 */
export function getAllWords(input: string) {
  const match = input.match(/\w/g);
  return match ? match.join('') : '';
}

/**
 * Converte uma string de moeda para número
 */
export function currencyToNumber(input: string | number) {
  if (typeof input === 'number') {
    return input;
  }
  input = input.replace(/ /g, '').replace(/[^0-9.,]+/, '');
  if (input.indexOf('.') === (input.length - 1) - 2) {
    input = input.replace(/,/g, '');
  } else {
    input = input.replace(/\./g, '').replace(',', '.');
  }
  return parseFloat(input);
}

export const makeGenericFaker = (val: any, options: BigObject<Function> | null = null) => {
    return () => {
      if (!val.textMask || !val.textMask.map) {
        return '';
      }
      const newData = val.textMask.map((c: string | any[], index: number) => {
        if (options && options[index]) {
          return options[index]();
        }
        c = c.toString();
        if (c === /\d/.toString()) {
          return Math.floor(Math.random() * 10).toString()
        } else if (c === /[A-Za-z]/.toString()) {
          return randomLetter(1).toString();
        } else if (c === /\w/.toString()) {
          return randomLetterOrNumber(1).toString();
        } else if (c.indexOf('/[') === 0) { // /[1-9]/ ou /[5-9]/
          c = c.replace('/[', '').replace(']/', '');
  
          if (c.indexOf('-') > 0) {
            c = c.split('-');
            if (parseInt(c[1])) {
              const mult = c[1] - c[0];
              const plus = parseInt(c[0]);
              return (Math.floor(Math.random() * mult) + plus).toString();
            } else {
              return rand(1, [c[0], c[1]]);
            }
          } else if (c.indexOf('|') > 0) {
            c = c.split('|');
            const index = Math.floor(Math.random() * c.length);
            return c[index];
          }
  
        } else {
          return c;
        }
      });
      return newData.join('');
    };
  }

/**
 * Converte número para formato de moeda
 */
export function numberToCurrency(value: number) {
  return ' R$ ' + value.toFixed(2).replace('.', ',') + ' ';
}

/**
 * Slugify - transforma uma string em um formato "slug" (usado em URLs amigáveis)
 */
export function slugify(value: string) {
  return value.toString().toLowerCase()
    .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')
    .replace(/[èÈéÉêÊëË]+/g, 'e')
    .replace(/[ìÌíÍîÎïÏ]+/g, 'i')
    .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')
    .replace(/[ùÙúÚûÛüÜ]+/g, 'u')
    .replace(/[ýÝÿŸ]+/g, 'y')
    .replace(/[ñÑ]+/g, 'n')
    .replace(/[çÇ]+/g, 'c')
    .replace(/[ß]+/g, 'ss')
    .replace(/[Ææ]+/g, 'ae')
    .replace(/[Øøœ]+/g, 'oe')
    .replace(/[%]+/g, 'pct')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function fillString(string: string, size: number, fill: string) {
  if (string.length < size) {
    const dif = size - string.length;
    for (let i = 0; i < dif; i++) {
      string = fill + string
    }
  }
  return string;
}

/**
 * Funções para gerar strings aleatórias
 */

export function randArray(array: string | any[]) {
    const index = randomNumber(0, array.length);
    return array[index];
}


export function rand(length: number, ...ranges: any[]) {
var str = "";                                                       // the string (initialized to "")
while (length--) {                                                  // repeat this length of times
    var ind = Math.floor(Math.random() * ranges.length);              // get a random range from the ranges object
    var min = ranges[ind][0].charCodeAt(0),                           // get the minimum char code allowed for this range
    max = ranges[ind][1].charCodeAt(0);                             // get the maximum char code allowed for this range
    var c = Math.floor(Math.random() * (max - min + 1)) + min;        // get a random char code between min and max
    str += String.fromCharCode(c);                                    // convert it back into a character and append it to the string str
}
return str;                                                         // return str
}

export function randomNumber(begin: number, end: number) {
  const dif = end - begin;
  return Math.floor(Math.random() * dif) + begin;
}

export function randomLetter(size = 1, onlyCapitals = false) {
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (!onlyCapitals) {
    possible += 'abcdefghijklmnopqrstuvwxyz';
  }
  let text = '';
  for (let i = 0; i < size; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function randomLetterOrNumber(size = 1, onlyCapitals = false) {
    var text = "";
    let possible: any = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (onlyCapitals == false) {
      possible += "abcdefghijklmnopqrstuvwxyz0123456789";
    }
    possible = possible.split('');
    for (let i = 0; i < size; i++) {
      const pos = Math.floor(Math.random() * possible.length);
      text += possible[pos];
    }
    return text;
}

export const randomStateAcronym = () => {
    const total = STATE_ACRONYMS.length;
    return STATE_ACRONYMS[Math.floor(Math.random() * total)];
}

export const CORES: string[] = ["AMARELO", "AZUL", "BEGE", "BRANCA", "CINZA", "DOURADA", "GRENA", "LARANJA", "MARROM", "PRATA",
"PRETA", "ROSA", "ROXA", "VERDE", "VERMELHA", "FANTASIA"];


export function getSpecialProperty<TModel, TKey extends keyof TModel>(
model: TModel,
key: TKey
) {
return model[key];
}

/**
 * Exportação de todas as funções como utilitário
 */
export const utilsBr = {
    isPresent,
    isArray,
    isString,
    isNumber,
    isNil,
    processCaretTraps,
    allNumbersAreSame,
    fillString,
    getAllDigits,
    getAllWords,
    getSpecialProperty,
    currencyToNumber,
    makeGenericFaker,
    numberToCurrency,
    slugify,
    randomNumber,
    randomLetter,
    modulo11,
    modulo11Custom,
    randomLetterOrNumber,
    randomEstadoSigla: randomStateAcronym,
    randArray,
    rand
};