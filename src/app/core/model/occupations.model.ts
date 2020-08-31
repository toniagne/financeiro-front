export class OccupationsModel {
    id: string;
    title: string;
    items: [];
    clear() {
        this.id = undefined;
        this.title = '';
    }
}
