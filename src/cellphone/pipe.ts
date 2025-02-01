import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({ name: 'cellphone' })
export class CellphonePipe implements PipeTransform {
    transform(cellphoneValue: any) {
        return maskBr.cellphone(cellphoneValue);
    }
}
