export class CitiesModel {
  id: string;
  title: string;
  clear() {
    this.id = undefined;
    this.title = '';
  }
}
