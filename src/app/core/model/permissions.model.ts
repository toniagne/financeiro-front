export class PermissionsModel {
    id: number;
    // tslint:disable-next-line:variable-name
    user_id: number;
    clients: [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    providers:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    services:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    // tslint:disable-next-line:variable-name
    bank_slips:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    // tslint:disable-next-line:variable-name
    fiscal_notes:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    // tslint:disable-next-line:variable-name
    bills_to_pay:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    // tslint:disable-next-line:variable-name
    biils_to_receive:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    proposals:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    // tslint:disable-next-line:variable-name
    bills_to_receive: [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    contracts:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    configs:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    employees:  [{ add: any[]; view: any[]; edit: any[]; create: any[]; delete: any[] }];
    items: [];
    clear() {
        this.id = undefined;
        this.user_id = undefined;
        this.clients = [{create: [],delete: [],view: [], edit: [],add: []}];
        this.providers = [{create: [],delete: [],view: [], edit: [],add: []}];
        this.services = [{create: [],delete: [],view: [], edit: [],add: []}];
        this.bank_slips = [{create: [],delete: [],view: [], edit: [],add: []}];
        this.fiscal_notes = [{create: [],delete: [],view: [], edit: [],add: []}];
        this.bills_to_pay = [{create: [],delete: [],view: [], edit: [],add: []}];
        this.biils_to_receive = [{create: [],delete: [],view: [], edit: [],add: []}];
        this.contracts = [{create: [],delete: [],view: [], edit: [],add: []}];
        this.configs = [{create: [],delete: [],view: [], edit: [],add: []}];
        this.employees = [{create: [],delete: [],view: [], edit: [],add: []}];
    }
}
