export class Address {
  address: string;
  // tslint:disable-next-line:variable-name
  city_id: string;
  state: string;
  number: string;
  neighborhood: string;
  complement: string;
  category: string;
  zipcode: string;

  clear() {
    this.address = '';
    this.city_id = '';
    this.state = '';
    this.complement = '';
    this.neighborhood = '';
    this.category = '';
    this.number = '';
    this.zipcode = '';
  }
}
