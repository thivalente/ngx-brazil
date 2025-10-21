import { NgxBrazilMASKS } from "ngx-brazil";
import { createAih, createCertidao, createCnh, createCnhEspelho, createCnpj, createCns, createCpf, createEct, createRenachEstadual, createRenachSeguranca, createTitulo } from "./create";
import { BigObject } from "../interfaces";
import { fakerIptu } from "./iptu";
import { getAllDigits, makeGenericFaker, randArray, randomStateAcronym, randomNumber, slugify } from "../utils";
import { validateBr } from "../validate";
import { LOCALIZACAO_BAIRROS, LOCALIZACAO_CIDADES, LOCALIZACAO_COMPLEMENTOS, LOCALIZACAO_RUAS } from "./cidades";
import { CEP_BY_STATE, MALE_NAMES, LASTNAMES, PHONENUMBER_BY_STATE } from "./pessoas";
import { VEICULOS, VEICULOS_CATEGORIAS, VEICULOS_COMBUSTIVEIS, VEICULOS_ESPECIES, VEICULOS_TIPOS } from "./veiculos";

const MASKS: any = NgxBrazilMASKS;

export function aih(uf = 35, ano = 19, tipo = 1, seq: number | null = null) {
    if (!seq) {
        seq = randomNumber(1000000, 9999999);
    }
    const cod = parseInt(`${uf}${ano}${tipo}${seq}`);
    const digito = createAih(cod);
    return `${cod}${digito}`;
}

export function cellphone(options: any = {}) {
    return phoneNumber({ ...options, cellphone: true });
}

export function cep(options: any = {}) {
    if (!options.estado) {
        options.estado = randomStateAcronym();
    }
    const range = CEP_BY_STATE[options.estado];
    const cepNumber = randomNumber(range[0][0], range[0][1]);
    let cep = cepNumber.toString().padStart(8, '0');
    return `${cep.slice(0, 5)}-${cep.slice(5)}`;
}

export function certidao() {
    let value = makeGenericFaker(MASKS['certidao'])();
    let certidao = getAllDigits(value);
    let check = createCertidao(certidao);
    return certidao.substr(0, certidao.length - 2) + check;
}

export function chassi() {
    let chassi = makeGenericFaker(MASKS['chassi'])();
    chassi = chassi.replace(/i|I|o|O|q|Q/g, 'A');
    return chassi;
}

export function cnh() {
    let cnhFake = makeGenericFaker(MASKS.cnh)();
    const check = createCnh(cnhFake);
    return `${cnhFake.slice(0, -2)}${check}`;
}

export function cnhespelho() {
    let cnhespelho = makeGenericFaker(MASKS.cnhespelho)();
    const check = createCnhEspelho(cnhespelho);
    return `${cnhespelho.slice(0, -1)}${check}`;
}

export function renachseguranca() {
    let renachseguranca = makeGenericFaker(MASKS.renachseguranca)();
    const check = createRenachSeguranca(renachseguranca);
    return `${renachseguranca.slice(0, -1)}${check}`;
}

export function renachestadual() {
    let renachestadual = makeGenericFaker(MASKS.renachestadual)();
    renachestadual = randomStateAcronym() + renachestadual.slice(2);
    const check = createRenachEstadual(renachestadual);
    return `${renachestadual.slice(0, -1)}${check}`;
}

export function cnpj() {
    let cnpjFake = makeGenericFaker(MASKS.cnpj)();
    const restos: number[] = createCnpj(cnpjFake) || [0, 1];
    cnpjFake = `${cnpjFake.slice(0, -2)}${restos[0]}${restos[1]}`;
    return cnpjFake;
}

export function cpf() {
    let cpfFake = makeGenericFaker(MASKS.cpf)();
    const restos = createCpf(cpfFake);
    cpfFake = `${cpfFake.slice(0, -2)}${restos[0]}${restos[1]}`;
    return cpfFake;
}

export function cns() {
    let cns;
    do {
        cns = makeGenericFaker(MASKS.cns)();
        cns = getAllDigits(cns);
        const primeiroDigito = parseInt(cns[0]);
        if (primeiroDigito < 3) {
            const cnsDigits = cns.split('');
            cnsDigits[cnsDigits.length - 2] = '0';
            cnsDigits[cnsDigits.length - 3] = '0';
            cnsDigits[cnsDigits.length - 4] = '0';
            cns = cnsDigits.join('');
        }
        const digito = createCns(cns);
        cns = `${cns.slice(0, -2)}${digito}`;
    } while (!validateBr['cns'](cns));
    return cns;
}

export function contabanco() {
    return makeGenericFaker(MASKS.contabanco)();
}

export function currency() {
    const x = Math.random() * 10000;
    let final = x.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    if (final[final.length - 3] === '.') {
        final = final.replace(/\./g, '#').replace(/\,/g, '.').replace(/\#/g, ',');
    }
    return final;
}

export function currencyNumber() {
    const x = Math.random() * 10000;
    return parseFloat(x.toFixed(2));
}

export function data(config: any = {}) {
    let date = new Date();
    if (config.dias) {
        date.setDate(date.getDate() + config.dias);
    }
    if (config.meses) {
        date.setMonth(date.getMonth() + config.meses);
    }
    if (config.anos) {
        date.setFullYear(date.getFullYear() + config.anos);
    }
    const month = `${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    const day = `${date.getDate().toString().padStart(2, '0')}`;
    return `${day}/${month}/${date.getFullYear()}`;
}

export function datahora(config: any = {}) {
    return `${data(config)} ${time()}`;
}

export function datetime(config: any = {}) {
    return `${data(config)} ${time()}`;
}

export function ect() {
    const ect = makeGenericFaker(MASKS.ect)();
    const dv = createEct(ect.slice(0, -1));
    return `${ect.slice(0, -1)}${dv}`;
}

export function email(options: any = {}) {
    let nome = options.nome || randArray(MALE_NAMES);
    const empresa = options.empresa || nome;
    return `${slugify(nome)}@${slugify(empresa)}.com.br`;
}

export function endereco(options: any = {}) {
    if (!options.estado) {
        options.estado = randomStateAcronym();
    }
    const cidade = randArray(LOCALIZACAO_CIDADES);
    return {
        cep: cep(),
        logradouro: randArray(LOCALIZACAO_RUAS),
        complemento: randArray(LOCALIZACAO_COMPLEMENTOS),
        numero: number({ min: 1, max: 1000 }),
        bairro: randArray(LOCALIZACAO_BAIRROS),
        cidade: cidade[0],
        estado: cidade[1],
        estadoSigla: cidade[2]
    };
}

export function iptu(estado: any, cidade: any) {
    return fakerIptu(estado, cidade);
}

export function number(options: any = {}) {
    if (!options.max) {
        options.max = 10000;
    }
    const x = (Math.random() * (options.max - (options.min || 0))) + (options.min || 0);
    return options.decimals === 0 ? Math.floor(x) : parseFloat(x.toFixed(options.decimals || 2));
}

export function porcentagem() {
    return `${number({ max: 100, decimals: 2 })}%`;
}

export function licensePlate() {
    let licensePlate;
    do {
        licensePlate = makeGenericFaker(MASKS.licensePlate)();
    } while (!validateBr['licensePlate'](licensePlate));
    return licensePlate;
}

export function pessoa(options: any = {}) {
    const nome = randArray(MALE_NAMES);
    const sobrenome = randArray(LASTNAMES);
    return {
        nome: `${nome} ${sobrenome}`,
        cpf: cpf(),
        email: email({ nome }),
        phoneNumber: phoneNumber(options),
        dataNascimento: data({ idadeMin: 18, idadeMax: 80 }),
        endereco: endereco(options)
    };
}

export function phoneNumber(options: any = {}) {
    let phoneNumber = makeGenericFaker(MASKS.phoneNumber)();
    if (options.state) {
        const ddd = PHONENUMBER_BY_STATE[options.state.toLowerCase()];
        phoneNumber = `${ddd}${phoneNumber.slice(2)}`;
    }
    return phoneNumber;
}

export function time() {
    return makeGenericFaker(MASKS.time)();
}

export function titulo() {
    let titulo;
    do {
        titulo = makeGenericFaker(MASKS.titulo)();
        const number = titulo.slice(0, -2);
        const dig = createTitulo(number);
        titulo = `${number}${dig}`;
    } while (!validateBr['titulo'](titulo));
    return titulo;
}

export function veiculo() {
    return {
        licensePlate: licensePlate(),
        chassi: chassi(),
        marca: randArray(VEICULOS.map(v => v.marca)),
        modelo: randArray(VEICULOS.map(v => v.modelo)),
        categoria: randArray(VEICULOS_CATEGORIAS),
        especie: randArray(VEICULOS_ESPECIES),
        tipo: randArray(VEICULOS_TIPOS),
        combustivel: randArray(VEICULOS_COMBUSTIVEIS)
    };
}

// Exportação de todas as funcionalidades
export const fakerBr: BigObject<Function> = {
    aih,
    cellphone,
    cep,
    certidao,
    chassi,
    cnh,
    cnhespelho,
    renachseguranca,
    renachestadual,
    cnpj,
    cpf,
    cns,
    contabanco,
    currency,
    currencyNumber,
    data,
    datahora,
    datetime,
    ect,
    email,
    endereco,
    iptu,
    number,
    porcentagem,
    pessoa,
    licensePlate,
    phoneNumber,
    time,
    titulo,
    veiculo
};