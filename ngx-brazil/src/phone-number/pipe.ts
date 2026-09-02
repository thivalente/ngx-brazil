import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
  standalone: true,
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
    transform(phoneNumberValue: any) {
        return maskBr.phoneNumber(phoneNumberValue);
    }
}
