export class ServicesType {
  id: number;
  name: string;
  totalCount: number;
  items: [];

  clear() {
    this.id = undefined;
    this.name = '';
  }
}
