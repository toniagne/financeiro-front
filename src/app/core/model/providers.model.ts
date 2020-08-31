import {BaseDataSource, BaseModel} from '../_base/crud';
import {AddressesModel} from './addresses.model';
import {PhonesModel} from './phones.model';
import {Address} from '../auth';

export class ProvidersModel extends BaseModel{
  id: number;
  name: string;
  type: string;
  email: string;
  cnpj:number;
  phones:[];
  ie: number;
  im: string;
  cpf: number;
  fantasy: string;
  contact: string;
  description: string;
  address: Address;
  active: boolean;
  items:[];
  dataKey:[];
  status:string;
  // tslint:disable-next-line:variable-name
  total_count:string;
  totalCount:number;
  clear(): void {
    this.id = undefined;
    this.name = '';
    this.email = '';
    this.type = 'PJ';
    this.cnpj = undefined;
    this.ie = undefined;
    this.im = '';
    this.cpf = undefined;
    this.fantasy = '';
    this.description = '';
    this.active = false;
  }
}
