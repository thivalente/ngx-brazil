import "./chunk-GSMATFZ5.js";
import {
  COMPOSITION_BUFFER_MODE,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators
} from "./chunk-HGFPJQ2C.js";
import {
  getDOM
} from "./chunk-Z2C57CTC.js";
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  NgModule,
  Optional,
  Pipe,
  RendererFactory2,
  forwardRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵlistener
} from "./chunk-TFNMS2W4.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/ngx-brazil/fesm2022/ngx-brazil.mjs
var STATE_ACRONYMS = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"];
function isPresent(obj) {
  return obj !== void 0 && obj !== null;
}
function isArray$1(value) {
  return Array.isArray && Array.isArray(value) || value instanceof Array;
}
function isString$1(value) {
  return typeof value === "string" || value instanceof String;
}
function isNumber$1(value) {
  return typeof value === "number" && !isNaN(value);
}
function isNil$1(value) {
  return typeof value === "undefined" || value === null;
}
var strCaretTrap$1 = "[]";
function processCaretTraps$1(mask6) {
  const indexes = [];
  let indexOfCaretTrap;
  while ((indexOfCaretTrap = mask6.indexOf(strCaretTrap$1)) !== -1) {
    indexes.push(indexOfCaretTrap);
    mask6.splice(indexOfCaretTrap, 1);
  }
  return {
    maskWithoutCaretTraps: mask6,
    indexes
  };
}
var modulo11 = (value) => {
  let mults = [];
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
  const digit = sum * 10 % 11;
  return digit;
};
var modulo11Custom = (string, size, maxMult = string.length, by10 = true) => {
  if (!by10) size = 1;
  for (let n = 1; n <= size; n++) {
    let soma = 0;
    let mult = 2;
    for (let i = string.length - 1; i >= 0; i--) {
      soma += mult * parseInt(string.charAt(i));
      mult++;
      if (mult > maxMult) mult = 2;
    }
    let dig = by10 ? soma * 10 % 11 % 10 : soma % 11;
    if (dig === 10) dig = 0;
    string += dig;
  }
  return string.substr(string.length - size, size);
};
function allNumbersAreSame$1(inputValue) {
  const input = getAllDigits(inputValue);
  if (typeof input === "string") {
    const reg = new RegExp("^(\\d)(?!\\1+$)\\d{" + (input.length - 1) + "}$");
    return reg.test(input);
  }
  return false;
}
function getAllDigits(input) {
  if (!input.match) {
    input = input.toString();
  }
  const match = input.match(/\d/g);
  return match ? match.join("") : "";
}
function getAllWords(input) {
  const match = input.match(/\w/g);
  return match ? match.join("") : "";
}
function currencyToNumber(input) {
  if (typeof input === "number") {
    return input;
  }
  input = input.replace(/ /g, "").replace(/[^0-9.,]+/, "");
  if (input.indexOf(".") === input.length - 1 - 2) {
    input = input.replace(/,/g, "");
  } else {
    input = input.replace(/\./g, "").replace(",", ".");
  }
  return parseFloat(input);
}
var makeGenericFaker = (val, options = null) => {
  return () => {
    if (!val.textMask || !val.textMask.map) {
      return "";
    }
    const newData = val.textMask.map((c, index) => {
      if (options && options[index]) {
        return options[index]();
      }
      c = c.toString();
      if (c === /\d/.toString()) {
        return Math.floor(Math.random() * 10).toString();
      } else if (c === /[A-Za-z]/.toString()) {
        return randomLetter(1).toString();
      } else if (c === /\w/.toString()) {
        return randomLetterOrNumber(1).toString();
      } else if (c.indexOf("/[") === 0) {
        c = c.replace("/[", "").replace("]/", "");
        if (c.indexOf("-") > 0) {
          c = c.split("-");
          if (parseInt(c[1])) {
            const mult = c[1] - c[0];
            const plus = parseInt(c[0]);
            return (Math.floor(Math.random() * mult) + plus).toString();
          } else {
            return rand(1, [c[0], c[1]]);
          }
        } else if (c.indexOf("|") > 0) {
          c = c.split("|");
          const index2 = Math.floor(Math.random() * c.length);
          return c[index2];
        }
      } else {
        return c;
      }
    });
    return newData.join("");
  };
};
function numberToCurrency(value) {
  return " R$ " + value.toFixed(2).replace(".", ",") + " ";
}
function slugify(value) {
  return value.toString().toLowerCase().replace(/[àÀáÁâÂãäÄÅåª]+/g, "a").replace(/[èÈéÉêÊëË]+/g, "e").replace(/[ìÌíÍîÎïÏ]+/g, "i").replace(/[òÒóÓôÔõÕöÖº]+/g, "o").replace(/[ùÙúÚûÛüÜ]+/g, "u").replace(/[ýÝÿŸ]+/g, "y").replace(/[ñÑ]+/g, "n").replace(/[çÇ]+/g, "c").replace(/[ß]+/g, "ss").replace(/[Ææ]+/g, "ae").replace(/[Øøœ]+/g, "oe").replace(/[%]+/g, "pct").replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
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
function randArray(array) {
  const index = randomNumber(0, array.length);
  return array[index];
}
function rand(length, ...ranges) {
  var str = "";
  while (length--) {
    var ind = Math.floor(Math.random() * ranges.length);
    var min = ranges[ind][0].charCodeAt(0), max = ranges[ind][1].charCodeAt(0);
    var c = Math.floor(Math.random() * (max - min + 1)) + min;
    str += String.fromCharCode(c);
  }
  return str;
}
function randomNumber(begin, end) {
  const dif = end - begin;
  return Math.floor(Math.random() * dif) + begin;
}
function randomLetter(size = 1, onlyCapitals = false) {
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (!onlyCapitals) {
    possible += "abcdefghijklmnopqrstuvwxyz";
  }
  let text = "";
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
  possible = possible.split("");
  for (let i = 0; i < size; i++) {
    const pos = Math.floor(Math.random() * possible.length);
    text += possible[pos];
  }
  return text;
}
var randomStateAcronym = () => {
  const total = STATE_ACRONYMS.length;
  return STATE_ACRONYMS[Math.floor(Math.random() * total)];
};
function getSpecialProperty(model, key) {
  return model[key];
}
var utilsBr = {
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
var generateInscricaoEstadual = {
  ac: function(valor) {
    if (tamanhoNaoE(valor, 13)) {
      return false;
    }
    if (naoComecaCom(valor, "01")) {
      return false;
    }
    const base = primeiros(valor, 11);
    const primeiroDigito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base));
    const segundoDigito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base + primeiroDigito));
    return base + primeiroDigito + segundoDigito;
  },
  am: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    return calculoTrivialGenerate(valor);
  },
  al: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    if (naoComecaCom(valor, "24")) {
      return false;
    }
    const base = primeiros(valor);
    const soma = base.split("").reduce((acc, v, i) => {
      return acc + (9 - i) * Number(v);
    }, 0);
    const produto = soma * 10;
    const resto = produto - Math.floor(produto / 11) * 11;
    const digito = resto === 10 ? 0 : resto;
    return base + digito;
  },
  ap: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    if (naoComecaCom(valor, "03")) {
      return false;
    }
    const base = primeiros(valor);
    let p, d;
    if (entre(base, 3000001, 3017e3)) {
      p = 5;
      d = 0;
    } else if (entre(base, 3017001, 3019022)) {
      p = 9;
      d = 1;
    } else {
      p = 0;
      d = 0;
    }
    const resto = mod(p + base, [2, 3, 4, 5, 6, 7, 8, 9, 1]);
    let digito;
    if (resto === 1) {
      digito = 0;
    } else if (resto === 0) {
      digito = d;
    } else {
      digito = 11 - resto;
    }
    return base + digito;
  },
  ba: function(valor) {
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
    if ("0123458".split("").indexOf(digitoComparacao) !== -1) {
      segundoResto = mod(base, segundoMultiplicador, 10);
      segundoDigito = segundoResto === 0 ? 0 : 10 - segundoResto;
      primeiroResto = mod(base + segundoDigito, primeiroMultiplicador, 10);
      primeiroDigito = primeiroResto === 0 ? 0 : 10 - primeiroResto;
    } else {
      segundoResto = mod(base, segundoMultiplicador);
      segundoDigito = substracaoPor11SeMaiorQue2CasoContrario0(segundoResto);
      primeiroResto = mod(base + segundoDigito, primeiroMultiplicador);
      primeiroDigito = substracaoPor11SeMaiorQue2CasoContrario0(primeiroResto);
    }
    return base + primeiroDigito + segundoDigito;
  },
  ce: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    return calculoTrivialGenerate(valor);
  },
  df: function(valor) {
    if (tamanhoNaoE(valor, 13)) {
      return false;
    }
    if (naoComecaCom(valor, "07") && naoComecaCom(valor, "08")) {
      return false;
    }
    const base = primeiros(valor, 11);
    const primeiro = substracaoPor11SeMaiorQue2CasoContrario0(mod(base));
    const segundo = substracaoPor11SeMaiorQue2CasoContrario0(mod(base + primeiro));
    return base + primeiro + segundo;
  },
  es: function(valor) {
    return calculoTrivialGenerate(valor);
  },
  go: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    if (["10", "11", "15", "20"].indexOf(valor.substring(0, 2)) === -1) {
      return false;
    }
    const base = primeiros(valor);
    if (base === "11094402") {
      return valor.substr(8) === "1" || valor.substr(8) === "0";
    }
    const resto = mod(base);
    let digito;
    if (resto === 0) {
      digito = 0;
    } else if (resto === 1) {
      if (entre(base, 10103105, 10119997)) {
        digito = 1;
      } else {
        digito = 0;
      }
    } else {
      digito = 11 - resto;
    }
    return base + digito;
  },
  ma: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    if (naoComecaCom(valor, "12")) {
      return false;
    }
    return calculoTrivialGenerate(valor);
  },
  mg: function(valor) {
    if (tamanhoNaoE(valor, 13)) {
      return false;
    }
    const base = primeiros(valor, 11);
    const baseComZero = valor.substring(0, 3) + "0" + valor.substring(3, 11);
    let i = 0;
    const produtorioLiteral = baseComZero.split("").reduceRight(function(anterior, atual) {
      if (i > [2, 1].length - 1) {
        i = 0;
      }
      return ([2, 1][i++] * parseInt(atual, 10)).toString() + anterior.toString();
    }, "").split("").reduce(function(anterior, atual) {
      return anterior + parseInt(atual, 10);
    }, 0);
    let primeiro = (Math.floor(produtorioLiteral / 10) + 1) * 10 - produtorioLiteral;
    if (primeiro === 10) {
      primeiro = 0;
    }
    const segundo = substracaoPor11SeMaiorQue2CasoContrario0(mod(base + primeiro, serie(2, 11)));
    return base + primeiro + segundo;
  },
  ms: function(valor) {
    if (naoComecaCom(valor, "28")) {
      return false;
    }
    return calculoTrivialGenerate(valor);
  },
  mt: function(valor) {
    if (tamanhoNaoE(valor, 11) && tamanhoNaoE(valor)) {
      return false;
    }
    const base = tamanhoE(valor, 11) ? valor.substring(0, 10) : primeiros(valor);
    return calculoTrivialGenerate(valor, base, true);
  },
  pa: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    if (naoComecaCom(valor, "15")) {
      return false;
    }
    return calculoTrivialGenerate(valor);
  },
  pb: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    return calculoTrivialGenerate(valor);
  },
  pe: function(valor) {
    const base = valor.substring(0, valor.length - 2);
    const restoPrimeiro = mod(base);
    const primeiro = 11 - restoPrimeiro >= 10 ? 0 : 11 - restoPrimeiro;
    const restoSegundo = mod(base + primeiro);
    const segundo = 11 - restoSegundo >= 10 ? 0 : 11 - restoSegundo;
    return base + primeiro + segundo;
  },
  pi: function(valor) {
    return calculoTrivialGenerate(valor);
  },
  pr: function(valor) {
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
  rj: function(valor) {
    if (tamanhoNaoE(valor, 8)) {
      return false;
    }
    const base = primeiros(valor, 7);
    const digito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base, serie(2, 7)));
    return base + digito;
  },
  rn: function(valor) {
    if (tamanhoNaoE(valor) && tamanhoNaoE(valor, 10)) {
      return false;
    }
    if (naoComecaCom(valor, "20")) {
      return false;
    }
    const base = valor.substring(0, valor.length - 1);
    const multiplicadores = serie(2, 9);
    if (tamanhoE(valor, 10)) {
      multiplicadores.push(10);
    }
    const resto = mod(base, multiplicadores) * 10 % 11;
    const digito = resto === 10 ? 0 : resto;
    return base + digito;
  },
  ro: function(valor) {
    let base, digito, resultadoMod;
    if (tamanhoE(valor, 9)) {
      base = valor.substring(3, 8);
      digito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base));
      return valor === valor.substring(0, 3) + base + digito;
    } else if (tamanhoE(valor, 14)) {
      base = primeiros(valor, 13);
      resultadoMod = mod(base);
      digito = resultadoMod <= 1 ? 1 : 11 - resultadoMod;
      return base + digito;
    } else {
      return false;
    }
  },
  rr: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    if (naoComecaCom(valor, "24")) {
      return false;
    }
    const base = primeiros(valor);
    const digito = mod(base, [8, 7, 6, 5, 4, 3, 2, 1], 9);
    return base + digito;
  },
  rs: function(valor) {
    if (tamanhoNaoE(valor, 10)) {
      return false;
    }
    const base = primeiros(valor, 9);
    return calculoTrivialGenerate(valor, base, true);
  },
  sc: function(valor) {
    return calculoTrivialGenerate(valor);
  },
  se: function(valor) {
    if (tamanhoNaoE(valor)) {
      return false;
    }
    return calculoTrivialGenerate(valor);
  },
  sp: function(valor) {
    valor = valor.toUpperCase();
    let segundaBase;
    if (valor.substr(0, 1) === "P") {
      if (tamanhoNaoE(valor, 13)) {
        return false;
      }
      const base = valor.substring(1, 9);
      segundaBase = valor.substring(10, 13);
      const resto = mod(base, [10, 8, 7, 6, 5, 4, 3, 1]).toString();
      const digito = resto.length > 1 ? resto[1] : resto[0];
      return "P" + base + digito + segundaBase;
    } else {
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
  to: function(valor) {
    if (tamanhoNaoE(valor) && tamanhoNaoE(valor, 11)) {
      return false;
    }
    let base;
    if (tamanhoE(valor, 11)) {
      if (["01", "02", "03", "99"].indexOf(valor.substring(2, 4)) === -1) {
        return false;
      }
      base = valor.substring(0, 2) + valor.substring(4, 10);
    } else {
      base = primeiros(valor);
    }
    const digito = substracaoPor11SeMaiorQue2CasoContrario0(mod(base));
    return valor.substring(0, valor.length - 1) + digito;
  }
};
var funcoes = {
  ac: function(valor) {
    return valor === generateInscricaoEstadual["ac"](valor);
  },
  am: function(valor) {
    return valor === generateInscricaoEstadual["am"](valor);
  },
  al: function(valor) {
    return valor === generateInscricaoEstadual["al"](valor);
  },
  ap: function(valor) {
    return valor === generateInscricaoEstadual["ap"](valor);
  },
  ba: function(valor) {
    return valor === generateInscricaoEstadual["ba"](valor);
  },
  ce: function(valor) {
    return valor === generateInscricaoEstadual["ce"](valor);
  },
  df: function(valor) {
    return valor === generateInscricaoEstadual["df"](valor);
  },
  es: function(valor) {
    return valor === generateInscricaoEstadual["es"](valor);
  },
  go: function(valor) {
    return valor === generateInscricaoEstadual["go"](valor);
  },
  ma: function(valor) {
    return valor === generateInscricaoEstadual["ma"](valor);
  },
  mg: function(valor) {
    return valor === generateInscricaoEstadual["mg"](valor);
  },
  ms: function(valor) {
    return valor === generateInscricaoEstadual["ms"](valor);
  },
  mt: function(valor) {
    return valor === generateInscricaoEstadual["mt"](valor);
  },
  pa: function(valor) {
    return valor === generateInscricaoEstadual["pa"](valor);
  },
  pb: function(valor) {
    return valor === generateInscricaoEstadual["pb"](valor);
  },
  pe: function(valor) {
    return valor === generateInscricaoEstadual["pe"](valor);
  },
  pi: function(valor) {
    return valor === generateInscricaoEstadual["pi"](valor);
  },
  pr: function(valor) {
    return valor === generateInscricaoEstadual["pr"](valor);
  },
  rj: function(valor) {
    return valor === generateInscricaoEstadual["rj"](valor);
  },
  rn: function(valor) {
    return valor === generateInscricaoEstadual["rn"](valor);
  },
  ro: function(valor) {
    return valor === generateInscricaoEstadual["ro"](valor);
  },
  rr: function(valor) {
    return valor === generateInscricaoEstadual["rr"](valor);
  },
  rs: function(valor) {
    return valor === generateInscricaoEstadual["rs"](valor);
  },
  sc: function(valor) {
    return valor === generateInscricaoEstadual["sc"](valor);
  },
  se: function(valor) {
    return valor === generateInscricaoEstadual["se"](valor);
  },
  sp: function(valor) {
    return valor === generateInscricaoEstadual["sp"](valor);
  },
  to: function(valor) {
    return valor === generateInscricaoEstadual["to"](valor);
  }
};
function validateInscricaoEstadual(ie, estado) {
  if (eIndefinido(estado) || estado === null) {
    estado = "";
  }
  estado = estado.toLowerCase();
  if (estado !== "" && !(estado in funcoes)) {
    return new Error("estado não é válido");
  }
  if (eIndefinido(ie)) {
    return new Error("ie deve ser fornecida");
  }
  if (Array.isArray(ie)) {
    let retorno = true;
    ie.forEach(function(i) {
      if (!validateInscricaoEstadual(i, estado)) {
        retorno = false;
      }
    });
    return retorno;
  }
  if (typeof ie !== "string") {
    return new Error("ie deve ser string ou array de strings");
  }
  if (!allNumbersAreSame(ie)) {
    return new Error("ie com todos dígitos iguais");
  }
  if (ie.match(/^ISENTO$/i)) {
    return true;
  }
  ie = ie.replace(/[\.|\-|\/|\s]/g, "");
  if (estado === "") {
    if (lookup(ie)) {
      return true;
    } else {
      return false;
    }
  }
  if (/^\d+$/.test(ie) || estado === "sp" || funcoes[estado]) {
    return funcoes[estado](ie);
  }
  return false;
}
var MASKSIE = {
  AC: {
    text: "01.004.823/001-12",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  },
  AL: {
    text: "240000048",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  AM: {
    text: "04.145.871-0",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/]
  },
  AP: {
    text: "240000048",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  BA: {
    text: "1234567-48",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/],
    textMaskFunction: function mask(userInput) {
      const numberLength = getSizeNumbers(userInput);
      if (!userInput || numberLength > 8) {
        return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/];
      } else {
        return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/];
      }
    }
  },
  CE: {
    text: "06.000001-5",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  },
  DF: {
    text: "06 000001 123-55",
    textMask: [/\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  },
  ES: {
    text: "082.560.67-6",
    textMask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, "-", /\d/]
  },
  GO: {
    text: "06.000.001-5",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/]
  },
  MA: {
    text: "12.104.376-2",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  },
  MG: {
    text: "001.819.263/0048",
    textMask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
  },
  MS: {
    text: "001819263",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  MT: {
    text: "0018192630-1",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  },
  PA: {
    text: "06-000001-5",
    textMask: [/\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  },
  PB: {
    text: "06000001-5",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  },
  PE: {
    text: "0192310-24",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  },
  PI: {
    text: "19.301.656-7",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/]
  },
  PR: {
    text: "19301656-78",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  },
  RJ: {
    text: "20.040.04-1",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, "-", /\d/]
  },
  RN: {
    text: "20.040.040-1",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/],
    textMaskFunction: function mask2(userInput) {
      const numberLength = getSizeNumbers(userInput);
      if (!userInput || numberLength > 9) {
        return [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
      } else {
        return [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/];
      }
    }
  },
  RO: {
    text: "101.62521-3",
    textMask: [/\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  RR: {
    text: "24006628-1",
    textMask: [/\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  RS: {
    text: "024/0440013",
    textMask: [/\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  SC: {
    text: "271.234.563",
    textMask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/]
  },
  SE: {
    text: "27123456-3",
    textMask: [/\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  SP: {
    text: "114.814.878.119",
    textMask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/]
  },
  TO: {
    text: "11 81 4878119",
    textMask: [/\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  }
};
function getSizeNumbers(userInput) {
  const numbers = userInput.match(/\d/g);
  let numberLength = 0;
  if (numbers) {
    numberLength = numbers.join("").length;
  }
  return numberLength;
}
function eIndefinido(objeto) {
  return typeof objeto === "undefined";
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
  return valor.split("").reduceRight(function(anterior, atual) {
    if (i > multiplicadores.length - 1) {
      i = 0;
    }
    return multiplicadores[i++] * parseInt(atual, 10) + anterior;
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
  if (typeof valor === "string") {
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
function createAih(value) {
  value = getAllDigits(value.toString());
  if (value.length > 12) {
    value = value.toString().substr(0, value.length - 1);
  }
  const cod = parseInt(value);
  const calc = Math.ceil(cod - cod / 11);
  const digito = calc.toString().substr(-1);
  return digito;
}
function createCertidao(value) {
  if (value.length > 30) {
    value = value.substring(0, value.length - 2);
  }
  let certPriDig = calcularDigitoCertidao(value, 1);
  let certSegDig = calcularDigitoCertidao(value, certPriDig);
  let certDV = certPriDig * 10 + certSegDig;
  if (certDV == 0) certDV = "00";
  if (certDV > 0 && certDV < 10) certDV = "0" + certDV;
  return certDV.toString();
}
function createCnhEspelho(value) {
  return modulo11Custom(value.substr(0, value.length - 1), 1, 8, false);
}
function createRenachEstadual(value) {
  const state = value.substr(0, 2).toLowerCase();
  if (!STATE_ACRONYMS.includes(state)) {
    return "";
  }
  let digits = value.substr(2).replace(/[^\d]/g, "");
  if (digits.length !== 9) {
    return "";
  }
  return "" + modulo11Custom(digits.substr(0, digits.length - 1), 1, 11);
}
function createRenachSeguranca(value) {
  value = value.replace(/[^\d]+/g, "");
  if (value.length !== 11) {
    return "";
  }
  return "" + modulo11Custom(value.substr(0, value.length - 1), 1, 11);
}
function createCnh(value) {
  value = value.replace(/[^\d]+/g, "");
  if (value.length != 11 || value === "0") {
    return "";
  }
  return value.substr(-2);
}
function createCpf(strCPF) {
  strCPF = strCPF.replace(/[^\d]+/g, "");
  if (strCPF === "00000000000") {
    return "";
  }
  return modulo11Custom(strCPF.substr(0, strCPF.length - 2), 2, 12);
}
function createEct(number2) {
  number2 = getAllDigits(number2).padStart(8, "0");
  const digito = calcularDigitoEct(number2);
  return digito;
}
function createPispasep(number2) {
  const nis = fillString(getAllDigits(number2), 11, "0");
  const digit = calcularDigitoPispasep(nis);
  return digit;
}
function createRenavam(renavam2) {
  renavam2 = renavam2.padStart(11, "0");
  const digito = calcularDigitoRenavam(renavam2);
  return digito;
}
function createProcesso(number2) {
  number2 = getAllDigits(number2).padStart(18, "0");
  return calcularProcesso(number2);
}
function createTituloAtual(titulo2) {
  const tam = titulo2.length;
  const estado = titulo2.substr(tam - 4, 2);
  titulo2 = titulo2.substr(0, tam - 2).padStart(11, "0");
  const digitos = calcularDigitosTitulo(titulo2, estado);
  return digitos.join("");
}
function calcularDigitoCertidao(value, fator) {
  let result = 0;
  const weights = [9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < value.length; i++) {
    result += parseInt(value[i], 10) * weights[i % weights.length];
  }
  return result * fator % 11;
}
function validarDigitosCnpj(cnpj2) {
  cnpj2 = cnpj2.replace(/[^\d]+/g, "");
  if (cnpj2.length !== 14 || !isValidCnpj(cnpj2)) {
    return false;
  }
  const primeiroDigitoCalculado = calcularDigitoVerificadorCnpj(cnpj2, 12);
  if (primeiroDigitoCalculado !== parseInt(cnpj2.charAt(12), 10)) {
    return false;
  }
  const segundoDigitoCalculado = calcularDigitoVerificadorCnpj(cnpj2, 13);
  if (segundoDigitoCalculado !== parseInt(cnpj2.charAt(13), 10)) {
    return false;
  }
  return true;
}
function calcularDigitoVerificadorCnpj(cnpj2, tamanho) {
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = 0; i < tamanho; i++) {
    soma += parseInt(cnpj2.charAt(i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}
function calcularDigitoEct(number2) {
  const weights = [7, 9, 5, 3, 2, 4, 6, 8];
  let soma = 0;
  for (let i = 0; i < number2.length; i++) {
    soma += parseInt(number2[i], 10) * weights[i];
  }
  let result = 11 - soma % 11;
  if (result === 11) result = 5;
  if (result === 10) result = 0;
  return result;
}
function calcularDigitoPispasep(nis) {
  let soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(nis[i], 10) * (11 - i);
  }
  return 11 - soma % 11;
}
function calcularDigitoRenavam(renavam2) {
  let soma = 0;
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 10; i++) {
    soma += parseInt(renavam2[i], 10) * weights[i];
  }
  const resto = soma % 11;
  return resto === 10 ? 0 : resto;
}
function calcularProcesso(number2) {
  let soma = 0;
  const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  for (let i = 0; i < 11; i++) {
    soma += parseInt(number2[i], 10) * weights[i];
  }
  const resto1 = soma % 97;
  soma = 0;
  const weights2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let i = 11; i < 18; i++) {
    soma += parseInt(number2[i], 10) * weights2[i - 11];
  }
  const resto2 = (resto1 * 100 + soma * 100) % 97;
  const dv = 98 - resto2;
  return `${number2.substr(0, 10)}-${dv}.${number2.substr(10)}`;
}
function calcularDigitosTitulo(titulo2, estado) {
  const excecao = estado === "01" || estado === "02";
  let dig1 = calcularDigitoTitulo(titulo2, 2);
  if (excecao && dig1 === 0) dig1 = 1;
  let dig2 = calcularDigitoTitulo(titulo2 + dig1, 4);
  if (excecao && dig2 === 0) dig2 = 1;
  return [dig1, dig2];
}
function calcularDigitoTitulo(titulo2, peso) {
  let soma = 0;
  const weights = [9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 8; i++) {
    soma += parseInt(titulo2[i], 10) * weights[i];
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}
function isValidCnpj(cnpj2) {
  const invalidCnpjs = ["00000000000000", "11111111111111", "22222222222222", "33333333333333", "44444444444444", "55555555555555", "66666666666666", "77777777777777", "88888888888888", "99999999999999"];
  return !invalidCnpjs.includes(cnpj2);
}
var maskIptu = (number2, estado, cidade) => {
  if (!iptuMasks[estado] || !iptuMasks[estado][cidade]) {
    return number2;
  }
  return iptuMasks[estado][cidade];
};
var validateIptu = (number2, estado, cidade) => {
  if (!iptuValidate[estado] || !iptuValidate[estado][cidade]) {
    return true;
  }
  number2 = getAllDigits(number2);
  return iptuValidate[estado][cidade](number2);
};
function createIptuCtba(number2) {
  number2 = getAllDigits(number2);
  let a1 = parseInt(number2.slice(10));
  let a2 = parseInt(number2.slice(9, 10));
  let a3 = parseInt(number2.slice(8, 9));
  let a4 = parseInt(number2.slice(7, 8));
  let a5 = parseInt(number2.slice(6, 7));
  let a6 = parseInt(number2.slice(5, 6));
  let a7 = parseInt(number2.slice(4, 5));
  let a8 = parseInt(number2.slice(3, 4));
  let a9 = parseInt(number2.slice(2, 3));
  let a10 = parseInt(number2.slice(1, 2));
  let a11 = parseInt(number2.slice(0, 1));
  let iptuCtbaDV = 10 - (a1 * 2 + a2 * 3 + a3 * 4 + a4 * 7 + a5 * 8 + a6 * 9 + a7 * 2 + a8 * 3 + a9 * 4 + a10 * 7 + a11 * 8) % 10;
  if (iptuCtbaDV === 10) {
    iptuCtbaDV = 0;
  }
  return iptuCtbaDV;
}
function createIptuSp(number2) {
  let a1 = parseInt(number2.slice(9));
  let a2 = parseInt(number2.slice(8, 9));
  let a3 = parseInt(number2.slice(7, 8));
  let a4 = parseInt(number2.slice(6, 7));
  let a5 = parseInt(number2.slice(5, 6));
  let a6 = parseInt(number2.slice(4, 5));
  let a7 = parseInt(number2.slice(3, 4));
  let a8 = parseInt(number2.slice(2, 3));
  let a9 = parseInt(number2.slice(1, 2));
  let a10 = parseInt(number2.slice(0, 1));
  let iptuSpDV = (a1 * 9 + a2 * 8 + a3 * 7 + a4 * 6 + a5 * 5 + a6 * 4 + a7 * 3 + a8 * 2 + a9 + a10 * 10) % 11;
  if (iptuSpDV === 10) {
    iptuSpDV = 1;
  }
  return iptuSpDV;
}
var iptuCreate = {
  "sao-paulo": {
    "sao-paulo": createIptuSp
  },
  "parana": {
    "curitiba": createIptuCtba
  }
};
var iptuMasks = {
  "minas-gerais": {
    "belo-horizonte": {
      text: "000.000.000.000.0",
      textMask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/]
    },
    "contagem": {
      text: "20.040.040-1",
      textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/],
      textMaskFunction: function mask3(userInput) {
        const numbers = userInput.match(/\d/g);
        let numberLength = 0;
        if (numbers) {
          numberLength = numbers.join("").length;
        }
        if (!userInput || numberLength > 9) {
          return [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
        } else {
          return [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/];
        }
      }
    }
  },
  "sao-paulo": {
    "sao-paulo": {
      text: "00000000000-0",
      textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
    }
  },
  "parana": {
    "curitiba": {
      text: "00000000000-0",
      textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
    }
  }
};
var validateRemoveDigit = (number2, max) => {
  number2 = getAllDigits(number2);
  if (number2.length > max) {
    return false;
  } else if (number2.length === max) {
    number2 = number2.slice(0, -1);
  }
  return number2;
};
function validateIptuCtba(value) {
  let number2 = validateRemoveDigit(value, 12);
  if (!number2) {
    return false;
  }
  const dv = iptuCreate["parana"]["curitiba"](number2);
  return parseInt(value[value.length - 1]) === dv;
}
function validateIptuContagem(number2) {
  const result = validateRemoveDigit(number2, 12);
  return result;
}
function validateIptuSp(value) {
  let number2 = validateRemoveDigit(value, 12);
  if (!number2) {
    return false;
  }
  const dv = iptuCreate["sao-paulo"]["sao-paulo"](number2);
  return parseInt(value[value.length - 1]) === dv;
}
var iptuValidate = {
  "sao-paulo": {
    "sao-paulo": validateIptuSp
  },
  "minas-gerais": {
    "contagem": validateIptuContagem
  },
  "parana": {
    "curitiba": validateIptuCtba
  }
};
function validateAih(aih) {
  const aihClean = aih.replace(/[^\d]+/g, "");
  const dvOriginal = aihClean.substr(-1);
  const dv = createAih(aihClean);
  return dvOriginal === dv;
}
function validateCellphone(cel) {
  let celClean = cel.replace(/[^\d]+/g, "");
  celClean = celClean.replace(/_/g, "");
  if (celClean.length !== 11) {
    return false;
  }
  if (celClean[0] == 0 || celClean[2] < 5) {
    return false;
  }
  return true;
}
var CEPRange = {
  "SP": /^([1][0-9]{3}|[01][0-9]{4})[0-9]{3}$/g,
  "RJ": /^[2][0-8][0-9]{3}[0-9]{3}$/g,
  "MS": /^[7][9][0-9]{3}[0-9]{3}$/g,
  "MG": /^[3][0-9]{4}[0-9]{3}$/g
  // Outros estados...
};
function validateCep(cep2) {
  const cepClean = cep2.replace(/[^\d]+/g, "");
  const exp = /\d{2}\.\d{3}\-\d{3}/;
  if (!exp.test(cep2) && cepClean.length !== 8) {
    return false;
  }
  return true;
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
function validateCnae(number2) {
  return !!number2;
}
function validateCnh(value) {
  value = value.replace(/[^\d]/g, "");
  if (value.length !== 11) {
    return false;
  }
  const check = createCnh(value);
  return value.substr(-2) === check;
}
function validateCnhEspelho(value) {
  value = value.replace(/[^\d]/g, "");
  if (value.length !== 10) {
    return false;
  }
  let check = createCnhEspelho(value);
  if (check === "0" || check === "1") check = "0";
  return value.substr(-1) === check;
}
function validateRenachEstadual(value) {
  const state = value.substr(0, 2).toLowerCase();
  if (!STATE_ACRONYMS.includes(state)) {
    return false;
  }
  let digits = value.substr(2);
  digits = digits.replace(/[^\d]/g, "");
  if (digits.length !== 9) {
    return false;
  }
  let check = createRenachEstadual(value);
  if (check === "0" || check === "1") check = "0";
  return value.substr(-1) === check;
}
function validateRenachSeguranca(value) {
  value = value.replace(/[^\d]/g, "");
  if (value.length !== 11) {
    return false;
  }
  let check = createRenachSeguranca(value);
  return value.substr(-1) === check;
}
function validateCnpj(cnpj2) {
  return validarDigitosCnpj(cnpj2);
}
function validateCpf(strCpf) {
  strCpf = strCpf.replace(/[^\d]+/g, "");
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
function validateCpfCnpj(number2) {
  return validateCpf(number2) || validateCnpj(number2);
}
function validateCvv(value, maxLength = 3) {
  maxLength = maxLength instanceof Array ? maxLength : [maxLength];
  if (typeof value !== "string") {
    return {
      isValid: false,
      isPotentiallyValid: false
    };
  }
  if (!/^\d*$/.test(value)) {
    return {
      isValid: false,
      isPotentiallyValid: false
    };
  }
  var i = 0;
  const max = value.length;
  for (; i < maxLength.length; i++) {
    if (max === maxLength[i]) {
      return {
        isValid: true,
        isPotentiallyValid: true
      };
    }
  }
  if (value.length < Math.min.apply(null, maxLength)) {
    return {
      isValid: false,
      isPotentiallyValid: true
    };
  }
  var maximum = maxLength;
  var i = 0;
  for (; i < maxLength.length; i++) {
    maximum = maxLength[i] > maximum ? maxLength[i] : maximum;
  }
  if (value.length > maximum) {
    return {
      isValid: false,
      isPotentiallyValid: false
    };
  }
  return {
    isValid: true,
    isPotentiallyValid: true
  };
}
function validateCartaoCredito(input) {
  let value;
  if (typeof input == "string") {
    value = getAllDigits(input);
  } else {
    value = input.toString();
  }
  const number2 = value.slice(0, 16);
  const mes = parseInt(value.slice(16, 18));
  const ano = parseInt(value.slice(18, 20));
  const cvv = value.slice(20, 23);
  const d = /* @__PURE__ */ new Date();
  const anoAtual = d.getFullYear() - 2e3;
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
  Object.keys(creditCardValidator).forEach((key) => {
    if (creditCardValidator[key].test(number2)) {
      found = key;
    }
  });
  return !!found;
}
var creditCardValidator = {
  "mc": /5[1-5][0-9]{14}/,
  "ec": /5[1-5][0-9]{14}/,
  "vi": /4(?:[0-9]{12}|[0-9]{15})/,
  "ax": /3[47][0-9]{13}/,
  "dc": /3(?:0[0-5][0-9]{11}|[68][0-9]{12})/,
  "bl": /3(?:0[0-5][0-9]{11}|[68][0-9]{12})/,
  "di": /6011[0-9]{12}/,
  "jcb": /(?:3[0-9]{15}|(2131|1800)[0-9]{11})/,
  "er": /2(?:014|149)[0-9]{11}/
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
function validateTitulo(titulo2) {
  if (!titulo2) {
    return false;
  }
  const tituloClean = titulo2.replace(/\./g, "");
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
  let processoClean = processo.replace(/\./g, "").replace(/\-/g, "");
  const processoValidado = createProcesso(processo);
  return parseInt(processoClean) === parseInt(getAllDigits(processoValidado));
}
function validateRenavam(renavam2) {
  let renavamClean = renavam2.replace(/\./g, "").replace(/\-/g, "");
  const dv = createRenavam(renavam2);
  const tam = renavam2.length;
  const digitos = renavam2.substr(tam - 1, 1);
  return digitos.charCodeAt(0) - 48 === dv;
}
function validateRg(rg2) {
  let rgClean = rg2.replace(/\./g, "").replace(/-/g, "");
  const expClean = /[a-z]{2}\d{8}/;
  const state = rg2.substr(0, 2).toUpperCase();
  if (!expClean.test(rgClean) && !(state in CEPRange)) {
    return false;
  }
  const validateState = RG[state];
  return validateState ? validateState(rg2) : true;
}
function validateSenha(value, options = {}) {
  let finalregex = "^";
  if (options.lowercase !== false) {
    finalregex += "(?=.*[a-z])";
  }
  if (options.uppercase !== false) {
    finalregex += "(?=.*[A-Z])";
  }
  if (options.numeric !== false) {
    finalregex += "(?=.*[0-9])";
  }
  if (options.numeric !== false) {
    finalregex += "(?=.*[!@#\\$%\\^&\\*])";
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
  const telClean = tel.replace(/[^\d]+/g, "");
  tel = tel.replace(/_/g, "");
  if (!(telClean.length === 10 || telClean.length === 11)) {
    return false;
  }
  if (telClean[0] == 0 || telClean[2] == 0) {
    return false;
  }
  return true;
}
function validateTime(time2, options = {}) {
  const value = time2.toString();
  const expression = options.diario ? /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/ : /^([0-9]?[0-9]):([0-5][0-9])(:[0-5][0-9])?$/;
  return expression.test(value);
}
function validateCurrency(currency2) {
  if (typeof currency2 === "number") {
    return true;
  }
  const regex = /^(R\$|R\$ )?(-)?(?!0(\.)?00)\d{1,3}((\.)?\d{3})*(,\d\d)?$/g;
  return regex.test(currency2);
}
function validateContaBanco(number2) {
  return !!number2;
}
function validateData(value) {
  if (!value) {
    return false;
  }
  const values = value.split("/");
  if (values.length !== 3) {
    return false;
  }
  const testData = /* @__PURE__ */ new Date(values[1] + "/" + values[0] + "/" + values[2]);
  return !!testData.getTime();
}
function validateDate(value) {
  if (!value || value.length < 10) {
    return false;
  }
  const testData = new Date(value);
  return !!testData.getTime();
}
function validateDatetime(time2, options = {}) {
  if (!time2) {
    return false;
  }
  time2 = time2.toString();
  const values = time2.split(" ");
  return validateDate(values[0]) && validateTime(values[1], options);
}
function validateDataHora(time2, options = {}) {
  if (!time2) {
    return false;
  }
  time2 = time2.toString();
  const values = time2.split(" ");
  return validateData(values[0]) && validateTime(values[1], options);
}
function validateEct(number2) {
  number2 = getAllDigits(number2);
  if (number2.length > 9) {
    return false;
  }
  const nodigit = number2.substr(0, number2.length - 1);
  const dg = createEct(nodigit);
  return parseInt(number2[number2.length - 1]) === dg;
}
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
function validateEndereco(number2) {
  return !!number2;
}
function validateNumber(number2) {
  if (number2.split(",").length > 2) {
    return false;
  }
  const regexDecimal = /^\d+(?:\.\d{0,2})$/;
  const regex = /^[0-9]{0,10}[,]{1,1}[0-9]{0,4}/;
  const regexNumero = /^[0-9]{0,10}/;
  return regexDecimal.test(number2) || regex.test(number2) || regexNumero.test(number2);
}
function validatePorcentagem(porcentagem) {
  porcentagem = porcentagem.split("%")[0];
  return validateNumber(porcentagem);
}
function validatePispasep(number2) {
  number2 = getAllDigits(number2);
  let nis = fillString(number2, 11, "0");
  const regex = /\d{11}/;
  if (!regex.test(nis)) {
    return false;
  }
  const digit = createPispasep(number2);
  return nis[10].toString() === digit.toString();
}
function validateUsername(value) {
  const re = /^[a-z0-9_-]{3,16}$/i;
  return re.test(String(value).toLowerCase());
}
var LICENSEPLATES_INVALID = {
  start: "SAW0001",
  end: "ZZZ9999"
};
function validateLicensePlate(licensePlate2, includesMercosul) {
  const licensePlateClean = licensePlate2.toString().replace(/-/g, "").replace(/ /g, "").toUpperCase();
  const regex = {
    legacyBR: /^[A-Z]{3}[0-9]{4}$/,
    mercosulBR: /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/,
    mercosulAR: /^[A-Z]{2}[0-9]{3}[A-Z]{2}$|^[A-Z]{1}[0-9]{3}[A-Z]{3}$/,
    mercosulBO: /^[A-Z]{2}[0-9]{5}$/,
    mercosulPY: /^[A-Z]{4}[0-9]{3}$|^[0-9]{3}[A-Z]{4}$/,
    mercosulUY: /^[A-Z]{3}[0-9]{4}$/
  };
  const isLegadoBRInvalid = licensePlateClean >= LICENSEPLATES_INVALID.start && licensePlateClean <= LICENSEPLATES_INVALID.end;
  if (regex.legacyBR.test(licensePlateClean) && !isLegadoBRInvalid || regex.mercosulBR.test(licensePlateClean) || includesMercosul && (regex.mercosulAR.test(licensePlateClean) || regex.mercosulBO.test(licensePlateClean) || regex.mercosulPY.test(licensePlateClean) || regex.mercosulUY.test(licensePlateClean))) {
    return true;
  }
  return false;
}
function rgSP(number2) {
  number2 = "0000000" + number2;
  number2 = number2.slice(number2.length - 8);
  let b1 = parseInt(number2.slice(7));
  let b2 = parseInt(number2.slice(6, 7));
  let b3 = parseInt(number2.slice(5, 6));
  let b4 = parseInt(number2.slice(4, 5));
  let b5 = parseInt(number2.slice(3, 4));
  let b6 = parseInt(number2.slice(2, 3));
  let b7 = parseInt(number2.slice(1, 2));
  let b8 = parseInt(number2.slice(0, 1));
  let cispDig = (b1 * 2 + b2 * 3 + b3 * 4 + b4 * 5 + b5 * 6 + b6 * 7 + b7 * 8 + b8 * 9) % 11;
  if (cispDig == 10) {
    cispDig = "X";
  }
  return cispDig;
}
function rgRJ(number2) {
  number2 = "0000000" + number2;
  number2 = number2.slice(number2.length - 8);
  let b1 = parseInt(number2.slice(7));
  let b2 = parseInt(number2.slice(6, 7));
  let b3 = parseInt(number2.slice(5, 6));
  let b4 = parseInt(number2.slice(4, 5));
  let b5 = parseInt(number2.slice(3, 4));
  let b6 = parseInt(number2.slice(2, 3));
  let b7 = parseInt(number2.slice(1, 2));
  let b8 = parseInt(number2.slice(0, 1));
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
var RG = {
  sp: rgSP,
  rj: rgRJ
};
var validateBr = {
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
var cpf = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.cpf(v) ? null : {
    cpf: true
  };
};
var CPF_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CPFValidator),
  multi: true
};
var CPFValidator = class _CPFValidator {
  validate(c) {
    return cpf(c);
  }
  static ɵfac = function CPFValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CPFValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CPFValidator,
    selectors: [["", "cpf", "", "formControlName", ""], ["", "cpf", "", "formControl", ""], ["", "cpf", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([CPF_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CPFValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[cpf][formControlName],[cpf][formControl],[cpf][ngModel]",
      providers: [CPF_VALIDATOR]
    }]
  }], null, null);
})();
var dollarSign = "$";
var emptyString$4 = "";
var comma = ",";
var period = ".";
var minus = "-";
var minusRegExp = /-/;
var nonDigitsRegExp = /\D+/g;
var number$1 = "number";
var digitRegExp = /\d/;
var caretTrap = "[]";
function createNumberMask({
  prefix = dollarSign,
  suffix = emptyString$4,
  includeThousandsSeparator = true,
  thousandsSeparatorSymbol = comma,
  allowDecimal = false,
  decimalSymbol = period,
  decimalLimit = 2,
  requireDecimal = false,
  allowNegative = false,
  allowLeadingZeroes = false,
  integerLimit = null
} = {}) {
  const prefixLength = prefix && prefix.length || 0;
  const suffixLength = suffix && suffix.length || 0;
  const thousandsSeparatorSymbolLength = thousandsSeparatorSymbol && thousandsSeparatorSymbol.length || 0;
  function numberMask(rawValue = emptyString$4) {
    const rawValueLength = rawValue.length;
    if (rawValue === emptyString$4 || rawValue[0] === prefix[0] && rawValueLength === 1) {
      return prefix.split(emptyString$4).concat([digitRegExp.toString()]).concat(suffix.split(emptyString$4));
    } else if (rawValue === decimalSymbol && allowDecimal) {
      return prefix.split(emptyString$4).concat(["0", decimalSymbol, digitRegExp.toString()]).concat(suffix.split(emptyString$4));
    }
    const isNegative = rawValue[0] === minus && allowNegative;
    if (isNegative) {
      rawValue = rawValue.toString().substr(1);
    }
    const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
    const hasDecimal = indexOfLastDecimal !== -1;
    let integer;
    let fraction;
    let mask6;
    if (rawValue.slice(suffixLength * -1) === suffix) {
      rawValue = rawValue.slice(0, suffixLength * -1);
    }
    if (hasDecimal && (allowDecimal || requireDecimal)) {
      integer = rawValue.slice(rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0, indexOfLastDecimal);
      fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
      fraction = convertToMask(fraction.replace(nonDigitsRegExp, emptyString$4));
    } else {
      if (rawValue.slice(0, prefixLength) === prefix) {
        integer = rawValue.slice(prefixLength);
      } else {
        integer = rawValue;
      }
    }
    if (integerLimit && typeof integerLimit === number$1) {
      const thousandsSeparatorRegex = thousandsSeparatorSymbol === "." ? "[.]" : `${thousandsSeparatorSymbol}`;
      const numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, "g")) || []).length;
      integer = integer.slice(0, integerLimit + numberOfThousandSeparators * thousandsSeparatorSymbolLength);
    }
    integer = integer.replace(nonDigitsRegExp, emptyString$4);
    if (!allowLeadingZeroes) {
      integer = integer.replace(/^0+(0$|[^0])/, "$1");
    }
    integer = includeThousandsSeparator ? addThousandsSeparator(integer, thousandsSeparatorSymbol) : integer;
    mask6 = convertToMask(integer);
    if (hasDecimal && allowDecimal || requireDecimal === true) {
      if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
        mask6.push(caretTrap);
      }
      mask6.push(decimalSymbol, caretTrap);
      if (fraction) {
        if (typeof decimalLimit === number$1) {
          fraction = fraction.slice(0, decimalLimit);
        }
        mask6 = mask6.concat(fraction);
      }
      if (requireDecimal === true && rawValue[indexOfLastDecimal - 1] === decimalSymbol) {
        mask6.push(digitRegExp);
      }
    }
    if (prefixLength > 0) {
      mask6 = prefix.split(emptyString$4).concat(mask6);
    }
    if (isNegative) {
      if (mask6.length === prefixLength) {
        mask6.push(digitRegExp);
      }
      mask6 = [minusRegExp].concat(mask6);
    }
    if (suffix.length > 0) {
      mask6 = mask6.concat(suffix.split(emptyString$4));
    }
    return mask6;
  }
  numberMask.instanceOf = "createNumberMask";
  return numberMask;
}
function convertToMask(strNumber) {
  return strNumber.split(emptyString$4).map((char) => digitRegExp.test(char) ? digitRegExp : char);
}
function addThousandsSeparator(n, thousandsSeparatorSymbol) {
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
}
var maskNumber = {
  decimalLimit: 2,
  thousandsSeparatorSymbol: ".",
  decimalSymbol: ",",
  allowDecimal: true,
  integerLimit: 17,
  prefix: "",
  suffix: ""
};
var MASKS = {
  aih: {
    text: "000000000000-0",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  },
  cartaocredito: {
    text: "0000 0000 0000 0000 00/00 000",
    textMask: [/\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, "/", /\d/, /\d/, " ", /\d/, /\d/, /\d/]
  },
  cellphone: {
    text: "(00) 00000-0000",
    textMask: ["(", /[1-9]/, /\d/, ")", " ", /[5-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
  },
  cep: {
    text: "00.000-000",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]
  },
  certidao: {
    text: "000000.00.00.0000.0.00000.000.0000000-00",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, ".", /\d/, ".", /\d/, /\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  },
  chassi: {
    text: "AAA AAAAAA AA AA0000",
    textMask: [/[1-9]/, /\w/, /\w/, " ", /\w/, /\w/, /\w/, /\w/, /\w/, /\w/, " ", /\w/, /\w/, " ", /\w/, /\w/, /\d/, /\d/, /\d/, /\d/]
  },
  cid: {
    textMask: false
  },
  cnae: {
    text: "0000-0/00",
    textMask: [/\d/, /\d/, /\d/, /\d/, "-", /\d/, "/", /\d/, /\d/]
  },
  cnh: {
    text: "000000000-00",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  },
  renachseguranca: {
    text: "00000000000",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  renachestadual: {
    text: "AA000000000",
    textMask: [/[A-S]/, /[A-Z]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  cnhespelho: {
    text: "0000000000",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  cnpj: {
    text: "00.000.000/0000-00",
    textMask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  },
  cns: {
    text: "000 0000 0000 00-00",
    textMask: [/[1|2|7|8|9]/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, "-", /\d/, /\d/]
  },
  contabanco: {
    text: "000 00000-0 00000-0",
    textMask: [/\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  },
  cpf: {
    text: "000.000.000-00",
    textMask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  },
  cpfcnpj: {
    text: "0000.0000.0000",
    textMask: [/\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, ".", /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  currency: {
    text: "0.000,00",
    textMask: createNumberMask(__spreadProps(__spreadValues({}, maskNumber), {
      prefix: "R$ ",
      allowNegative: true
    }))
  },
  data: {
    text: "00/00/0000",
    textMask: [/[0-3]/, /[0-9]/, "/", /[0-1]/, /[0-9]/, "/", /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  date: {
    text: "00/00/0000",
    textMask: [/[0-1]/, /[0-9]/, "/", /[0-3]/, /[0-9]/, "/", /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  datetime: {
    text: "00/00/0000 00:00",
    textMask: [/[0-1]/, /[0-9]/, "/", /[0-3]/, /[0-9]/, "/", /[0-2]/, /[0-9]/, /\d/, /\d/, " ", /\d/, /\d/, ":", /[0-5]/, /\d/]
  },
  datahora: {
    text: "00/00/0000 00:00",
    textMask: [/[0-3]/, /[0-9]/, "/", /[0-1]/, /[0-9]/, "/", /[0-2]/, /[0-9]/, /\d/, /\d/, " ", /\d/, /\d/, ":", /[0-5]/, /\d/]
  },
  ect: {
    text: "00000000-0",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  },
  endereco: {
    text: "0000.0000.0000",
    textMask: [/\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, ".", /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  iptu: {
    text: "0000.0000.0000",
    textMask: [/\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, ".", /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  number: {
    text: "0.000,00",
    textMask: createNumberMask(maskNumber)
  },
  porcentagem: {
    text: "00,00%",
    textMask: createNumberMask(__spreadProps(__spreadValues({}, maskNumber), {
      suffix: "%"
    }))
  },
  pispasep: {
    text: "000.00000.00-0",
    textMask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, "-", /\d/]
  },
  licensePlate: {
    text: "AAA-0000",
    textMask: [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, "-", /\d/, /[A-Za-z\d]/, /\d/, /\d/]
  },
  processo: {
    text: "0000000-00.0000.AAA.0000",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, ".", /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, ".", /\d/, /\d/, /\d/, /\d/]
  },
  renavam: {
    text: "0000000000-00",
    textMask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/],
    textMaskFunction: function mask4(userInput) {
      const numbers = userInput.match(/\d/g);
      let numberLength = 0;
      if (numbers) {
        numberLength = numbers.join("").length;
      }
      if (!userInput || numberLength < 9) {
        return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/];
      } else {
        return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/];
      }
    }
  },
  rg: {
    text: "AA-00.000.000",
    textMask: [/[A-Za-z]/, /[A-Za-z]/, "-", /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/]
  },
  sped: {
    text: "0000.0000.0000",
    textMask: [/\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, ".", /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  phoneNumber: {
    text: "(00) 00000-0000",
    textMask: ["(", /[1-9]/, /\d/, ")", " ", /[1-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
    textMaskFunction: function mask5(userInput) {
      const numbers = userInput.match(/\d/g);
      let numberLength = 0;
      if (numbers) {
        numberLength = numbers.join("").length;
      }
      if (!userInput || numberLength > 10) {
        return ["(", /[1-9]/, /\d/, ")", " ", /[1-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
      } else {
        return ["(", /[1-9]/, /\d/, ")", " ", /[1-9]/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
      }
    }
  },
  time: {
    text: "00:00",
    textMask: [/\d/, /\d/, ":", /[0-5]/, /\d/]
  },
  titulo: {
    text: "0000.0000.0000",
    textMask: [/\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, ".", /[0-2]/, /[0-9]/, /\d/, /\d/]
  },
  utils: {
    numberToString: (n) => {
      if (!n || typeof n === "string") {
        return n;
      }
      return n.toString().replace(".", ",");
    },
    textMask: false
  }
};
var makeGeneric = (key) => {
  return (value) => {
    if (!value) {
      return "";
    }
    let mask6 = MASKS[key].textMask;
    let textMaskFunction = MASKS[key].textMaskFunction;
    if (typeof textMaskFunction === "function") {
      mask6 = textMaskFunction(value);
    }
    return conformToMask$2(value, mask6, {
      guide: false
    }).conformedValue;
  };
};
function formatNumber(maskType, numberValue, decimalsFormat = 2) {
  if (!numberValue && numberValue !== 0) {
    return "";
  }
  if (typeof numberValue !== "string") {
    numberValue = numberValue.toString().replace(".", ",");
  }
  const vals = numberValue.split(",");
  if (!maskType.textMask || typeof maskType.textMask !== "function") {
    return "";
  }
  const mask6 = maskType.textMask(vals[0]);
  let formattedValue = conformToMask$2(numberValue, mask6, {
    guide: false
  }).conformedValue;
  let decimalPart = vals[1] && decimalsFormat > 0 ? "," + vals[1].padEnd(decimalsFormat, "0") : "";
  return formattedValue + decimalPart;
}
var maskBr = {
  aih: makeGeneric("aih"),
  cartaocredito: makeGeneric("cartaocredito"),
  cellphone: makeGeneric("cellphone"),
  cep: makeGeneric("cep"),
  certidao: makeGeneric("certidao"),
  chassi: makeGeneric("chassi"),
  cnae: makeGeneric("cnae"),
  cnh: makeGeneric("cnh"),
  renachseguranca: makeGeneric("renachseguranca"),
  renachestadual: makeGeneric("renachestadual"),
  cnhespelho: makeGeneric("cnhespelho"),
  cnpj: makeGeneric("cnpj"),
  cns: makeGeneric("cns"),
  contabanco: makeGeneric("contabanco"),
  cpf: makeGeneric("cpf"),
  cpfcnpj: makeGeneric("cpfcnpj"),
  currency: (currencyValueInput, decimalsFormat = 2) => {
    return formatNumber(MASKS["currency"], currencyValueInput, decimalsFormat);
  },
  data: makeGeneric("data"),
  date: makeGeneric("date"),
  datetime: makeGeneric("datetime"),
  datahora: makeGeneric("datahora"),
  ect: makeGeneric("ect"),
  endereco: makeGeneric("endereco"),
  inscricaoestadual: (inscricaoestadualValue, estado) => {
    const ie = MASKSIE;
    const ieState = ie[estado];
    if (!inscricaoestadualValue || !estado || !ieState || !ieState.textMask) {
      return "";
    }
    let mask6 = ieState.textMask;
    let textMaskFunction = ieState.textMaskFunction;
    if (typeof textMaskFunction === "function") {
      mask6 = textMaskFunction(inscricaoestadualValue);
    }
    return conformToMask$2(inscricaoestadualValue, mask6, {
      guide: false
    }).conformedValue;
  },
  iptu: (iptuValue, estado, cidade) => {
    const mask6 = maskIptu(iptuValue, estado, cidade);
    if (!mask6 || typeof mask6 === "string") {
      return "";
    }
    return conformToMask$2(iptuValue, mask6.textMask, {
      guide: false
    }).conformedValue;
  },
  number: (numberValue, decimalsFormat = 2) => {
    return formatNumber(MASKS["number"], numberValue, decimalsFormat);
  },
  porcentagem: (porcentagemValue, decimalsFormat = 2) => {
    return formatNumber(MASKS["porcentagem"], porcentagemValue, decimalsFormat);
  },
  pispasep: makeGeneric("pispasep"),
  licensePlate: makeGeneric("licensePlate"),
  processo: makeGeneric("processo"),
  renavam: makeGeneric("renavam"),
  rg: makeGeneric("rg"),
  sped: makeGeneric("sped"),
  phoneNumber: makeGeneric("phoneNumber"),
  time: (value) => {
    if (value instanceof Date) {
      value = value.toTimeString().split(" ")[0];
    }
    return makeGeneric("time")(value);
  },
  titulo: makeGeneric("titulo")
};
var placeholderChar$1 = "_";
var strFunction$1 = "function";
var defaultPlaceholderChar = placeholderChar$1;
var emptyArray$2 = [];
var emptyString$3 = "";
function conformToMask$2(inputValue = emptyString$3, mask6 = emptyArray$2, config = {}) {
  let rawValue = inputValue.toString();
  if (typeof inputValue === "number") {
    rawValue = inputValue.toString();
  }
  if (inputValue instanceof Date) {
    rawValue = inputValue.toLocaleString("pt-br");
  }
  if (!isArray$1(mask6)) {
    if (typeof mask6 === strFunction$1) {
      mask6 = mask6(inputValue, config);
      mask6 = processCaretTraps$1(mask6).maskWithoutCaretTraps;
    } else {
      throw new Error("Text-mask:conformToMask; The mask property must be an array.");
    }
  }
  const guide = config.guide || true;
  const previousConformedValue = config.previousConformedValue || emptyString$3;
  const placeholder = convertMaskToPlaceholder$1(mask6, placeholderChar$1);
  const currentCaretPosition = config.currentCaretPosition;
  const keepCharPositions = config.keepCharPositions;
  const suppressGuide = guide === false && previousConformedValue !== void 0;
  const rawValueLength = rawValue.length;
  const previousConformedValueLength = previousConformedValue.length;
  const placeholderLength = placeholder.length;
  const maskLength = mask6.length;
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
  const rawValueArr = rawValue.split(emptyString$3).map((char, i) => ({
    char,
    isNew: i >= indexOfFirstChange && i < indexOfLastChange
  }));
  for (let i = rawValueLength - 1; i >= 0; i--) {
    const {
      char
    } = rawValueArr[i];
    if (char !== placeholderChar$1) {
      const shouldOffset = i >= indexOfFirstChange && previousConformedValueLength === maskLength;
      if (char === placeholder[shouldOffset ? i - editDistance : i]) {
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
          let rawValueChar = "", isNew = false;
          if (shift) {
            rawValueChar = shift.char;
            isNew = shift.isNew;
          }
          if (rawValueChar === placeholderChar$1 && suppressGuide !== true) {
            conformedValue += placeholderChar$1;
            continue placeholderLoop;
          } else if (mask6[i].test(rawValueChar)) {
            if (keepCharPositions !== true || isNew === false || previousConformedValue === emptyString$3 || guide === false || !isAddition) {
              conformedValue += rawValueChar;
            } else {
              const rawValueArrLength = rawValueArr.length;
              let indexOfNextAvailablePlaceholderChar = null;
              for (let i2 = 0; i2 < rawValueArrLength; i2++) {
                const charData = rawValueArr[i2];
                if (charData.char !== placeholderChar$1 && charData.isNew === false) {
                  break;
                }
                if (charData.char === placeholderChar$1) {
                  indexOfNextAvailablePlaceholderChar = i2;
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
    let indexOfLastFilledPlaceholderChar = null;
    for (let i = 0; i < conformedValue.length; i++) {
      if (placeholder[i] === placeholderChar$1) {
        indexOfLastFilledPlaceholderChar = i;
      }
    }
    if (indexOfLastFilledPlaceholderChar !== null) {
      conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
    } else {
      conformedValue = emptyString$3;
    }
  }
  return {
    conformedValue,
    meta: {
      someCharsRejected
    }
  };
}
function convertMaskToPlaceholder$1(mask6 = emptyArray$2, placeholderChar2 = defaultPlaceholderChar) {
  if (!isArray$1(mask6)) {
    throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");
  }
  if (mask6.indexOf(placeholderChar2) !== -1) {
    throw new Error(`Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.

The placeholder character that was received is: ${JSON.stringify(placeholderChar2)}

The mask that was received is: ${JSON.stringify(mask6)}`);
  }
  return mask6.map((char) => char instanceof RegExp ? placeholderChar2 : char).join("");
}
var CPFPipe = class _CPFPipe {
  transform(cpfValue) {
    return maskBr.cpf(cpfValue);
  }
  static ɵfac = function CPFPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CPFPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "cpf",
    type: _CPFPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CPFPipe, [{
    type: Pipe,
    args: [{
      name: "cpf"
    }]
  }], null, null);
})();
var cnpj = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.cnpj(v) ? null : {
    cnpj: true
  };
};
var CNPJ_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CNPJValidator),
  multi: true
};
var CNPJValidator = class _CNPJValidator {
  validate(c) {
    return cnpj(c);
  }
  static ɵfac = function CNPJValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CNPJValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CNPJValidator,
    selectors: [["", "cnpj", "", "formControlName", ""], ["", "cnpj", "", "formControl", ""], ["", "cnpj", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([CNPJ_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CNPJValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[cnpj][formControlName],[cnpj][formControl],[cnpj][ngModel]",
      providers: [CNPJ_VALIDATOR]
    }]
  }], null, null);
})();
var CNPJPipe = class _CNPJPipe {
  transform(cnpjValue) {
    return maskBr.cnpj(cnpjValue);
  }
  static ɵfac = function CNPJPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CNPJPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "cnpj",
    type: _CNPJPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CNPJPipe, [{
    type: Pipe,
    args: [{
      name: "cnpj"
    }]
  }], null, null);
})();
var phoneNumber = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.phoneNumber(v) ? null : {
    phoneNumber: true
  };
};
var PHONENUMBER_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => PhoneNumberValidator),
  multi: true
};
var PhoneNumberValidator = class _PhoneNumberValidator {
  validate(c) {
    return phoneNumber(c);
  }
  static ɵfac = function PhoneNumberValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhoneNumberValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _PhoneNumberValidator,
    selectors: [["", "phoneNumber", "", "formControlName", ""], ["", "phoneNumber", "", "formControl", ""], ["", "phoneNumber", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([PHONENUMBER_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhoneNumberValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[phoneNumber][formControlName],[phoneNumber][formControl],[phoneNumber][ngModel]",
      providers: [PHONENUMBER_VALIDATOR]
    }]
  }], null, null);
})();
var PhoneNumberPipe = class _PhoneNumberPipe {
  transform(phoneNumberValue) {
    return maskBr.phoneNumber(phoneNumberValue);
  }
  static ɵfac = function PhoneNumberPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhoneNumberPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "phoneNumber",
    type: _PhoneNumberPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhoneNumberPipe, [{
    type: Pipe,
    args: [{
      name: "phoneNumber"
    }]
  }], null, null);
})();
var cellphone = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.cellphone(v) ? null : {
    cellphone: true
  };
};
var CELLPHONE_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CellphoneValidator),
  multi: true
};
var CellphoneValidator = class _CellphoneValidator {
  validate(c) {
    return cellphone(c);
  }
  static ɵfac = function CellphoneValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CellphoneValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CellphoneValidator,
    selectors: [["", "cellphone", "", "formControlName", ""], ["", "cellphone", "", "formControl", ""], ["", "cellphone", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([CELLPHONE_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CellphoneValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[cellphone][formControlName],[cellphone][formControl],[cellphone][ngModel]",
      providers: [CELLPHONE_VALIDATOR]
    }]
  }], null, null);
})();
var CellphonePipe = class _CellphonePipe {
  transform(cellphoneValue) {
    return maskBr.cellphone(cellphoneValue);
  }
  static ɵfac = function CellphonePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CellphonePipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "cellphone",
    type: _CellphonePipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CellphonePipe, [{
    type: Pipe,
    args: [{
      name: "cellphone"
    }]
  }], null, null);
})();
var inscricaoestadual = (estado) => {
  return (control) => {
    if (utilsBr.isPresent(Validators.required(control))) {
      return null;
    }
    const v = control.value;
    return validateBr.inscricaoestadual(v, estado) ? null : {
      inscricaoestadual: true
    };
  };
};
var INSCRICAOESTADUAL_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => InscricaoEstadualValidator),
  multi: true
};
var InscricaoEstadualValidator = class _InscricaoEstadualValidator {
  validate(c) {
    return inscricaoestadual("mg")(c);
  }
  static ɵfac = function InscricaoEstadualValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InscricaoEstadualValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _InscricaoEstadualValidator,
    selectors: [["", "inscricaoestadual", "", "formControlName", ""], ["", "inscricaoestadual", "", "formControl", ""], ["", "inscricaoestadual", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([INSCRICAOESTADUAL_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InscricaoEstadualValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[inscricaoestadual][formControlName],[inscricaoestadual][formControl],[inscricaoestadual][ngModel]",
      providers: [INSCRICAOESTADUAL_VALIDATOR]
    }]
  }], null, null);
})();
var InscricaoEstadualPipe = class _InscricaoEstadualPipe {
  transform(inscricaoestadualValue, estado) {
    return maskBr.inscricaoestadual(inscricaoestadualValue, estado);
  }
  static ɵfac = function InscricaoEstadualPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InscricaoEstadualPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "inscricaoestadual",
    type: _InscricaoEstadualPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InscricaoEstadualPipe, [{
    type: Pipe,
    args: [{
      name: "inscricaoestadual"
    }]
  }], null, null);
})();
var cep = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.cep(v) ? null : {
    cep: true
  };
};
var CEP_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CEPValidator),
  multi: true
};
var CEPValidator = class _CEPValidator {
  validate(c) {
    return cep(c);
  }
  static ɵfac = function CEPValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CEPValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CEPValidator,
    selectors: [["", "cep", "", "formControlName", ""], ["", "cep", "", "formControl", ""], ["", "cep", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([CEP_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CEPValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[cep][formControlName],[cep][formControl],[cep][ngModel]",
      providers: [CEP_VALIDATOR]
    }]
  }], null, null);
})();
var CEPPipe = class _CEPPipe {
  transform(cepValue) {
    return maskBr.cep(cepValue);
  }
  static ɵfac = function CEPPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CEPPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "cep",
    type: _CEPPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CEPPipe, [{
    type: Pipe,
    args: [{
      name: "cep"
    }]
  }], null, null);
})();
var currency = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.currency(v) ? null : {
    currency: true
  };
};
var CURRENCY_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => CURRENCYValidator),
  multi: true
};
var CURRENCYValidator = class _CURRENCYValidator {
  validate(c) {
    return currency(c);
  }
  static ɵfac = function CURRENCYValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CURRENCYValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CURRENCYValidator,
    selectors: [["", "currency", "", "formControlName", ""], ["", "currency", "", "formControl", ""], ["", "currency", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([CURRENCY_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CURRENCYValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[currency][formControlName],[currency][formControl],[currency][ngModel]",
      providers: [CURRENCY_VALIDATOR]
    }]
  }], null, null);
})();
var CURRENCYPipe = class _CURRENCYPipe {
  transform(currencyValue, decimalValue = 2) {
    return maskBr.currency(currencyValue, decimalValue);
  }
  static ɵfac = function CURRENCYPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CURRENCYPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "currencyBrazil",
    type: _CURRENCYPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CURRENCYPipe, [{
    type: Pipe,
    args: [{
      name: "currencyBrazil"
    }]
  }], null, null);
})();
var number = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.number(v) ? null : {
    number: true
  };
};
var NUMBER_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => NUMBERValidator),
  multi: true
};
var NUMBERValidator = class _NUMBERValidator {
  validate(c) {
    return number(c);
  }
  static ɵfac = function NUMBERValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NUMBERValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NUMBERValidator,
    selectors: [["", "number", "", "formControlName", ""], ["", "number", "", "formControl", ""], ["", "number", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([NUMBER_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NUMBERValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[number][formControlName],[number][formControl],[number][ngModel]",
      providers: [NUMBER_VALIDATOR]
    }]
  }], null, null);
})();
var NUMBERPipe = class _NUMBERPipe {
  transform(numberValue, decimalValue = 2) {
    return maskBr.number(numberValue, decimalValue);
  }
  static ɵfac = function NUMBERPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NUMBERPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "numberBrazil",
    type: _NUMBERPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NUMBERPipe, [{
    type: Pipe,
    args: [{
      name: "numberBrazil"
    }]
  }], null, null);
})();
var licensePlate = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.licensePlate(v) ? null : {
    licensePlate: true
  };
};
var LICENSEPLATE_VALIDATOR = {
  provide: NG_VALIDATORS,
  /* tslint:disable: no-use-before-declare */
  useExisting: forwardRef(() => LICENSEPLATEValidator),
  multi: true
};
var LICENSEPLATEValidator = class _LICENSEPLATEValidator {
  validate(c) {
    return licensePlate(c);
  }
  static ɵfac = function LICENSEPLATEValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LICENSEPLATEValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _LICENSEPLATEValidator,
    selectors: [["", "license-plate", "", "formControlName", ""], ["", "license-plate", "", "formControl", ""], ["", "license-plate", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([LICENSEPLATE_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LICENSEPLATEValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[license-plate][formControlName],[license-plate][formControl],[license-plate][ngModel]",
      providers: [LICENSEPLATE_VALIDATOR]
    }]
  }], null, null);
})();
var LICENSEPLATEPipe = class _LICENSEPLATEPipe {
  transform(licensePlateValue) {
    return maskBr.licensePlate(licensePlateValue).toUpperCase();
  }
  static ɵfac = function LICENSEPLATEPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LICENSEPLATEPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "licensePlate",
    type: _LICENSEPLATEPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LICENSEPLATEPipe, [{
    type: Pipe,
    args: [{
      name: "licensePlate"
    }]
  }], null, null);
})();
var percentage = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.porcentagem(v) ? null : {
    percentage: true
  };
};
var PERCENTAGE_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => PERCENTAGEValidator),
  multi: true
};
var PERCENTAGEValidator = class _PERCENTAGEValidator {
  validate(c) {
    return percentage(c);
  }
  static ɵfac = function PERCENTAGEValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PERCENTAGEValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _PERCENTAGEValidator,
    selectors: [["", "percentage", "", "formControlName", ""], ["", "percentage", "", "formControl", ""], ["", "percentage", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([PERCENTAGE_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PERCENTAGEValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[percentage][formControlName],[percentage][formControl],[percentage][ngModel]",
      providers: [PERCENTAGE_VALIDATOR]
    }]
  }], null, null);
})();
var PERCENTAGEPipe = class _PERCENTAGEPipe {
  transform(percentageValue, decimalValue) {
    return maskBr.porcentagem(percentageValue, decimalValue);
  }
  static ɵfac = function PERCENTAGEPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PERCENTAGEPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "percentage",
    type: _PERCENTAGEPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PERCENTAGEPipe, [{
    type: Pipe,
    args: [{
      name: "percentage"
    }]
  }], null, null);
})();
var renavam = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.renavam(v) ? null : {
    renavam: true
  };
};
var RENAVAM_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => RenavamValidator),
  multi: true
};
var RenavamValidator = class _RenavamValidator {
  validate(c) {
    return renavam(c);
  }
  static ɵfac = function RenavamValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RenavamValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _RenavamValidator,
    selectors: [["", "renavam", "", "formControlName", ""], ["", "renavam", "", "formControl", ""], ["", "renavam", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([RENAVAM_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RenavamValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[renavam][formControlName],[renavam][formControl],[renavam][ngModel]",
      providers: [RENAVAM_VALIDATOR]
    }]
  }], null, null);
})();
var RenavamPipe = class _RenavamPipe {
  transform(renavamValue) {
    return maskBr.renavam(renavamValue);
  }
  static ɵfac = function RenavamPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RenavamPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "renavam",
    type: _RenavamPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RenavamPipe, [{
    type: Pipe,
    args: [{
      name: "renavam"
    }]
  }], null, null);
})();
var pispasep = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.pispasep(v) ? null : {
    pispasep: true
  };
};
var PISPASE_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => PispasepValidator),
  multi: true
};
var PispasepValidator = class _PispasepValidator {
  validate(c) {
    return pispasep(c);
  }
  static ɵfac = function PispasepValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PispasepValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _PispasepValidator,
    selectors: [["", "pispasep", "", "formControlName", ""], ["", "pispasep", "", "formControl", ""], ["", "pispasep", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([PISPASE_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PispasepValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[pispasep][formControlName],[pispasep][formControl],[pispasep][ngModel]",
      providers: [PISPASE_VALIDATOR]
    }]
  }], null, null);
})();
var PispasepPipe = class _PispasepPipe {
  transform(pispasepValue) {
    return maskBr.pispasep(pispasepValue);
  }
  static ɵfac = function PispasepPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PispasepPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "pispasep",
    type: _PispasepPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PispasepPipe, [{
    type: Pipe,
    args: [{
      name: "pispasep"
    }]
  }], null, null);
})();
var rg = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.rg(v) ? null : {
    rg: true
  };
};
var RG_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => RGValidator),
  multi: true
};
var RGValidator = class _RGValidator {
  validate(c) {
    return rg(c);
  }
  static ɵfac = function RGValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RGValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _RGValidator,
    selectors: [["", "rg", "", "formControlName", ""], ["", "rg", "", "formControl", ""], ["", "rg", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([RG_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RGValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[rg][formControlName],[rg][formControl],[rg][ngModel]",
      providers: [RG_VALIDATOR]
    }]
  }], null, null);
})();
var RGPipe = class _RGPipe {
  transform(rgValue) {
    return maskBr.rg(rgValue);
  }
  static ɵfac = function RGPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RGPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "rg",
    type: _RGPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RGPipe, [{
    type: Pipe,
    args: [{
      name: "rg"
    }]
  }], null, null);
})();
var time = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  return validateBr.time(v) ? null : {
    time: true
  };
};
var TIME_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => TIMEValidator),
  multi: true
};
var TIMEValidator = class _TIMEValidator {
  validate(c) {
    return time(c);
  }
  static ɵfac = function TIMEValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TIMEValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _TIMEValidator,
    selectors: [["", "time", "", "formControlName", ""], ["", "time", "", "formControl", ""], ["", "time", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([TIME_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TIMEValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[time][formControlName],[time][formControl],[time][ngModel]",
      providers: [TIME_VALIDATOR]
    }]
  }], null, null);
})();
var TIMEPipe = class _TIMEPipe {
  transform(timeValue) {
    return maskBr.time(timeValue);
  }
  static ɵfac = function TIMEPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TIMEPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "time",
    type: _TIMEPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TIMEPipe, [{
    type: Pipe,
    args: [{
      name: "time"
    }]
  }], null, null);
})();
var titulo = (control) => {
  if (utilsBr.isPresent(Validators.required(control))) return null;
  const v = control.value;
  return validateBr.titulo(v) ? null : {
    titulo: true
  };
};
var TITULO_VALIDATOR = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => TITULOValidator),
  multi: true
};
var TITULOValidator = class _TITULOValidator {
  validate(c) {
    return titulo(c);
  }
  static ɵfac = function TITULOValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TITULOValidator)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _TITULOValidator,
    selectors: [["", "titulo", "", "formControlName", ""], ["", "titulo", "", "formControl", ""], ["", "titulo", "", "ngModel", ""]],
    features: [ɵɵProvidersFeature([TITULO_VALIDATOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TITULOValidator, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line:directive-selector
      selector: "[titulo][formControlName],[titulo][formControl],[titulo][ngModel]",
      providers: [TITULO_VALIDATOR]
    }]
  }], null, null);
})();
var TITULOPipe = class _TITULOPipe {
  transform(tituloValue) {
    return maskBr.titulo(tituloValue);
  }
  static ɵfac = function TITULOPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TITULOPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "titulo",
    type: _TITULOPipe,
    pure: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TITULOPipe, [{
    type: Pipe,
    args: [{
      name: "titulo"
    }]
  }], null, null);
})();
var placeholderChar = "_";
var strFunction = "function";
var emptyArray$1 = [];
function convertMaskToPlaceholder(mask6 = emptyArray$1, localPlaceholderChar = placeholderChar) {
  if (!isArray(mask6)) {
    throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");
  }
  if (mask6.indexOf(localPlaceholderChar) !== -1) {
    throw new Error(`Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.

The placeholder character that was received is: ${JSON.stringify(localPlaceholderChar)}

The mask that was received is: ${JSON.stringify(mask6)}`);
  }
  return mask6.map((char) => {
    return char instanceof RegExp ? localPlaceholderChar : char;
  }).join("");
}
function isArray(value) {
  return Array.isArray && Array.isArray(value) || value instanceof Array;
}
function isString(value) {
  return typeof value === "string" || value instanceof String;
}
function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
var strCaretTrap = "[]";
function processCaretTraps(mask6) {
  const indexes = [];
  let indexOfCaretTrap;
  while (indexOfCaretTrap = mask6.indexOf(strCaretTrap), indexOfCaretTrap !== -1) {
    indexes.push(indexOfCaretTrap);
    mask6.splice(indexOfCaretTrap, 1);
  }
  return {
    maskWithoutCaretTraps: mask6,
    indexes
  };
}
var emptyArray = [];
var emptyString$2 = "";
function conformToMask$1(rawValue = emptyString$2, mask6 = emptyArray, config = {}) {
  if (!isArray(mask6)) {
    if (typeof mask6 === strFunction) {
      mask6 = mask6(rawValue, config);
      mask6 = processCaretTraps(mask6).maskWithoutCaretTraps;
    } else {
      throw new Error("Text-mask:conformToMask; The mask property must be an array.");
    }
  }
  const {
    guide = true,
    previousConformedValue = emptyString$2,
    placeholderChar: placeholderChar$12 = placeholderChar,
    placeholder = convertMaskToPlaceholder(mask6, placeholderChar$12),
    currentCaretPosition,
    keepCharPositions
  } = config;
  const suppressGuide = guide === false && previousConformedValue !== void 0;
  const rawValueLength = rawValue.length;
  const previousConformedValueLength = previousConformedValue.length;
  const placeholderLength = placeholder.length;
  const maskLength = mask6.length;
  const editDistance = rawValueLength - previousConformedValueLength;
  const isAddition = editDistance > 0;
  const indexOfFirstChange = currentCaretPosition + (isAddition ? -editDistance : 0);
  const indexOfLastChange = indexOfFirstChange + Math.abs(editDistance);
  if (keepCharPositions === true && !isAddition) {
    let compensatingPlaceholderChars = emptyString$2;
    for (let i = indexOfFirstChange; i < indexOfLastChange; i++) {
      if (placeholder[i] === placeholderChar$12) {
        compensatingPlaceholderChars += placeholderChar$12;
      }
    }
    rawValue = rawValue.slice(0, indexOfFirstChange) + compensatingPlaceholderChars + rawValue.slice(indexOfFirstChange, rawValueLength);
  }
  const rawValueArr = rawValue.split(emptyString$2).map((char, i) => ({
    char,
    isNew: i >= indexOfFirstChange && i < indexOfLastChange
  }));
  for (let i = rawValueLength - 1; i >= 0; i--) {
    const {
      char
    } = rawValueArr[i];
    if (char !== placeholderChar$12) {
      const shouldOffset = i >= indexOfFirstChange && previousConformedValueLength === maskLength;
      if (char === placeholder[shouldOffset ? i - editDistance : i]) {
        rawValueArr.splice(i, 1);
      }
    }
  }
  let conformedValue = emptyString$2;
  let someCharsRejected = false;
  placeholderLoop: for (let i = 0; i < placeholderLength; i++) {
    const charInPlaceholder = placeholder[i];
    if (charInPlaceholder === placeholderChar$12) {
      if (rawValueArr.length > 0) {
        while (rawValueArr.length > 0) {
          const {
            char: rawValueChar,
            isNew
          } = rawValueArr.shift();
          if (rawValueChar === placeholderChar$12 && suppressGuide !== true) {
            conformedValue += placeholderChar$12;
            continue placeholderLoop;
          } else if (mask6[i].test(rawValueChar)) {
            if (keepCharPositions !== true || isNew === false || previousConformedValue === emptyString$2 || guide === false || !isAddition) {
              conformedValue += rawValueChar;
            } else {
              const rawValueArrLength = rawValueArr.length;
              let indexOfNextAvailablePlaceholderChar = -1;
              for (let i2 = 0; i2 < rawValueArrLength; i2++) {
                const charData = rawValueArr[i2];
                if (charData.char !== placeholderChar$12 && charData.isNew === false) {
                  break;
                }
                if (charData.char === placeholderChar$12) {
                  indexOfNextAvailablePlaceholderChar = i2;
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
    let indexOfLastFilledPlaceholderChar = -1;
    for (let i = 0; i < conformedValue.length; i++) {
      if (placeholder[i] === placeholderChar$12) {
        indexOfLastFilledPlaceholderChar = i;
      }
    }
    if (indexOfLastFilledPlaceholderChar !== null) {
      conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
    } else {
      conformedValue = emptyString$2;
    }
  }
  return {
    conformedValue,
    meta: {
      someCharsRejected
    }
  };
}
var defaultArray = [];
var emptyString$1 = "";
function adjustCaretPosition({
  previousConformedValue = emptyString$1,
  previousPlaceholder = emptyString$1,
  currentCaretPosition = 0,
  conformedValue,
  rawValue,
  placeholderChar: placeholderChar2,
  placeholder,
  indexesOfPipedChars = defaultArray,
  caretTrapIndexes = defaultArray
}) {
  if (currentCaretPosition === 0 || !rawValue.length) {
    return 0;
  }
  const rawValueLength = rawValue.length;
  const previousConformedValueLength = previousConformedValue.length;
  const placeholderLength = placeholder.length;
  const conformedValueLength = conformedValue.length;
  const editLength = rawValueLength - previousConformedValueLength;
  const isAddition = editLength > 0;
  const isFirstRawValue = previousConformedValueLength === 0;
  const isPartialMultiCharEdit = editLength > 1 && !isAddition && !isFirstRawValue;
  if (isPartialMultiCharEdit) {
    return currentCaretPosition;
  }
  const possiblyHasRejectedChar = isAddition && (previousConformedValue === conformedValue || conformedValue === placeholder);
  let startingSearchIndex = 0;
  let trackRightCharacter;
  let targetChar;
  if (possiblyHasRejectedChar) {
    startingSearchIndex = currentCaretPosition - editLength;
  } else {
    const normalizedConformedValue = conformedValue.toLowerCase();
    const normalizedRawValue = rawValue.toLowerCase();
    const leftHalfChars = normalizedRawValue.substr(0, currentCaretPosition).split(emptyString$1);
    const intersection = leftHalfChars.filter((char) => normalizedConformedValue.indexOf(char) !== -1);
    targetChar = intersection[intersection.length - 1];
    const previousLeftMaskChars = previousPlaceholder.substr(0, intersection.length).split(emptyString$1).filter((char) => char !== placeholderChar2).length;
    const leftMaskChars = placeholder.substr(0, intersection.length).split(emptyString$1).filter((char) => char !== placeholderChar2).length;
    const masklengthChanged = leftMaskChars !== previousLeftMaskChars;
    const targetIsMaskMovingLeft = previousPlaceholder[intersection.length - 1] !== void 0 && placeholder[intersection.length - 2] !== void 0 && previousPlaceholder[intersection.length - 1] !== placeholderChar2 && previousPlaceholder[intersection.length - 1] !== placeholder[intersection.length - 1] && previousPlaceholder[intersection.length - 1] === placeholder[intersection.length - 2];
    if (!isAddition && (masklengthChanged || targetIsMaskMovingLeft) && previousLeftMaskChars > 0 && placeholder.indexOf(targetChar) > -1 && rawValue[currentCaretPosition] !== void 0) {
      trackRightCharacter = true;
      targetChar = rawValue[currentCaretPosition];
    }
    const pipedChars = indexesOfPipedChars.map((index) => normalizedConformedValue[index]);
    const countTargetCharInPipedChars = pipedChars.filter((char) => char === targetChar).length;
    const countTargetCharInIntersection = intersection.filter((char) => char === targetChar).length;
    const countTargetCharInPlaceholder = placeholder.substr(0, placeholder.indexOf(placeholderChar2)).split(emptyString$1).filter((char, index) => (
      // Check if `char` is the same as our `targetChar`, so we account for it
      char === targetChar && // but also make sure that both the `rawValue` and placeholder don't have the same character at the same
      // index because if they are equal, that means we are already counting those characters in
      // `countTargetCharInIntersection`
      rawValue[index] !== char
    )).length;
    const requiredNumberOfMatches = countTargetCharInPlaceholder + countTargetCharInIntersection + countTargetCharInPipedChars + // The character to the right of the caret isn't included in `intersection`
    // so add one if we are tracking the character to the right
    (trackRightCharacter ? 1 : 0);
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
  if (isAddition) {
    let lastPlaceholderChar = startingSearchIndex;
    for (let i = startingSearchIndex; i <= placeholderLength; i++) {
      if (placeholder[i] === placeholderChar2) {
        lastPlaceholderChar = i;
      }
      if (
        // If we're adding, we can position the caret at the next placeholder character.
        placeholder[i] === placeholderChar2 || // If a caret trap was set by a mask function, we need to stop at the trap.
        caretTrapIndexes.indexOf(i) !== -1 || // This is the end of the placeholder. We cannot move any further. Let's put the caret there.
        i === placeholderLength
      ) {
        return lastPlaceholderChar;
      }
    }
  } else {
    if (trackRightCharacter) {
      for (let i = startingSearchIndex - 1; i >= 0; i--) {
        if (
          // `targetChar` should be in `conformedValue`, since it was in `rawValue`, just
          // to the right of the caret
          conformedValue[i] === targetChar || // If a caret trap was set by a mask function, we need to stop at the trap.
          caretTrapIndexes.indexOf(i) !== -1 || // This is the beginning of the placeholder. We cannot move any further.
          // Let's put the caret there.
          i === 0
        ) {
          return i;
        }
      }
    } else {
      for (let i = startingSearchIndex; i >= 0; i--) {
        if (
          // If we're deleting, we can position the caret right before the placeholder character
          placeholder[i - 1] === placeholderChar2 || // If a caret trap was set by a mask function, we need to stop at the trap.
          caretTrapIndexes.indexOf(i) !== -1 || // This is the beginning of the placeholder. We cannot move any further.
          // Let's put the caret there.
          i === 0
        ) {
          return i;
        }
      }
    }
  }
  return 0;
}
var emptyString = "";
var strNone = "none";
var strObject = "object";
var isAndroid = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
var defer = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;
function createTextMaskInputElement(config) {
  const state = {
    previousConformedValue: void 0,
    previousPlaceholder: void 0
  };
  return {
    state,
    // `update` is called by framework components whenever they want to update the `value` of the input element.
    // The caller can send a `rawValue` to be conformed and set on the input element. However, the default use-case
    // is for this to be read from the `inputElement` directly.
    update(rawValue, {
      inputElement,
      mask: providedMask,
      guide,
      pipe,
      placeholderChar: placeholderChar$12 = placeholderChar,
      keepCharPositions = false,
      showMask = false
    } = config) {
      if (typeof rawValue === "undefined") {
        rawValue = inputElement.value;
      }
      if (rawValue === state.previousConformedValue) {
        return;
      }
      if (typeof providedMask === strObject && providedMask.pipe !== void 0 && providedMask.mask !== void 0) {
        pipe = providedMask.pipe;
        providedMask = providedMask.mask;
      }
      let placeholder;
      let mask6;
      if (providedMask instanceof Array) {
        placeholder = convertMaskToPlaceholder(providedMask, placeholderChar$12);
      }
      if (providedMask === false) {
        return;
      }
      const safeRawValue = getSafeRawValue(rawValue);
      const {
        selectionEnd: currentCaretPosition
      } = inputElement;
      const {
        previousConformedValue,
        previousPlaceholder
      } = state;
      let caretTrapIndexes;
      if (typeof providedMask === strFunction) {
        mask6 = providedMask(safeRawValue, {
          currentCaretPosition,
          previousConformedValue,
          placeholderChar: placeholderChar$12
        });
        if (mask6 === false) {
          return;
        }
        const {
          maskWithoutCaretTraps,
          indexes
        } = processCaretTraps(mask6);
        mask6 = maskWithoutCaretTraps;
        caretTrapIndexes = indexes;
        placeholder = convertMaskToPlaceholder(mask6, placeholderChar$12);
      } else {
        mask6 = providedMask;
      }
      const conformToMaskConfig = {
        previousConformedValue,
        guide,
        placeholderChar: placeholderChar$12,
        pipe,
        placeholder,
        currentCaretPosition,
        keepCharPositions
      };
      const {
        conformedValue
      } = conformToMask$1(safeRawValue, mask6, conformToMaskConfig);
      const piped = typeof pipe === strFunction;
      let pipeResults = {};
      if (piped) {
        pipeResults = pipe(conformedValue, __spreadValues({
          rawValue: safeRawValue
        }, conformToMaskConfig));
        if (pipeResults === false) {
          pipeResults = {
            value: previousConformedValue,
            rejected: true
          };
        } else if (isString(pipeResults)) {
          pipeResults = {
            value: pipeResults
          };
        }
      }
      const finalConformedValue = piped ? pipeResults.value : conformedValue;
      const adjustedCaretPosition = adjustCaretPosition({
        previousConformedValue,
        previousPlaceholder,
        conformedValue: finalConformedValue,
        placeholder,
        rawValue: safeRawValue,
        currentCaretPosition,
        placeholderChar: placeholderChar$12,
        indexesOfPipedChars: pipeResults.indexesOfPipedChars,
        caretTrapIndexes
      });
      const inputValueShouldBeEmpty = finalConformedValue === placeholder && adjustedCaretPosition === 0;
      const emptyValue = showMask ? placeholder : emptyString;
      const inputElementValue = inputValueShouldBeEmpty ? emptyValue : finalConformedValue;
      state.previousConformedValue = inputElementValue;
      state.previousPlaceholder = placeholder;
      if (inputElement.value === inputElementValue) {
        return;
      }
      inputElement.value = inputElementValue;
      safeSetSelection(inputElement, adjustedCaretPosition);
    }
  };
}
function safeSetSelection(element, selectionPosition) {
  if (document.activeElement === element) {
    if (isAndroid) {
      defer(() => element.setSelectionRange(selectionPosition, selectionPosition, strNone));
    } else {
      element.setSelectionRange(selectionPosition, selectionPosition, strNone);
    }
  }
}
function getSafeRawValue(inputValue) {
  if (isString(inputValue)) {
    return inputValue.toString();
  } else if (isNumber(inputValue)) {
    return String(inputValue);
  } else if (inputValue === void 0 || inputValue === null) {
    return emptyString;
  } else {
    throw new Error(`The 'value' provided to Text Mask needs to be a string or a number. The value received was:

 ${JSON.stringify(inputValue)}`);
  }
}
var MASKEDINPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable: no-use-before-declare */
  useExisting: forwardRef(() => MaskedInputDirective),
  multi: true
};
function _isAndroid() {
  const userAgent = getDOM() ? getDOM().getUserAgent() : "";
  return /android (\d+)/.test(userAgent.toLowerCase());
}
var MaskedInputDirective = class _MaskedInputDirective {
  _elementRef;
  _compositionMode;
  textMaskConfig = {
    mask: [],
    guide: true,
    placeholderChar: "_",
    pipe: void 0,
    keepCharPositions: false
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
  onChange = (_) => {
  };
  onTouched = () => {
  };
  ngOnChanges(changes) {
    this._setupMask(true);
    if (this.textMaskInputElement !== void 0) {
      this.textMaskInputElement.update(this.inputElement.value);
    }
  }
  writeValue(value) {
    this._setupMask();
    const normalizedValue = value == null ? "" : value;
    this._renderer.setProperty(this.inputElement, "value", normalizedValue);
    if (this.textMaskInputElement !== void 0) {
      this.textMaskInputElement.update(value);
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._renderer.setProperty(this._elementRef.nativeElement, "disabled", isDisabled);
  }
  _handleInput(value) {
    if (!this._compositionMode || this._compositionMode && !this._composing) {
      this._setupMask();
      if (this.textMaskInputElement !== void 0) {
        this.textMaskInputElement.update(value);
        value = this.inputElement.value;
        this.onChange(value);
      }
    }
  }
  _setupMask(create = false) {
    if (!this.inputElement) {
      if (this._elementRef.nativeElement.tagName.toUpperCase() === "INPUT") {
        this.inputElement = this._elementRef.nativeElement;
      } else {
        this.inputElement = this._elementRef.nativeElement.getElementsByTagName("INPUT")[0];
      }
    }
    if (this.inputElement && create) {
      this.textMaskInputElement = createTextMaskInputElement(Object.assign({
        inputElement: this.inputElement
      }, this.textMaskConfig));
    }
  }
  _compositionStart() {
    this._composing = true;
  }
  _compositionEnd(value) {
    this._composing = false;
    if (this._compositionMode) {
      this._handleInput(value);
    }
  }
  static ɵfac = function MaskedInputDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MaskedInputDirective)(ɵɵdirectiveInject(RendererFactory2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(COMPOSITION_BUFFER_MODE, 8));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MaskedInputDirective,
    selectors: [["", "textMask", ""]],
    hostBindings: function MaskedInputDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("input", function MaskedInputDirective_input_HostBindingHandler($event) {
          return ctx._handleInput($event.target.value);
        })("blur", function MaskedInputDirective_blur_HostBindingHandler() {
          return ctx.onTouched();
        })("compositionstart", function MaskedInputDirective_compositionstart_HostBindingHandler() {
          return ctx._compositionStart();
        })("compositionend", function MaskedInputDirective_compositionend_HostBindingHandler($event) {
          return ctx._compositionEnd($event.target.value);
        });
      }
    },
    inputs: {
      textMaskConfig: [0, "textMask", "textMaskConfig"]
    },
    exportAs: ["textMask"],
    features: [ɵɵProvidersFeature([MASKEDINPUT_VALUE_ACCESSOR]), ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaskedInputDirective, [{
    type: Directive,
    args: [{
      host: {
        "(input)": "_handleInput($event.target.value)",
        "(blur)": "onTouched()",
        "(compositionstart)": "_compositionStart()",
        "(compositionend)": "_compositionEnd($event.target.value)"
      },
      /* tslint:disable: directive-selector */
      selector: "[textMask]",
      exportAs: "textMask",
      providers: [MASKEDINPUT_VALUE_ACCESSOR]
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [COMPOSITION_BUFFER_MODE]
    }]
  }], {
    textMaskConfig: [{
      type: Input,
      args: ["textMask"]
    }]
  });
})();
var NgxBrazilValidators = {
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
var NgxBrazilMASKS = MASKS;
var NgxBrazilMASKSIE = MASKSIE;
var NgxBrazilCustomDirectives = [CellphoneValidator, CellphonePipe, CEPValidator, CEPPipe, CNPJValidator, CNPJPipe, CPFValidator, CPFPipe, CURRENCYValidator, CURRENCYPipe, InscricaoEstadualValidator, InscricaoEstadualPipe, NUMBERValidator, NUMBERPipe, PERCENTAGEValidator, PERCENTAGEPipe, PispasepValidator, PispasepPipe, LICENSEPLATEValidator, LICENSEPLATEPipe, RGValidator, RGPipe, RenavamValidator, RenavamPipe, PhoneNumberValidator, PhoneNumberPipe, TIMEValidator, TIMEPipe, TITULOValidator, TITULOPipe, MaskedInputDirective];
var NgxBrazilDirectives = {
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
var NgxBrazil = class _NgxBrazil {
  static forRoot() {
    return {
      ngModule: _NgxBrazil
    };
  }
  static ɵfac = function NgxBrazil_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgxBrazil)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NgxBrazil,
    imports: [CellphoneValidator, CellphonePipe, CEPValidator, CEPPipe, CNPJValidator, CNPJPipe, CPFValidator, CPFPipe, CURRENCYValidator, CURRENCYPipe, InscricaoEstadualValidator, InscricaoEstadualPipe, NUMBERValidator, NUMBERPipe, PERCENTAGEValidator, PERCENTAGEPipe, PispasepValidator, PispasepPipe, LICENSEPLATEValidator, LICENSEPLATEPipe, RGValidator, RGPipe, RenavamValidator, RenavamPipe, PhoneNumberValidator, PhoneNumberPipe, TIMEValidator, TIMEPipe, TITULOValidator, TITULOPipe, MaskedInputDirective],
    exports: [CellphoneValidator, CellphonePipe, CEPValidator, CEPPipe, CNPJValidator, CNPJPipe, CPFValidator, CPFPipe, CURRENCYValidator, CURRENCYPipe, InscricaoEstadualValidator, InscricaoEstadualPipe, NUMBERValidator, NUMBERPipe, PERCENTAGEValidator, PERCENTAGEPipe, PispasepValidator, PispasepPipe, LICENSEPLATEValidator, LICENSEPLATEPipe, RGValidator, RGPipe, RenavamValidator, RenavamPipe, PhoneNumberValidator, PhoneNumberPipe, TIMEValidator, TIMEPipe, TITULOValidator, TITULOPipe, MaskedInputDirective]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxBrazil, [{
    type: NgModule,
    args: [{
      declarations: [],
      imports: [NgxBrazilCustomDirectives],
      exports: [NgxBrazilCustomDirectives]
    }]
  }], null, null);
})();
export {
  CEPPipe,
  CEPValidator,
  CNPJPipe,
  CNPJValidator,
  CPFPipe,
  CPFValidator,
  CURRENCYPipe,
  CURRENCYValidator,
  CellphonePipe,
  CellphoneValidator,
  InscricaoEstadualPipe,
  InscricaoEstadualValidator,
  LICENSEPLATEPipe,
  LICENSEPLATEValidator,
  MaskedInputDirective,
  NUMBERPipe,
  NUMBERValidator,
  NgxBrazil,
  NgxBrazilCustomDirectives,
  NgxBrazilDirectives,
  NgxBrazilMASKS,
  NgxBrazilMASKSIE,
  NgxBrazilValidators,
  PERCENTAGEPipe,
  PERCENTAGEValidator,
  PhoneNumberPipe,
  PhoneNumberValidator,
  PispasepPipe,
  PispasepValidator,
  RGPipe,
  RGValidator,
  RenavamPipe,
  RenavamValidator,
  TIMEPipe,
  TIMEValidator,
  TITULOPipe,
  TITULOValidator,
  cellphone,
  cep,
  cnpj,
  cpf,
  currency,
  inscricaoestadual,
  licensePlate,
  number,
  percentage,
  phoneNumber,
  pispasep,
  renavam,
  rg,
  time,
  titulo
};
//# sourceMappingURL=ngx-brazil.js.map
