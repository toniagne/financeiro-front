import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {
 response = 'Ativo'
  transform(value: any, args?: any): any {
    if (!value){
      this.response = 'Inativo';
    }

    return this.response;
  }

}
