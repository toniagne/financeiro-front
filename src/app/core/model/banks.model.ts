export class BanksModel {
    id: string;
    agency: number;
    // tslint:disable-next-line:variable-name
    bank_name: string;
    account: number;
    banks: [];
    items: [];
    clear() {
        this.banks = [];
    }
}
