import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
    name: 'cnpj',
})
export class CNPJPipe implements PipeTransform {
    transform(cnpjValue: any) {
      return maskBr.cnpj(cnpjValue);
    }
}
