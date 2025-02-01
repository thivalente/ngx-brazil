import { getAllDigits, fillString, getAllWords } from './utils';
import { BigObject } from './interfaces';
import { validateInscricaoEstadual } from './inscricao-estadual';
import { createCpf, createRenavam, createEct, createProcesso, createTituloAtual, createCnh, createCertidao, createAih, createPispasep, createCnhEspelho, createRenachEstadual, createRenachSeguranca, validarDigitosCnpj } from './create';
import { validateIptu } from './iptu';
import { STATE_ACRONYMS } from './states';

export function validateAih(aih: string) {
  const aihClean = aih.replace(/[^\d]+/g, '');
  const dvOriginal = aihClean.substr(-1);
  const dv = createAih(aihClean);
  return dvOriginal === dv;
}

export function validateCellphone(cel: any) {
  let celClean = cel.replace(/[^\d]+/g, '');
  celClean = celClean.replace(/_/g, '');
  if (celClean.length !== 11) {
    return false;
  }
  if (celClean[0] == 0 || celClean[2] < 5) {
    return false;
  }
  return true;
}

export const CEPRange: BigObject<RegExp> = {
  'SP': /^([1][0-9]{3}|[01][0-9]{4})[0-9]{3}$/g,
  'RJ': /^[2][0-8][0-9]{3}[0-9]{3}$/g,
  'MS': /^[7][9][0-9]{3}[0-9]{3}$/g,
  'MG': /^[3][0-9]{4}[0-9]{3}$/g,
  // Outros estados...
};

export function validateCep(cep: string) {
  const cepClean = cep.replace(/[^\d]+/g, '');
  const exp = /\d{2}\.\d{3}\-\d{3}/;
  if (!exp.test(cep) && cepClean.length !== 8) {
    return false;
  }
  return true;
}

export function cepRanges(cep: string | number) {
  cep = (cep.toString()).replace(/[^\d]+/g, '');
  cep = parseInt(cep, 10);
  const cepString: string = cep.toString();
  let found: any;
  for (let estado in CEPRange) {
    const v = CEPRange[estado];
    const r = new RegExp(v).test(cepString);
    if (r) {
      found = r;
      return true;
    }
  }
  return !!found;
}

export function validateCertidao(value: string) {
  let certidao = getAllDigits(value);
  const format = /[0-9]{32}/;
  if (!format.test(certidao)) {
    return false;
  }
  const dvOriginal = certidao.substr(-2);
  const dv = createCertidao(certidao);
  return dv === dvOriginal;
}

export function validateChassi(chassi: string) {
  const zeroNoPrimeiroDigito = /^0/;
  if (zeroNoPrimeiroDigito.test(chassi)) {
    return false;
  }
  chassi = getAllWords(chassi);
  const repeticaoMaisDe6Vezes = /^.{4,}([0-9A-Z])\1{5,}/;
  if (repeticaoMaisDe6Vezes.test(chassi)) {
    return false;
  }
  const caracteresiIoOqQ = /[iIoOqQ]/;
  if (caracteresiIoOqQ.test(chassi)) {
    return false;
  }
  const ultimos4Numericos = /[0-9]{4}$/;
  if (!ultimos4Numericos.test(chassi)) {
    return false;
  }
  if (chassi.length > 17) {
    return false;
  }
  return true;
}

export function validateCnae(number: any) {
  return !!number;
}

export function validateCnh(value: string) {
  value = value.replace(/[^\d]/g, '');
  if (value.length !== 11) {
    return false;
  }
  const check = createCnh(value);
  return value.substr(-2) === check;
}

export function validateCnhEspelho(value: string) {
  value = value.replace(/[^\d]/g, '');
  if (value.length !== 10) {
    return false;
  }
  let check = createCnhEspelho(value);
  if (check === '0' || check === '1') check = '0';
  return value.substr(-1) === check;
}

export function validateRenachEstadual(value: string) {
  const state = value.substr(0, 2).toLowerCase();
  if (!STATE_ACRONYMS.includes(state)) {
    return false;
  }
  let digits = value.substr(2);
  digits = digits.replace(/[^\d]/g, '');
  if (digits.length !== 9) {
    return false;
  }
  let check = createRenachEstadual(value);
  if (check === '0' || check === '1') check = '0';
  return value.substr(-1) === check;
}

export function validateRenachSeguranca(value: string) {
  value = value.replace(/[^\d]/g, '');
  if (value.length !== 11) {
    return false;
  }
  let check = createRenachSeguranca(value);
  return value.substr(-1) === check;
}

export function validateCnpj(cnpj: string): boolean {
  return validarDigitosCnpj(cnpj);
}

export function validateCpf(strCpf: any) {
  strCpf = strCpf.replace(/[^\d]+/g, '');
  if (strCpf.length !== 11) {
    return false;
  }
  const expIguais = /^(?!.*(\d)\1{10}).*$/;
  if (!strCpf.match(expIguais)) {
    return false;
  }
  const restos = createCpf(strCpf);
  return restos === strCpf.substr(-2);
}

export function validateCpfCnpj(number: any) {
  return validateCpf(number) || validateCnpj(number);
}

function validateCvv(value: string | any[], maxLength: any = 3) {
    maxLength = maxLength instanceof Array ? maxLength : [maxLength];
  
    if (typeof value !== 'string') {
      return { isValid: false, isPotentiallyValid: false };
    }
    if (!/^\d*$/.test(value)) {
      return { isValid: false, isPotentiallyValid: false };
    }
  
    var i = 0;
    const max = value.length;
    for (; i < maxLength.length; i++) {
      if (max === maxLength[i]) {
        return { isValid: true, isPotentiallyValid: true };
      }
    }
  
    if (value.length < Math.min.apply(null, maxLength)) {
      return { isValid: false, isPotentiallyValid: true };
    }
  
    var maximum = maxLength;
    var i = 0;
  
    for (; i < maxLength.length; i++) {
      maximum = maxLength[i] > maximum ? maxLength[i] : maximum;
    }
  
    if (value.length > maximum) {
      return { isValid: false, isPotentiallyValid: false };
    }
  
    return { isValid: true, isPotentiallyValid: true };
  }

export function validateCartaoCredito(input: string | number) {
    let value: string;
    if (typeof input == 'string') {
      value = getAllDigits(input);
    } else {
      value = input.toString();
    }
  
    const number = value.slice(0, 16);
    const mes = parseInt(value.slice(16, 18));
    const ano = parseInt(value.slice(18, 20));
    const cvv = value.slice(20, 23);
  
    const d = new Date();
    const anoAtual = (d.getFullYear() - 2000);
    if (ano && ano < anoAtual) {
      return false;
    }
    if (mes && mes < d.getMonth() + 1 && ano === anoAtual) {
      return false;
    }
  
    if (cvv) {
      const validcvv = validateCvv(cvv);
      if (validcvv.isValid === false) {
        return false;
      }
    }
  
    let found;
    Object.keys(creditCardValidator).forEach(key => {
      if (creditCardValidator[key].test(number)) {
        found = key;
      }
    });
    return !!found;
  
}

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
export const creditCardValidator: BigObject<RegExp> = {
    'mc': /5[1-5][0-9]{14}/,
    'ec': /5[1-5][0-9]{14}/,
    'vi': /4(?:[0-9]{12}|[0-9]{15})/,
    'ax': /3[47][0-9]{13}/,
    'dc': /3(?:0[0-5][0-9]{11}|[68][0-9]{12})/,
    'bl': /3(?:0[0-5][0-9]{11}|[68][0-9]{12})/,
    'di': /6011[0-9]{12}/,
    'jcb': /(?:3[0-9]{15}|(2131|1800)[0-9]{11})/,
    'er': /2(?:014|149)[0-9]{11}/
};

export function validateCns(value: string) {
  const cns = getAllDigits(value);
  const definitivo = /[1-2][0-9]{10}00[0-1][0-9]/;
  const provisorio = /[7-9][0-9]{14}/;
  if (!definitivo.test(cns) && !provisorio.test(cns)) {
    return false;
  }
  let soma = 0;
  for (let i = 0; i < cns.length; i++) {
    soma += parseInt(cns[i]) * (15 - i);
  }
  return soma % 11 === 0;
}

export function validateTitulo(titulo: any) {
  if (!titulo) {
    return false;
  }
  const tituloClean = titulo.replace(/\./g, '');
  const expClean = /\d{4}\d{4}\d{4}/;
  if (!expClean.test(tituloClean)) {
    return false;
  }
  const tam = tituloClean.length;
  const dig = createTituloAtual(tituloClean);
  const digitos = tituloClean.substr(tam - 2, 2);
  return digitos === dig;
}

export function validateProcesso(processo: any) {
  let processoClean = processo.replace(/\./g, '').replace(/\-/g, '');
  const processoValidado = createProcesso(processo);
  return parseInt(processoClean) === parseInt(getAllDigits(processoValidado));
}

export function validateRenavam(renavam: any) {
  let renavamClean = renavam.replace(/\./g, '').replace(/\-/g, '');
  const dv = createRenavam(renavam);
  const tam = renavam.length;
  const digitos = renavam.substr(tam - 1, 1);
  return digitos.charCodeAt(0) - 48 === dv;
}

export function validateRg(rg: string) {
  let rgClean = rg.replace(/\./g, '').replace(/-/g, '');
  const expClean = /[a-z]{2}\d{8}/;
  const state = rg.substr(0, 2).toUpperCase();
  if (!expClean.test(rgClean) && !(state in CEPRange)) {
    return false;
  }
  const validateState = RG[state];
  return validateState ? validateState(rg) : true;
}

export function validateSenha(value: string, options: any = {}) {
  let finalregex = '^';
  if (options.lowercase !== false) {
    finalregex += '(?=.*[a-z])';
  }
  if (options.uppercase !== false) {
    finalregex += '(?=.*[A-Z])';
  }
  if (options.numeric !== false) {
    finalregex += '(?=.*[0-9])';
  }
  if (options.numeric !== false) {
    finalregex += '(?=.*[!@#\\$%\\^&\\*])';
  }
  options.size = options.size || 8;
  finalregex += `(?=.{${options.size},})`;
  const regex = new RegExp(finalregex);
  return regex.test(value);
}

export function validateSite(value: any) {
  const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g;
  return re.test(String(value).toLowerCase());
}

export function validateSped(sped: string) {
  return !!sped;
}

export function validatePhoneNumber(tel: any) {
  const telClean = tel.replace(/[^\d]+/g, '');
  tel = tel.replace(/_/g, '');
  if (!(telClean.length === 10 || telClean.length === 11)) {
    return false;
  }
  if (telClean[0] == 0 || telClean[2] == 0) {
    return false;
  }
  return true;
}

export function validateTime(time: string | number, options: any = {}) {
  const value = time.toString();
  const expression = options.diario
    ? /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/
    : /^([0-9]?[0-9]):([0-5][0-9])(:[0-5][0-9])?$/;
  return expression.test(value);
}

export function validateCurrency(currency: string | number) {
  if (typeof currency === 'number') {
    return true;
  }
  const regex = /^(R\$|R\$ )?(-)?(?!0(\.)?00)\d{1,3}((\.)?\d{3})*(,\d\d)?$/g;
  return regex.test(currency);
}

export function validateContaBanco(number: any) {
  return !!number;
}

export function validateData(value: string | null) {
  if (!value) {
    return false;
  }
  const values = value.split('/');
  if (values.length !== 3) {
    return false;
  }
  const testData: Date = new Date(values[1] + '/' + values[0] + '/' + values[2]);
  return !!testData.getTime();
}

export function validateDate(value: string | null) {
  if (!value || value.length < 10) {
    return false;
  }
  const testData: Date = new Date(value);
  return !!testData.getTime();
}

export function validateDatetime(time: string | number, options: any = {}) {
  if (!time) {
    return false;
  }
  time = time.toString();
  const values = time.split(' ');
  return validateDate(values[0]) && validateTime(values[1], options);
}

export function validateDataHora(time: string | number, options: any = {}) {
  if (!time) {
    return false;
  }
  time = time.toString();
  const values = time.split(' ');
  return validateData(values[0]) && validateTime(values[1], options);
}

export function validateEct(number: string) {
  number = getAllDigits(number);
  if (number.length > 9) {
    return false;
  }
  const nodigit = number.substr(0, number.length - 1);
  const dg = createEct(nodigit);
  return parseInt(number[number.length - 1]) === dg;
}

export function validateEmail(email: any) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validateEndereco(number: any) {
  return !!number;
}

export function validateNumber(number: string) {
  if (number.split(',').length > 2) {
    return false;
  }
  const regexDecimal = /^\d+(?:\.\d{0,2})$/;
  const regex = /^[0-9]{0,10}[,]{1,1}[0-9]{0,4}/;
  const regexNumero = /^[0-9]{0,10}/;
  return regexDecimal.test(number) || regex.test(number) || regexNumero.test(number);
}

export function validatePorcentagem(porcentagem: string) {
  porcentagem = porcentagem.split('%')[0];
  return validateNumber(porcentagem);
}

export function validatePispasep(number: string) {
  number = getAllDigits(number);
  let nis = fillString(number, 11, '0');
  const regex = /\d{11}/;
  if (!regex.test(nis)) {
    return false;
  }
  const digit = createPispasep(number);
  return nis[10].toString() === digit.toString();
}

export function validateUsername(value: any) {
  const re = /^[a-z0-9_-]{3,16}$/i;
  return re.test(String(value).toLowerCase());
}

export const LICENSEPLATES_RANGE = [
    ['AAA0001', 'BEZ9999', 'PR', '02/1990'],
    ['BFA0001', 'GKI9999', 'SP', '10/1991'],
    ['GKJ0001', 'HOK9999', 'MG', '09/1991'],
    ['HOL0001', 'HQE9999', 'MA', '01/1992'],
    ['HQF0001', 'HTW9999', 'MS', '03/1992'],
    ['HTX0001', 'HZA9999', 'CE', '10/1992'],
    ['HZB0001', 'IAP9999', 'SE', '09/1993'],
    ['IAQ0001', 'JDO9999', 'RS', '03/1992'],
    ['JDP0001', 'JKR9999', 'DF', '04/1994'],
    ['JKS0001', 'JSZ9999', 'BA', '08/1993'],
    ['JTA0001', 'JWE9999', 'PA', '07/1993'],
    ['JWF0001', 'JXY9999', 'AM', '09/1993'],
    ['JXZ0001', 'KAU9999', 'MT', '09/1993'],
    ['KAV0001', 'KFC9999', 'GO', '05/1994'],
    ['KFD0001', 'KME9999', 'PE', '08/1994'],
    ['KMF0001', 'LVE9999', 'RJ', '05/1994'],
    ['LVF0001', 'LWQ9999', 'PI', '04/1996'],
    ['LWR0001', 'MMM9999', 'SC', '06/1996'],
    ['MMN0001', 'MOW9999', 'PB', '07/1996'],
    ['MOX0001', 'MTZ9999', 'ES', '12/1995'],
    ['MUA0001', 'MVK9999', 'AL', '08/1996'],
    ['MVL0001', 'MXG9999', 'TO', '11/1996'],
    ['MXH0001', 'MZM9999', 'RN', '06/1998'],
    ['MZN0001', 'NAG9999', 'AC', '06/1998'],
    ['NAH0001', 'NBA9999', 'RR', '07/1998'],
    ['NBB0001', 'NEH9999', 'RO', '07/1998'],
    ['NEI0001', 'NFB9999', 'AP', '09/1998'],
    ['NFC0001', 'NGZ9999', 'GO', '08/2003'],
    ['NHA0001', 'NHT9999', 'MA', '12/2006'],
    ['NHU0001', 'NIX9999', 'PI', '05/2007'],
    ['NIY0001', 'NJW9999', 'MT', '10/2007'],
    ['NJX0001', 'NLU9999', 'GO', '11/2007'],
    ['NLV0001', 'NMO9999', 'AL', '01/2008'],
    ['NMP0001', 'NNI9999', 'MA', '05/2008'],
    ['NNJ0001', 'NOH9999', 'RN', '07/2008'],
    ['NOI0001', 'NPB9999', 'AM', '07/2008'],
    ['NPC0001', 'NPQ9999', 'MT', '09/2008'],
    ['NPR0001', 'NQK9999', 'PB', '11/2008'],
    ['NQL0001', 'NRE9999', 'CE', '12/2008'],
    ['NRF0001', 'NSD9999', 'MS', '11/2009'],
    ['NSE0001', 'NTC9999', 'PA', '11/2009'],
    ['NTD0001', 'NTW9999', 'BA', '02/2010'],
    ['NTX0001', 'NUG9999', 'MT', '03/2010'],
    ['NUH0001', 'NUL9999', 'RR', '06/2010'],
    ['NUM0001', 'NVF9999', 'CE', '06/2010'],
    ['NVG0001', 'NVN9999', 'SE', '03/2010'],
    ['NVO0001', 'NWR9999', 'GO', '03/2010'],
    ['NWS0001', 'NXQ9999', 'MA', '07/2010'],
    ['NXR0001', 'NXT9999', 'AC', '05/2011'],
    ['NXU0001', 'NXW9999', 'PE', '07/2010'],
    ['NXX0001', 'NYG9999', 'MG', '10/2011'],
    ['NYH0001', 'NZZ9999', 'BA', '10/2010'],
    ['OAA0001', 'OAO9999', 'AM', '12/2010'],
    ['OAP0001', 'OBS9999', 'MT', '05/2011'],
    ['OBT0001', 'OCA9999', 'PA', '07/2011'],
    ['OCB0001', 'OCU9999', 'CE', '02/2011'],
    ['OCV0001', 'ODT9999', 'ES', '05/2011'],
    ['ODU0001', 'OEI9999', 'PI', '09/2011'],
    ['OEJ0001', 'OES9999', 'SE', '08/2011'],
    ['OET0001', 'OFH9999', 'PB', '04/2011'],
    ['OFI0001', 'OFW9999', 'PA', '03/2011'],
    ['OFX0001', 'OGG9999', 'PB', '06/2011'],
    ['OGH0001', 'OHA9999', 'GO', '04/2011'],
    ['OHB0001', 'OHK9999', 'AL', '09/2011'],
    ['OHL0001', 'OHW9999', 'RO', '11/2011'],
    ['OHX0001', 'OIQ9999', 'CE', '12/2011'],
    ['OIR0001', 'OJQ9999', 'MA', '01/2012'],
    ['OJR0001', 'OKC9999', 'RN', '04/2012'],
    ['OKD0001', 'OKH9999', 'SC', '02/2014'],
    ['OKI0001', 'OLG9999', 'BA', '10/2011'],
    ['OLH0001', 'OLN9999', 'TO', '02/2012'],
    ['OLO0001', 'OMH9999', 'MG', '03/2012'],
    ['OMI0001', 'OOF9999', 'GO', '04/2012'],
    ['OOG0001', 'OOU9999', 'MS', '02/2012'],
    ['OOV0001', 'ORC9999', 'MG', '06/2012'],
    ['ORD0001', 'ORM9999', 'AL', '01/2012'],
    ['ORN0001', 'OSV9999', 'CE', '07/2012'],
    ['OSW0001', 'OTZ9999', 'PA', '08/2012'],
    ['OUA0001', 'OUE9999', 'PI', '11/2012'],
    ['OUF0001', 'OVD9999', 'BA', '12/2012'],
    ['OVE0001', 'OVF9999', 'ES', '12/2012'],
    ['OVG0001', 'OVG9999', 'AC', '05/2013'],
    ['OVH0001', 'OVL9999', 'ES', '07/2013'],
    ['OVM0001', 'OVV9999', 'DF', '11/2013'],
    ['OVW0001', 'OVY9999', 'PI', '10/2013'],
    ['OVZ0001', 'OWG9999', 'RN', '06/2013'],
    ['OWH0001', 'OXK9999', 'MG', '10/2013'],
    ['OXL0001', 'OXL9999', 'RO', '11/2013'],
    ['OXM0001', 'OXM9999', 'AM', '11/2013'],
    ['OXN0001', 'OXN9999', 'AL', '11/2013'],
    ['OXO0001', 'OXO9999', 'PB', '11/2013'],
    ['OXP0001', 'OXP9999', 'AC', '12/2013'],
    ['OXQ0001', 'OXZ9999', 'MA', '04/2014'],
    ['OYA0001', 'OYC9999', 'TO', '11/2013'],
    ['OYD0001', 'OYK9999', 'ES', '12/2013'],
    ['OYL0001', 'OYZ9999', 'PE', '02/2014'],
    ['OZA0001', 'OZA9999', 'CE', '01/2014'],
    ['OZB0001', 'OZB9999', 'SE', '01/2014'],
    ['OZC0001', 'OZV9999', 'BA', '03/2014'],
    ['OZW0001', 'PBZ9999', 'DF', '05/2014'],
    ['PCA0001', 'PED9999', 'PE', '12/2014'],
    ['PEE0001', 'PFQ9999', 'PE', '09/2010'],
    ['PFR0001', 'PGK9999', 'PE', '07/2012'],
    ['PGL0001', 'PGU9999', 'PE', '10/2013'],
    ['PGV0001', 'PGZ9999', 'PE', '12/2014'],
    ['PHA0001', 'PHZ9999', 'AM', '06/2014'],
    ['PIA0001', 'PIZ9999', 'PI', '06/2014'],
    ['PJA0001', 'PLZ9999', 'BA', '10/2014'],
    ['PMA0001', 'POZ9999', 'CE', '06/2014'],
    ['PPA0001', 'PPZ9999', 'ES', '08/2014'],
    ['PQA0001', 'PRZ9999', 'GO', '03/2015'],
    ['PSA0001', 'PTZ9999', 'MA', '12/2014'],
    ['PUA0001', 'PZZ9999', 'MG', '05/2014'],
    ['QAA0001', 'QAZ9999', 'MS', '12/2014'],
    ['QBA0001', 'QCZ9999', 'MT', '05/2014'],
    ['QDA0001', 'QEZ9999', 'PA', '10/2014'],
    ['QFA0001', 'QFZ9999', 'PB', '05/2014'],
    ['QGA0001', 'QGZ9999', 'RN', '09/2014'],
    ['QHA0001', 'QJZ9999', 'SC', '05/2014'],
    ['QKA0001', 'QKM9999', 'TO', '11/2014'],
    ['QKN0001', 'QKZ9999', 'SE', '06/2014'],
    ['QLA0001', 'QLM9999', 'AL', '09/2015'],
    ['QLN0001', 'QLT9999', 'AP', '01/2015'],
    ['QLU0001', 'QLZ9999', 'AC', '08/2014'],
    ['QMA0001', 'QMP9999', 'SE', '03/2017'],
    ['QMQ0001', 'QQZ9999', 'MG', '07/2017'],
    ['QRA0001', 'QRA9999', 'RO', '11/2017'],
    ['QRB0001', 'QRZ9999', 'ES', '05/2018'],
    ['QSA0001', 'QSZ9999', 'PB', '04/2018'],
    ['QTA0001', 'QTB9999', 'RO', '08/2018'],
    ['QTC0001', 'RIN9999', 'BR', '00/0000'],
    ['RIO0001', 'RIO9999', 'RJ', '09/2018'],
    ['RLA0001', 'SAU9999', 'BR', '00/0000'],
    ['SAV0001', 'SAV9999', 'SP', '09/2009'],
  ];
  
  export const LICENSEPLATES_INVALID = { start: 'SAW0001', end: 'ZZZ9999' } // || Sequências ainda não definidas
  
  export function validateLicensePlate(licensePlate: string | number, includesMercosul?: boolean) {
    const licensePlateClean = licensePlate.toString()
      .replace(/-/g, '')
      .replace(/ /g, '')
      .toUpperCase();
    const regex = {
      legacyBR: /^[A-Z]{3}[0-9]{4}$/,
      mercosulBR: /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/,
      mercosulAR: /^[A-Z]{2}[0-9]{3}[A-Z]{2}$|^[A-Z]{1}[0-9]{3}[A-Z]{3}$/,
      mercosulBO: /^[A-Z]{2}[0-9]{5}$/,
      mercosulPY: /^[A-Z]{4}[0-9]{3}$|^[0-9]{3}[A-Z]{4}$/,
      mercosulUY: /^[A-Z]{3}[0-9]{4}$/,
    }
    const isLegadoBRInvalid =
      licensePlateClean >= LICENSEPLATES_INVALID.start && licensePlateClean <= LICENSEPLATES_INVALID.end;
    if ((regex.legacyBR.test(licensePlateClean) && !isLegadoBRInvalid)
      || (regex.mercosulBR.test(licensePlateClean))
      || (includesMercosul && (
        (regex.mercosulAR.test(licensePlateClean))
        || (regex.mercosulBO.test(licensePlateClean))
        || (regex.mercosulPY.test(licensePlateClean))
        || (regex.mercosulUY.test(licensePlateClean))
      ))) {
      return true;
    }
    return false;
}

export function rgSP(number: string) {
    number = "0000000" + number;
    number = number.slice(number.length - 8);
  
    let b1 = parseInt(number.slice(7));
    let b2 = parseInt(number.slice(6, 7));
    let b3 = parseInt(number.slice(5, 6));
    let b4 = parseInt(number.slice(4, 5));
    let b5 = parseInt(number.slice(3, 4));
    let b6 = parseInt(number.slice(2, 3));
    let b7 = parseInt(number.slice(1, 2));
    let b8 = parseInt(number.slice(0, 1));
  
    let cispDig: any = (b1 * 2 + b2 * 3 + b3 * 4 + b4 * 5 + b5 * 6 + b6 * 7 + b7 * 8 + b8 * 9) % 11;
    if (cispDig == 10) {
      cispDig = "X";
    }
  
    return cispDig;
}

export function rgRJ(number: string) {
    number = "0000000" + number;
    number = number.slice(number.length - 8);

    let b1 = parseInt(number.slice(7));
    let b2 = parseInt(number.slice(6, 7));
    let b3 = parseInt(number.slice(5, 6));
    let b4 = parseInt(number.slice(4, 5));
    let b5 = parseInt(number.slice(3, 4));
    let b6 = parseInt(number.slice(2, 3));
    let b7 = parseInt(number.slice(1, 2));
    let b8 = parseInt(number.slice(0, 1));

    let ci7 = b1 * 2; if (ci7 > 9) { ci7 = ci7 - 9; }
    let ci56 = b3 * 2; if (ci56 > 9) { ci56 = ci56 - 9; }
    let ci34 = b5 * 2; if (ci34 > 9) { ci34 = ci34 - 9; }
    let ci12 = b7 * 2; if (ci12 > 9) { ci12 = ci12 - 9; }
    let ci67 = b2;
    let ci45 = b4;
    let ci23 = b6;
    let ci01 = b8;

    let cirjDig = (ci7 + ci56 + ci34 + ci12 + ci67 + ci45 + ci23 + ci01) % 10;
    cirjDig = 10 - cirjDig; if (cirjDig == 10) { cirjDig = 0; }

    return cirjDig;
}

const RG: BigObject<Function> = {
    sp: rgSP,
    rj: rgRJ
}

export default RG;

export const validateBr: BigObject<Function> = {
  aih: validateAih,
  cartaocredito: validateCartaoCredito,
  cellphone: validateCellphone,
  cep: validateCep,
  certidao: validateCertidao,
  chassi: validateChassi,
  cnae: validateCnae,
  cnh: validateCnh,
  cnhEspelho: validateCnhEspelho,
  renachEstadual: validateRenachEstadual,
  renachSeguranca: validateRenachSeguranca,
  cnpj: validateCnpj,
  cns: validateCns,
  contabanco: validateContaBanco,
  cpf: validateCpf,
  cpfcnpj: validateCpfCnpj,
  currency: validateCurrency,
  data: validateData,
  date: validateDate,
  datetime: validateDatetime,
  datahora: validateDataHora,
  ect: validateEct,
  email: validateEmail,
  endereco: validateEndereco,
  inscricaoestadual: validateInscricaoEstadual,
  iptu: validateIptu,
  number: validateNumber,
  porcentagem: validatePorcentagem,
  pispasep: validatePispasep,
  licensePlate: validateLicensePlate,
  processo: validateProcesso,
  renavam: validateRenavam,
  rg: validateRg,
  senha: validateSenha,
  site: validateSite,
  sped: validateSped,
  phoneNumber: validatePhoneNumber,
  time: validateTime,
  titulo: validateTitulo,
  username: validateUsername
};
