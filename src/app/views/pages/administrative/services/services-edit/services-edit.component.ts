// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// RxJS
import {BehaviorSubject, from, Observable, of as observableOf, of, Subject, Subscription} from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {ServicesModel} from '../../../../../core/model/services.model';
import {catchError, finalize, map, startWith, switchMap} from 'rxjs/operators';
import {ServicesCategories} from '../../../../../core/model/servicesCategories.model';
import {isSuccess} from 'angular-in-memory-web-api';

@Component({
  selector: 'kt-services-edit',
  templateUrl: './services-edit.component.html'
})
export class ServicesEditComponent implements OnInit {
  indicatorSubject = new BehaviorSubject<boolean>(false);
  loading = new BehaviorSubject<boolean>(false);
  formGroup: FormGroup;
  service: ServicesModel;
  types: any = [];
  active: any = [];
  recurrences: any = [];
  categories: ServicesCategories;
  hasFormErrors = false;
  serviceCategories: Observable<string[]>;
  isLoadingCategories = true;
  editing = false;
  orders: [];
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userFB: FormBuilder,
              private subheaderService: SubheaderService,
              private userService: UsersSystemService,
              private layoutUtilsService: LayoutUtilsService,
              private layoutConfigService: LayoutConfigService) {
              this.userService.getAllCategories().subscribe(res => { this.orders = res.items;});
              this.userService.getAllServiceType().subscribe(res => { this.types = res.items;});
              this.userService.getRecurrences().subscribe(res => {this.recurrences = res.items; });
              this.active = [
                {id: 1, title: 'ATIVO'},
                {id: 0, title: 'INATIVO'}
              ];
  }

  ngOnInit(): void {
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.loading.next(true);
        this.editing = true;
        this.userService.getServiceById(id).subscribe(
          res => {
            this.loading.next(false);
            this.service = res;
            this.indicatorSubject.next(true);
            this.initItem();
          },
        );
      } else {
        this.service = new ServicesModel();
        this.service.clear();
        this.loading.next(false);
        this.indicatorSubject.next(true);
        this.initItem();
      }
    });
  }

  initItem() {
    this.createForm();
    if (!this.service.id) {
      this.subheaderService.setTitle('Criar um serviço');
      return;
    }
    this.subheaderService.setTitle('Editar Serviço');
    return;
  }
  /**
   * Create form
   */
  createForm() {
    this.formGroup = this.userFB.group({
      name: [this.service.name, Validators.required],
      price: [this.service.price, Validators.required],
      service_category_id: [this.service.service_category_id, Validators.required],
      service_type_id: [this.service.service_type_id, Validators.required],
      recurrence_id: [this.service.recurrence_id, Validators.required],
      observation: [this.service.observation, Validators.required],
      active: [this.service.active, Validators.required],
    });
  }

  getComponentTitle() {
    let result = 'Criar um serviço';
    if (!this.service || !this.service.id) {
      return result;
    }

    result = `Editar serviço - ${this.service.name}`;
    return result;
  }

  onSumbit(withBack: boolean = false) {
    this.hasFormErrors = false;
    this.loading.next(true);
    const controls = this.formGroup.controls;
    /** check form */
    if (this.formGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      this.loading.next(false);
      return;
    }
    const edit = this.prepareUser();

    if (edit.id > 0) {
      this.update(edit, withBack);
      return;
    }
    this.userService.createService(this.formGroup.value).subscribe(newId => {
      if (newId.status){
        this.hasFormErrors = true;
        return;
      }
      this.loading.next(false);
      const message = `Cadastro adicionado com sucesso..`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
      if (newId) {
        this.goBackWithId();
      }
    });

  }
  goBackWithId() {
    const url = `/cadastros/servicos`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  refreshUser(isNew: boolean = false, id = 0) {
    const url = `/cadastros/servicos`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }

  prepareUser(): ServicesModel {
    const controls = this.formGroup.controls;
    const _services = new ServicesModel();
    _services.clear();
    _services.id = this.service.id;
    _services.name = controls.name.value;
    _services.price = controls.price.value;
    _services.service_category_id = controls.service_category_id.value;
    _services.service_type_id = controls.service_type_id.value;
    _services.recurrence_id = controls.recurrence_id.value;
    _services.observation = controls.observation.value;
    _services.active = controls.active.value;
    return _services;
  }

  update(_item, withBack: boolean = false) {
    this.userService.updateServices(_item).subscribe(
        result => {
          this.loading.next(false);
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

  filterSelects(val: string): any {
    this.userService.getAllCategories().subscribe(
      res => {
        this.categories = res;
        return;
      }
    )
  }

}
