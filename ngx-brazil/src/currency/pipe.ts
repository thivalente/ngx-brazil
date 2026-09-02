import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
  standalone: true,
  name: 'currencyBrazil'
})
export class CURRENCYPipe implements PipeTransform {
  transform(currencyValue: any, decimalValue: any = 2) {
    return maskBr.currency(currencyValue, decimalValue);
  }
}
