import { getAllDigits, makeGenericFaker } from "../utils";

export const fakerIptu = (estado: string | number, cidade: string | number) => {
    if (!iptuMasks[estado] || !iptuMasks[estado][cidade]) {
      return;
    }
    let iptu = makeGenericFaker(iptuMasks[estado][cidade])();
    if (iptuCreate[estado] && iptuCreate[estado][cidade]) {
      const dv = iptuCreate[estado][cidade](iptu);
      const values = iptu.split('');
      values[values.length - 1] = dv;
      iptu = values.join('');
    }
    return iptu;
};

export function createIptuCtba(number: string) {
    number = getAllDigits(number);
    let a1 = parseInt(number.slice(10));
    let a2 = parseInt(number.slice(9, 10));
    let a3 = parseInt(number.slice(8, 9));
    let a4 = parseInt(number.slice(7, 8));
    let a5 = parseInt(number.slice(6, 7));
    let a6 = parseInt(number.slice(5, 6));
    let a7 = parseInt(number.slice(4, 5));
    let a8 = parseInt(number.slice(3, 4));
    let a9 = parseInt(number.slice(2, 3));
    let a10 = parseInt(number.slice(1, 2));
    let a11 = parseInt(number.slice(0, 1));
  
    let iptuCtbaDV = 10 - ((a1 * 2 + a2 * 3 + a3 * 4 + a4 * 7 + a5 * 8 + a6 * 9 + a7 * 2 + a8 * 3 + a9 * 4 + a10 * 7 + a11 * 8) % 10);
    if (iptuCtbaDV === 10) { iptuCtbaDV = 0; }
    return iptuCtbaDV;
}
  
export function createIptuSp(number: string) {
    let a1 = parseInt(number.slice(9));
    let a2 = parseInt(number.slice(8, 9));
    let a3 = parseInt(number.slice(7, 8));
    let a4 = parseInt(number.slice(6, 7));
    let a5 = parseInt(number.slice(5, 6));
    let a6 = parseInt(number.slice(4, 5));
    let a7 = parseInt(number.slice(3, 4));
    let a8 = parseInt(number.slice(2, 3));
    let a9 = parseInt(number.slice(1, 2));
    let a10 = parseInt(number.slice(0, 1));
  
    let iptuSpDV = (a1 * 9 + a2 * 8 + a3 * 7 + a4 * 6 + a5 * 5 + a6 * 4 + a7 * 3 + a8 * 2 + a9 + a10 * 10) % 11;
    if (iptuSpDV === 10) { iptuSpDV = 1; }
    return iptuSpDV;
}

export const iptuCreate: Record<string, Record<string, Function>> = {
    'sao-paulo': {
      'sao-paulo': createIptuSp,
    },
    'parana': {
      'curitiba': createIptuCtba,
    },
};

export const iptuMasks: Record<string, Record<string, any>> = {
    'minas-gerais': {
      'belo-horizonte': {
        text: '000.000.000.000.0', 
        textMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/]
      },
      'contagem': {
        text: '20.040.040-1',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/],
        textMaskFunction: function mask(userInput: any) {
          const numbers = userInput.match(/\d/g);
          let numberLength = 0;
          if (numbers) {
            numberLength = numbers.join('').length;
          }
          if (!userInput || numberLength > 9) {
            return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
          } else {
            return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];
          }
        }
      }
    },
    'sao-paulo': {
      'sao-paulo': {
        text: '00000000000-0',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
      }
    },
    'parana': {
      'curitiba': {
        text: '00000000000-0',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
      }
    }
};