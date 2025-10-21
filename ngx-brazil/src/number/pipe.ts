import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
  name: 'numberBrazil',
})
export class NUMBERPipe implements PipeTransform {
  transform(numberValue: any, decimalValue: any = 2) {
    return maskBr.number(numberValue, decimalValue);
  }
}
