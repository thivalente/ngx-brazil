import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
  standalone: true,
    name: 'cpf',
})
export class CPFPipe implements PipeTransform {
    transform(cpfValue: any) {
      return maskBr.cpf(cpfValue);
    }
}
