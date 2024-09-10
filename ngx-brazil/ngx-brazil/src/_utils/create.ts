import { STATE_ACRONYMS } from './states';
import { getAllDigits, fillString, modulo11Custom } from './utils';

// Função para criar AIH
export function createAih(value: string | number | any[]): string {
  value = getAllDigits(value.toString());
  if (value.length > 12) {
    value = value.toString().substr(0, value.length - 1);
  }
  const cod = parseInt(value);
  const calc = Math.ceil(cod - (cod / 11));
  const digito = calc.toString().substr(-1);
  return digito;
}

// Função para criar certidão
export function createCertidao(value: string): string {
  if (value.length > 30) {
    value = value.substring(0, value.length - 2);
  }

  let certPriDig = calcularDigitoCertidao(value, 1);
  let certSegDig = calcularDigitoCertidao(value, certPriDig);

  let certDV: any = certPriDig * 10 + certSegDig;
  if (certDV == 0) certDV = "00";
  if (certDV > 0 && certDV < 10) certDV = "0" + certDV;

  return certDV.toString();
}

// Função para criar CNH Espelho
export function createCnhEspelho(value: string): string {
  return modulo11Custom(value.substr(0, value.length - 1), 1, 8, false);
}

// Função para criar Renach Estadual
export function createRenachEstadual(value: string): string {
  const state = value.substr(0, 2).toLowerCase();
  if (!STATE_ACRONYMS.includes(state)) {
    return '';
  }
  let digits = value.substr(2).replace(/[^\d]/g, '');
  if (digits.length !== 9) {
    return '';
  }
  return '' + modulo11Custom(digits.substr(0, digits.length - 1), 1, 11);
}

// Função para criar Renach Segurança
export function createRenachSeguranca(value: string): string {
  value = value.replace(/[^\d]+/g, '');

  if (value.length !== 11) {
    return '';
  }
  
  return "" + modulo11Custom(value.substr(0, value.length - 1), 1, 11);
}

// Função para criar CNH
export function createCnh(value: string): string {
  value = value.replace(/[^\d]+/g, '');
  if (value.length != 11 || value === '0') {
    return '';
  }
  return value.substr(-2);
}

export function createCnpj(cnpj: string): number[] {
  const cnpjWithoutDigits = cnpj.replace(/[^\d]+/g, '').substring(0, 12);

  const firstDigit = calcularDigitoVerificadorCnpj(cnpjWithoutDigits, 12);
  const secondDigit = calcularDigitoVerificadorCnpj(`${cnpjWithoutDigits}${firstDigit}`, 13);

  return [firstDigit, secondDigit];
}

// Função para criar CNS
export function createCns(number: string): string {
  number = getAllDigits(number);
  let somaInicial = calcularSomaCns(number);
  let soma = somaInicial;
  let rest = 0;

  while (soma % 11 !== 0) {
    rest++;
    soma = somaInicial + (rest * 1);
  }
  return number.substr(-2, 1) + rest;
}

// Função para criar CPF
export function createCpf(strCPF: string): string {
  strCPF = strCPF.replace(/[^\d]+/g, '');

  if (strCPF === '00000000000') {
    return '';
  }

  return modulo11Custom(strCPF.substr(0, strCPF.length - 2), 2, 12);
}

// Função para criar Cartão de Crédito
export function createCartaoCredito(number: string): number {
  number = "00000000000000000" + number;
  number = number.slice(number.length - 18);

  const creditDig = calcularDigitoCartaoCredito(number);
  return 10 - creditDig;
}

// Função para criar ECT
export function createEct(number: string): number {
  number = getAllDigits(number).padStart(8, '0');
  const digito = calcularDigitoEct(number);
  return digito;
}

// Função para criar PIS/PASEP
export function createPispasep(number: string): number {
  const nis = fillString(getAllDigits(number), 11, '0');
  const digit = calcularDigitoPispasep(nis);
  return digit;
}

// Função para criar RENAVAM
export function createRenavam(renavam: string): number {
  renavam = renavam.padStart(11, '0');
  const digito = calcularDigitoRenavam(renavam);
  return digito;
}

// Função para criar Processo
export function createProcesso(number: string): string {
  number = getAllDigits(number).padStart(18, '0');
  return calcularProcesso(number);
}

// Função para criar Título Atual
export function createTituloAtual(titulo: string): string {
  const tam = titulo.length;
  const estado = titulo.substr(tam - 4, 2);
  titulo = titulo.substr(0, tam - 2).padStart(11, '0');

  const digitos = calcularDigitosTitulo(titulo, estado);
  return digitos.join('');
}

// Função para criar Título
export function createTitulo(titNum: string): string {
  titNum = getAllDigits(titNum).padStart(11, '0');
  const digitos = calcularDigitosTituloCompleto(titNum);
  return digitos.join('');
}

// Funções utilitárias adicionais
function calcularDigitoCertidao(value: string, fator: number): number {
  let result = 0;
  const weights = [9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < value.length; i++) {
    result += parseInt(value[i], 10) * weights[i % weights.length];
  }
  return (result * fator) % 11;
}

export function validarDigitosCnpj(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // O CNPJ precisa ter exatamente 14 dígitos
  if (cnpj.length !== 14 || !isValidCnpj(cnpj)) {
    return false;
  }

  // Cálculo do primeiro dígito verificador
  const primeiroDigitoCalculado = calcularDigitoVerificadorCnpj(cnpj, 12);
  
  if (primeiroDigitoCalculado !== parseInt(cnpj.charAt(12), 10)) {
    return false;
  }

  // Cálculo do segundo dígito verificador
  const segundoDigitoCalculado = calcularDigitoVerificadorCnpj(cnpj, 13);
  
  if (segundoDigitoCalculado !== parseInt(cnpj.charAt(13), 10)) {
    return false;
  }

  return true;
}

function calcularDigitosCnpj(cnpj: string): number[] {
  const resultados = [];
  let soma = 0;
  let pos = cnpj.length - 7;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  resultados.push(soma % 11 < 2 ? 0 : 11 - soma % 11);

  soma = 0;
  pos = cnpj.length - 7;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  resultados.push(soma % 11 < 2 ? 0 : 11 - soma % 11);

  return resultados;
}

function calcularDigitoVerificadorCnpj(cnpj: string, tamanho: number): number {
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = 0; i < tamanho; i++) {
    soma += parseInt(cnpj.charAt(i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function calcularSomaCns(number: string): number {
  let soma = 0;
  for (let i = 0; i < number.length; i++) {
    soma += parseInt(number[i], 10) * (15 - i);
  }
  return soma;
}

function calcularDigitoCartaoCredito(number: string): number {
  let soma = 0;
  for (let i = 0; i < number.length; i++) {
    let dig = parseInt(number[i], 10);
    if (i % 2 === 0) dig *= 2;
    if (dig > 9) dig -= 9;
    soma += dig;
  }
  return soma % 10;
}

function calcularDigitoEct(number: string): number {
  const weights = [7, 9, 5, 3, 2, 4, 6, 8];
  let soma = 0;
  for (let i = 0; i < number.length; i++) {
    soma += parseInt(number[i], 10) * weights[i];
  }
  let result = 11 - (soma % 11);
  if (result === 11) result = 5;
  if (result === 10) result = 0;
  return result;
}

function calcularDigitoPispasep(nis: string): number {
  let soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(nis[i], 10) * (11 - i);
  }
  return 11 - (soma % 11);
}

function calcularDigitoRenavam(renavam: string): number {
  let soma = 0;
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 10; i++) {
    soma += parseInt(renavam[i], 10) * weights[i];
  }
  const resto = soma % 11;
  return resto === 10 ? 0 : resto;
}

function calcularProcesso(number: string): string {
  let soma = 0;
  const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  for (let i = 0; i < 11; i++) {
    soma += parseInt(number[i], 10) * weights[i];
  }
  const resto1 = soma % 97;

  soma = 0;
  const weights2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let i = 11; i < 18; i++) {
    soma += parseInt(number[i], 10) * weights2[i - 11];
  }
  const resto2 = (resto1 * 100 + soma * 100) % 97;
  const dv = 98 - resto2;
  return `${number.substr(0, 10)}-${dv}.${number.substr(10)}`;
}

function calcularDigitosTitulo(titulo: string, estado: string): number[] {
  const excecao = estado === '01' || estado === '02';
  let dig1 = calcularDigitoTitulo(titulo, 2);
  if (excecao && dig1 === 0) dig1 = 1;
  let dig2 = calcularDigitoTitulo(titulo + dig1, 4);
  if (excecao && dig2 === 0) dig2 = 1;
  return [dig1, dig2];
}

function calcularDigitoTitulo(titulo: string, peso: number): number {
  let soma = 0;
  const weights = [9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 8; i++) {
    soma += parseInt(titulo[i], 10) * weights[i];
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function calcularDigitosTituloCompleto(titNum: string): number[] {
  let titPriDig = calcularDigitoTitulo(titNum, 2);
  let titSegDig = calcularDigitoTitulo(titNum + titPriDig, 4);
  return [titPriDig, titSegDig];
}

function isValidCnpj(cnpj: string): boolean {
  const invalidCnpjs = [
    '00000000000000', '11111111111111', '22222222222222',
    '33333333333333', '44444444444444', '55555555555555',
    '66666666666666', '77777777777777', '88888888888888', '99999999999999'
  ];
  return !invalidCnpjs.includes(cnpj);
}

// Exporta todas as funções
export const createBr = {
  createAih,
  createCertidao,
  createCnhEspelho,
  createRenachEstadual,
  createRenachSeguranca,
  createCnh,
  createCnpj,
  createCns,
  createCpf,
  createCartaoCredito,
  createEct,
  createPispasep,
  createRenavam,
  createProcesso,
  createTituloAtual,
  createTitulo
};
