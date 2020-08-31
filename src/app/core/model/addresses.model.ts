export class AddressesModel {
  id: string;
  // tslint:disable-next-line:variable-name
  city_id: string;
  state: string;
  address: string;
  number:string;
  clear() {
    this.id = undefined;
    this.city_id = '';
    this.address = '';
    this.number = '';
  }
}
