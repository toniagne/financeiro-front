import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicesCategories} from '../../../../../core/model/servicesCategories.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LayoutConfigService, SubheaderService} from '../../../../../core/_base/layout';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {ChargingsModel} from '../../../../../core/model/chargings.model';
import {map} from 'rxjs/operators';
import {Moment} from 'moment';
import {MatDatepicker} from '@angular/material/datepicker';

@Component({
  selector: 'kt-chargings-edit',
  templateUrl: './chargings-edit.component.html',
})
export class ChargingsEditComponent implements OnInit {

  indicatorSubject = new BehaviorSubject<boolean>(false);
  clients$: Observable<[]>;
  formGroup: FormGroup;
  model: ChargingsModel;
  hasFormErrors = false;
  loading = false;
  errosForms = [];
  editing = false;
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private userFB: FormBuilder,
      private subheaderService: SubheaderService,
      private userService: UsersSystemService,
      private layoutUtilsService: LayoutUtilsService,
      private layoutConfigService: LayoutConfigService
  ) {
    this.clients$ = this.userService.getClients().pipe(map(client => client.items ));
  }

  ngOnInit(): void {
    const routeSubscription = this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.model = new ChargingsModel();
      this.model.clear();
      this.indicatorSubject.next(true);
      this.initItem();
    });
  }

  initItem() {
    this.getComponentTitle();
    this.createForm();
  }

  createForm() {
    this.formGroup = this.userFB.group({
      client_id: [this.model.client_id, Validators.required],
      period: [this.model.period, Validators.required],
    });
  }

  getComponentTitle() {
    const result = 'Enviar uma cobrança';
    if (!this.model || !this.model.id) {
      return result;
    }
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

    this.userService.createChargings(edit).subscribe(
        newId => {
          console.log(newId)
          this.loading = false;
          const message = `Cadastro adicionado com sucesso..`;
          this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);

        },
        error => {
          this.hasFormErrors = true;
          this.errosForms = error.error.erros;
          return;
        }
    );

  }

  prepareUser(): ChargingsModel {
    const controls = this.formGroup.controls;
    const _itemUpdated = new ChargingsModel();
    _itemUpdated.clear();
    _itemUpdated.id = this.model.id;
    _itemUpdated.client_id = controls.client_id.value;
    _itemUpdated.period = controls.period.value;
    return _itemUpdated;
  }

  onAlertClose($event) {
    this.hasFormErrors = false;
  }

  goBackWithId() {
    const url = `/financas/cobrancas`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  openDatePicker(dp) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp?:any) {
    const controls = this.formGroup.controls;
    controls.period.setValue(eventData);
    dp.close();
  }
}
