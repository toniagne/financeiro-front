import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LayoutConfigService, SubheaderService} from '../../../../../../core/_base/layout';
import {UsersSystemService} from '../../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../../core/_base/crud';
import {BillsReceivesModel} from '../../../../../../core/model/bills-receives.model';
import {FinancesService} from '../../../../../../core/services/finances.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ServicesModel} from '../../../../../../core/model/services.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'kt-receive-edit',
  templateUrl: './receive-edit.component.html'
})
export class ReceiveEditComponent implements OnInit {
  formGroup: FormGroup;
  model: BillsReceivesModel;
  recurrences$: Observable<[]>;
  clients$: Observable<[]>;
  categories$: Observable<[]>;
  negotiationTypes$: Observable<[]>;
  services$: Observable<[]>;
  hasFormErrors = false;
  isLoadingCategories = true;
  loading = false;
  typeClient = false;
  typeProvider = false;
  detParcel = false;
  detMonthly = false;
  detOnly = false;
  detYarly = false;
  detWeek = false;
  biweekly = false;
  today = new Date();
  sixMonthsAgo = new Date();
  constructor(
      public dialogRef: MatDialogRef<ReceiveEditComponent>,
      private activatedRoute: ActivatedRoute,
              private router: Router,
              private userFB: FormBuilder,
              private userService: UsersSystemService,
              private subheaderService: SubheaderService,
              private service: FinancesService,
              private layoutUtilsService: LayoutUtilsService,
              private layoutConfigService: LayoutConfigService,
              public dialog: MatDialog) {
        this.recurrences$ = this.userService.getRecurrences().pipe(map(recurrence => recurrence.items ));
        this.clients$ = this.userService.getClients().pipe(map(client => client.items ));
        this.categories$ = this.userService.getPaymentCategory('receive').pipe(map(category => category.items ));
        this.negotiationTypes$ = this.userService.getNegociationTypes().pipe(map(negotiation => negotiation.items ));
        this.services$ = this.userService.getServices().pipe(map(services => services.items ));
  }

  ngOnInit(): void {
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.loading = true;
        this.service.getReceivesById(id).subscribe(
            res => {
              this.loading = false;
              this.model = res;
              this.initItem();
            }
        )
      } else {
        this.model = new BillsReceivesModel();
        this.model.clear();
        this.initItem();
      }
    });
  }

  initItem() {
    this.createForm();
    if (!this.model.id) {
      this.subheaderService.setTitle('Lançar conta à receber');
      return;
    }
    this.subheaderService.setTitle('Editar');
    return;
  }
  /**
   * Create form
   */
  createForm() {
    const currentDate = new Date();
    this.formGroup = this.userFB.group({
      client_id: [this.model.client_id],
      recurrence_id: [this.model.recurrence_id, Validators.required],
      payment_category_id: [this.model.payment_category_id, Validators.required],
      negotiation_type_id: [this.model.negotiation_type_id, Validators.required],
      amount: [this.model.amount, Validators.required],
      description: [this.model.description],
      due: [this.model.due],
      yarly_due: [this.model.yarly_due],
      issue: [currentDate],
      date_competency: [this.model.date_competency],
      day: [this.model.day],
      weekly_due: [this.model.weekly_due],
      first_bi_weekly_due: [this.model.first_bi_weekly_due],
      second_bi_weekly_due: [this.model.second_bi_weekly_due],
      yearly_due: [this.model.yearly_due],
      parcels: [this.model.parcels],
      service_id: [this.model.service_id, Validators.required],
      attachment: []
    });
  }

  getComponentTitle() {
    let result = 'Criar uma conta à receber';
    if (!this.model || !this.model.id) {
      return result;
    }

    result = `Editar conta - ${this.model.n_document}`;
    return result;
  }

  onSumbit(withBack: boolean = false) {
    this.hasFormErrors = false;
    this.loading = true;
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
    this.service.craeteReceives(this.formGroup.value).subscribe(newId => {
      if (newId.status){
        this.hasFormErrors = true;
        return;
      }
      this.loading = false;
      const message = `Pagamento lançado com sucesso..`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
      if (newId) {
        this.dialogRef.close();
      }
    });

  }
  goBackWithId() {
    this.ngOnInit();
    this.dialogRef.close();
  }

  refreshUser(isNew: boolean = false, id = 0) {
    const url = `/financas/contas-receber`;
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
  }

  prepareUser(): BillsReceivesModel {
    const controls = this.formGroup.controls;
    const _services = new BillsReceivesModel();
    _services.clear();
    _services.id = this.model.id;
    _services.description = controls.description.value;
    _services.amount = controls.amount.value;
    _services.due = controls.due.value;
    _services.issue = controls.issue.value;
    _services.client_id = controls.client_id.value;
    _services.recurrence_id = controls.recurrence_id.value;
    _services.service_id = controls.service_id.value;
    _services.payment_category_id = controls.payment_category_id.value;
    _services.negotiation_type_id = controls.negotiation_type_id.value;
    _services.date_competency = controls.date_competency.value;
    _services.day = controls.day.value;
    _services.parcels = controls.parcels.value;
    _services.weekly_due = controls.weekly_due.value;
    _services.first_bi_weekly_due = controls.first_bi_weekly_due.value;
    _services.second_bi_weekly_due = controls.second_bi_weekly_due.value;
    _services.yearly_due = controls.yearly_due.value;
    return _services;
  }

  update(_item, withBack: boolean = false) {
  }

  onAlertClose($event) {
    this.hasFormErrors = false;
  }

  filterSelects(val: string): any {
  }

  getType(arg){
    if (arg === 'client'){
      this.typeClient = true;
      this.typeProvider = false;
    }else{
      this.typeClient = false;
      this.typeProvider = true;
    }
  }

  getComplement(event){
    switch (event) {
      case 19:
        this.detOnly = true
        this.detParcel = false;
        this.detMonthly = false;
        this.detWeek = false;
        this.biweekly = false;
        this.detYarly = false;
        break;
      case 18:
        this.detParcel = true;
        this.detMonthly = false;
        this.detOnly = false;
        this.detWeek = false;
        this.biweekly = false;
        this.detYarly = false;
        break;
      case 12:
        this.detMonthly = true;
        this.detParcel = false;
        this.detOnly = false;
        this.detWeek = false;
        this.biweekly = false;
        this.detYarly = false;
        break;
      case 17:
        this.biweekly = true;
        this.detMonthly = false;
        this.detParcel = false;
        this.detOnly = false;
        this.detWeek = false;
        this.detYarly = false;
        break;
      case 15:
        this.biweekly = false;
        this.detMonthly = true;
        this.detParcel = false;
        this.detOnly = false;
        this.detWeek = false;
        this.detYarly = false;
        break;
      case 11:
        this.detWeek = true;
        this.detMonthly = false;
        this.detParcel = false;
        this.detOnly = false;
        this.biweekly = false;
        this.detYarly = false;
        break;
      case 9:
        this.detYarly = true;
        this.detWeek = false;
        this.detMonthly = false;
        this.detParcel = false;
        this.detOnly = false;
        this.biweekly = false;
        break;
    }
  }

  addClient(): any{
    console.log('abrecadastro');
  }

  openDatePicker(dp) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp?:any) {
    const controls = this.formGroup.controls;
    controls.yearly_due.setValue(eventData);
    dp.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
