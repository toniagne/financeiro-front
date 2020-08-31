import {BaseDataSource, BaseModel} from '../_base/crud';

export class UserModel extends BaseModel {
  id: number;
  blocked:boolean;
  username: string;
  name: string;
  cpf: string;
  password: string;
  email: string;
  accessToken: string;
  // tslint:disable-next-line:variable-name
  access_token: string;
  refreshToken: string;
  roles: any[];
  pic: string;
  fullname: string;
  occupation: string;
  companyName: string;
  phones: any[];
  // tslint:disable-next-line:variable-name
  grant_type: string;
  // tslint:disable-next-line:variable-name
  client_id:string;
  // tslint:disable-next-line:variable-name
  client_secret:string;
  totalCount:number;
  items:[];
  data:[];
  user:[];
  dataKey:[];
  permissions:any[];
  success:boolean;
  message: string;
status:string;
  error: any[];

  clear(): void {
    this.id = undefined;
    this.name = '';
    this.cpf = '';
    this.password = '';
    this.grant_type = '';
    this.client_id = '';
    this.client_secret = '';
    this.email = '';
    this.pic = './assets/media/users/default.jpg';
  }
  }

