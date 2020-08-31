import {BaseDataSource, BaseModel} from '../_base/crud';
export class ContractsModel extends BaseModel {
    id: number;
    name: string;
    // tslint:disable-next-line:variable-name
    employee_id: string;
    // tslint:disable-next-line:variable-name
    provider_id: string;
    observation:string;
    active: boolean;
    // tslint:disable-next-line:variable-name
    date_start: Date;
    // tslint:disable-next-line:variable-name
    date_end: Date;
    file: string;
    permanent:boolean;
    type: string;
    attachment: any [];
    totalCount:number;
    // retornos
    success: boolean;
    message: string;
    items:[];

    clear(): void {
        this.id = undefined;
        this.name = '';
        this.employee_id = undefined;
        this.provider_id = undefined;
        this.observation = '';
        this.active = undefined;
        this.permanent = undefined;
        this.type = '';
    }
}
