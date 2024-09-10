import { NgModule, ModuleWithProviders } from '@angular/core';

import { cpf } from './cpf/validator';
import { CPFValidator } from './cpf/directive';
import { CPFPipe } from './cpf/pipe';

export * from './cpf/validator';
export * from './cpf/directive';
export * from './cpf/pipe';

import { cnpj } from './cnpj/validator';
import { CNPJValidator } from './cnpj/directive';
import { CNPJPipe } from './cnpj/pipe';

export * from './cnpj/validator';
export * from './cnpj/directive';
export * from './cnpj/pipe';

import { phoneNumber } from './phone-number/validator';
import { PhoneNumberValidator } from './phone-number/directive';
import { PhoneNumberPipe } from './phone-number/pipe';

export * from './phone-number/validator';
export * from './phone-number/directive';
export * from './phone-number/pipe';

import { cellphone } from './cellphone/validator';
import { CellphoneValidator } from './cellphone/directive';
import { CellphonePipe } from './cellphone/pipe';

export * from './cellphone/validator';
export * from './cellphone/directive';
export * from './cellphone/pipe';

import { inscricaoestadual } from './inscricaoestadual/validator';
import { InscricaoEstadualValidator } from './inscricaoestadual/directive';
import { InscricaoEstadualPipe } from './inscricaoestadual/pipe';

export * from './inscricaoestadual/validator';
export * from './inscricaoestadual/directive';
export * from './inscricaoestadual/pipe';

import { CEPValidator } from './cep/directive';
import { CEPPipe } from './cep/pipe';
import { cep } from './cep/validator';

export * from './cep/directive';
export * from './cep/pipe';
export * from './cep/validator';

import { currency } from './currency/validator';
import { CURRENCYValidator } from './currency/directive';
import { CURRENCYPipe } from './currency/pipe';

export * from './currency/validator';
export * from './currency/directive';
export * from './currency/pipe';

import { number } from './number/validator';
import { NUMBERValidator } from './number/directive';
import { NUMBERPipe } from './number/pipe';


export * from './number/validator';
export * from './number/directive';
export * from './number/pipe';

import { licensePlate } from './license-plate/validator';
import { LICENSEPLATEValidator } from './license-plate/directive';
import { LICENSEPLATEPipe } from './license-plate/pipe';

export * from './license-plate/validator';
export * from './license-plate/directive';
export * from './license-plate/pipe';

import { percentage } from './percentage/validator';
import { PERCENTAGEValidator } from './percentage/directive';
import { PERCENTAGEPipe } from './percentage/pipe';

export * from './percentage/validator';
export * from './percentage/directive';
export * from './percentage/pipe';

import { renavam } from './renavam/validator';
import { RenavamValidator } from './renavam/directive';
import { RenavamPipe } from './renavam/pipe';

export * from './renavam/validator';
export * from './renavam/directive';
export * from './renavam/pipe';

import { pispasep } from './pispasep/validator';
import { PispasepValidator } from './pispasep/directive';
import { PispasepPipe } from './pispasep/pipe';

export * from './pispasep/validator';
export * from './pispasep/directive';
export * from './pispasep/pipe';

import { rg } from './rg/validator';
import { RGValidator } from './rg/directive';
import { RGPipe } from './rg/pipe';

export * from './rg/validator';
export * from './rg/directive';
export * from './rg/pipe';

import { time } from './time/validator';
import { TIMEValidator } from './time/directive';
import { TIMEPipe } from './time/pipe';

export * from './time/validator';
export * from './time/directive';
export * from './time/pipe';

import { titulo } from './titulo/validator';
import { TITULOValidator } from './titulo/directive';
import { TITULOPipe } from './titulo/pipe';

export * from './titulo/validator';
export * from './titulo/directive';
export * from './titulo/pipe';

export const NgxBrazilValidators: any = {
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
}

import { MASKS } from './_utils/mask-br';
import { MASKSIE } from './_utils/inscricao-estadual';
export const NgxBrazilMASKS = MASKS;
export const NgxBrazilMASKSIE = MASKSIE;

import { MaskedInputDirective } from './masked-input.directive';
export { MaskedInputDirective } from './masked-input.directive';

export const NgxBrazilCustomDirectives = [
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

export const NgxBrazilDirectives = {
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

@NgModule({
  declarations: [ NgxBrazilCustomDirectives ],
  imports: [ ],
  exports: [ NgxBrazilCustomDirectives ]
})
class NgxBrazil {
  public static forRoot(): ModuleWithProviders<NgxBrazil> {
    return {
      ngModule: NgxBrazil
    };
  }
}
export {
  NgxBrazil
}
