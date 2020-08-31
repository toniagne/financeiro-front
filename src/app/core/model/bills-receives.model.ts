import {BaseDataSource, BaseModel} from '../_base/crud';
import {ClientsModel} from './clients.model';
import {ProvidersModel} from './providers.model';

export class BillsReceivesModel extends BaseModel{
    id: number;
    client: ClientsModel;
    provider: ProvidersModel;
    description: string;
    category: string;
    recurrency:string;
    totalCount: number;
    parcels:number;
    amount: string;
    due: string;
    issue: string;
    // tslint:disable-next-line:variable-name
    client_id: number;
    // tslint:disable-next-line:variable-name
    service_id: number;
    // tslint:disable-next-line:variable-name
    yarly_due:string;
    // tslint:disable-next-line:variable-name
    recurrence_id: number;
    // tslint:disable-next-line:variable-name
    provider_id: number;
    // tslint:disable-next-line:variable-name
    n_document: string;
    // tslint:disable-next-line:variable-name
    payment_category_id: number;
    // tslint:disable-next-line:variable-name
    negotiation_type_id: number;
    // tslint:disable-next-line:variable-name
    date_competency: string;
    // BILLS DETAILS
    day: number;
    // tslint:disable-next-line:variable-name
    weekly_due: string;
    // tslint:disable-next-line:variable-name
    first_bi_weekly_due:number;
    // tslint:disable-next-line:variable-name
    second_bi_weekly_due:number;
    // tslint:disable-next-line:variable-name
    yearly_due: string;
    items: [];
    status: string;

    clear(): void {
        this.id = undefined;
        this.due = '';
        this.issue = '';
        this.date_competency = '';
        this.description = '';
        this.category = '';
        this.recurrency = '';
        this.yearly_due = '';
    }
}
