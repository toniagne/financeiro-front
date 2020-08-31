import {ClientsModel} from './clients.model';
import {AttachmentsModel} from './attachments.model';
import {ResponsesModel} from './responses.model';
import {ServicesCategories} from './servicesCategories.model';

export class ProposalsModel {
    id: number;
    // tslint:disable-next-line:variable-name
    client_id: number;
    client: ClientsModel;
    category: ServicesCategories;
    file: string;
    validity : string;
    date: string;
    value: string;
    // tslint:disable-next-line:variable-name
    category_id: number;
    situation: string;
    description: string;
    observation: string;
    attachment: AttachmentsModel;
    totalCount:number;
    items = [];
    response = ResponsesModel;

    clear(): void {
        this.id = undefined;
        this.client_id = undefined;
        this.file = '';
        this.validity = '';
        this.date = '';
        this.value = '';
        this.category_id = undefined;
        this.situation = '';
        this.description = '';
    }
}
