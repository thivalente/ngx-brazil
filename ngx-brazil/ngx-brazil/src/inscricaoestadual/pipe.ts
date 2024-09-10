import { Pipe, PipeTransform } from '@angular/core';
import { maskBr } from '../_utils/mask-br';

@Pipe({
  name: 'inscricaoestadual',
})
export class InscricaoEstadualPipe implements PipeTransform {
  transform(inscricaoestadualValue: any, estado: any) {
    return maskBr.inscricaoestadual(inscricaoestadualValue, estado);
  }
}
