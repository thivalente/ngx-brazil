import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
    name: 'rg',
})
export class RGPipe implements PipeTransform {
    transform(rgValue: any) {
      return maskBr.rg(rgValue);
    }
}
