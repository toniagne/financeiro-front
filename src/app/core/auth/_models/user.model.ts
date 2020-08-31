import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User extends BaseModel {
  id: number;
  username: string;
  name: string;
  cpf: string;
  password: string;
  email: string;
  accessToken: string;
  // tslint:disable-next-line:variable-name
  access_token: string;
  refreshToken: string;
  roles: number[];
  pic: string;
  fullname: string;
  occupation: string;
  companyName: string;
  phone: string;
  address: Address;
  socialNetworks: SocialNetworks;
  // tslint:disable-next-line:variable-name
  grant_type: string;
  // tslint:disable-next-line:variable-name
  client_id:string;
  // tslint:disable-next-line:variable-name
  client_secret:string;
  // tslint:disable-next-line:variable-name
  total_count: number;

  clear(): void {
    this.id = undefined;
    this.username = '';
    this.name = '';
    this.password = '';
    this.grant_type = '';
    this.client_id = '';
    this.client_secret = '';
    this.email = '';
    this.roles = [];
    this.fullname = '';
    this.accessToken = 'access-token-' + Math.random();
    this.refreshToken = 'access-token-' + Math.random();
    this.pic = './assets/media/users/default.jpg';
    this.occupation = '';
    this.companyName = '';
    this.phone = '';
    this.address = new Address();
    this.address.clear();
    this.socialNetworks = new SocialNetworks();
    this.socialNetworks.clear();
  }
}
