import {BaseDataSource, BaseModel} from '../_base/crud';
import {ProductDetailsModel} from './productDetails.model';

export class ProductsModel extends BaseModel{
    id: number;
    name: string;
    value: string;
    observation: string;
    status: boolean;
    productCategory: string;
    profit:string;
    price:string;
    details:ProductDetailsModel;
    // tslint:disable-next-line:variable-name
    product_category_id: number;
    // tslint:disable-next-line:variable-name
    product_margin_id: number;
    // tslint:disable-next-line:variable-name
    fixed_margin:string;
    // tslint:disable-next-line:variable-name
    currence_rate:string;
    items:[];
    contacts: [];
    totalCount:number;
    dataKey:[];

    clear(): void {
        this.id = undefined;
        this.name = '';
        this.value = '';
        this.observation = '';
        this.status = undefined;
        this.product_category_id = undefined;
        this.product_margin_id = undefined;
    }
}
