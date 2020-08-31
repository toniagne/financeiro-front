import {BaseDataSource, BaseModel} from '../_base/crud';
import {ServicesType} from './servicesType.model';
import {ServicesCategories} from './servicesCategories.model';
import {RecurrencesModel} from './recurrences.model';

export class ServicesModel extends BaseModel{
  id: number;
  name: string;
  price: number;
  priceParsed: string;
  observation: string;
  active: number;
  serviceCategory: ServicesCategories;
  // tslint:disable-next-line:variable-name
  service_type_id:number;
  // tslint:disable-next-line:variable-name
  recurrence_id: RecurrencesModel;
  // tslint:disable-next-line:variable-name
  service_id: number;
  // tslint:disable-next-line:variable-name
  service_category_id: ServicesCategories;
  items:[];
  dataKey: [];
  status: string;
  totalCount: number;

  clear(): void {
    this.id = undefined;
    this.name = '';
    this.price = 0;
    this.observation = '';
    this.active = 1;
  }
}
