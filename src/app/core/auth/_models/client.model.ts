import { BaseModel } from '../../_base/crud';

export class Client extends BaseModel {
  id: number;
  title: string;

  clear(): void {
    this.id = undefined;
    this.title = '';
  }
}
