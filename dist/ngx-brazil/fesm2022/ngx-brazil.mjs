import * as i0 from '@angular/core';
import { forwardRef, Directive, Pipe, Optional, Inject, Input, NgModule } from '@angular/core';
import { Validators, NG_VALIDATORS, NG_VALUE_ACCESSOR, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { ɵgetDOM as _getDOM } from '@angular/platform-browser';

const STATE_ACRONYMS = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
const STATES = [
    { name: 'Acre', shortname: 'AC', slug: 'acre' },
    { name: 'Alagoas', shortname: 'AL', slug: 'alagoas' },
    { name: 'Amapá', shortname: 'AP', slug: 'amapa' },
    { name: 'Amazonas', shortname: 'AM', slug: 'amazonas' },
    { name: 'Bahia', shortname: 'BA', slug: 'bahia' },
    { name: 'Ceará', shortname: 'CE', slug: 'ceara' },
    { name: 'Distrito Federal', shortname: 'DF', slug: 'distrito-federal' },
    { name: 'Espírito Santo', shortname: 'ES', slug: 'espirito-santo' },
    { name: 'Goiás', shortname: 'GO', slug: 'goias' },
    { name: 'Maranhão', shortname: 'MA', slug: 'maranhao' },
    { name: 'Mato Grosso', shortname: 'MT', slug: 'mato-grosso' },
    { name: 'Mato Grosso do Sul', shortname: 'MS', slug: 'mato-grosso-do-sul' },
    { name: 'Minas Gerais', shortname: 'MG', slug: 'minas-gerais' },
    { name: 'Pará', shortname: 'PA', slug: 'para' },
    { name: 'Paraíba', shortname: 'PB', slug: 'paraiba' },
    { name: 'Paraná', shortname: 'PR', slug: 'parana' },
    { name: 'Pernambuco', shortname: 'PE', slug: 'pernambuco' },
    { name: 'Piauí', shortname: 'PI', slug: 'piaui' },
    { name: 'Rio de Janeiro', shortname: 'RJ', slug: 'rio-de-janeiro' },
    { name: 'Rio Grande do Norte', shortname: 'RN', slug: 'rio-grande-do-norte' },
    { name: 'Rio Grande do Sul', shortname: 'RS', slug: 'rio-grande-do-sul' },
    { name: 'Rondônia', shortname: 'RO', slug: 'rondonia' },
    { name: 'Roraima', shortname: 'RR', slug: 'roraima' },
    { name: 'Santa Catarina', shortname: 'SC', slug: 'santa-catarina' },
    { name: 'São Paulo', shortname: 'SP', slug: 'sao-paulo' },
    { name: 'Sergipe', shortname: 'SE', slug: 'sergipe' },
    { name: 'Tocantins', shortname: 'TO', slug: 'tocantins' }
];

/**
 * Funções utilitárias
 */
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
function isArray$1(value) {
    return (Array.isArray && Array.isArray(value)) || value instanceof Array;
}
function isString$1(value) {
    return typeof value === 'string' || value instanceof String;
}
function isNumber$1(value) {
    return typeof value === 'number' && !isNaN(value);
}
function isNil$1(value) {
    return typeof value === 'undefined' || value === null;
}
/**
 * Processa Caret Traps (para máscaras de entrada)
 */
const strCaretTrap$1 = '[]';
function processCaretTraps$1(mask) {
    const indexes = [];
    let indexOfCaretTrap;
    while ((indexOfCaretTrap = mask.indexOf(strCaretTrap$1)) !== -1) {
        indexes.push(indexOfCaretTrap);
        mask.splice(indexOfCaretTrap, 1);
    }
    return { maskWithoutCaretTraps: mask, indexes };
}
/**
 * Funções para cálculo de dígito verificador usando módulo 11
 */
const modulo11 = (value) => {
    let mults = [];
    let weightVal = 2;
    for (let i = 0; i < value.length; i++) {
        mults.push(weightVal);
        weightVal++;
        if (weightVal > 9)
            weightVal = 2;
    }
    mults = mults.reverse();
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
        sum += parseInt(value[i]) * mults[i];
    }
    const digit = (sum * 10) % 11;
    return digit;
};
const modulo11Custom = (string, size, maxMult = string.length, by10 = true) => {
    if (!by10)
        size = 1;
    for (let n = 1; n <= size; n++) {
        let soma = 0;
        let mult = 2;
        for (let i = string.length - 1; i >= 0; i--) {
            soma += mult * parseInt(string.charAt(i));
            mult++;
            if (mult > maxMult)
                mult = 2;
        }
        let dig = by10 ? ((soma * 10) % 11) % 10 : soma % 11;
        if (dig === 10)
            dig = 0;
        string += dig;
    }
    return string.substr(string.length - size, size);
};
/**
 * Verifica se todos os números de uma string são iguais
 */
function allNumbersAreSame$1(inputValue) {
    const input = getAllDigits(inputValue);
    if (typeof input === 'string') {
        const reg = new RegExp('^(\\d)(?!\\1+$)\\d{' + (input.length - 1) + '}$');
        return reg.test(input);
    }
    return false;
}
/**
 * Extrai todos os dígitos de uma string
 */
function getAllDigits(input) {
    if (!input.match) {
        input = input.toString();
    }
    const match = input.match(/\d/g);
    return match ? match.join('') : '';
}
/**
 * Extrai todas as palavras de uma string
 */
function getAllWords(input) {
    const match = input.match(/\w/g);
    return match ? match.join('') : '';
}
/**
 * Converte uma string de moeda para número
 */
function currencyToNumber(input) {
    if (typeof input === 'number') {
        return input;
    }
    input = input.replace(/ /g, '').replace(/[^0-9.,]+/, '');
    if (input.indexOf('.') === (input.length - 1) - 2) {
        input = input.replace(/,/g, '');
    }
    else {
        input = input.replace(/\./g, '').replace(',', '.');
    }
    return parseFloat(input);
}
const makeGenericFaker = (val, options = null) => {
    return () => {
        if (!val.textMask || !val.textMask.map) {
            return '';
        }
        const newData = val.textMask.map((c, index) => {
            if (options && options[index]) {
                return options[index]();
            }
            c = c.toString();
            if (c === /\d/.toString()) {
                return Math.floor(Math.random() * 10).toString();
            }
            else if (c === /[A-Za-z]/.toString()) {
                return randomLetter(1).toString();
            }
            else if (c === /\w/.toString()) {
                return randomLetterOrNumber(1).toString();
            }
            else if (c.indexOf('/[') === 0) { // /[1-9]/ ou /[5-9]/
                c = c.replace('/[', '').replace(']/', '');
                if (c.indexOf('-') > 0) {
                    c = c.split('-');
                    if (parseInt(c[1])) {
                        const mult = c[1] - c[0];
                        const plus = parseInt(c[0]);
                        return (Math.floor(Math.random() * mult) + plus).toString();
                    }
                    else {
                        return rand(1, [c[0], c[1]]);
                    }
                }
                else if (c.indexOf('|') > 0) {
                    c = c.split('|');
                    const index = Math.floor(Math.random() * c.length);
                    return c[index];
                }
            }
            else {
                return c;
            }
        });
        return newData.join('');
    };
};
/**
 * Converte número para formato de moeda
 */
function numberToCurrency(value) {
    return ' R$ ' + value.toFixed(2).replace('.', ',') + ' ';
}
/**
 * Slugify - transforma uma string em um formato "slug" (usado em URLs amigáveis)
 */
function slugify(value) {
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
function fillString(string, size, fill) {
    if (string.length < size) {
        const dif = size - string.length;
        for (let i = 0; i < dif; i++) {
            string = fill + string;
        }
    }
    return string;
}
/**
 * Funções para gerar strings aleatórias
 */
function randArray(array) {
    const index = randomNumber(0, array.length);
    return array[index];
}
function rand(length, ...ranges) {
    var str = ""; // the string (initialized to "")
    while (length--) { // repeat this length of times
        var ind = Math.floor(Math.random() * ranges.length); // get a random range from the ranges object
        var min = ranges[ind][0].charCodeAt(0), // get the minimum char code allowed for this range
        max = ranges[ind][1].charCodeAt(0); // get the maximum char code allowed for this range
        var c = Math.floor(Math.random() * (max - min + 1)) + min; // get a random char code between min and max
        str += String.fromCharCode(c); // convert it back into a character and append it to the string str
    }
    return str; // return str
}
function randomNumber(begin, end) {
    const dif = end - begin;
    return Math.floor(Math.random() * dif) + begin;
}
function randomLetter(size = 1, onlyCapitals = false) {
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
function randomLetterOrNumber(size = 1, onlyCapitals = false) {
    var text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
const randomStateAcronym = () => {
    const total = STATE_ACRONYMS.length;
    return STATE_ACRONYMS[Math.floor(Math.random() * total)];
};
const CORES = ["AMARELO", "AZUL", "BEGE", "BRANCA", "CINZA", "DOURADA", "GRENA", "LARANJA", "MARROM", "PRATA",
    "PRETA", "ROSA", "ROXA", "VERDE", "VERMELHA", "FANTASIA"];
function getSpecialProperty(model, key) {
    return model[key];
}
/**
 * Exportação de todas as funções como utilitário
 */
const utilsBr = {
    isPresent,
    isArray: isArray$1,
    isString: isString$1,
    isNumber: isNumber$1,
    isNil: isNil$1,
    processCaretTraps: processCaretTraps$1,
    allNumbersAreSame: allNumbersAreSame$1,
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

const generateInscricaoEstadual = {
    ac: function (valor) {
        if (tamanhoNaoE(valor, 13)) {
            return false;
        }
        if (naoComecaCom(valor, '01')) {
            return false;
        }
        const base = primeiros(valor, 11);
        const primeiroDigito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base));
        const segundoDigito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base + primeiroDigito));
        return base + primeiroDigito + segundoDigito;
    },
    am: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        return calculoTrivialGenerate(valor);
    },
    al: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        if (naoComecaCom(valor, '24')) {
            return false;
        }
        // FORMAÇÃO: 24XNNNNND,  sendo:
        // 24 – Código do Estado
        // X – Tipo de empresa (0-Normal, 3-Produtor Rural, 5-Substituta, 7- Micro-Empresa Ambulante, 8-Micro-Empresa)
        // NNNNN – Número da empresa
        // D – Dígito de verificação calculado pelo Módulo11, pêsos 2 à 9 da direita para a esquerda, exceto D
        // Exemplo: Número 2 4 0 0 0 0 0 4 D
        //                 2 4 X N N N N N D
        // Fonte: http://www.sintegra.gov.br/Cad_Estados/cad_AL.html
        const base = primeiros(valor);
        // Pesos 9 8 7 6 5 4 3 2
        // SOMA = (2 * 4) + (3 * 0) + (4 * 0) + (5 * 0) + (6 * 0) + (7 * 0) + (8 * 4) + (9 * 2) = 58
        const soma = base.split('').reduce((acc, v, i) => {
            return acc + (9 - i) * Number(v);
        }, 0);
        // PRODUTO = 58 * 10 = 580
        const produto = soma * 10;
        // RESTO = 580 – INTEIRO(580 / 11)*11 = 580 – (52*11) = 8
        const resto = produto - Math.floor(produto / 11) * 11;
        // DÍGITO = 8 - Caso RESTO seja igual a 10 o DÍGITO será 0 (zero)
        const digito = resto === 10 ? 0 : resto;
        return base + digito;
    },
    ap: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        if (naoComecaCom(valor, '03')) {
            return false;
        }
        const base = primeiros(valor);
        let p, d;
        if (entre(base, 3000001, 3017000)) {
            p = 5;
            d = 0;
        }
        else if (entre(base, 3017001, 3019022)) {
            p = 9;
            d = 1;
        }
        else {
            p = 0;
            d = 0;
        }
        const resto = mod(p + base, [2, 3, 4, 5, 6, 7, 8, 9, 1]);
        let digito;
        if (resto === 1) {
            digito = 0;
        }
        else if (resto === 0) {
            digito = d;
        }
        else {
            digito = 11 - resto;
        }
        return base + digito;
    },
    ba: function (valor) {
        if (tamanhoNaoE(valor, 8) && tamanhoNaoE(valor)) {
            return false;
        }
        const base = primeiros(valor, valor.length - 2);
        let primeiroDigito, segundoDigito;
        const segundoMultiplicador = serie(2, 7);
        const primeiroMultiplicador = serie(2, 8);
        let primeiroResto, segundoResto;
        let digitoComparacao = valor.substring(0, 1);
        if (tamanhoE(valor, 9)) {
            segundoMultiplicador.push(8);
            primeiroMultiplicador.push(9);
            digitoComparacao = valor.substring(1, 2);
        }
        if ('0123458'.split('').indexOf(digitoComparacao) !== -1) {
            segundoResto = mod(base, segundoMultiplicador, 10);
            segundoDigito = segundoResto === 0 ? 0 : 10 - segundoResto;
            primeiroResto = mod(base + segundoDigito, primeiroMultiplicador, 10);
            primeiroDigito = primeiroResto === 0 ? 0 : 10 - primeiroResto;
        }
        else {
            segundoResto = mod(base, segundoMultiplicador);
            segundoDigito = substracaoPor11SeMaiorQue2CasoContrario0(segundoResto);
            primeiroResto = mod(base + segundoDigito, primeiroMultiplicador);
            primeiroDigito = substracaoPor11SeMaiorQue2CasoContrario0(primeiroResto);
        }
        return base + primeiroDigito + segundoDigito;
    },
    ce: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        return calculoTrivialGenerate(valor);
    },
    df: function (valor) {
        if (tamanhoNaoE(valor, 13)) {
            return false;
        }
        if (naoComecaCom(valor, '07') && naoComecaCom(valor, '08')) {
            return false;
        }
        const base = primeiros(valor, 11);
        const primeiro = substracaoPor11SeMaiorQue2CasoContrario0(mod(base));
        const segundo = substracaoPor11SeMaiorQue2CasoContrario0(mod(base + primeiro));
        return base + primeiro + segundo;
    },
    es: function (valor) {
        return calculoTrivialGenerate(valor);
    },
    go: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        // Verifica os digitos iniciais do estado
        // Fonte: https://appasp.economia.go.gov.br/Legislacao/arquivos/Secretario/IN/IN_1535_2022.htm
        if (['10', '11', '15', '20'].indexOf(valor.substring(0, 2)) === -1) {
            return false;
        }
        const base = primeiros(valor);
        if (base === '11094402') {
            return valor.substr(8) === '1' || valor.substr(8) === '0';
        }
        const resto = mod(base);
        let digito;
        if (resto === 0) {
            digito = 0;
        }
        else if (resto === 1) {
            if (entre(base, 10103105, 10119997)) {
                digito = 1;
            }
            else {
                digito = 0;
            }
        }
        else {
            digito = 11 - resto;
        }
        return base + digito;
    },
    ma: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        if (naoComecaCom(valor, '12')) {
            return false;
        }
        return calculoTrivialGenerate(valor);
    },
    mg: function (valor) {
        if (tamanhoNaoE(valor, 13)) {
            return false;
        }
        const base = primeiros(valor, 11);
        const baseComZero = valor.substring(0, 3) + '0' + valor.substring(3, 11);
        let i = 0;
        const produtorioLiteral = baseComZero.split('').reduceRight(function (anterior, atual) {
            if (i > [2, 1].length - 1) {
                i = 0;
            }
            return ([2, 1][i++] * parseInt(atual, 10)).toString() + anterior.toString();
        }, '').split('').reduce(function (anterior, atual) {
            return anterior + parseInt(atual, 10);
        }, 0);
        let primeiro = ((Math.floor(produtorioLiteral / 10) + 1) * 10) - produtorioLiteral;
        if (primeiro === 10) {
            primeiro = 0;
        }
        const segundo = substracaoPor11SeMaiorQue2CasoContrario0(mod(base + primeiro, serie(2, 11)));
        return base + primeiro + segundo;
    },
    ms: function (valor) {
        if (naoComecaCom(valor, '28')) {
            return false;
        }
        return calculoTrivialGenerate(valor);
    },
    mt: function (valor) {
        if (tamanhoNaoE(valor, 11) && tamanhoNaoE(valor)) {
            return false;
        }
        const base = tamanhoE(valor, 11) ? valor.substring(0, 10) : primeiros(valor);
        return calculoTrivialGenerate(valor, base, true);
    },
    pa: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        if (naoComecaCom(valor, '15')) {
            return false;
        }
        return calculoTrivialGenerate(valor);
    },
    pb: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        return calculoTrivialGenerate(valor);
    },
    pe: function (valor) {
        const base = valor.substring(0, valor.length - 2);
        const restoPrimeiro = mod(base);
        const primeiro = 11 - restoPrimeiro >= 10 ? 0 : 11 - restoPrimeiro;
        const restoSegundo = mod(base + primeiro);
        const segundo = 11 - restoSegundo >= 10 ? 0 : 11 - restoSegundo;
        return base + primeiro + segundo;
    },
    pi: function (valor) {
        return calculoTrivialGenerate(valor);
    },
    pr: function (valor) {
        if (tamanhoNaoE(valor, 10)) {
            return false;
        }
        const base = primeiros(valor);
        const restoPrimeiro = mod(base, serie(2, 7));
        const primeiro = 11 - restoPrimeiro >= 10 ? 0 : 11 - restoPrimeiro;
        const restoSegundo = mod(base + primeiro, serie(2, 7));
        const segundo = 11 - restoSegundo >= 10 ? 0 : 11 - restoSegundo;
        return base + primeiro + segundo;
    },
    rj: function (valor) {
        if (tamanhoNaoE(valor, 8)) {
            return false;
        }
        const base = primeiros(valor, 7);
        const digito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base, serie(2, 7)));
        return base + digito;
    },
    rn: function (valor) {
        if (tamanhoNaoE(valor) && tamanhoNaoE(valor, 10)) {
            return false;
        }
        if (naoComecaCom(valor, '20')) {
            return false;
        }
        const base = valor.substring(0, valor.length - 1);
        const multiplicadores = serie(2, 9);
        if (tamanhoE(valor, 10)) {
            multiplicadores.push(10);
        }
        const resto = (mod(base, multiplicadores) * 10) % 11;
        const digito = resto === 10 ? 0 : resto;
        return base + digito;
    },
    ro: function (valor) {
        let base, digito, resultadoMod;
        if (tamanhoE(valor, 9)) {
            base = valor.substring(3, 8);
            digito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base));
            return valor === valor.substring(0, 3) + base + digito;
        }
        else if (tamanhoE(valor, 14)) {
            base = primeiros(valor, 13);
            resultadoMod = mod(base);
            digito = resultadoMod <= 1 ? 1 : 11 - resultadoMod;
            return base + digito;
        }
        else {
            return false;
        }
    },
    rr: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        if (naoComecaCom(valor, '24')) {
            return false;
        }
        const base = primeiros(valor);
        const digito = mod(base, [8, 7, 6, 5, 4, 3, 2, 1], 9);
        return base + digito;
    },
    rs: function (valor) {
        if (tamanhoNaoE(valor, 10)) {
            return false;
        }
        const base = primeiros(valor, 9);
        return calculoTrivialGenerate(valor, base, true);
    },
    sc: function (valor) {
        return calculoTrivialGenerate(valor);
    },
    se: function (valor) {
        if (tamanhoNaoE(valor)) {
            return false;
        }
        return calculoTrivialGenerate(valor);
    },
    sp: function (valor) {
        valor = valor.toUpperCase();
        let segundaBase;
        if (valor.substr(0, 1) === 'P') {
            if (tamanhoNaoE(valor, 13)) {
                return false;
            }
            const base = valor.substring(1, 9);
            segundaBase = valor.substring(10, 13);
            const resto = mod(base, [10, 8, 7, 6, 5, 4, 3, 1]).toString();
            const digito = resto.length > 1 ? resto[1] : resto[0];
            return 'P' + base + digito + segundaBase;
        }
        else {
            if (tamanhoNaoE(valor, 12)) {
                return false;
            }
            const primeiraBase = primeiros(valor);
            segundaBase = valor.substring(9, 11);
            const primeiroResto = mod(primeiraBase, [10, 8, 7, 6, 5, 4, 3, 1]).toString();
            const primeiro = primeiroResto.length > 1 ? primeiroResto[1] : primeiroResto[0];
            const segundoResto = mod(primeiraBase + primeiro + segundaBase, serie(2, 10)).toString();
            const segundo = segundoResto.length > 1 ? segundoResto[1] : segundoResto[0];
            return primeiraBase + primeiro + segundaBase + segundo;
        }
    },
    to: function (valor) {
        if (tamanhoNaoE(valor) && tamanhoNaoE(valor, 11)) {
            return false;
        }
        let base;
        if (tamanhoE(valor, 11)) {
            if (['01', '02', '03', '99'].indexOf(valor.substring(2, 4)) === -1) {
                return false;
            }
            base = valor.substring(0, 2) + valor.substring(4, 10);
        }
        else {
            base = primeiros(valor);
        }
        const digito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base));
        return valor.substring(0, valor.length - 1) + digito;
    },
};
const funcoes = {
    ac: function (valor) {
        return valor === generateInscricaoEstadual['ac'](valor);
    },
    am: function (valor) {
        return valor === generateInscricaoEstadual['am'](valor);
    },
    al: function (valor) {
        return valor === generateInscricaoEstadual['al'](valor);
    },
    ap: function (valor) {
        return valor === generateInscricaoEstadual['ap'](valor);
    },
    ba: function (valor) {
        return valor === generateInscricaoEstadual['ba'](valor);
    },
    ce: function (valor) {
        return valor === generateInscricaoEstadual['ce'](valor);
    },
    df: function (valor) {
        return valor === generateInscricaoEstadual['df'](valor);
    },
    es: function (valor) {
        return valor === generateInscricaoEstadual['es'](valor);
    },
    go: function (valor) {
        return valor === generateInscricaoEstadual['go'](valor);
    },
    ma: function (valor) {
        return valor === generateInscricaoEstadual['ma'](valor);
    },
    mg: function (valor) {
        return valor === generateInscricaoEstadual['mg'](valor);
    },
    ms: function (valor) {
        return valor === generateInscricaoEstadual['ms'](valor);
    },
    mt: function (valor) {
        return valor === generateInscricaoEstadual['mt'](valor);
    },
    pa: function (valor) {
        return valor === generateInscricaoEstadual['pa'](valor);
    },
    pb: function (valor) {
        return valor === generateInscricaoEstadual['pb'](valor);
    },
    pe: function (valor) {
        return valor === generateInscricaoEstadual['pe'](valor);
    },
    pi: function (valor) {
        return valor === generateInscricaoEstadual['pi'](valor);
    },
    pr: function (valor) {
        return valor === generateInscricaoEstadual['pr'](valor);
    },
    rj: function (valor) {
        return valor === generateInscricaoEstadual['rj'](valor);
    },
    rn: function (valor) {
        return valor === generateInscricaoEstadual['rn'](valor);
    },
    ro: function (valor) {
        return valor === generateInscricaoEstadual['ro'](valor);
    },
    rr: function (valor) {
        return valor === generateInscricaoEstadual['rr'](valor);
    },
    rs: function (valor) {
        return valor === generateInscricaoEstadual['rs'](valor);
    },
    sc: function (valor) {
        return valor === generateInscricaoEstadual['sc'](valor);
    },
    se: function (valor) {
        return valor === generateInscricaoEstadual['se'](valor);
    },
    sp: function (valor) {
        return valor === generateInscricaoEstadual['sp'](valor);
    },
    to: function (valor) {
        return valor === generateInscricaoEstadual['to'](valor);
    },
};
function validateInscricaoEstadual(ie, estado) {
    if (eIndefinido(estado) || estado === null) {
        estado = '';
    }
    estado = estado.toLowerCase();
    if (estado !== '' && !(estado in funcoes)) {
        return new Error('estado não é válido');
    }
    if (eIndefinido(ie)) {
        return new Error('ie deve ser fornecida');
    }
    if (Array.isArray(ie)) {
        let retorno = true;
        ie.forEach(function (i) {
            if (!validateInscricaoEstadual(i, estado)) {
                retorno = false;
            }
        });
        return retorno;
    }
    if (typeof ie !== 'string') {
        return new Error('ie deve ser string ou array de strings');
    }
    if (!allNumbersAreSame(ie)) {
        return new Error('ie com todos dígitos iguais');
    }
    if (ie.match(/^ISENTO$/i)) {
        return true;
    }
    ie = ie.replace(/[\.|\-|\/|\s]/g, '');
    if (estado === '') {
        if (lookup(ie)) {
            return true;
        }
        else {
            return false;
        }
    }
    if (/^\d+$/.test(ie) || estado === 'sp' || funcoes[estado]) {
        return funcoes[estado](ie);
    }
    return false;
}
const MASKSIE = {
    AC: {
        text: '01.004.823/001-12',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    },
    AL: {
        text: '240000048',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    },
    AM: {
        text: '04.145.871-0',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/]
    },
    AP: {
        text: '240000048',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    },
    BA: {
        text: '1234567-48',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        textMaskFunction: function mask(userInput) {
            const numberLength = getSizeNumbers(userInput);
            if (!userInput || numberLength > 8) {
                return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
            }
            else {
                return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
            }
        }
    },
    CE: {
        text: '06.000001-5',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
    },
    DF: {
        text: '06 000001 123-55',
        textMask: [/\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    },
    ES: {
        text: '082.560.67-6',
        textMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/]
    },
    GO: {
        text: '06.000.001-5',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/]
    },
    MA: {
        text: '12.104.376-2',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    },
    MG: {
        text: '001.819.263/0048',
        textMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
    },
    MS: {
        text: '001819263',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    },
    MT: {
        text: '0018192630-1',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
    },
    PA: {
        text: '06-000001-5',
        textMask: [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
    },
    PB: {
        text: '06000001-5',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
    },
    PE: {
        text: '0192310-24',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    },
    PI: {
        text: '19.301.656-7',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/]
    },
    PR: {
        text: '19301656-78',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    },
    RJ: {
        text: '20.040.04-1',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/]
    },
    RN: {
        text: '20.040.040-1',
        textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/],
        textMaskFunction: function mask(userInput) {
            const numberLength = getSizeNumbers(userInput);
            if (!userInput || numberLength > 9) {
                return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
            }
            else {
                return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];
            }
        }
    },
    RO: {
        text: '101.62521-3',
        textMask: [/\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    },
    RR: {
        text: '24006628-1',
        textMask: [/\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    },
    RS: {
        text: '024/0440013',
        textMask: [/\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    },
    SC: {
        text: '271.234.563',
        textMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]
    },
    SE: {
        text: '27123456-3',
        textMask: [/\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    },
    SP: {
        text: '114.814.878.119',
        textMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]
    },
    TO: {
        text: '11 81 4878119',
        textMask: [/\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    },
};
function getSizeNumbers(userInput) {
    const numbers = userInput.match(/\d/g);
    let numberLength = 0;
    if (numbers) {
        numberLength = numbers.join('').length;
    }
    return numberLength;
}
function eIndefinido(objeto) {
    return typeof objeto === typeof undefined;
}
function tamanhoE(string, tamanho) {
    return !tamanhoNaoE(string, tamanho);
}
function tamanhoNaoE(string, tamanho = 9) {
    return string.length !== tamanho;
}
function primeiros(string, quantidade = 8) {
    return string.substring(0, quantidade);
}
function substracaoPor11SeMaiorQue2CasoContrario0(valor) {
    return valor < 2 ? 0 : 11 - valor;
}
function mod(valor, multiplicadores = serie(2, 9), divisor = 11) {
    let i = 0;
    return valor.split('').reduceRight(function (anterior, atual) {
        if (i > multiplicadores.length - 1) {
            i = 0;
        }
        return (multiplicadores[i++] * parseInt(atual, 10)) + anterior;
    }, 0) % divisor;
}
function calculoTrivialGenerate(valor, base = null, validarTamanho = false) {
    if (!validarTamanho && tamanhoNaoE(valor)) {
        return false;
    }
    if (base === null) {
        base = primeiros(valor);
    }
    const digito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base));
    return base + digito;
}
function naoComecaCom(string, valor) {
    return string.substring(0, valor.length) !== valor;
}
function entre(valor, limiteInferior, limiteSuperior) {
    if (typeof valor === 'string') {
        valor = parseInt(valor, 10);
    }
    return valor >= limiteInferior && valor <= limiteSuperior;
}
function lookup(ie) {
    const resultado = [];
    for (const estado in funcoes) {
        if (funcoes[estado](ie)) {
            resultado.push(estado);
        }
    }
    return resultado.length === 0 ? false : resultado;
}
function allNumbersAreSame(input) {
    const inputDigits = input.match(/\d/g);
    return inputDigits ? new Set(inputDigits).size === 1 : false;
}
function serie(de, ate) {
    const resultado = [];
    while (de <= ate) {
        resultado.push(de++);
    }
    return resultado;
}

// Função para criar AIH
function createAih(value) {
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
function createCertidao(value) {
    if (value.length > 30) {
        value = value.substring(0, value.length - 2);
    }
    let certPriDig = calcularDigitoCertidao(value, 1);
    let certSegDig = calcularDigitoCertidao(value, certPriDig);
    let certDV = certPriDig * 10 + certSegDig;
    if (certDV == 0)
        certDV = "00";
    if (certDV > 0 && certDV < 10)
        certDV = "0" + certDV;
    return certDV.toString();
}
// Função para criar CNH Espelho
function createCnhEspelho(value) {
    return modulo11Custom(value.substr(0, value.length - 1), 1, 8, false);
}
// Função para criar Renach Estadual
function createRenachEstadual(value) {
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
function createRenachSeguranca(value) {
    value = value.replace(/[^\d]+/g, '');
    if (value.length !== 11) {
        return '';
    }
    return "" + modulo11Custom(value.substr(0, value.length - 1), 1, 11);
}
// Função para criar CNH
function createCnh(value) {
    value = value.replace(/[^\d]+/g, '');
    if (value.length != 11 || value === '0') {
        return '';
    }
    return value.substr(-2);
}
function createCnpj(cnpj) {
    const cnpjWithoutDigits = cnpj.replace(/[^\d]+/g, '').substring(0, 12);
    const firstDigit = calcularDigitoVerificadorCnpj(cnpjWithoutDigits, 12);
    const secondDigit = calcularDigitoVerificadorCnpj(`${cnpjWithoutDigits}${firstDigit}`, 13);
    return [firstDigit, secondDigit];
}
// Função para criar CNS
function createCns(number) {
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
function createCpf(strCPF) {
    strCPF = strCPF.replace(/[^\d]+/g, '');
    if (strCPF === '00000000000') {
        return '';
    }
    return modulo11Custom(strCPF.substr(0, strCPF.length - 2), 2, 12);
}
// Função para criar Cartão de Crédito
function createCartaoCredito(number) {
    number = "00000000000000000" + number;
    number = number.slice(number.length - 18);
    const creditDig = calcularDigitoCartaoCredito(number);
    return 10 - creditDig;
}
// Função para criar ECT
function createEct(number) {
    number = getAllDigits(number).padStart(8, '0');
    const digito = calcularDigitoEct(number);
    return digito;
}
// Função para criar PIS/PASEP
function createPispasep(number) {
    const nis = fillString(getAllDigits(number), 11, '0');
    const digit = calcularDigitoPispasep(nis);
    return digit;
}
// Função para criar RENAVAM
function createRenavam(renavam) {
    renavam = renavam.padStart(11, '0');
    const digito = calcularDigitoRenavam(renavam);
    return digito;
}
// Função para criar Processo
function createProcesso(number) {
    number = getAllDigits(number).padStart(18, '0');
    return calcularProcesso(number);
}
// Função para criar Título Atual
function createTituloAtual(titulo) {
    const tam = titulo.length;
    const estado = titulo.substr(tam - 4, 2);
    titulo = titulo.substr(0, tam - 2).padStart(11, '0');
    const digitos = calcularDigitosTitulo(titulo, estado);
    return digitos.join('');
}
// Função para criar Título
function createTitulo(titNum) {
    titNum = getAllDigits(titNum).padStart(11, '0');
    const digitos = calcularDigitosTituloCompleto(titNum);
    return digitos.join('');
}
// Funções utilitárias adicionais
function calcularDigitoCertidao(value, fator) {
    let result = 0;
    const weights = [9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < value.length; i++) {
        result += parseInt(value[i], 10) * weights[i % weights.length];
    }
    return (result * fator) % 11;
}
function validarDigitosCnpj(cnpj) {
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
function calcularDigitosCnpj(cnpj) {
    const resultados = [];
    let soma = 0;
    let pos = cnpj.length - 7;
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj.charAt(i), 10) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultados.push(soma % 11 < 2 ? 0 : 11 - soma % 11);
    soma = 0;
    pos = cnpj.length - 7;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj.charAt(i), 10) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultados.push(soma % 11 < 2 ? 0 : 11 - soma % 11);
    return resultados;
}
function calcularDigitoVerificadorCnpj(cnpj, tamanho) {
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
function calcularSomaCns(number) {
    let soma = 0;
    for (let i = 0; i < number.length; i++) {
        soma += parseInt(number[i], 10) * (15 - i);
    }
    return soma;
}
function calcularDigitoCartaoCredito(number) {
    let soma = 0;
    for (let i = 0; i < number.length; i++) {
        let dig = parseInt(number[i], 10);
        if (i % 2 === 0)
            dig *= 2;
        if (dig > 9)
            dig -= 9;
        soma += dig;
    }
    return soma % 10;
}
function calcularDigitoEct(number) {
    const weights = [7, 9, 5, 3, 2, 4, 6, 8];
    let soma = 0;
    for (let i = 0; i < number.length; i++) {
        soma += parseInt(number[i], 10) * weights[i];
    }
    let result = 11 - (soma % 11);
    if (result === 11)
        result = 5;
    if (result === 10)
        result = 0;
    return result;
}
function calcularDigitoPispasep(nis) {
    let soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(nis[i], 10) * (11 - i);
    }
    return 11 - (soma % 11);
}
function calcularDigitoRenavam(renavam) {
    let soma = 0;
    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 10; i++) {
        soma += parseInt(renavam[i], 10) * weights[i];
    }
    const resto = soma % 11;
    return resto === 10 ? 0 : resto;
}
function calcularProcesso(number) {
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
function calcularDigitosTitulo(titulo, estado) {
    const excecao = estado === '01' || estado === '02';
    let dig1 = calcularDigitoTitulo(titulo, 2);
    if (excecao && dig1 === 0)
        dig1 = 1;
    let dig2 = calcularDigitoTitulo(titulo + dig1, 4);
    if (excecao && dig2 === 0)
        dig2 = 1;
    return [dig1, dig2];
}
function calcularDigitoTitulo(titulo, peso) {
    let soma = 0;
    const weights = [9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 8; i++) {
        soma += parseInt(titulo[i], 10) * weights[i];
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}
function calcularDigitosTituloCompleto(titNum) {
    let titPriDig = calcularDigitoTitulo(titNum, 2);
    let titSegDig = calcularDigitoTitulo(titNum + titPriDig, 4);
    return [titPriDig, titSegDig];
}
function isValidCnpj(cnpj) {
    const invalidCnpjs = [
        '00000000000000', '11111111111111', '22222222222222',
        '33333333333333', '44444444444444', '55555555555555',
        '66666666666666', '77777777777777', '88888888888888', '99999999999999'
    ];
    return !invalidCnpjs.includes(cnpj);
}
// Exporta todas as funções
const createBr = {
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

const createIptu = (number, estado, cidade) => {
    if (!iptuCreate[estado] || !iptuCreate[estado][cidade]) {
        return true;
    }
    number = getAllDigits(number);
    return iptuCreate[estado][cidade](number);
};
const maskIptu = (number, estado, cidade) => {
    if (!iptuMasks[estado] || !iptuMasks[estado][cidade]) {
        return number;
    }
    return iptuMasks[estado][cidade];
};
const validateIptu = (number, estado, cidade) => {
    if (!iptuValidate[estado] || !iptuValidate[estado][cidade]) {
        return true;
    }
    number = getAllDigits(number);
    return iptuValidate[estado][cidade](number);
};
function createIptuCtba(number) {
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
    if (iptuCtbaDV === 10) {
        iptuCtbaDV = 0;
    }
    return iptuCtbaDV;
}
function createIptuSp(number) {
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
    if (iptuSpDV === 10) {
        iptuSpDV = 1;
    }
    return iptuSpDV;
}
const fakerIptu = (estado, cidade) => {
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
const iptuCreate = {
    'sao-paulo': {
        'sao-paulo': createIptuSp,
    },
    'parana': {
        'curitiba': createIptuCtba,
    },
};
const iptuMasks = {
    'minas-gerais': {
        'belo-horizonte': {
            text: '000.000.000.000.0',
            textMask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/]
        },
        'contagem': {
            text: '20.040.040-1',
            textMask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/],
            textMaskFunction: function mask(userInput) {
                const numbers = userInput.match(/\d/g);
                let numberLength = 0;
                if (numbers) {
                    numberLength = numbers.join('').length;
                }
                if (!userInput || numberLength > 9) {
                    return [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
                }
                else {
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
const validateRemoveDigit = (number, max) => {
    number = getAllDigits(number);
    if (number.length > max) {
        return false;
    }
    else if (number.length === max) {
        number = number.slice(0, -1);
    }
    return number;
};
function validateIptuCtba(value) {
    let number = validateRemoveDigit(value, 12);
    if (!number) {
        return false;
    }
    const dv = iptuCreate['parana']['curitiba'](number);
    return parseInt(value[value.length - 1]) === dv;
}
function validateIptuContagem(number) {
    const result = validateRemoveDigit(number, 12);
    return result;
}
function validateIptuSp(value) {
    let number = validateRemoveDigit(value, 12);
    if (!number) {
        return false;
    }
    const dv = iptuCreate['sao-paulo']['sao-paulo'](number);
    return parseInt(value[value.length - 1]) === dv;
}
const iptuValidate = {
    'sao-paulo': {
        'sao-paulo': validateIptuSp,
    },
    'minas-gerais': {
        'contagem': validateIptuContagem,
    },
    'parana': {
        'curitiba': validateIptuCtba,
    }
};

function validateAih(aih) {
    const aihClean = aih.replace(/[^\d]+/g, '');
    const dvOriginal = aihClean.substr(-1);
    const dv = createAih(aihClean);
    return dvOriginal === dv;
}
function validateCellphone(cel) {
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
const CEPRange = {
    'SP': /^([1][0-9]{3}|[01][0-9]{4})[0-9]{3}$/g,
    'RJ': /^[2][0-8][0-9]{3}[0-9]{3}$/g,
    'MS': /^[7][9][0-9]{3}[0-9]{3}$/g,
    'MG': /^[3][0-9]{4}[0-9]{3}$/g,
    // Outros estados...
};
function validateCep(cep) {
    const cepClean = cep.replace(/[^\d]+/g, '');
    const exp = /\d{2}\.\d{3}\-\d{3}/;
    if (!exp.test(cep) && cepClean.length !== 8) {
        return false;
    }
    return true;
}
function cepRanges(cep) {
    cep = (cep.toString()).replace(/[^\d]+/g, '');
    cep = parseInt(cep, 10);
    const cepString = cep.toString();
    let found;
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
function validateCertidao(value) {
    let certidao = getAllDigits(value);
    const format = /[0-9]{32}/;
    if (!format.test(certidao)) {
        return false;
    }
    const dvOriginal = certidao.substr(-2);
    const dv = createCertidao(certidao);
    return dv === dvOriginal;
}
function validateChassi(chassi) {
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
function validateCnae(number) {
    return !!number;
}
function validateCnh(value) {
    value = value.replace(/[^\d]/g, '');
    if (value.length !== 11) {
        return false;
    }
    const check = createCnh(value);
    return value.substr(-2) === check;
}
function validateCnhEspelho(value) {
    value = value.replace(/[^\d]/g, '');
    if (value.length !== 10) {
        return false;
    }
    let check = createCnhEspelho(value);
    if (check === '0' || check === '1')
        check = '0';
    return value.substr(-1) === check;
}
function validateRenachEstadual(value) {
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
    if (check === '0' || check === '1')
        check = '0';
    return value.substr(-1) === check;
}
function validateRenachSeguranca(value) {
    value = value.replace(/[^\d]/g, '');
    if (value.length !== 11) {
        return false;
    }
    let check = createRenachSeguranca(value);
    return value.substr(-1) === check;
}
function validateCnpj(cnpj) {
    return validarDigitosCnpj(cnpj);
}
function validateCpf(strCpf) {
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
function validateCpfCnpj(number) {
    return validateCpf(number) || validateCnpj(number);
}
function validateCvv(value, maxLength = 3) {
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
function validateCartaoCredito(input) {
    let value;
    if (typeof input == 'string') {
        value = getAllDigits(input);
    }
    else {
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
const creditCardValidator = {
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
function validateCns(value) {
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
function validateTitulo(titulo) {
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
function validateProcesso(processo) {
    let processoClean = processo.replace(/\./g, '').replace(/\-/g, '');
    const processoValidado = createProcesso(processo);
    return parseInt(processoClean) === parseInt(getAllDigits(processoValidado));
}
function validateRenavam(renavam) {
    let renavamClean = renavam.replace(/\./g, '').replace(/\-/g, '');
    const dv = createRenavam(renavam);
    const tam = renavam.length;
    const digitos = renavam.substr(tam - 1, 1);
    return digitos.charCodeAt(0) - 48 === dv;
}
function validateRg(rg) {
    let rgClean = rg.replace(/\./g, '').replace(/-/g, '');
    const expClean = /[a-z]{2}\d{8}/;
    const state = rg.substr(0, 2).toUpperCase();
    if (!expClean.test(rgClean) && !(state in CEPRange)) {
        return false;
    }
    const validateState = RG[state];
    return validateState ? validateState(rg) : true;
}
function validateSenha(value, options = {}) {
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
function validateSite(value) {
    const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g;
    return re.test(String(value).toLowerCase());
}
function validateSped(sped) {
    return !!sped;
}
function validatePhoneNumber(tel) {
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
function validateTime(time, options = {}) {
    const value = time.toString();
    const expression = options.diario
        ? /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/
        : /^([0-9]?[0-9]):([0-5][0-9])(:[0-5][0-9])?$/;
    return expression.test(value);
}
function validateCurrency(currency) {
    if (typeof currency === 'number') {
        return true;
    }
    const regex = /^(R\$|R\$ )?(-)?(?!0(\.)?00)\d{1,3}((\.)?\d{3})*(,\d\d)?$/g;
    return regex.test(currency);
}
function validateContaBanco(number) {
    return !!number;
}
function validateData(value) {
    if (!value) {
        return false;
    }
    const values = value.split('/');
    if (values.length !== 3) {
        return false;
    }
    const testData = new Date(values[1] + '/' + values[0] + '/' + values[2]);
    return !!testData.getTime();
}
function validateDate(value) {
    if (!value || value.length < 10) {
        return false;
    }
    const testData = new Date(value);
    return !!testData.getTime();
}
function validateDatetime(time, options = {}) {
    if (!time) {
        return false;
    }
    time = time.toString();
    const values = time.split(' ');
    return validateDate(values[0]) && validateTime(values[1], options);
}
function validateDataHora(time, options = {}) {
    if (!time) {
        return false;
    }
    time = time.toString();
    const values = time.split(' ');
    return validateData(values[0]) && validateTime(values[1], options);
}
function validateEct(number) {
    number = getAllDigits(number);
    if (number.length > 9) {
        return false;
    }
    const nodigit = number.substr(0, number.length - 1);
    const dg = createEct(nodigit);
    return parseInt(number[number.length - 1]) === dg;
}
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
function validateEndereco(number) {
    return !!number;
}
function validateNumber(number) {
    if (number.split(',').length > 2) {
        return false;
    }
    const regexDecimal = /^\d+(?:\.\d{0,2})$/;
    const regex = /^[0-9]{0,10}[,]{1,1}[0-9]{0,4}/;
    const regexNumero = /^[0-9]{0,10}/;
    return regexDecimal.test(number) || regex.test(number) || regexNumero.test(number);
}
function validatePorcentagem(porcentagem) {
    porcentagem = porcentagem.split('%')[0];
    return validateNumber(porcentagem);
}
function validatePispasep(number) {
    number = getAllDigits(number);
    let nis = fillString(number, 11, '0');
    const regex = /\d{11}/;
    if (!regex.test(nis)) {
        return false;
    }
    const digit = createPispasep(number);
    return nis[10].toString() === digit.toString();
}
function validateUsername(value) {
    const re = /^[a-z0-9_-]{3,16}$/i;
    return re.test(String(value).toLowerCase());
}
const LICENSEPLATES_RANGE = [
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
const LICENSEPLATES_INVALID = { start: 'SAW0001', end: 'ZZZ9999' }; // || Sequências ainda não definidas
function validateLicensePlate(licensePlate, includesMercosul) {
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
    };
    const isLegadoBRInvalid = licensePlateClean >= LICENSEPLATES_INVALID.start && licensePlateClean <= LICENSEPLATES_INVALID.end;
    if ((regex.legacyBR.test(licensePlateClean) && !isLegadoBRInvalid)
        || (regex.mercosulBR.test(licensePlateClean))
        || (includesMercosul && ((regex.mercosulAR.test(licensePlateClean))
            || (regex.mercosulBO.test(licensePlateClean))
            || (regex.mercosulPY.test(licensePlateClean))
            || (regex.mercosulUY.test(licensePlateClean))))) {
        return true;
    }
    return false;
}
function rgSP(number) {
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
    let cispDig = (b1 * 2 + b2 * 3 + b3 * 4 + b4 * 5 + b5 * 6 + b6 * 7 + b7 * 8 + b8 * 9) % 11;
    if (cispDig == 10) {
        cispDig = "X";
    }
    return cispDig;
}
function rgRJ(number) {
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
    let ci7 = b1 * 2;
    if (ci7 > 9) {
        ci7 = ci7 - 9;
    }
    let ci56 = b3 * 2;
    if (ci56 > 9) {
        ci56 = ci56 - 9;
    }
    let ci34 = b5 * 2;
    if (ci34 > 9) {
        ci34 = ci34 - 9;
    }
    let ci12 = b7 * 2;
    if (ci12 > 9) {
        ci12 = ci12 - 9;
    }
    let ci67 = b2;
    let ci45 = b4;
    let ci23 = b6;
    let ci01 = b8;
    let cirjDig = (ci7 + ci56 + ci34 + ci12 + ci67 + ci45 + ci23 + ci01) % 10;
    cirjDig = 10 - cirjDig;
    if (cirjDig == 10) {
        cirjDig = 0;
    }
    return cirjDig;
}
const RG = {
    sp: rgSP,
    rj: rgRJ
};
const validateBr = {
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

const cpf = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.cpf(v) ? null : { cpf: true };
};

const CPF_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => CPFValidator),
    multi: true
};
class CPFValidator {
    validate(c) {
        return cpf(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CPFValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: CPFValidator, isStandalone: true, selector: "[cpf][formControlName],[cpf][formControl],[cpf][ngModel]", providers: [CPF_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CPFValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[cpf][formControlName],[cpf][formControl],[cpf][ngModel]',
                    providers: [CPF_VALIDATOR]
                }]
        }] });

const dollarSign = '$';
const emptyString$4 = '';
const comma = ',';
const period = '.';
const minus = '-';
const minusRegExp = /-/;
const nonDigitsRegExp = /\D+/g;
const number$1 = 'number';
const digitRegExp = /\d/;
const caretTrap = '[]';
function createNumberMask({ prefix = dollarSign, suffix = emptyString$4, includeThousandsSeparator = true, thousandsSeparatorSymbol = comma, allowDecimal = false, decimalSymbol = period, decimalLimit = 2, requireDecimal = false, allowNegative = false, allowLeadingZeroes = false, integerLimit = null } = {}) {
    const prefixLength = prefix && prefix.length || 0;
    const suffixLength = suffix && suffix.length || 0;
    const thousandsSeparatorSymbolLength = thousandsSeparatorSymbol && thousandsSeparatorSymbol.length || 0;
    function numberMask(rawValue = emptyString$4) {
        const rawValueLength = rawValue.length;
        if (rawValue === emptyString$4 ||
            (rawValue[0] === prefix[0] && rawValueLength === 1)) {
            return prefix.split(emptyString$4).concat([digitRegExp.toString()]).concat(suffix.split(emptyString$4));
        }
        else if (rawValue === decimalSymbol &&
            allowDecimal) {
            return prefix.split(emptyString$4).concat(['0', decimalSymbol, digitRegExp.toString()]).concat(suffix.split(emptyString$4));
        }
        const isNegative = (rawValue[0] === minus) && allowNegative;
        //If negative remove "-" sign
        if (isNegative) {
            rawValue = rawValue.toString().substr(1);
        }
        const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
        const hasDecimal = indexOfLastDecimal !== -1;
        let integer;
        let fraction;
        let mask;
        // remove the suffix
        if (rawValue.slice(suffixLength * -1) === suffix) {
            rawValue = rawValue.slice(0, suffixLength * -1);
        }
        if (hasDecimal && (allowDecimal || requireDecimal)) {
            integer = rawValue.slice(rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0, indexOfLastDecimal);
            fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
            fraction = convertToMask(fraction.replace(nonDigitsRegExp, emptyString$4));
        }
        else {
            if (rawValue.slice(0, prefixLength) === prefix) {
                integer = rawValue.slice(prefixLength);
            }
            else {
                integer = rawValue;
            }
        }
        if (integerLimit && typeof integerLimit === number$1) {
            const thousandsSeparatorRegex = thousandsSeparatorSymbol === '.' ? '[.]' : `${thousandsSeparatorSymbol}`;
            const numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []).length;
            integer = integer.slice(0, integerLimit + (numberOfThousandSeparators * thousandsSeparatorSymbolLength));
        }
        integer = integer.replace(nonDigitsRegExp, emptyString$4);
        if (!allowLeadingZeroes) {
            integer = integer.replace(/^0+(0$|[^0])/, '$1');
        }
        integer = (includeThousandsSeparator) ? addThousandsSeparator(integer, thousandsSeparatorSymbol) : integer;
        mask = convertToMask(integer);
        if ((hasDecimal && allowDecimal) || requireDecimal === true) {
            if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
                mask.push(caretTrap);
            }
            mask.push(decimalSymbol, caretTrap);
            if (fraction) {
                if (typeof decimalLimit === number$1) {
                    fraction = fraction.slice(0, decimalLimit);
                }
                mask = mask.concat(fraction);
            }
            if (requireDecimal === true && rawValue[indexOfLastDecimal - 1] === decimalSymbol) {
                mask.push(digitRegExp);
            }
        }
        if (prefixLength > 0) {
            mask = prefix.split(emptyString$4).concat(mask);
        }
        if (isNegative) {
            // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
            if (mask.length === prefixLength) {
                mask.push(digitRegExp);
            }
            mask = [minusRegExp].concat(mask);
        }
        if (suffix.length > 0) {
            mask = mask.concat(suffix.split(emptyString$4));
        }
        return mask;
    }
    numberMask.instanceOf = 'createNumberMask';
    return numberMask;
}
function convertToMask(strNumber) {
    return strNumber
        .split(emptyString$4)
        .map((char) => digitRegExp.test(char) ? digitRegExp : char);
}
// http://stackoverflow.com/a/10899795/604296
function addThousandsSeparator(n, thousandsSeparatorSymbol) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
}

const maskNumber = {
    decimalLimit: 2,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
    allowDecimal: true,
    integerLimit: 17,
    prefix: '',
    suffix: ''
};
const MASKS = {
    aih: {
        text: '000000000000-0',
        textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
    },
    cartaocredito: {
        text: '0000 0000 0000 0000 00/00 000',
        textMask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, /\d/]
    },
    cellphone: {
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
        textMaskFunction: function mask(userInput) {
            const numbers = userInput.match(/\d/g);
            let numberLength = 0;
            if (numbers) {
                numberLength = numbers.join('').length;
            }
            if (!userInput || numberLength < 9) {
                return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
            }
            else {
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
        textMaskFunction: function mask(userInput) {
            const numbers = userInput.match(/\d/g);
            let numberLength = 0;
            if (numbers) {
                numberLength = numbers.join('').length;
            }
            if (!userInput || numberLength > 10) {
                return ['(', /[1-9]/, /\d/, ')', ' ', /[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
            }
            else {
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
        numberToString: (n) => {
            if (!n || typeof n === 'string') {
                return n;
            }
            return (n.toString()).replace('.', ',');
        },
        textMask: false
    }
};
const makeGeneric = (key) => {
    return (value) => {
        if (!value) {
            return '';
        }
        let mask = MASKS[key].textMask;
        let textMaskFunction = MASKS[key].textMaskFunction;
        if (typeof textMaskFunction === 'function') {
            mask = textMaskFunction(value);
        }
        return conformToMask$2(value, mask, { guide: false }).conformedValue;
    };
};
function formatNumber(maskType, numberValue, decimalsFormat = 2) {
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
    let formattedValue = conformToMask$2(numberValue, mask, { guide: false }).conformedValue;
    let decimalPart = vals[1] && decimalsFormat > 0 ? ',' + vals[1].padEnd(decimalsFormat, '0') : '';
    return formattedValue + decimalPart;
}
const maskBr = {
    aih: makeGeneric('aih'),
    cartaocredito: makeGeneric('cartaocredito'),
    cellphone: makeGeneric('cellphone'),
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
    currency: (currencyValueInput, decimalsFormat = 2) => {
        return formatNumber(MASKS['currency'], currencyValueInput, decimalsFormat);
    },
    data: makeGeneric('data'),
    date: makeGeneric('date'),
    datetime: makeGeneric('datetime'),
    datahora: makeGeneric('datahora'),
    ect: makeGeneric('ect'),
    endereco: makeGeneric('endereco'),
    inscricaoestadual: (inscricaoestadualValue, estado) => {
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
        return conformToMask$2(inscricaoestadualValue, mask, { guide: false }).conformedValue;
    },
    iptu: (iptuValue, estado, cidade) => {
        const mask = maskIptu(iptuValue, estado, cidade);
        if (!mask || typeof mask === 'string') {
            return '';
        }
        return conformToMask$2(iptuValue, mask.textMask, { guide: false }).conformedValue;
    },
    number: (numberValue, decimalsFormat = 2) => {
        return formatNumber(MASKS['number'], numberValue, decimalsFormat);
    },
    porcentagem: (porcentagemValue, decimalsFormat = 2) => {
        return formatNumber(MASKS['porcentagem'], porcentagemValue, decimalsFormat);
    },
    pispasep: makeGeneric('pispasep'),
    licensePlate: makeGeneric('licensePlate'),
    processo: makeGeneric('processo'),
    renavam: makeGeneric('renavam'),
    rg: makeGeneric('rg'),
    sped: makeGeneric('sped'),
    phoneNumber: makeGeneric('phoneNumber'),
    time: (value) => {
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
const placeholderChar$1 = '_';
const strFunction$1 = 'function';
const defaultPlaceholderChar = placeholderChar$1;
const emptyArray$2 = [];
const emptyString$3 = '';
function conformToMask$2(inputValue = emptyString$3, mask = emptyArray$2, config = {}) {
    let rawValue = inputValue.toString();
    if (typeof inputValue === 'number') {
        rawValue = inputValue.toString();
    }
    if (inputValue instanceof Date) {
        rawValue = inputValue.toLocaleString("pt-br");
    }
    if (!isArray$1(mask)) {
        if (typeof mask === strFunction$1) {
            mask = mask(inputValue, config);
            mask = processCaretTraps$1(mask).maskWithoutCaretTraps;
        }
        else {
            throw new Error('Text-mask:conformToMask; The mask property must be an array.');
        }
    }
    const guide = config.guide || true;
    const previousConformedValue = config.previousConformedValue || emptyString$3;
    const placeholder = convertMaskToPlaceholder$1(mask, placeholderChar$1);
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
        let compensatingPlaceholderChars = emptyString$3;
        for (let i = indexOfFirstChange; i < indexOfLastChange; i++) {
            if (placeholder[i] === placeholderChar$1) {
                compensatingPlaceholderChars += placeholderChar$1;
            }
        }
        rawValue = rawValue.slice(0, indexOfFirstChange) + compensatingPlaceholderChars + rawValue.slice(indexOfFirstChange, rawValueLength);
    }
    const rawValueArr = rawValue.split(emptyString$3).map((char, i) => ({ char, isNew: i >= indexOfFirstChange && i < indexOfLastChange }));
    for (let i = rawValueLength - 1; i >= 0; i--) {
        const { char } = rawValueArr[i];
        if (char !== placeholderChar$1) {
            const shouldOffset = i >= indexOfFirstChange && previousConformedValueLength === maskLength;
            if (char === placeholder[(shouldOffset) ? i - editDistance : i]) {
                rawValueArr.splice(i, 1);
            }
        }
    }
    let conformedValue = emptyString$3;
    let someCharsRejected = false;
    placeholderLoop: for (let i = 0; i < placeholderLength; i++) {
        const charInPlaceholder = placeholder[i];
        if (charInPlaceholder === placeholderChar$1) {
            if (rawValueArr.length > 0) {
                while (rawValueArr.length > 0) {
                    const shift = rawValueArr.shift();
                    let rawValueChar = '', isNew = false;
                    if (shift) {
                        rawValueChar = shift.char;
                        isNew = shift.isNew;
                    }
                    if (rawValueChar === placeholderChar$1 && suppressGuide !== true) {
                        conformedValue += placeholderChar$1;
                        continue placeholderLoop;
                    }
                    else if (mask[i].test(rawValueChar)) {
                        if (keepCharPositions !== true ||
                            isNew === false ||
                            previousConformedValue === emptyString$3 ||
                            guide === false ||
                            !isAddition) {
                            conformedValue += rawValueChar;
                        }
                        else {
                            const rawValueArrLength = rawValueArr.length;
                            let indexOfNextAvailablePlaceholderChar = null;
                            for (let i = 0; i < rawValueArrLength; i++) {
                                const charData = rawValueArr[i];
                                if (charData.char !== placeholderChar$1 && charData.isNew === false) {
                                    break;
                                }
                                if (charData.char === placeholderChar$1) {
                                    indexOfNextAvailablePlaceholderChar = i;
                                    break;
                                }
                            }
                            if (indexOfNextAvailablePlaceholderChar !== null) {
                                conformedValue += rawValueChar;
                                rawValueArr.splice(indexOfNextAvailablePlaceholderChar, 1);
                            }
                            else {
                                i--;
                            }
                        }
                        continue placeholderLoop;
                    }
                    else {
                        someCharsRejected = true;
                    }
                }
            }
            if (suppressGuide === false) {
                conformedValue += placeholder.substr(i, placeholderLength);
            }
            break;
        }
        else {
            conformedValue += charInPlaceholder;
        }
    }
    if (suppressGuide && isAddition === false) {
        let indexOfLastFilledPlaceholderChar = null;
        for (let i = 0; i < conformedValue.length; i++) {
            if (placeholder[i] === placeholderChar$1) {
                indexOfLastFilledPlaceholderChar = i;
            }
        }
        if (indexOfLastFilledPlaceholderChar !== null) {
            conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
        }
        else {
            conformedValue = emptyString$3;
        }
    }
    return { conformedValue, meta: { someCharsRejected } };
}
function convertMaskToPlaceholder$1(mask = emptyArray$2, placeholderChar = defaultPlaceholderChar) {
    if (!isArray$1(mask)) {
        throw new Error('Text-mask:convertMaskToPlaceholder; The mask property must be an array.');
    }
    if (mask.indexOf(placeholderChar) !== -1) {
        throw new Error('Placeholder character must not be used as part of the mask. Please specify a character ' +
            'that is not present in your mask as your placeholder character.\n\n' +
            `The placeholder character that was received is: ${JSON.stringify(placeholderChar)}\n\n` +
            `The mask that was received is: ${JSON.stringify(mask)}`);
    }
    return mask.map((char) => (char instanceof RegExp) ? placeholderChar : char).join('');
}

class CPFPipe {
    transform(cpfValue) {
        return maskBr.cpf(cpfValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CPFPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: CPFPipe, isStandalone: true, name: "cpf" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CPFPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'cpf',
                }]
        }] });

const cnpj = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.cnpj(v) ? null : { cnpj: true };
};

const CNPJ_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => CNPJValidator),
    multi: true
};
class CNPJValidator {
    validate(c) {
        return cnpj(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CNPJValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: CNPJValidator, isStandalone: true, selector: "[cnpj][formControlName],[cnpj][formControl],[cnpj][ngModel]", providers: [CNPJ_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CNPJValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[cnpj][formControlName],[cnpj][formControl],[cnpj][ngModel]',
                    providers: [CNPJ_VALIDATOR]
                }]
        }] });

class CNPJPipe {
    transform(cnpjValue) {
        return maskBr.cnpj(cnpjValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CNPJPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: CNPJPipe, isStandalone: true, name: "cnpj" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CNPJPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'cnpj',
                }]
        }] });

const phoneNumber = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.phoneNumber(v) ? null : { phoneNumber: true };
};

const PHONENUMBER_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => PhoneNumberValidator),
    multi: true
};
class PhoneNumberValidator {
    validate(c) {
        return phoneNumber(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PhoneNumberValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: PhoneNumberValidator, isStandalone: true, selector: "[phoneNumber][formControlName],[phoneNumber][formControl],[phoneNumber][ngModel]", providers: [PHONENUMBER_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PhoneNumberValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[phoneNumber][formControlName],[phoneNumber][formControl],[phoneNumber][ngModel]',
                    providers: [PHONENUMBER_VALIDATOR]
                }]
        }] });

class PhoneNumberPipe {
    transform(phoneNumberValue) {
        return maskBr.phoneNumber(phoneNumberValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PhoneNumberPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: PhoneNumberPipe, isStandalone: true, name: "phoneNumber" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PhoneNumberPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'phoneNumber' }]
        }] });

const cellphone = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.cellphone(v) ? null : { cellphone: true };
};

const CELLPHONE_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => CellphoneValidator),
    multi: true
};
class CellphoneValidator {
    validate(c) {
        return cellphone(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CellphoneValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: CellphoneValidator, isStandalone: true, selector: "[cellphone][formControlName],[cellphone][formControl],[cellphone][ngModel]", providers: [CELLPHONE_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CellphoneValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[cellphone][formControlName],[cellphone][formControl],[cellphone][ngModel]',
                    providers: [CELLPHONE_VALIDATOR]
                }]
        }] });

class CellphonePipe {
    transform(cellphoneValue) {
        return maskBr.cellphone(cellphoneValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CellphonePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: CellphonePipe, isStandalone: true, name: "cellphone" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CellphonePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cellphone' }]
        }] });

const inscricaoestadual = (estado) => {
    return (control) => {
        if (utilsBr.isPresent(Validators.required(control))) {
            return null;
        }
        const v = control.value;
        return validateBr.inscricaoestadual(v, estado) ? null : { inscricaoestadual: true };
    };
};

const INSCRICAOESTADUAL_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => InscricaoEstadualValidator),
    multi: true
};
class InscricaoEstadualValidator {
    validate(c) {
        return inscricaoestadual('mg')(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: InscricaoEstadualValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: InscricaoEstadualValidator, isStandalone: true, selector: "[inscricaoestadual][formControlName],[inscricaoestadual][formControl],[inscricaoestadual][ngModel]", providers: [INSCRICAOESTADUAL_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: InscricaoEstadualValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[inscricaoestadual][formControlName],[inscricaoestadual][formControl],[inscricaoestadual][ngModel]',
                    providers: [INSCRICAOESTADUAL_VALIDATOR]
                }]
        }] });

class InscricaoEstadualPipe {
    transform(inscricaoestadualValue, estado) {
        return maskBr.inscricaoestadual(inscricaoestadualValue, estado);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: InscricaoEstadualPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: InscricaoEstadualPipe, isStandalone: true, name: "inscricaoestadual" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: InscricaoEstadualPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'inscricaoestadual',
                }]
        }] });

const cep = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.cep(v) ? null : { cep: true };
};

const CEP_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => CEPValidator),
    multi: true
};
class CEPValidator {
    validate(c) {
        return cep(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CEPValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: CEPValidator, isStandalone: true, selector: "[cep][formControlName],[cep][formControl],[cep][ngModel]", providers: [CEP_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CEPValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[cep][formControlName],[cep][formControl],[cep][ngModel]',
                    providers: [CEP_VALIDATOR]
                }]
        }] });

class CEPPipe {
    transform(cepValue) {
        return maskBr.cep(cepValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CEPPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: CEPPipe, isStandalone: true, name: "cep" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CEPPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'cep',
                }]
        }] });

const currency = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.currency(v) ? null : { currency: true };
};

const CURRENCY_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => CURRENCYValidator),
    multi: true
};
class CURRENCYValidator {
    validate(c) {
        return currency(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CURRENCYValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: CURRENCYValidator, isStandalone: true, selector: "[currency][formControlName],[currency][formControl],[currency][ngModel]", providers: [CURRENCY_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CURRENCYValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[currency][formControlName],[currency][formControl],[currency][ngModel]',
                    providers: [CURRENCY_VALIDATOR]
                }]
        }] });

class CURRENCYPipe {
    transform(currencyValue, decimalValue = 2) {
        return maskBr.currency(currencyValue, decimalValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CURRENCYPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: CURRENCYPipe, isStandalone: true, name: "currencyBrazil" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: CURRENCYPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'currencyBrazil' }]
        }] });

const number = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.number(v) ? null : { number: true };
};

const NUMBER_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => NUMBERValidator),
    multi: true
};
class NUMBERValidator {
    validate(c) {
        return number(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: NUMBERValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: NUMBERValidator, isStandalone: true, selector: "[number][formControlName],[number][formControl],[number][ngModel]", providers: [NUMBER_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: NUMBERValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[number][formControlName],[number][formControl],[number][ngModel]',
                    providers: [NUMBER_VALIDATOR]
                }]
        }] });

class NUMBERPipe {
    transform(numberValue, decimalValue = 2) {
        return maskBr.number(numberValue, decimalValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: NUMBERPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: NUMBERPipe, isStandalone: true, name: "numberBrazil" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: NUMBERPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'numberBrazil',
                }]
        }] });

const licensePlate = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.licensePlate(v) ? null : { licensePlate: true };
};

const LICENSEPLATE_VALIDATOR = {
    provide: NG_VALIDATORS,
    /* tslint:disable: no-use-before-declare */
    useExisting: forwardRef(() => LICENSEPLATEValidator),
    multi: true
};
class LICENSEPLATEValidator {
    validate(c) {
        return licensePlate(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: LICENSEPLATEValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: LICENSEPLATEValidator, isStandalone: true, selector: "[license-plate][formControlName],[license-plate][formControl],[license-plate][ngModel]", providers: [LICENSEPLATE_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: LICENSEPLATEValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[license-plate][formControlName],[license-plate][formControl],[license-plate][ngModel]',
                    providers: [LICENSEPLATE_VALIDATOR]
                }]
        }] });

class LICENSEPLATEPipe {
    transform(licensePlateValue) {
        return maskBr.licensePlate(licensePlateValue).toUpperCase();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: LICENSEPLATEPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: LICENSEPLATEPipe, isStandalone: true, name: "licensePlate" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: LICENSEPLATEPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'licensePlate' }]
        }] });

const percentage = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.porcentagem(v) ? null : { percentage: true };
};

const PERCENTAGE_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => PERCENTAGEValidator),
    multi: true
};
class PERCENTAGEValidator {
    validate(c) {
        return percentage(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PERCENTAGEValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: PERCENTAGEValidator, isStandalone: true, selector: "[percentage][formControlName],[percentage][formControl],[percentage][ngModel]", providers: [PERCENTAGE_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PERCENTAGEValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[percentage][formControlName],[percentage][formControl],[percentage][ngModel]',
                    providers: [PERCENTAGE_VALIDATOR]
                }]
        }] });

class PERCENTAGEPipe {
    transform(percentageValue, decimalValue) {
        return maskBr.porcentagem(percentageValue, decimalValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PERCENTAGEPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: PERCENTAGEPipe, isStandalone: true, name: "percentage" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PERCENTAGEPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'percentage',
                }]
        }] });

const renavam = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.renavam(v) ? null : { renavam: true };
};

const RENAVAM_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => RenavamValidator),
    multi: true
};
class RenavamValidator {
    validate(c) {
        return renavam(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: RenavamValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: RenavamValidator, isStandalone: true, selector: "[renavam][formControlName],[renavam][formControl],[renavam][ngModel]", providers: [RENAVAM_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: RenavamValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[renavam][formControlName],[renavam][formControl],[renavam][ngModel]',
                    providers: [RENAVAM_VALIDATOR]
                }]
        }] });

class RenavamPipe {
    transform(renavamValue) {
        return maskBr.renavam(renavamValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: RenavamPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: RenavamPipe, isStandalone: true, name: "renavam" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: RenavamPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'renavam',
                }]
        }] });

const pispasep = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.pispasep(v) ? null : { pispasep: true };
};

const PISPASE_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => PispasepValidator),
    multi: true
};
class PispasepValidator {
    validate(c) {
        return pispasep(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PispasepValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: PispasepValidator, isStandalone: true, selector: "[pispasep][formControlName],[pispasep][formControl],[pispasep][ngModel]", providers: [PISPASE_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PispasepValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[pispasep][formControlName],[pispasep][formControl],[pispasep][ngModel]',
                    providers: [PISPASE_VALIDATOR]
                }]
        }] });

class PispasepPipe {
    transform(pispasepValue) {
        return maskBr.pispasep(pispasepValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PispasepPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: PispasepPipe, isStandalone: true, name: "pispasep" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: PispasepPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'pispasep',
                }]
        }] });

const rg = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.rg(v) ? null : { rg: true };
};

const RG_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => RGValidator),
    multi: true
};
class RGValidator {
    validate(c) {
        return rg(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: RGValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: RGValidator, isStandalone: true, selector: "[rg][formControlName],[rg][formControl],[rg][ngModel]", providers: [RG_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: RGValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[rg][formControlName],[rg][formControl],[rg][ngModel]',
                    providers: [RG_VALIDATOR]
                }]
        }] });

class RGPipe {
    transform(rgValue) {
        return maskBr.rg(rgValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: RGPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: RGPipe, isStandalone: true, name: "rg" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: RGPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'rg',
                }]
        }] });

const time = (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
        return null;
    }
    const v = control.value;
    return validateBr.time(v) ? null : { time: true };
};

const TIME_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => TIMEValidator),
    multi: true
};
class TIMEValidator {
    validate(c) {
        return time(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: TIMEValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: TIMEValidator, isStandalone: true, selector: "[time][formControlName],[time][formControl],[time][ngModel]", providers: [TIME_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: TIMEValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[time][formControlName],[time][formControl],[time][ngModel]',
                    providers: [TIME_VALIDATOR]
                }]
        }] });

class TIMEPipe {
    transform(timeValue) {
        return maskBr.time(timeValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: TIMEPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: TIMEPipe, isStandalone: true, name: "time" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: TIMEPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'time',
                }]
        }] });

const titulo = (control) => {
    if (utilsBr.isPresent(Validators.required(control)))
        return null;
    const v = control.value;
    return validateBr.titulo(v) ? null : { titulo: true };
};

const TITULO_VALIDATOR = {
    provide: NG_VALIDATORS,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => TITULOValidator),
    multi: true
};
class TITULOValidator {
    validate(c) {
        return titulo(c);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: TITULOValidator, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: TITULOValidator, isStandalone: true, selector: "[titulo][formControlName],[titulo][formControl],[titulo][ngModel]", providers: [TITULO_VALIDATOR], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: TITULOValidator, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[titulo][formControlName],[titulo][formControl],[titulo][ngModel]',
                    providers: [TITULO_VALIDATOR]
                }]
        }] });

class TITULOPipe {
    transform(tituloValue) {
        return maskBr.titulo(tituloValue);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: TITULOPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: TITULOPipe, isStandalone: true, name: "titulo" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: TITULOPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'titulo'
                }]
        }] });

const placeholderChar = '_';
const strFunction = 'function';

const emptyArray$1 = [];
function convertMaskToPlaceholder(mask = emptyArray$1, localPlaceholderChar = placeholderChar) {
    if (!isArray(mask)) {
        throw new Error('Text-mask:convertMaskToPlaceholder; The mask property must be an array.');
    }
    if (mask.indexOf(localPlaceholderChar) !== -1) {
        throw new Error('Placeholder character must not be used as part of the mask. Please specify a character ' +
            'that is not present in your mask as your placeholder character.\n\n' +
            `The placeholder character that was received is: ${JSON.stringify(localPlaceholderChar)}\n\n` +
            `The mask that was received is: ${JSON.stringify(mask)}`);
    }
    return mask.map((char) => {
        return (char instanceof RegExp) ? localPlaceholderChar : char;
    }).join('');
}
function isArray(value) {
    return (Array.isArray && Array.isArray(value)) || value instanceof Array;
}
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
function isNil(value) {
    return typeof value === 'undefined' || value === null;
}
const strCaretTrap = '[]';
function processCaretTraps(mask) {
    const indexes = [];
    let indexOfCaretTrap;
    while (indexOfCaretTrap = mask.indexOf(strCaretTrap), indexOfCaretTrap !== -1) { // eslint-disable-line
        indexes.push(indexOfCaretTrap);
        mask.splice(indexOfCaretTrap, 1);
    }
    return { maskWithoutCaretTraps: mask, indexes };
}

const emptyArray = [];
const emptyString$2 = '';
function conformToMask$1(rawValue = emptyString$2, mask = emptyArray, config = {}) {
    if (!isArray(mask)) {
        // If someone passes a function as the mask property, we should call the
        // function to get the mask array - Normally this is handled by the
        // `createTextMaskInputElement:update` function - this allows mask functions
        // to be used directly with `conformToMask`
        if (typeof mask === strFunction) {
            // call the mask function to get the mask array
            mask = mask(rawValue, config);
            // mask functions can setup caret traps to have some control over how the caret moves. We need to process
            // the mask for any caret traps. `processCaretTraps` will remove the caret traps from the mask
            mask = processCaretTraps(mask).maskWithoutCaretTraps;
        }
        else {
            throw new Error('Text-mask:conformToMask; The mask property must be an array.');
        }
    }
    // These configurations tell us how to conform the mask
    const { guide = true, previousConformedValue = emptyString$2, placeholderChar: placeholderChar$1 = placeholderChar, placeholder = convertMaskToPlaceholder(mask, placeholderChar$1), currentCaretPosition, keepCharPositions } = config;
    // The configs below indicate that the user wants the algorithm to work in *no guide* mode
    const suppressGuide = guide === false && previousConformedValue !== undefined;
    // Calculate lengths once for performance
    const rawValueLength = rawValue.length;
    const previousConformedValueLength = previousConformedValue.length;
    const placeholderLength = placeholder.length;
    const maskLength = mask.length;
    // This tells us the number of edited characters and the direction in which they were edited (+/-)
    const editDistance = rawValueLength - previousConformedValueLength;
    // In *no guide* mode, we need to know if the user is trying to add a character or not
    const isAddition = editDistance > 0;
    // Tells us the index of the first change. For (438) 394-4938 to (38) 394-4938, that would be 1
    const indexOfFirstChange = currentCaretPosition + (isAddition ? -editDistance : 0);
    // We're also gonna need the index of last change, which we can derive as follows...
    const indexOfLastChange = indexOfFirstChange + Math.abs(editDistance);
    // If `conformToMask` is configured to keep character positions, that is, for mask 111, previous value
    // _2_ and raw value 3_2_, the new conformed value should be 32_, not 3_2 (default behavior). That's in the case of
    // addition. And in the case of deletion, previous value _23, raw value _3, the new conformed string should be
    // __3, not _3_ (default behavior)
    //
    // The next block of logic handles keeping character positions for the case of deletion. (Keeping
    // character positions for the case of addition is further down since it is handled differently.)
    // To do this, we want to compensate for all characters that were deleted
    if (keepCharPositions === true && !isAddition) {
        // We will be storing the new placeholder characters in this variable.
        let compensatingPlaceholderChars = emptyString$2;
        // For every character that was deleted from a placeholder position, we add a placeholder char
        for (let i = indexOfFirstChange; i < indexOfLastChange; i++) {
            if (placeholder[i] === placeholderChar$1) {
                compensatingPlaceholderChars += placeholderChar$1;
            }
        }
        // Now we trick our algorithm by modifying the raw value to make it contain additional placeholder characters
        // That way when the we start laying the characters again on the mask, it will keep the non-deleted characters
        // in their positions.
        rawValue = (rawValue.slice(0, indexOfFirstChange) +
            compensatingPlaceholderChars +
            rawValue.slice(indexOfFirstChange, rawValueLength));
    }
    // Convert `rawValue` string to an array, and mark characters based on whether they are newly added or have
    // existed in the previous conformed value. Identifying new and old characters is needed for `conformToMask`
    // to work if it is configured to keep character positions.
    const rawValueArr = rawValue
        .split(emptyString$2)
        .map((char, i) => ({ char, isNew: i >= indexOfFirstChange && i < indexOfLastChange }));
    // The loop below removes masking characters from user input. For example, for mask
    // `00 (111)`, the placeholder would be `00 (___)`. If user input is `00 (234)`, the loop below
    // would remove all characters but `234` from the `rawValueArr`. The rest of the algorithm
    // then would lay `234` on top of the available placeholder positions in the mask.
    for (let i = rawValueLength - 1; i >= 0; i--) {
        const { char } = rawValueArr[i];
        if (char !== placeholderChar$1) {
            const shouldOffset = i >= indexOfFirstChange && previousConformedValueLength === maskLength;
            if (char === placeholder[(shouldOffset) ? i - editDistance : i]) {
                rawValueArr.splice(i, 1);
            }
        }
    }
    // This is the variable that we will be filling with characters as we figure them out
    // in the algorithm below
    let conformedValue = emptyString$2;
    let someCharsRejected = false;
    // Ok, so first we loop through the placeholder looking for placeholder characters to fill up.
    placeholderLoop: for (let i = 0; i < placeholderLength; i++) {
        const charInPlaceholder = placeholder[i];
        // We see one. Let's find out what we can put in it.
        if (charInPlaceholder === placeholderChar$1) {
            // But before that, do we actually have any user characters that need a place?
            if (rawValueArr.length > 0) {
                // We will keep chipping away at user input until either we run out of characters
                // or we find at least one character that we can map.
                while (rawValueArr.length > 0) {
                    // Let's retrieve the first user character in the queue of characters we have left
                    const { char: rawValueChar, isNew } = rawValueArr.shift();
                    // If the character we got from the user input is a placeholder character (which happens
                    // regularly because user input could be something like (540) 90_-____, which includes
                    // a bunch of `_` which are placeholder characters) and we are not in *no guide* mode,
                    // then we map this placeholder character to the current spot in the placeholder
                    if (rawValueChar === placeholderChar$1 && suppressGuide !== true) {
                        conformedValue += placeholderChar$1;
                        // And we go to find the next placeholder character that needs filling
                        continue placeholderLoop;
                        // Else if, the character we got from the user input is not a placeholder, let's see
                        // if the current position in the mask can accept it.
                    }
                    else if (mask[i].test(rawValueChar)) {
                        // we map the character differently based on whether we are keeping character positions or not.
                        // If any of the conditions below are met, we simply map the raw value character to the
                        // placeholder position.
                        if (keepCharPositions !== true ||
                            isNew === false ||
                            previousConformedValue === emptyString$2 ||
                            guide === false ||
                            !isAddition) {
                            conformedValue += rawValueChar;
                        }
                        else {
                            // We enter this block of code if we are trying to keep character positions and none of the conditions
                            // above is met. In this case, we need to see if there's an available spot for the raw value character
                            // to be mapped to. If we couldn't find a spot, we will discard the character.
                            //
                            // For example, for mask `1111`, previous conformed value `_2__`, raw value `942_2__`. We can map the
                            // `9`, to the first available placeholder position, but then, there are no more spots available for the
                            // `4` and `2`. So, we discard them and end up with a conformed value of `92__`.
                            const rawValueArrLength = rawValueArr.length;
                            let indexOfNextAvailablePlaceholderChar = -1;
                            // Let's loop through the remaining raw value characters. We are looking for either a suitable spot, ie,
                            // a placeholder character or a non-suitable spot, ie, a non-placeholder character that is not new.
                            // If we see a suitable spot first, we store its position and exit the loop. If we see a non-suitable
                            // spot first, we exit the loop and our `indexOfNextAvailablePlaceholderChar` will stay as `null`.
                            for (let i = 0; i < rawValueArrLength; i++) {
                                const charData = rawValueArr[i];
                                if (charData.char !== placeholderChar$1 && charData.isNew === false) {
                                    break;
                                }
                                if (charData.char === placeholderChar$1) {
                                    indexOfNextAvailablePlaceholderChar = i;
                                    break;
                                }
                            }
                            // If `indexOfNextAvailablePlaceholderChar` is not `null`, that means the character is not blocked.
                            // We can map it. And to keep the character positions, we remove the placeholder character
                            // from the remaining characters
                            if (indexOfNextAvailablePlaceholderChar !== null) {
                                conformedValue += rawValueChar;
                                rawValueArr.splice(indexOfNextAvailablePlaceholderChar, 1);
                                // If `indexOfNextAvailablePlaceholderChar` is `null`, that means the character is blocked. We have to
                                // discard it.
                            }
                            else {
                                i--;
                            }
                        }
                        // Since we've mapped this placeholder position. We move on to the next one.
                        continue placeholderLoop;
                    }
                    else {
                        someCharsRejected = true;
                    }
                }
            }
            // We reach this point when we've mapped all the user input characters to placeholder
            // positions in the mask. In *guide* mode, we append the left over characters in the
            // placeholder to the `conformedString`, but in *no guide* mode, we don't wanna do that.
            //
            // That is, for mask `(111)` and user input `2`, we want to return `(2`, not `(2__)`.
            if (suppressGuide === false) {
                conformedValue += placeholder.substr(i, placeholderLength);
            }
            // And we break
            break;
            // Else, the charInPlaceholder is not a placeholderChar. That is, we cannot fill it
            // with user input. So we just map it to the final output
        }
        else {
            conformedValue += charInPlaceholder;
        }
    }
    // The following logic is needed to deal with the case of deletion in *no guide* mode.
    //
    // Consider the silly mask `(111) /// 1`. What if user tries to delete the last placeholder
    // position? Something like `(589) /// `. We want to conform that to `(589`. Not `(589) /// `.
    // That's why the logic below finds the last filled placeholder character, and removes everything
    // from that point on.
    if (suppressGuide && isAddition === false) {
        let indexOfLastFilledPlaceholderChar = -1;
        // Find the last filled placeholder position and substring from there
        for (let i = 0; i < conformedValue.length; i++) {
            if (placeholder[i] === placeholderChar$1) {
                indexOfLastFilledPlaceholderChar = i;
            }
        }
        if (indexOfLastFilledPlaceholderChar !== null) {
            // We substring from the beginning until the position after the last filled placeholder char.
            conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
        }
        else {
            // If we couldn't find `indexOfLastFilledPlaceholderChar` that means the user deleted
            // the first character in the mask. So we return an empty string.
            conformedValue = emptyString$2;
        }
    }
    return { conformedValue, meta: { someCharsRejected } };
}

const defaultArray = [];
const emptyString$1 = '';
function adjustCaretPosition({ previousConformedValue = emptyString$1, previousPlaceholder = emptyString$1, currentCaretPosition = 0, conformedValue, rawValue, placeholderChar, placeholder, indexesOfPipedChars = defaultArray, caretTrapIndexes = defaultArray }) {
    if (currentCaretPosition === 0 || !rawValue.length) {
        return 0;
    }
    // Store lengths for faster performance?
    const rawValueLength = rawValue.length;
    const previousConformedValueLength = previousConformedValue.length;
    const placeholderLength = placeholder.length;
    const conformedValueLength = conformedValue.length;
    // This tells us how long the edit is. If user modified input from `(2__)` to `(243__)`,
    // we know the user in this instance pasted two characters
    const editLength = rawValueLength - previousConformedValueLength;
    // If the edit length is positive, that means the user is adding characters, not deleting.
    const isAddition = editLength > 0;
    // This is the first raw value the user entered that needs to be conformed to mask
    const isFirstRawValue = previousConformedValueLength === 0;
    // A partial multi-character edit happens when the user makes a partial selection in their
    // input and edits that selection. That is going from `(123) 432-4348` to `() 432-4348` by
    // selecting the first 3 digits and pressing backspace.
    //
    // Such cases can also happen when the user presses the backspace while holding down the ALT
    // key.
    const isPartialMultiCharEdit = editLength > 1 && !isAddition && !isFirstRawValue;
    // This algorithm doesn't support all cases of multi-character edits, so we just return
    // the current caret position.
    //
    // This works fine for most cases.
    if (isPartialMultiCharEdit) {
        return currentCaretPosition;
    }
    // For a mask like (111), if the `previousConformedValue` is (1__) and user attempts to enter
    // `f` so the `rawValue` becomes (1f__), the new `conformedValue` would be (1__), which is the
    // same as the original `previousConformedValue`. We handle this case differently for caret
    // positioning.
    const possiblyHasRejectedChar = isAddition && (previousConformedValue === conformedValue ||
        conformedValue === placeholder);
    let startingSearchIndex = 0;
    let trackRightCharacter;
    let targetChar;
    if (possiblyHasRejectedChar) {
        startingSearchIndex = currentCaretPosition - editLength;
    }
    else {
        // At this point in the algorithm, we want to know where the caret is right before the raw input
        // has been conformed, and then see if we can find that same spot in the conformed input.
        //
        // We do that by seeing what character lies immediately before the caret, and then look for that
        // same character in the conformed input and place the caret there.
        // First, we need to normalize the inputs so that letter capitalization between raw input and
        // conformed input wouldn't matter.
        const normalizedConformedValue = conformedValue.toLowerCase();
        const normalizedRawValue = rawValue.toLowerCase();
        // Then we take all characters that come before where the caret currently is.
        const leftHalfChars = normalizedRawValue.substr(0, currentCaretPosition).split(emptyString$1);
        // Now we find all the characters in the left half that exist in the conformed input
        // This step ensures that we don't look for a character that was filtered out or rejected by `conformToMask`.
        const intersection = leftHalfChars.filter((char) => normalizedConformedValue.indexOf(char) !== -1);
        // The last character in the intersection is the character we want to look for in the conformed
        // value and the one we want to adjust the caret close to
        targetChar = intersection[intersection.length - 1];
        // Calculate the number of mask characters in the previous placeholder
        // from the start of the string up to the place where the caret is
        const previousLeftMaskChars = previousPlaceholder
            .substr(0, intersection.length)
            .split(emptyString$1)
            .filter(char => char !== placeholderChar)
            .length;
        // Calculate the number of mask characters in the current placeholder
        // from the start of the string up to the place where the caret is
        const leftMaskChars = placeholder
            .substr(0, intersection.length)
            .split(emptyString$1)
            .filter(char => char !== placeholderChar)
            .length;
        // Has the number of mask characters up to the caret changed?
        const masklengthChanged = leftMaskChars !== previousLeftMaskChars;
        // Detect if `targetChar` is a mask character and has moved to the left
        const targetIsMaskMovingLeft = (previousPlaceholder[intersection.length - 1] !== undefined &&
            placeholder[intersection.length - 2] !== undefined &&
            previousPlaceholder[intersection.length - 1] !== placeholderChar &&
            previousPlaceholder[intersection.length - 1] !== placeholder[intersection.length - 1] &&
            previousPlaceholder[intersection.length - 1] === placeholder[intersection.length - 2]);
        // If deleting and the `targetChar` `is a mask character and `masklengthChanged` is true
        // or the mask is moving to the left, we can't use the selected `targetChar` any longer
        // if we are not at the end of the string.
        // In this case, change tracking strategy and track the character to the right of the caret.
        if (!isAddition &&
            (masklengthChanged || targetIsMaskMovingLeft) &&
            previousLeftMaskChars > 0 &&
            placeholder.indexOf(targetChar) > -1 &&
            rawValue[currentCaretPosition] !== undefined) {
            trackRightCharacter = true;
            targetChar = rawValue[currentCaretPosition];
        }
        // It is possible that `targetChar` will appear multiple times in the conformed value.
        // We need to know not to select a character that looks like our target character from the placeholder or
        // the piped characters, so we inspect the piped characters and the placeholder to see if they contain
        // characters that match our target character.
        // If the `conformedValue` got piped, we need to know which characters were piped in so that when we look for
        // our `targetChar`, we don't select a piped char by mistake
        const pipedChars = indexesOfPipedChars.map((index) => normalizedConformedValue[index]);
        // We need to know how many times the `targetChar` occurs in the piped characters.
        const countTargetCharInPipedChars = pipedChars.filter((char) => char === targetChar).length;
        // We need to know how many times it occurs in the intersection
        const countTargetCharInIntersection = intersection.filter((char) => char === targetChar).length;
        // We need to know if the placeholder contains characters that look like
        // our `targetChar`, so we don't select one of those by mistake.
        const countTargetCharInPlaceholder = placeholder
            .substr(0, placeholder.indexOf(placeholderChar))
            .split(emptyString$1)
            .filter((char, index) => (
        // Check if `char` is the same as our `targetChar`, so we account for it
        char === targetChar &&
            // but also make sure that both the `rawValue` and placeholder don't have the same character at the same
            // index because if they are equal, that means we are already counting those characters in
            // `countTargetCharInIntersection`
            rawValue[index] !== char))
            .length;
        // The number of times we need to see occurrences of the `targetChar` before we know it is the one we're looking
        // for is:
        const requiredNumberOfMatches = (countTargetCharInPlaceholder +
            countTargetCharInIntersection +
            countTargetCharInPipedChars +
            // The character to the right of the caret isn't included in `intersection`
            // so add one if we are tracking the character to the right
            (trackRightCharacter ? 1 : 0));
        // Now we start looking for the location of the `targetChar`.
        // We keep looping forward and store the index in every iteration. Once we have encountered
        // enough occurrences of the target character, we break out of the loop
        // If are searching for the second `1` in `1214`, `startingSearchIndex` will point at `4`.
        let numberOfEncounteredMatches = 0;
        for (let i = 0; i < conformedValueLength; i++) {
            const conformedValueChar = normalizedConformedValue[i];
            startingSearchIndex = i + 1;
            if (conformedValueChar === targetChar) {
                numberOfEncounteredMatches++;
            }
            if (numberOfEncounteredMatches >= requiredNumberOfMatches) {
                break;
            }
        }
    }
    // At this point, if we simply return `startingSearchIndex` as the adjusted caret position,
    // most cases would be handled. However, we want to fast forward or rewind the caret to the
    // closest placeholder character if it happens to be in a non-editable spot. That's what the next
    // logic is for.
    // In case of addition, we fast forward.
    if (isAddition) {
        // We want to remember the last placeholder character encountered so that if the mask
        // contains more characters after the last placeholder character, we don't forward the caret
        // that far to the right. Instead, we stop it at the last encountered placeholder character.
        let lastPlaceholderChar = startingSearchIndex;
        for (let i = startingSearchIndex; i <= placeholderLength; i++) {
            if (placeholder[i] === placeholderChar) {
                lastPlaceholderChar = i;
            }
            if (
            // If we're adding, we can position the caret at the next placeholder character.
            placeholder[i] === placeholderChar ||
                // If a caret trap was set by a mask function, we need to stop at the trap.
                caretTrapIndexes.indexOf(i) !== -1 ||
                // This is the end of the placeholder. We cannot move any further. Let's put the caret there.
                i === placeholderLength) {
                return lastPlaceholderChar;
            }
        }
    }
    else {
        // In case of deletion, we rewind.
        if (trackRightCharacter) {
            // Searching for the character that was to the right of the caret
            // We start at `startingSearchIndex` - 1 because it includes one character extra to the right
            for (let i = startingSearchIndex - 1; i >= 0; i--) {
                // If tracking the character to the right of the cursor, we move to the left until
                // we found the character and then place the caret right before it
                if (
                // `targetChar` should be in `conformedValue`, since it was in `rawValue`, just
                // to the right of the caret
                conformedValue[i] === targetChar ||
                    // If a caret trap was set by a mask function, we need to stop at the trap.
                    caretTrapIndexes.indexOf(i) !== -1 ||
                    // This is the beginning of the placeholder. We cannot move any further.
                    // Let's put the caret there.
                    i === 0) {
                    return i;
                }
            }
        }
        else {
            // Searching for the first placeholder or caret trap to the left
            for (let i = startingSearchIndex; i >= 0; i--) {
                // If we're deleting, we stop the caret right before the placeholder character.
                // For example, for mask `(111) 11`, current conformed input `(456) 86`. If user
                // modifies input to `(456 86`. That is, they deleted the `)`, we place the caret
                // right after the first `6`
                if (
                // If we're deleting, we can position the caret right before the placeholder character
                placeholder[i - 1] === placeholderChar ||
                    // If a caret trap was set by a mask function, we need to stop at the trap.
                    caretTrapIndexes.indexOf(i) !== -1 ||
                    // This is the beginning of the placeholder. We cannot move any further.
                    // Let's put the caret there.
                    i === 0) {
                    return i;
                }
            }
        }
    }
    return 0;
}

const emptyString = '';
const strNone = 'none';
const strObject = 'object';
const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
const defer = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : setTimeout;
function createTextMaskInputElement(config) {
    // Anything that we will need to keep between `update` calls, we will store in this `state` object.
    const state = { previousConformedValue: undefined, previousPlaceholder: undefined };
    return {
        state,
        // `update` is called by framework components whenever they want to update the `value` of the input element.
        // The caller can send a `rawValue` to be conformed and set on the input element. However, the default use-case
        // is for this to be read from the `inputElement` directly.
        update(rawValue, { inputElement, mask: providedMask, guide, pipe, placeholderChar: placeholderChar$1 = placeholderChar, keepCharPositions = false, showMask = false } = config) {
            // if `rawValue` is `undefined`, read from the `inputElement`
            if (typeof rawValue === 'undefined') {
                rawValue = inputElement.value;
            }
            // If `rawValue` equals `state.previousConformedValue`, we don't need to change anything. So, we return.
            // This check is here to handle controlled framework components that repeat the `update` call on every render.
            if (rawValue === state.previousConformedValue) {
                return;
            }
            // Text Mask accepts masks that are a combination of a `mask` and a `pipe` that work together. If such a `mask` is
            // passed, we destructure it below, so the rest of the code can work normally as if a separate `mask` and a `pipe`
            // were passed.
            if (typeof providedMask === strObject && providedMask.pipe !== undefined && providedMask.mask !== undefined) {
                pipe = providedMask.pipe;
                providedMask = providedMask.mask;
            }
            // The `placeholder` is an essential piece of how Text Mask works. For a mask like `(111)`, the placeholder would
            // be `(___)` if the `placeholderChar` is set to `_`.
            let placeholder;
            // We don't know what the mask would be yet. If it is an array, we take it as is, but if it's a function, we will
            // have to call that function to get the mask array.
            let mask;
            // If the provided mask is an array, we can call `convertMaskToPlaceholder` here once and we'll always have the
            // correct `placeholder`.
            if (providedMask instanceof Array) {
                placeholder = convertMaskToPlaceholder(providedMask, placeholderChar$1);
            }
            // In framework components that support reactivity, it's possible to turn off masking by passing
            // `false` for `mask` after initialization. See https://github.com/text-mask/text-mask/pull/359
            if (providedMask === false) {
                return;
            }
            // We check the provided `rawValue` before moving further.
            // If it's something we can't work with `getSafeRawValue` will throw.
            const safeRawValue = getSafeRawValue(rawValue);
            // `selectionEnd` indicates to us where the caret position is after the user has typed into the input
            const { selectionEnd: currentCaretPosition } = inputElement;
            // We need to know what the `previousConformedValue` and `previousPlaceholder` is from the previous `update` call
            const { previousConformedValue, previousPlaceholder } = state;
            let caretTrapIndexes;
            // If the `providedMask` is a function. We need to call it at every `update` to get the `mask` array.
            // Then we also need to get the `placeholder`
            if (typeof providedMask === strFunction) {
                mask = providedMask(safeRawValue, { currentCaretPosition, previousConformedValue, placeholderChar: placeholderChar$1 });
                // disable masking if `mask` is `false`
                if (mask === false) {
                    return;
                }
                // mask functions can setup caret traps to have some control over how the caret moves. We need to process
                // the mask for any caret traps. `processCaretTraps` will remove the caret traps from the mask and return
                // the indexes of the caret traps.
                const { maskWithoutCaretTraps, indexes } = processCaretTraps(mask);
                mask = maskWithoutCaretTraps; // The processed mask is what we're interested in
                caretTrapIndexes = indexes; // And we need to store these indexes because they're needed by `adjustCaretPosition`
                placeholder = convertMaskToPlaceholder(mask, placeholderChar$1);
                // If the `providedMask` is not a function, we just use it as-is.
            }
            else {
                mask = providedMask;
            }
            // The following object will be passed to `conformToMask` to determine how the `rawValue` will be conformed
            const conformToMaskConfig = {
                previousConformedValue,
                guide,
                placeholderChar: placeholderChar$1,
                pipe,
                placeholder,
                currentCaretPosition,
                keepCharPositions
            };
            // `conformToMask` returns `conformedValue` as part of an object for future API flexibility
            const { conformedValue } = conformToMask$1(safeRawValue, mask, conformToMaskConfig);
            // The following few lines are to support the `pipe` feature.
            const piped = typeof pipe === strFunction;
            let pipeResults = {};
            // If `pipe` is a function, we call it.
            if (piped) {
                // `pipe` receives the `conformedValue` and the configurations with which `conformToMask` was called.
                pipeResults = pipe(conformedValue, { rawValue: safeRawValue, ...conformToMaskConfig });
                // `pipeResults` should be an object. But as a convenience, we allow the pipe author to just return `false` to
                // indicate rejection. Or return just a string when there are no piped characters.
                // If the `pipe` returns `false` or a string, the block below turns it into an object that the rest
                // of the code can work with.
                if (pipeResults === false) {
                    // If the `pipe` rejects `conformedValue`, we use the `previousConformedValue`, and set `rejected` to `true`.
                    pipeResults = { value: previousConformedValue, rejected: true };
                }
                else if (isString(pipeResults)) {
                    pipeResults = { value: pipeResults };
                }
            }
            // Before we proceed, we need to know which conformed value to use, the one returned by the pipe or the one
            // returned by `conformToMask`.
            const finalConformedValue = (piped) ? pipeResults.value : conformedValue;
            // After determining the conformed value, we will need to know where to set
            // the caret position. `adjustCaretPosition` will tell us.
            const adjustedCaretPosition = adjustCaretPosition({
                previousConformedValue,
                previousPlaceholder,
                conformedValue: finalConformedValue,
                placeholder,
                rawValue: safeRawValue,
                currentCaretPosition,
                placeholderChar: placeholderChar$1,
                indexesOfPipedChars: pipeResults.indexesOfPipedChars,
                caretTrapIndexes
            });
            // Text Mask sets the input value to an empty string when the condition below is set. It provides a better UX.
            const inputValueShouldBeEmpty = finalConformedValue === placeholder && adjustedCaretPosition === 0;
            const emptyValue = showMask ? placeholder : emptyString;
            const inputElementValue = (inputValueShouldBeEmpty) ? emptyValue : finalConformedValue;
            state.previousConformedValue = inputElementValue; // store value for access for next time
            state.previousPlaceholder = placeholder;
            // In some cases, this `update` method will be repeatedly called with a raw value that has already been conformed
            // and set to `inputElement.value`. The below check guards against needlessly readjusting the input state.
            // See https://github.com/text-mask/text-mask/issues/231
            if (inputElement.value === inputElementValue) {
                return;
            }
            inputElement.value = inputElementValue; // set the input value
            safeSetSelection(inputElement, adjustedCaretPosition); // adjust caret position
        }
    };
}
function safeSetSelection(element, selectionPosition) {
    if (document.activeElement === element) {
        if (isAndroid) {
            defer(() => element.setSelectionRange(selectionPosition, selectionPosition, strNone));
        }
        else {
            element.setSelectionRange(selectionPosition, selectionPosition, strNone);
        }
    }
}
function getSafeRawValue(inputValue) {
    if (isString(inputValue)) {
        return inputValue.toString();
    }
    else if (isNumber(inputValue)) {
        return String(inputValue);
    }
    else if (inputValue === undefined || inputValue === null) {
        return emptyString;
    }
    else {
        throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value " +
            `received was:\n\n ${JSON.stringify(inputValue)}`);
    }
}

const conformToMask = conformToMask$1;
class TextMaskConfig {
    mask;
    guide;
    placeholderChar;
    pipe;
    keepCharPositions;
    showMask;
}
const MASKEDINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable: no-use-before-declare */
    useExisting: forwardRef(() => MaskedInputDirective),
    multi: true
};
/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 */
function _isAndroid() {
    const userAgent = _getDOM() ? _getDOM().getUserAgent() : '';
    return /android (\d+)/.test(userAgent.toLowerCase());
}
class MaskedInputDirective {
    _elementRef;
    _compositionMode;
    textMaskConfig = {
        mask: [],
        guide: true,
        placeholderChar: '_',
        pipe: undefined,
        keepCharPositions: false,
    };
    textMaskInputElement;
    inputElement;
    _renderer;
    /** Whether the user is creating a composition string (IME events). */
    _composing = false;
    constructor(rendererFactory, _elementRef, _compositionMode) {
        this._elementRef = _elementRef;
        this._compositionMode = _compositionMode;
        this._renderer = rendererFactory.createRenderer(null, null);
        if (this._compositionMode == null) {
            this._compositionMode = !_isAndroid();
        }
    }
    onChange = (_) => { };
    onTouched = () => { };
    ngOnChanges(changes) {
        this._setupMask(true);
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(this.inputElement.value);
        }
    }
    writeValue(value) {
        this._setupMask();
        // set the initial value for cases where the mask is disabled
        const normalizedValue = value == null ? '' : value;
        this._renderer.setProperty(this.inputElement, 'value', normalizedValue);
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value);
        }
    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    _handleInput(value) {
        if (!this._compositionMode || (this._compositionMode && !this._composing)) {
            this._setupMask();
            if (this.textMaskInputElement !== undefined) {
                this.textMaskInputElement.update(value);
                // get the updated value
                value = this.inputElement.value;
                this.onChange(value);
            }
        }
    }
    _setupMask(create = false) {
        if (!this.inputElement) {
            if (this._elementRef.nativeElement.tagName.toUpperCase() === 'INPUT') {
                // `textMask` directive is used directly on an input element
                this.inputElement = this._elementRef.nativeElement;
            }
            else {
                // `textMask` directive is used on an abstracted input element, `md-input-container`, etc
                this.inputElement = this._elementRef.nativeElement.getElementsByTagName('INPUT')[0];
            }
        }
        if (this.inputElement && create) {
            this.textMaskInputElement = createTextMaskInputElement(Object.assign({ inputElement: this.inputElement }, this.textMaskConfig));
        }
    }
    _compositionStart() { this._composing = true; }
    _compositionEnd(value) {
        this._composing = false;
        if (this._compositionMode) {
            this._handleInput(value);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: MaskedInputDirective, deps: [{ token: i0.RendererFactory2 }, { token: i0.ElementRef }, { token: COMPOSITION_BUFFER_MODE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.1.4", type: MaskedInputDirective, isStandalone: true, selector: "[textMask]", inputs: { textMaskConfig: ["textMask", "textMaskConfig"] }, host: { listeners: { "input": "_handleInput($event.target.value)", "blur": "onTouched()", "compositionstart": "_compositionStart()", "compositionend": "_compositionEnd($event.target.value)" } }, providers: [MASKEDINPUT_VALUE_ACCESSOR], exportAs: ["textMask"], usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: MaskedInputDirective, decorators: [{
            type: Directive,
            args: [{
                    host: {
                        '(input)': '_handleInput($event.target.value)',
                        '(blur)': 'onTouched()',
                        '(compositionstart)': '_compositionStart()',
                        '(compositionend)': '_compositionEnd($event.target.value)'
                    },
                    /* tslint:disable: directive-selector */
                    selector: '[textMask]',
                    exportAs: 'textMask',
                    providers: [MASKEDINPUT_VALUE_ACCESSOR]
                }]
        }], ctorParameters: () => [{ type: i0.RendererFactory2 }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [COMPOSITION_BUFFER_MODE]
                }] }], propDecorators: { textMaskConfig: [{
                type: Input,
                args: ['textMask']
            }] } });

const NgxBrazilValidators = {
    cpf,
    cnpj,
    cellphone,
    cep,
    currency,
    inscricaoestadual,
    number,
    pispasep,
    licensePlate,
    percentage,
    renavam,
    rg,
    phoneNumber,
    time,
    titulo
};
const NgxBrazilMASKS = MASKS;
const NgxBrazilMASKSIE = MASKSIE;
const NgxBrazilCustomDirectives = [
    CellphoneValidator,
    CellphonePipe,
    CEPValidator,
    CEPPipe,
    CNPJValidator,
    CNPJPipe,
    CPFValidator,
    CPFPipe,
    CURRENCYValidator,
    CURRENCYPipe,
    InscricaoEstadualValidator,
    InscricaoEstadualPipe,
    NUMBERValidator,
    NUMBERPipe,
    PERCENTAGEValidator,
    PERCENTAGEPipe,
    PispasepValidator,
    PispasepPipe,
    LICENSEPLATEValidator,
    LICENSEPLATEPipe,
    RGValidator,
    RGPipe,
    RenavamValidator,
    RenavamPipe,
    PhoneNumberValidator,
    PhoneNumberPipe,
    TIMEValidator,
    TIMEPipe,
    TITULOValidator,
    TITULOPipe,
    MaskedInputDirective
];
const NgxBrazilDirectives = {
    CellphoneValidator,
    CellphonePipe,
    CEPValidator,
    CEPPipe,
    CNPJValidator,
    CNPJPipe,
    CPFValidator,
    CPFPipe,
    CURRENCYValidator,
    CURRENCYPipe,
    InscricaoEstadualValidator,
    InscricaoEstadualPipe,
    NUMBERValidator,
    NUMBERPipe,
    PERCENTAGEValidator,
    PERCENTAGEPipe,
    PispasepValidator,
    PispasepPipe,
    LICENSEPLATEValidator,
    LICENSEPLATEPipe,
    RGValidator,
    RGPipe,
    RenavamValidator,
    RenavamPipe,
    PhoneNumberValidator,
    PhoneNumberPipe,
    TIMEValidator,
    TIMEPipe,
    TITULOValidator,
    TITULOPipe
};
class NgxBrazil {
    static forRoot() {
        return {
            ngModule: NgxBrazil
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: NgxBrazil, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.1.4", ngImport: i0, type: NgxBrazil, imports: [CellphoneValidator,
            CellphonePipe,
            CEPValidator,
            CEPPipe,
            CNPJValidator,
            CNPJPipe,
            CPFValidator,
            CPFPipe,
            CURRENCYValidator,
            CURRENCYPipe,
            InscricaoEstadualValidator,
            InscricaoEstadualPipe,
            NUMBERValidator,
            NUMBERPipe,
            PERCENTAGEValidator,
            PERCENTAGEPipe,
            PispasepValidator,
            PispasepPipe,
            LICENSEPLATEValidator,
            LICENSEPLATEPipe,
            RGValidator,
            RGPipe,
            RenavamValidator,
            RenavamPipe,
            PhoneNumberValidator,
            PhoneNumberPipe,
            TIMEValidator,
            TIMEPipe,
            TITULOValidator,
            TITULOPipe,
            MaskedInputDirective], exports: [CellphoneValidator,
            CellphonePipe,
            CEPValidator,
            CEPPipe,
            CNPJValidator,
            CNPJPipe,
            CPFValidator,
            CPFPipe,
            CURRENCYValidator,
            CURRENCYPipe,
            InscricaoEstadualValidator,
            InscricaoEstadualPipe,
            NUMBERValidator,
            NUMBERPipe,
            PERCENTAGEValidator,
            PERCENTAGEPipe,
            PispasepValidator,
            PispasepPipe,
            LICENSEPLATEValidator,
            LICENSEPLATEPipe,
            RGValidator,
            RGPipe,
            RenavamValidator,
            RenavamPipe,
            PhoneNumberValidator,
            PhoneNumberPipe,
            TIMEValidator,
            TIMEPipe,
            TITULOValidator,
            TITULOPipe,
            MaskedInputDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: NgxBrazil });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.4", ngImport: i0, type: NgxBrazil, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [NgxBrazilCustomDirectives],
                    exports: [NgxBrazilCustomDirectives]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CEPPipe, CEPValidator, CNPJPipe, CNPJValidator, CPFPipe, CPFValidator, CURRENCYPipe, CURRENCYValidator, CellphonePipe, CellphoneValidator, InscricaoEstadualPipe, InscricaoEstadualValidator, LICENSEPLATEPipe, LICENSEPLATEValidator, MaskedInputDirective, NUMBERPipe, NUMBERValidator, NgxBrazil, NgxBrazilCustomDirectives, NgxBrazilDirectives, NgxBrazilMASKS, NgxBrazilMASKSIE, NgxBrazilValidators, PERCENTAGEPipe, PERCENTAGEValidator, PhoneNumberPipe, PhoneNumberValidator, PispasepPipe, PispasepValidator, RGPipe, RGValidator, RenavamPipe, RenavamValidator, TIMEPipe, TIMEValidator, TITULOPipe, TITULOValidator, cellphone, cep, cnpj, cpf, currency, inscricaoestadual, licensePlate, number, percentage, phoneNumber, pispasep, renavam, rg, time, titulo };
//# sourceMappingURL=ngx-brazil.mjs.map
