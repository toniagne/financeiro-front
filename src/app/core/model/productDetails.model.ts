export class ProductDetailsModel {
    id: number;
    key: string;
    value: string;
    totalCount: number;
    items: [];
    details: [];
    clear() {
        this.id = undefined;
        this.key = '';
        this.value = '';
    }
}
