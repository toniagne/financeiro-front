import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LayoutConfigService, SubheaderService} from '../../../../../core/_base/layout';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {ProductsModel} from '../../../../../core/model/products.model';
import {Address} from '../../../../../core/auth';

@Component({
  selector: 'kt-products-edit',
  templateUrl: './products-edit.component.html'
})
export class ProductsEditComponent implements OnInit {

  indicatorSubject = new BehaviorSubject<boolean>(false);
  detailsSubject = new BehaviorSubject<any>([]);
  formGroup: FormGroup;
  model: ProductsModel;
  hasFormErrors = false;
  loading = false;
  errosForms = [];
  productCategories: any = [];
  productMargins: any = [];
  statusItens: any = [];
  editing = false;
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private subheaderService: SubheaderService,
      private services: UsersSystemService,
      private layoutUtilsService: LayoutUtilsService,
  ) {
    this.services.getProductCategory().subscribe(res => { this.productCategories = res;});
    this.services.getProductMargins().subscribe(res => { this.productMargins = res;});
    this.statusItens = [
      { id: 1, name: 'ATIVADO'},
      { id: 0, name: 'DESATIVADO'},
    ]
  }

  ngOnInit(): void {
    const routeSubscription = this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.loading = true;
        this.editing = true;
        this.services.getProductById(id).subscribe(
            res => {
              this.model = res;
              this.loading = false;
              this.indicatorSubject.next(true);
              this.detailsSubject.next(res.details);
              this.initItem();
            }
        )
      } else {
        this.indicatorSubject.next(true);
        this.model = new ProductsModel();
        this.model.clear();
        this.initItem();
      }
    });
  }

  initItem() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      product_category_id: [this.model.product_category_id, Validators.required],
      product_margin_id: [this.model.product_margin_id],
      name: [this.model.name, Validators.required],
      value: [this.model.value, Validators.required],
      fixed_margin: [this.model.fixed_margin, Validators.required],
      profit: [this.model.profit, Validators.required],
      currence_rate: [this.model.currence_rate, Validators.required],
      price: [this.model.price, Validators.required],
      observation: [this.model.observation, Validators.required],
      status: [this.model.status, Validators.required]
    });
  }

  getComponentTitle() {
    let result = 'Cadastrar um novo produto';
    if (!this.model || !this.model.id) {
      return result;
    }
    result = `Editar produto - ${this.model.name}`;
    return result;
  }

  onSumbit(withBack: boolean = false) {
    this.loading = true;
    this.hasFormErrors = false;
    const controls = this.formGroup.controls;
    /** check form */
    if (this.formGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    }

    const edit = this.prepareUser();

    if (edit.id > 0) {
      this.update(edit, withBack);
      return;
    }

    this.services.createProduct(edit).subscribe(
        newId => {
          this.loading = false;
          const message = `Cadastro adicionado com sucesso..`;
          this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
          if (newId) {
            this.goBackWithId();
          }
        },
        error => {
          this.hasFormErrors = true;
          this.errosForms = error.error.erros;
          return;
        }
    );

  }

  prepareUser(): ProductsModel {
    const controls = this.formGroup.controls;
    const _product = new ProductsModel();
    _product.clear();
    _product.id = this.model.id;
    _product.name = controls.name.value;
    _product.product_category_id = controls.product_category_id.value;
    _product.fixed_margin = controls.fixed_margin.value;
    _product.profit = controls.profit.value;
    _product.currence_rate = controls.currence_rate.value;
    _product.name = controls.name.value;
    _product.value = controls.value.value;
    _product.price = controls.price.value;
    _product.observation = controls.observation.value;
    _product.status = controls.status.value
    _product.details = this.detailsSubject.value.details
    return _product;
  }

  update(_item, withBack: boolean = false) {
    console.log(_item);
    this.services.updateProduct(_item).subscribe(
        result => {
          this.loading = false;
          const message = `Cadastro editado com sucesso..`;
          this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
          if (result) {
            this.goBackWithId();
          }
        }
    )
  }

  onAlertClose($event) {
    this.hasFormErrors = false;
  }

  goBackWithId() {
    const url = `/cadastros/produtos`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  getProductValue(){
    const value = this.formGroup.get('value').value;
    const rate = this.formGroup.get('currence_rate').value;
    const profit = this.formGroup.get('profit').value / 100;
    const fixedMargin = this.formGroup.get('fixed_margin').value;

    const calc1 = value * rate;
    const percentual = calc1 * profit;
    const total = calc1 + percentual + fixedMargin;

    console.log(calc1, percentual)

    this.formGroup.patchValue({
      price: Math.round(total)
    });
  }

}
