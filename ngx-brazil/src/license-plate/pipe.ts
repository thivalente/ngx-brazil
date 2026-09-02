import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
  standalone: true,
  name: 'licensePlate'
})
export class LICENSEPLATEPipe implements PipeTransform {
  transform(licensePlateValue: any) {
    return maskBr.licensePlate(licensePlateValue).toUpperCase();
  }
}
