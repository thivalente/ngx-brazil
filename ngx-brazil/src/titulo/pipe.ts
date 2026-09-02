import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
  standalone: true,
  name: 'titulo'
})
export class TITULOPipe implements PipeTransform {
  transform(tituloValue: any) {
    return maskBr.titulo(tituloValue);
  }
}
