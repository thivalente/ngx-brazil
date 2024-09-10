import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
    name: 'celular',
})
export class CelularPipe implements PipeTransform {
    transform(celularValue: any) {
        return maskBr.celular(celularValue);
    }
}
