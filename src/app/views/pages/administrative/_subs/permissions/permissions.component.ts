import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Address, AuthService} from '../../../../../core/auth';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../core/reducers';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService} from '../../../../../core/_base/crud';
import {PermissionsModel} from '../../../../../core/model/permissions.model';
import {debounceTime, tap} from 'rxjs/operators';
import {BanksModel} from '../../../../../core/model/banks.model';

@Component({
  selector: 'kt-permissions',
  templateUrl: './permissions.component.html'
})
export class PermissionsComponent implements OnInit {

  @Input() permissionsSubject: BehaviorSubject<any>;
  hasFormErrors = false;
  subjectResponse: any = [];
  form: FormGroup;
  labelPosition = 'before';
  /**
   * Component Costructor
   *
   * @param fb: FormBuilder
   * @param auth: AuthServiceProd
   * @param store: Store<AppState>
   * @param layoutUtilsService: LayoutUtilsService
   */
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private store: Store<AppState>,
              private userService: UsersSystemService,
              private layoutUtilsService: LayoutUtilsService) {
  }

  ngOnInit(): void {
    if (!this.permissionsSubject.value) {
      const newPermissions = new PermissionsModel();
      newPermissions.clear();
      this.permissionsSubject.next(newPermissions);
    }
    this.createForm();
    this.form.valueChanges
        .pipe(
            // tslint:disable-next-line:max-line-length
            debounceTime(150), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
            tap(() => {
              this.update();
            })
        )
        .subscribe();
  }

  get clientsForms() {
    return this.form.get('clients') as FormArray
  }

  createForm() {

    this.form = this.fb.group({
      clients: this.fb.group({
        create: [this.permissionsSubject.value.clients.create],
        delete: [this.permissionsSubject.value.clients.delete],
        view: [this.permissionsSubject.value.clients.view],
        edit: [this.permissionsSubject.value.clients.edit],
        add: [this.permissionsSubject.value.clients.add]
      }),
      providers: this.fb.group({
        create: [this.permissionsSubject.value.providers.create],
        delete: [this.permissionsSubject.value.providers.delete],
        view: [this.permissionsSubject.value.providers.view],
        edit: [this.permissionsSubject.value.providers.edit],
        add: [this.permissionsSubject.value.providers.add]
      }),
      services: this.fb.group({
        create: [this.permissionsSubject.value.services.create],
        delete: [this.permissionsSubject.value.services.delete],
        view: [this.permissionsSubject.value.services.view],
        edit: [this.permissionsSubject.value.services.edit],
        add: [this.permissionsSubject.value.services.add]
      }),
      proposals: this.fb.group({
        create: [this.permissionsSubject.value.proposals.create],
        delete: [this.permissionsSubject.value.proposals.delete],
        view: [this.permissionsSubject.value.proposals.view],
        edit: [this.permissionsSubject.value.proposals.edit],
        add: [this.permissionsSubject.value.proposals.add]
      }),
      bank_slips: this.fb.group({
        create: [this.permissionsSubject.value.bank_slips.create],
        delete: [this.permissionsSubject.value.bank_slips.delete],
        view: [this.permissionsSubject.value.bank_slips.view],
        edit: [this.permissionsSubject.value.bank_slips.edit],
        add: [this.permissionsSubject.value.bank_slips.add]
      }),
      fiscal_notes: this.fb.group({
        create: [this.permissionsSubject.value.fiscal_notes.create],
        delete: [this.permissionsSubject.value.fiscal_notes.delete],
        view: [this.permissionsSubject.value.fiscal_notes.view],
        edit: [this.permissionsSubject.value.fiscal_notes.edit],
        add: [this.permissionsSubject.value.fiscal_notes.add]
      }),
      bills_to_pay: this.fb.group({
        create: [this.permissionsSubject.value.bills_to_pay.create],
        delete: [this.permissionsSubject.value.bills_to_pay.delete],
        view: [this.permissionsSubject.value.bills_to_pay.view],
        edit: [this.permissionsSubject.value.bills_to_pay.edit],
        add: [this.permissionsSubject.value.bills_to_pay.add]
      }),
      bills_to_receive: this.fb.group({
        create: [this.permissionsSubject.value.bills_to_receive.create],
        delete: [this.permissionsSubject.value.bills_to_receive.delete],
        view: [this.permissionsSubject.value.bills_to_receive.view],
        edit: [this.permissionsSubject.value.bills_to_receive.edit],
        add: [this.permissionsSubject.value.bills_to_receive.add]
      }),
      contracts: this.fb.group({
        create: [this.permissionsSubject.value.contracts.create],
        delete: [this.permissionsSubject.value.contracts.delete],
        view: [this.permissionsSubject.value.contracts.view],
        edit: [this.permissionsSubject.value.contracts.edit],
        add: [this.permissionsSubject.value.contracts.add]
      }),
      configs: this.fb.group({
        create: [this.permissionsSubject.value.configs.create],
        delete: [this.permissionsSubject.value.configs.delete],
        view: [this.permissionsSubject.value.configs.view],
        edit: [this.permissionsSubject.value.configs.edit],
        add: [this.permissionsSubject.value.configs.add]
      }),
      employees: this.fb.group({
        create: [this.permissionsSubject.value.employees.create],
        delete: [this.permissionsSubject.value.employees.delete],
        view: [this.permissionsSubject.value.employees.view],
        edit: [this.permissionsSubject.value.employees.edit],
        add: [this.permissionsSubject.value.employees.add]
      })
    });
  }

  update() {
    this.hasFormErrors = false;
    const controls = this.form.controls;
    const newForm = new PermissionsModel();
    newForm.clients = this.form.get(['clients']).value;
    newForm.providers = this.form.get(['providers']).value;
    newForm.services = this.form.get(['services']).value;
    newForm.proposals = this.form.get(['proposals']).value;
    newForm.bank_slips = this.form.get(['bank_slips']).value;
    newForm.fiscal_notes = this.form.get(['fiscal_notes']).value;
    newForm.bills_to_pay = this.form.get(['bills_to_pay']).value;
    newForm.bills_to_receive = this.form.get(['bills_to_receive']).value;
    newForm.contracts = this.form.get(['contracts']).value;
    newForm.configs = this.form.get(['configs']).value;
    newForm.employees = this.form.get(['employees']).value;
    this.permissionsSubject.next(newForm);
  }

}
