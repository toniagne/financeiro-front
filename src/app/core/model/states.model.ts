export class StatesModel {
  id: string;
  title: string;
  clear() {
    this.id = undefined;
    this.title = '';
  }
}
