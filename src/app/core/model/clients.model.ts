import {BaseDataSource, BaseModel} from '../_base/crud';
import {Address} from '../auth';

export class ClientsModel extends BaseModel{
  id: number;
  name: string;
  type: string;
  email: string;
  cnpj:number;
  ie: number;
  im: string;
  cpf: number;
  billing:string;
  fantasy: string;
  contact: any [];
  description: string;
  address: Address;
  active: boolean;
  items:[];
  phones: any [];
  phone: any [];
  contacts: [];
  totalCount:number;
  status:string;
  dataKey:[];

  clear(): void {
    this.id = undefined;
    this.name = '';
    this.cnpj = undefined;
    this.ie = undefined;
    this.im = '';
    this.email = '';
    this.cpf = undefined;
    this.fantasy = '';
    this.contact = [];
    this.description = '';
    this.billing = '5';
    this.active = false;
  }
}
