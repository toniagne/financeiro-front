import {BaseModel} from '../_base/crud';

export class ServicesCategories extends BaseModel {
  id: number;
  name: string;
  totalCount: number;
  status: string;
  items: [];
  clear() {
    this.id = undefined;
    this.name = '';
  }
}
