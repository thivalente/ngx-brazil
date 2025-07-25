# Ngx-Brazil

Forked from https://github.com/mariohmol/ng-brazil

Contains pipes / directives / validators / mask for brazillian like apps

Supports: Angular 15 to Angular 20

## Installing:  

* Angular version 20.x.x

` npm install --save ngx-brazil@20.0.4`

* Angular version 19.x.x

` npm install --save ngx-brazil@19.0.0`

* Angular version 18.x.x

` npm install --save ngx-brazil@18.0.4`

* Angular version 17.x.x

` npm install --save ngx-brazil@17.0.0`

* Angular version 16.x.x

` npm install --save ngx-brazil@16.0.0`

* Angular version 15.x.x

` npm install --save ngx-brazil@15.0.0`



This project was tested integrated with the following techs:

* angular
* angular-material
* ionic3 (masks is not fully working, that is an issue for that, but pipes/directives/validators/mask works)

Modules:

* CPF 
* CNPJ
* RG
* Inscrição Estadual
* PhoneNumber and Cellphone
* CEP
* Currency (Money)
* Time (Hour and minutes)
* Number (Number and decimal)
* License Plate
* Renavam
* Título de Eleitor
* Proceso Jurídico


See the demo working project:
[https://stackblitz.com/edit/ngx-brazil]

![Demo Image](https://github.com/thivalente/ngx-brazil/blob/main/src/assets/print.png)

 
## Usage

### Configuration

Import module in root

```ts
import { NgxBrazil } from 'ngx-brazil' 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ....,
    NgxBrazil
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


#### Using Masks

Setup your component:

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxBrazilMASKS, NgxBrazilValidators } from 'ngx-brazil';

@Component({
  selector: 'app-root',
  template: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public MASKS: any = NgxBrazilMASKS;
  public estado: string = 'SP';
  public formFields: any;
  public form?: FormGroup;
  
  constructor(public fb: FormBuilder) { 
    this.formFields = {
      estado: [''],
      cpf: ['', [<any>Validators.required, <any>NgxBrazilValidators.cpf]],
      cnpj: ['', [<any>Validators.required, <any>NgxBrazilValidators.cnpj]],
      rg: ['', [<any>Validators.required, <any>NgxBrazilValidators.rg]],
      cep: ['', [<any>Validators.required, <any>NgxBrazilValidators.cep]],
      phoneNumber: ['', [<any>Validators.required, <any>NgxBrazilValidators.phoneNumber]],
      inscricaoestadual: ['', [<any>Validators.required, <any>NgxBrazilValidators.inscricaoestadual(this.estado)]]
    };
    this.form = this.fb.group(this.formFields);
  }

}
```

## Forms and Mask

```html
<input type="text" formControlName="cnpj" cnpj [textMask]="{mask: MASKS.cnpj.textMask}">
<input type="text" formControlName="cpf" cpf [textMask]="{mask: MASKS.cpf.textMask}">
<input type="text" formControlName="rg" rg [textMask]="{mask: MASKS.rg.textMask}"> 
<input type="text" formControlName="inscricaoestadual" inscricaoestadual="sp" [textMask]="{mask: MASKS.inscricaoestadual[estado].textMask}">
<input type="text" formControlName="phoneNumber" phoneNumber #phoneNumber [textMask]="{mask: MASKS.phoneNumber.textMaskFunction}">
<input type="text" formControlName="cep" cep [textMask]="{mask: MASKS.cep.textMask}">

<input type="text" formControlName="number" number [textMask]="{mask: MASKS.number.textMask}">
```

## Pipes

```html
CPF: From 12345678910 to {{'12345678910' | cpf}} <br/>
CNPJ: From 40841253000102 to {{'40841253000102' | cnpj}} <br/>
RG: From MG10111222 to {{'MG10111222' | rg}} <br/>
Inscrição Estadual: From 0018192630048 to {{'0018192630048' | inscricaoestadual: 'mg'}} <br/>
Phone Number: From 1139998888 to {{'1139998888' | phoneNumber}} <br/>
Number: From 123.23 to {{'123.23' | numberBrazil}} <br/>
Number sem decimais: From 123.23 to {{'123.23' | numberBrazil: 0}} <br/>
Currency: From 123.23 to {{'123.23' | currencyBrazil}} <br/>
```

```ts
import { Component } from '@angular/core';
import { NgxBrazil } from 'ngx-brazil';

@Component({
  selector: 'app-root',
  template: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}
```

# Demo

Demo component files are included in Git Project.

Demo Project:
[https://stackblitz.com/edit/ngx-brazil]

Reference projects:

* https://github.com/thivalente/ngx-brazil
* https://github.com/mariohmol/ng-brazil



## Collaborate

Fork this project then install global libs:

*  npm i -g rimraf ng-packagr @angular/compiler-cli @angular/compiler tslib ngc

Finally working in the project folder:

* npm i
* npm run build:lib
* npm run dist
* npm run start

To publish a new release, update the version in [package.json](./package.json) and [src/package.json](./src/package.json),
then run `npm run publish-npm`.

# License

MIT(./LICENSE)
