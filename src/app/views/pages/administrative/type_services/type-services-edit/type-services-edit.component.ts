// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// RxJS
import {BehaviorSubject, from, Observable, of, Subscription} from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {map, startWith} from 'rxjs/operators';
import {ServicesType} from '../../../../../core/model/servicesType.model';

@Component({
  selector: 'kt-type-services-edit',
  templateUrl: './type-services-edit.component.html'
})
export class TypeServicesEditComponent implements OnInit {
  indicatorSubject = new BehaviorSubject<boolean>(false);
  formGroup: FormGroup;
  model: ServicesType;
  hasFormErrors = false;
  loading = false;
  editing = false;
  errosForms = [];
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private userFB: FormBuilder,
      private subheaderService: SubheaderService,
      private userService: UsersSystemService,
      private layoutUtilsService: LayoutUtilsService,
      private layoutConfigService: LayoutConfigService
  ) {
  }

  ngOnInit(): void {
    const routeSubscription = this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.editing = true;
        this.loading = true;
        this.userService.getTypesServicesById(id).subscribe(
            res => {
              this.model = res;
              this.loading = false;
              this.indicatorSubject.next(true);
              this.initItem();
            }
        )
      } else {
        this.model = new ServicesType();
        this.model.clear();
        this.indicatorSubject.next(true);
        this.initItem();
      }
    });
  }

  initItem() {
    this.getComponentTitle();
    this.createForm();
  }

  createForm() {
    this.formGroup = this.userFB.group({
      name: [this.model.name, Validators.required]
    });
  }

  getComponentTitle() {
    let result = 'Criar novo tipo de serviço';
    if (!this.model || !this.model.id) {
      return result;
    }
    result = `Editar tipo de serviço - ${this.model.name}`;
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

    this.userService.createTypesServices(this.formGroup.value).subscribe(
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

  prepareUser(): ServicesType {
    const controls = this.formGroup.controls;
    const _itemUpdated = new ServicesType();
    _itemUpdated.clear();
    _itemUpdated.id = this.model.id;
    _itemUpdated.name = controls.name.value;
    return _itemUpdated;
  }

  update(_item, withBack: boolean = false) {
    this.userService.updateTypesServices(_item).subscribe(
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
    const url = `/cadastros/tipo-de-servicos`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }
}
