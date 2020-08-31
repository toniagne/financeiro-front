import {BaseDataSource, BaseModel} from '../_base/crud';
import {Address, SocialNetworks} from '../auth';
import {AddressesModel} from './addresses.model';
import {PhonesModel} from './phones.model';
import {BanksModel} from './banks.model';

export class EmployeesModel extends BaseModel {
  id: number;
  name: string;
  workflow: number;
  observation: string;
  cnpj: string;
  cpf: string;
  email: string;
  status: boolean;
  salary: string;
  // tslint:disable-next-line:variable-name
  graduation_details: string;
  // tslint:disable-next-line:variable-name
  pay_type: number;
  // tslint:disable-next-line:variable-name
  pay_day: string;
  // tslint:disable-next-line:variable-name
  img_profile: string;
  // tslint:disable-next-line:variable-name
  img_document: string;
  // tslint:disable-next-line:variable-name
  img_address: string;
  // tslint:disable-next-line:variable-name
  img_graduation: string;
  // tslint:disable-next-line:variable-name
  occupattion_id: number;
  // tslint:disable-next-line:variable-name
  contract_type: number
  address: Address;
  banks: [];
  phones: [];
  totalCount:number;
  items:[];

  clear(): void {
    this.id = undefined;
    this.name = '';
    this.cpf = '';
    this.email = '';
    this.img_profile = './assets/media/users/default.jpg';
  }
}
