const date = new Date();
const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

export class ChargingsModel {
    id: string;
    // tslint:disable-next-line:variable-name
    client_id: number;
    period: Date;
    totalCount:number;
    items:[];
    clear() {
         this.id = undefined;
         this.client_id = undefined;
         this.period = startOfMonth;
    }
}
