import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
    name: 'cep',
})
export class CEPPipe implements PipeTransform {
    transform(cepValue: any) {
        return maskBr.cep(cepValue);
    }
}
