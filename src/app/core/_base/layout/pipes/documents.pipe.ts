import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documents'
})
export class DocumentsPipe implements PipeTransform {
document = '';
  transform(value: any, args?: any): any {
    switch (value) {
      case 'homeoffice': this.document = 'HOMEOFFICE' ; break;
      case 'fulltime': this.document = 'ESCRITÓRIO' ; break;
      case 'outsourced': this.document = 'TERCERIZADO' ; break;
      case 'fixed': this.document = 'CLT' ; break;
  }
    return this.document;
  }

}
