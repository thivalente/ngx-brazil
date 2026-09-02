import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
  standalone: true,
    name: 'pispasep',
})
export class PispasepPipe implements PipeTransform {
    transform(pispasepValue: any) {
        return maskBr.pispasep(pispasepValue);
    }
}
