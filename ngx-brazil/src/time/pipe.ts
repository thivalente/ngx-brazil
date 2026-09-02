import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
  standalone: true,
    name: 'time',
})
export class TIMEPipe implements PipeTransform {
    transform(timeValue: any) {
        return maskBr.time(timeValue);
    }
}
