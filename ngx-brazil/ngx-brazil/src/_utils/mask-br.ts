import { BigObject, MaskType } from './interfaces';
import { createNumberMask } from './masks/create-number-mask';
import { isArray, processCaretTraps } from './utils';
import { maskIptu } from './iptu';
import { MASKSIE } from './inscricao-estadual';

const maskNumber: any = {
  decimalLimit: 2,
  thousandsSeparatorSymbol: '.',
  decimalSymbol: ',',
  allowDecimal: true,
  integerLimit: 17,
  prefix: '',
  suffix: ''
};

export const MASKS: BigObject<MaskType> = {
  aih: {
    text: '000000000000-0', 
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
  },
  cartaocredito: {
    text: '0000 0000 0000 0000 00/00 000',
    textMask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, /\d/]
  },
  celular: {
    text: '(00) 00000-0000',
    textMask: ['(', /[1-9]/, /\d/, ')', ' ', /[5-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  },
  cep: {
    text: '00.000-000',
    textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
  },
  certidao: {
    text: '000000.00.00.0000.0.00000.000.0000000-00', 
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  },
  chassi: {
    text: 'AAA AAAAAA AA AA0000', 
    textMask: [/[1-9]/, /\w/, /\w/, ' ', /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, ' ', /\w/, /\w/, ' ', /\w/, /\w/, /\d/, /\d/, /\d/, /\d/]
  },
  cid: {
    textMask: false
  },
  cnae: {
    text: '0000-0/00',
    textMask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, '/', /\d/, /\d/]
  },
  cnh: {
    text: '000000000-00',
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  },
  renachseguranca: {
    text: '00000000000',
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  renachestadual: {
    text: 'AA000000000',
    textMask: [/[A-S]/, /[A-Z]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  cnhespelho: {
    text: '0000000000',
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  cnpj: {
    text: '00.000.000/0000-00',
    textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  },
  cns: {
    text: '000 0000 0000 00-00',
    textMask: [/[1|2|7|8|9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '-', /\d/, /\d/]
  },
  contabanco: {
    text: '000 00000-0 00000-0',
    textMask: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
  },
  cpf: {
    text: '000.000.000-00',
    textMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  },
  cpfcnpj: {
    text: '0000.0000.0000',
    textMask: [/\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  currency: {
    text: '0.000,00',
    textMask: createNumberMask({
      ...maskNumber,
      prefix: 'R$ ',
      allowNegative: true
    })
  },
  data: {
    text: '00/00/0000',
    textMask: [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  date: {
    text: '00/00/0000',
    textMask: [/[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/, '/', /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  datetime: {
    text: '00/00/0000 00:00',
    textMask: [/[0-1]/, /[0-9]/, '/', /[0-3]/, /[0-9]/, '/', /[0-2]/, /[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /[0-5]/, /\d/]
  },
  datahora: {
    text: '00/00/0000 00:00',
    textMask: [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-2]/, /[0-9]/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /[0-5]/, /\d/]
  },
  ect: {
    text: '00000000-0',
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
  },
  endereco: {
    text: '0000.0000.0000',
    textMask: [/\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  iptu: {
    text: '0000.0000.0000',
    textMask: [/\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  number: {
    text: '0.000,00',
    textMask: createNumberMask(maskNumber)
  },
  porcentagem: {
    text: '00,00%',
    textMask: createNumberMask({
      ...maskNumber,
      suffix: '%'
    })
  },
  pispasep: {
    text: '000.00000.00-0',
    textMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/]
  },
  licensePlate: {
    text: 'AAA-0000',
    textMask: [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, '-', /\d/, /[A-Za-z\d]/, /\d/, /\d/]
  },
  processo: {
    text: '0000000-00.0000.AAA.0000',
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, '.', /\d/, /\d/, /\d/, /\d/]
  },
  renavam: {
    text: '0000000000-00',
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/],
    textMaskFunction: function mask(userInput: any) {
      const numbers = userInput.match(/\d/g);
      let numberLength = 0;
      if (numbers) {
        numberLength = numbers.join('').length;
      }
      if (!userInput || numberLength < 9) {
        return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
      } else {
        return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
      }
    }
  },
  rg: {
    text: 'AA-00.000.000',
    textMask: [/[A-Za-z]/, /[A-Za-z]/, '-', /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]
  },
  sped: {
    text: '0000.0000.0000',
    textMask: [/\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  phoneNumber: {
    text: '(00) 00000-0000',
    textMask: ['(', /[1-9]/, /\d/, ')', ' ', /[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    textMaskFunction: function mask(userInput: any) {
      const numbers = userInput.match(/\d/g);
      let numberLength = 0;
      if (numbers) {
        numberLength = numbers.join('').length;
      }
      if (!userInput || numberLength > 10) {
        return ['(', /[1-9]/, /\d/, ')', ' ', /[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      } else {
        return ['(', /[1-9]/, /\d/, ')', ' ', /[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      }
    }
  },
  time: {
    text: '00:00',
    textMask: [/\d/, /\d/, ':', /[0-5]/, /\d/]
  },
  titulo: {
    text: '0000.0000.0000',
    textMask: [/\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  utils: {
    numberToString: (n: number) => {
      if (!n || typeof n === 'string') {
        return n;
      }
      return (n.toString()).replace('.', ',');
    },
    textMask: false
  }
};

const makeGeneric = (key: string) => {
  return (value: string) => {
    if (!value) {
      return '';
    }
    let mask = MASKS[key].textMask;
    let textMaskFunction = MASKS[key].textMaskFunction;
    if (typeof textMaskFunction === 'function') {
      mask = textMaskFunction(value);
    }

    return conformToMask(
      value,
      mask,
      { guide: false }
    ).conformedValue;
  };
};

function formatNumber(maskType: any, numberValue: any, decimalsFormat: number = 2) {
  if (!numberValue && numberValue !== 0) {
    return '';
  }

  if (typeof numberValue !== 'string') {
    numberValue = numberValue.toString().replace('.', ',');
  }

  const vals = numberValue.split(',');

  if (!maskType.textMask || typeof maskType.textMask !== 'function') {
    return '';
  }

  const mask = maskType.textMask(vals[0]);

  let formattedValue = conformToMask(numberValue, mask, { guide: false }).conformedValue;
  let decimalPart = vals[1] && decimalsFormat > 0 ? ',' + vals[1].padEnd(decimalsFormat, '0') : '';

  return formattedValue + decimalPart;
}

export const maskBr = {
  aih: makeGeneric('aih'),
  cartaocredito: makeGeneric('cartaocredito'),
  celular: makeGeneric('celular'),
  cep: makeGeneric('cep'),
  certidao: makeGeneric('certidao'),
  chassi: makeGeneric('chassi'),
  cnae: makeGeneric('cnae'),
  cnh: makeGeneric('cnh'),
  renachseguranca: makeGeneric('renachseguranca'),
  renachestadual: makeGeneric('renachestadual'),
  cnhespelho: makeGeneric('cnhespelho'),
  cnpj: makeGeneric('cnpj'),
  cns: makeGeneric('cns'),
  contabanco: makeGeneric('contabanco'),
  cpf: makeGeneric('cpf'),
  cpfcnpj: makeGeneric('cpfcnpj'),
  currency: (currencyValueInput: string | number, decimalsFormat: number = 2) => {
    return formatNumber(MASKS['currency'], currencyValueInput, decimalsFormat);
  },
  data: makeGeneric('data'),
  date: makeGeneric('date'),
  datetime: makeGeneric('datetime'),
  datahora: makeGeneric('datahora'),
  ect: makeGeneric('ect'),
  endereco: makeGeneric('endereco'),
  inscricaoestadual: (inscricaoestadualValue: string, estado: string) => {
    const ie = MASKSIE;
    const ieState = ie[estado];

    if (!inscricaoestadualValue || !estado || !ieState || !ieState.textMask) {
      return '';
    }

    let mask = ieState.textMask;
    let textMaskFunction = ieState.textMaskFunction;
    if (typeof textMaskFunction === 'function') {
      mask = textMaskFunction(inscricaoestadualValue);
    }

    return conformToMask(inscricaoestadualValue, mask, { guide: false }).conformedValue;
  },
  iptu: (iptuValue: string, estado: string, cidade: string) => {
    const mask = maskIptu(iptuValue, estado, cidade);
    if (!mask || typeof mask === 'string') {
      return '';
    }
    return conformToMask(iptuValue, mask.textMask, { guide: false }).conformedValue;
  },
  number: (numberValue: any, decimalsFormat: number = 2) => {
    return formatNumber(MASKS['number'], numberValue, decimalsFormat);
  },
  porcentagem: (porcentagemValue: string, decimalsFormat: number = 2) => {
    return formatNumber(MASKS['porcentagem'], porcentagemValue, decimalsFormat);
  },
  pispasep: makeGeneric('pispasep'),
  licensePlate: makeGeneric('licensePlate'),
  processo: makeGeneric('processo'),
  renavam: makeGeneric('renavam'),
  rg: makeGeneric('rg'),
  sped: makeGeneric('sped'),
  phoneNumber: makeGeneric('phoneNumber'),
  time: (value: string | Date) => {
    if (value instanceof Date) {
      value = value.toTimeString().split(' ')[0];
    }
    return makeGeneric('time')(value);
  },
  titulo: makeGeneric('titulo')
};

/**
 * FROM TEXT-MASK
 */
export const placeholderChar = '_';
export const strFunction = 'function';

const defaultPlaceholderChar = placeholderChar;
const emptyArray: any = [];
const emptyString = '';

export function conformToMask(inputValue: String | Date = emptyString, mask = emptyArray, config: any = {}) {
  let rawValue = inputValue.toString();
  if (typeof inputValue === 'number') {
    rawValue = (<number>inputValue).toString();
  }
  if (inputValue instanceof Date) {
    rawValue = (<Date>inputValue).toLocaleString("pt-br");
  }

  if (!isArray(mask)) {
    if (typeof mask === strFunction) {
      mask = mask(inputValue, config);
      mask = processCaretTraps(mask).maskWithoutCaretTraps;
    } else {
      throw new Error('Text-mask:conformToMask; The mask property must be an array.');
    }
  }

  const guide = config.guide || true;
  const previousConformedValue = config.previousConformedValue || emptyString;
  const placeholder = convertMaskToPlaceholder(mask, placeholderChar);
  const currentCaretPosition = config.currentCaretPosition;
  const keepCharPositions = config.keepCharPositions;

  const suppressGuide = guide === false && previousConformedValue !== undefined;
  const rawValueLength = rawValue.length;
  const previousConformedValueLength = previousConformedValue.length;
  const placeholderLength = placeholder.length;
  const maskLength = mask.length;
  const editDistance = rawValueLength - previousConformedValueLength;
  const isAddition = editDistance > 0;
  const indexOfFirstChange = currentCaretPosition + (isAddition ? -editDistance : 0);
  const indexOfLastChange = indexOfFirstChange + Math.abs(editDistance);

  if (keepCharPositions === true && !isAddition) {
    let compensatingPlaceholderChars = emptyString;
    for (let i = indexOfFirstChange; i < indexOfLastChange; i++) {
      if (placeholder[i] === placeholderChar) {
        compensatingPlaceholderChars += placeholderChar;
      }
    }
    rawValue = rawValue.slice(0, indexOfFirstChange) + compensatingPlaceholderChars + rawValue.slice(indexOfFirstChange, rawValueLength);
  }

  const rawValueArr = rawValue.split(emptyString).map((char, i) => ({ char, isNew: i >= indexOfFirstChange && i < indexOfLastChange }));

  for (let i = rawValueLength - 1; i >= 0; i--) {
    const { char } = rawValueArr[i];
    if (char !== placeholderChar) {
      const shouldOffset = i >= indexOfFirstChange && previousConformedValueLength === maskLength;
      if (char === placeholder[(shouldOffset) ? i - editDistance : i]) {
        rawValueArr.splice(i, 1);
      }
    }
  }

  let conformedValue = emptyString;
  let someCharsRejected = false;

  placeholderLoop: for (let i = 0; i < placeholderLength; i++) {
    const charInPlaceholder = placeholder[i];
    if (charInPlaceholder === placeholderChar) {
      if (rawValueArr.length > 0) {
        while (rawValueArr.length > 0) {
          const shift = rawValueArr.shift();
          let rawValueChar: string = '', isNew: boolean = false;
          if (shift) {
            rawValueChar = shift.char;
            isNew = shift.isNew;
          }

          if (rawValueChar === placeholderChar && suppressGuide !== true) {
            conformedValue += placeholderChar;
            continue placeholderLoop;
          } else if (mask[i].test(rawValueChar)) {
            if (
              keepCharPositions !== true ||
              isNew === false ||
              previousConformedValue === emptyString ||
              guide === false ||
              !isAddition
            ) {
              conformedValue += rawValueChar;
            } else {
              const rawValueArrLength = rawValueArr.length;
              let indexOfNextAvailablePlaceholderChar: number | null = null;
              for (let i = 0; i < rawValueArrLength; i++) {
                const charData = rawValueArr[i];
                if (charData.char !== placeholderChar && charData.isNew === false) {
                  break;
                }
                if (charData.char === placeholderChar) {
                  indexOfNextAvailablePlaceholderChar = i;
                  break;
                }
              }
              if (indexOfNextAvailablePlaceholderChar !== null) {
                conformedValue += rawValueChar;
                rawValueArr.splice(indexOfNextAvailablePlaceholderChar, 1);
              } else {
                i--;
              }
            }
            continue placeholderLoop;
          } else {
            someCharsRejected = true;
          }
        }
      }
      if (suppressGuide === false) {
        conformedValue += placeholder.substr(i, placeholderLength);
      }
      break;
    } else {
      conformedValue += charInPlaceholder;
    }
  }

  if (suppressGuide && isAddition === false) {
    let indexOfLastFilledPlaceholderChar: number | null = null;
    for (let i = 0; i < conformedValue.length; i++) {
      if (placeholder[i] === placeholderChar) {
        indexOfLastFilledPlaceholderChar = i;
      }
    }
    if (indexOfLastFilledPlaceholderChar !== null) {
      conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
    } else {
      conformedValue = emptyString;
    }
  }

  return { conformedValue, meta: { someCharsRejected } };
}

export function convertMaskToPlaceholder(mask = emptyArray, placeholderChar = defaultPlaceholderChar) {
  if (!isArray(mask)) {
    throw new Error('Text-mask:convertMaskToPlaceholder; The mask property must be an array.');
  }

  if (mask.indexOf(placeholderChar) !== -1) {
    throw new Error(
      'Placeholder character must not be used as part of the mask. Please specify a character ' +
      'that is not present in your mask as your placeholder character.\n\n' +
      `The placeholder character that was received is: ${JSON.stringify(placeholderChar)}\n\n` +
      `The mask that was received is: ${JSON.stringify(mask)}`
    );
  }

  return mask.map((char: any) => (char instanceof RegExp) ? placeholderChar : char).join('');
}