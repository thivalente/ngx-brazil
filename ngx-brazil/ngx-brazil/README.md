# Ngx-Brazil 🇧🇷

> Biblioteca Angular com pipes, diretivas, validadores e máscaras para aplicações brasileiras

[![npm version](https://img.shields.io/npm/v/ngx-brazil.svg)](https://www.npmjs.com/package/ngx-brazil)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-22.0.0-red.svg)](https://angular.io/)

**Ngx-Brazil** é uma biblioteca completa para trabalhar com dados brasileiros em aplicações Angular. Fornece validação, formatação e máscaras para documentos, telefones, endereços e outros dados específicos do Brasil.

> **Nota:** Este projeto é um fork de [ng-brazil](https://github.com/mariohmol/ng-brazil) mantido e atualizado para versões mais recentes do Angular.

---

## 📦 Instalação

O **major** do `ngx-brazil` acompanha o **major** do Angular do seu projeto:

```bash
npm install ngx-brazil@22
```

| Angular | ngx-brazil |
|--------|------------|
| 22 | `22.x` |
| 21 | `21.x` |
| 20 | `20.x` |
| 19 | `19.x` |
| 18 | `18.x` |
| 17 | `17.x` |
| 16 | `16.x` |
| 15 | `15.x` |

Para versões antigas ou patches específicos, consulte o [histórico no npm](https://www.npmjs.com/package/ngx-brazil?activeTab=versions).

> **Angular 22+** usa `ngx-brazil@22`. Projetos em Angular 21 devem permanecer em `@21`. A API de máscaras, validators e pipes é a mesma entre majors compatíveis.

---

## ✨ Funcionalidades

### Documentos
- ✅ **CPF** - Validação, formatação e máscara
- ✅ **CNPJ** - Validação, formatação e máscara
- ✅ **RG** - Validação, formatação e máscara
- ✅ **Título de Eleitor** - Validação e formatação
- ✅ **PIS/PASEP** - Validação e formatação

### Endereço e Localização
- ✅ **CEP** - Validação, formatação e máscara
- ✅ **Inscrição Estadual** - Validação por estado e formatação

### Veículos
- ✅ **Placa de Veículo** - Validação e formatação
- ✅ **RENAVAM** - Validação e formatação

### Contato
- ✅ **Telefone Fixo** - Validação, formatação e máscara
- ✅ **Celular** - Validação, formatação e máscara

### Formatação
- ✅ **Moeda (R$)** - Formatação brasileira
- ✅ **Número** - Formatação com separadores brasileiros
- ✅ **Percentual** - Formatação de percentuais
- ✅ **Hora** - Formatação de horários

---

## 🚀 Uso Rápido

### Com Standalone Components (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxBrazil, NgxBrazilMASKS, NgxBrazilValidators } from 'ngx-brazil';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgxBrazil
  ],
  template: `
    <form [formGroup]="form">
      <input 
        type="text" 
        formControlName="cpf" 
        cpf 
        [textMask]="{mask: MASKS.cpf.textMask}"
        placeholder="CPF">
      
      <input 
        type="text" 
        formControlName="cnpj" 
        cnpj 
        [textMask]="{mask: MASKS.cnpj.textMask}"
        placeholder="CNPJ">
    </form>
  `
})
export class AppComponent {
  public MASKS = NgxBrazilMASKS;
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cpf: ['', [Validators.required, NgxBrazilValidators.cpf]],
      cnpj: ['', [Validators.required, NgxBrazilValidators.cnpj]]
    });
  }
}
```

### Com NgModule (Compatibilidade)

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBrazil } from 'ngx-brazil';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxBrazil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## 📖 Exemplos de Uso

### Validadores em Formulários Reativos

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxBrazilValidators } from 'ngx-brazil';

export class MyComponent {
  form: FormGroup;
  estado = 'SP';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cpf: ['', [Validators.required, NgxBrazilValidators.cpf]],
      cnpj: ['', [Validators.required, NgxBrazilValidators.cnpj]],
      rg: ['', [Validators.required, NgxBrazilValidators.rg]],
      cep: ['', [Validators.required, NgxBrazilValidators.cep]],
      phoneNumber: ['', [Validators.required, NgxBrazilValidators.phoneNumber]],
      inscricaoestadual: [
        '', 
        [Validators.required, NgxBrazilValidators.inscricaoestadual(this.estado)]
      ]
    });
  }
}
```

### Máscaras em Inputs

```html
<!-- CPF -->
<input 
  type="text" 
  formControlName="cpf" 
  cpf 
  [textMask]="{mask: MASKS.cpf.textMask}">

<!-- CNPJ -->
<input 
  type="text" 
  formControlName="cnpj" 
  cnpj 
  [textMask]="{mask: MASKS.cnpj.textMask}">

<!-- Telefone -->
<input 
  type="text" 
  formControlName="phoneNumber" 
  phoneNumber 
  [textMask]="{mask: MASKS.phoneNumber.textMaskFunction}">

<!-- CEP -->
<input 
  type="text" 
  formControlName="cep" 
  cep 
  [textMask]="{mask: MASKS.cep.textMask}">

<!-- Inscrição Estadual -->
<input 
  type="text" 
  formControlName="inscricaoestadual" 
  inscricaoestadual="sp" 
  [textMask]="{mask: MASKS.inscricaoestadual[estado].textMask}">
```

### Pipes para Formatação

```html
<!-- CPF -->
<p>CPF: {{ '12345678910' | cpf }}</p>
<!-- Resultado: 123.456.789-10 -->

<!-- CNPJ -->
<p>CNPJ: {{ '40841253000102' | cnpj }}</p>
<!-- Resultado: 40.841.253/0001-02 -->

<!-- RG -->
<p>RG: {{ 'MG10111222' | rg }}</p>
<!-- Resultado: MG-10.111.222 -->

<!-- Inscrição Estadual -->
<p>IE: {{ '0018192630048' | inscricaoestadual: 'mg' }}</p>
<!-- Resultado: 001.819.263/0048 -->

<!-- Telefone -->
<p>Telefone: {{ '1139998888' | phoneNumber }}</p>
<!-- Resultado: (11) 3999-8888 -->

<!-- Moeda -->
<p>Valor: {{ '123.23' | currencyBrazil }}</p>
<!-- Resultado: R$ 123,23 -->

<!-- Número -->
<p>Número: {{ '123.23' | numberBrazil }}</p>
<!-- Resultado: 123,23 -->

<!-- Número sem decimais -->
<p>Número: {{ '123.23' | numberBrazil: 0 }}</p>
<!-- Resultado: 123 -->
```

---

## 🛠️ Tecnologias Compatíveis

- ✅ **Angular:** use o major do `ngx-brazil` igual ao major do Angular (ex.: Angular 22 → `ngx-brazil@22`)
- ✅ Angular Material
- ✅ Ionic (pipes, diretivas e validadores funcionam; máscaras podem ter limitações)

Versões legadas (15–21) seguem disponíveis no npm; não recebem novas features, apenas o major atual é mantido ativamente.

---

## 📦 Importação modular (standalone)

Além do módulo `NgxBrazil`, pipes e diretivas podem ser importados individualmente:

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CPFPipe, CPFValidator, MaskedInputDirective } from 'ngx-brazil';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CPFPipe, CPFValidator, MaskedInputDirective],
  template: `
    <input formControlName="cpf" cpf [textMask]="{ mask: ['000.000.000-00'] }">
    <p>{{ '12345678910' | cpf }}</p>
  `
})
export class ExemploComponent {}
```

> **Depreciação:** `NgxBrazil.forRoot()` está obsoleto e será removido no major 23. Prefira `imports: [NgxBrazil]` ou imports standalone individuais.

---

## 📚 API Reference

### Validadores

Todos os validadores estão disponíveis em `NgxBrazilValidators`:

```typescript
import { NgxBrazilValidators } from 'ngx-brazil';

// Uso em FormControl
const cpfControl = new FormControl('', [
  Validators.required,
  NgxBrazilValidators.cpf
]);
```

**Validadores disponíveis:**
- `cpf` - Valida CPF
- `cnpj` - Valida CNPJ
- `rg` - Valida RG
- `cep` - Valida CEP
- `phoneNumber` - Valida telefone fixo
- `cellphone` - Valida celular
- `inscricaoestadual(estado)` - Valida Inscrição Estadual (requer estado)
- `renavam` - Valida RENAVAM
- `pispasep` - Valida PIS/PASEP
- `licensePlate` - Valida placa de veículo
- `titulo` - Valida Título de Eleitor
- `currency` - Valida moeda
- `number` - Valida número
- `time` - Valida horário
- `percentage` - Valida percentual

### Máscaras

Todas as máscaras estão disponíveis em `NgxBrazilMASKS`:

```typescript
import { NgxBrazilMASKS } from 'ngx-brazil';

// Uso em componente
public MASKS = NgxBrazilMASKS;
```

### Pipes

Todos os pipes podem ser usados diretamente nos templates:

- `cpf` - Formata CPF
- `cnpj` - Formata CNPJ
- `rg` - Formata RG
- `cep` - Formata CEP
- `phoneNumber` - Formata telefone
- `cellphone` - Formata celular
- `inscricaoestadual` - Formata Inscrição Estadual (requer estado como parâmetro)
- `currencyBrazil` - Formata moeda brasileira
- `numberBrazil` - Formata número brasileiro
- `time` - Formata horário
- `percentage` - Formata percentual

---

## 🎯 Demo

Veja a biblioteca em ação:

- 🌐 [Demo Online no StackBlitz](https://stackblitz.com/edit/ngx-brazil)
- 📦 [Repositório no GitHub](https://github.com/thivalente/ngx-brazil)

![Demo Image](https://raw.githubusercontent.com/thivalente/ngx-brazil/main/ngx-brazil/src/assets/print.png)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso [Guia de Contribuição](https://github.com/thivalente/ngx-brazil/blob/main/ngx-brazil/CONTRIBUTING.md) e [Código de Conduta](https://github.com/thivalente/ngx-brazil/blob/main/ngx-brazil/CODE_OF_CONDUCT.md) antes de começar.

### Setup de Desenvolvimento

1. Faça um fork do projeto
2. Instale as dependências globais:
   ```bash
   npm i -g rimraf ng-packagr @angular/compiler-cli @angular/compiler tslib
   ```
3. Clone e instale as dependências:
   ```bash
   git clone https://github.com/seu-usuario/ngx-brazil.git
   cd ngx-brazil/ngx-brazil
   npm install
   ```
4. Compile a biblioteca:
   ```bash
   npm run build:lib
   ```
5. Execute o projeto de demonstração:
   ```bash
   npm run start
   ```

### Publicando uma Nova Versão

1. Atualize a versão em:
   - `ngx-brazil/package.json`
   - `ngx-brazil/ngx-brazil/package.json`
   - `README.md` (seções de instalação)
2. Compile e publique:
   ```bash
   npm run build:lib
   cd dist/ngx-brazil
   npm login
   npm publish
   ```

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](https://github.com/thivalente/ngx-brazil/blob/main/ngx-brazil/LICENSE).

---

## 🙏 Agradecimentos

Este projeto é um fork de [ng-brazil](https://github.com/mariohmol/ng-brazil) criado por [Mario Mol](https://github.com/mariohmol). Agradecemos ao autor original por criar essa excelente base.

---

## 📞 Suporte

- 📧 Email: thiago.valente@fitideias.com.br
- 🐛 [Reportar Bug](https://github.com/thivalente/ngx-brazil/issues)
- 💡 [Sugerir Feature](https://github.com/thivalente/ngx-brazil/issues)

---

**Desenvolvido com ❤️ para a comunidade Angular brasileira**
