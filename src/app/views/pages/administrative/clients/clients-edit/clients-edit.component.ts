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
import {ClientsModel} from '../../../../../core/model/clients.model';
import {Address} from '../../../../../core/auth';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

const TYPES: string[] =
  ['PF', 'PJ'];

@Component({
  selector: 'kt-clients-edit',
  templateUrl: './clients-edit.component.html'
})
export class ClientsEditComponent implements OnInit {
  indicatorSubject = new BehaviorSubject<boolean>(false);
  loading = new BehaviorSubject<boolean>(false);
  formGroup: FormGroup;
  clients: ClientsModel;
  inputCNPJ = false;
  inputCPF = false;
  cities: any = [];
  states: any = [];
  orders: any = [];
  active: any = [];
  editing = false;
  hasFormErrors = false;

  addressSubject = new BehaviorSubject<Address>(new Address());
  phonesSubject = new BehaviorSubject<any>([]);
  contactsSubject = new BehaviorSubject<any>([]);

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userFB: FormBuilder,
              private subheaderService: SubheaderService,
              private userService: UsersSystemService,
              private layoutUtilsService: LayoutUtilsService,
              private layoutConfigService: LayoutConfigService) {
              this.orders = [
                { id: 'PF', name: 'PF'},
                { id: 'PJ', name: 'PJ'}
              ];
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
        this.userService.getClientById(id).subscribe(
          res => {
            this.editing = true;
            this.loading.next(false);
            this.indicatorSubject.next(true)
            this.clients = res;
            this.addressSubject.next(this.clients.address[0]);
            this.phonesSubject.next(this.clients.phone);
            this.contactsSubject.next(this.clients.contacts);
            this.initItem();
          }
        )
      } else {
        this.clients = new ClientsModel();
        this.addressSubject.next(this.clients.address);
        this.phonesSubject.next(this.clients.phone);
        this.contactsSubject.next(this.clients.contacts);
        this.clients.clear();
        this.indicatorSubject.next(true);
        this.initItem();
      }
    });
  }

  initItem() {
    this.loading.next(false);
    if (this.clients.type === 'PJ'){
      this.inputCNPJ = true;
      this.inputCPF = false;
    } else {
      this.inputCNPJ = false;
      this.inputCPF = true;
    }
    this.createForm();
    if (!this.clients.id) {
      this.subheaderService.setTitle('Criar um cliente');
      return;
    }
    this.subheaderService.setTitle('Editar Cliente');
    return;
  }
  /**
   * Create form
   */
  createForm() {
    this.formGroup = this.userFB.group({
      name: [this.clients.name, Validators.required],
      type: [this.clients.type, Validators.required],
      email: [this.clients.email, Validators.required],
      cpf: [this.clients.cpf, NgBrazilValidators.cpf],
      ie: [this.clients.ie],
      im: [this.clients.im],
      cnpj: [this.clients.cnpj, NgBrazilValidators.cnpj],
      fantasy: [this.clients.fantasy],
      billing: [this.clients.billing],
      description: [this.clients.description],
      active: [this.clients.active, Validators.required],
    });
  }

  getComponentTitle() {
    let result = 'Criar um cliente';
    if (!this.clients || !this.clients.id) {
      return result;
    }

    result = `Editar cliente - ${this.clients.name}`;
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
      this.loading.next(false);
      this.hasFormErrors = true;
      return;
    }
    const edit = this.prepareUser();

    if (edit.id > 0) {
      this.update(edit, withBack);
      return;
    }
    this.userService.createClient(edit).subscribe(newId => {
      if (newId.status){
        this.hasFormErrors = true;
        return;
      }
      const message = `Cadastro adicionado com sucesso..`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
      if (newId) {
        this.loading.next(false);
        this.goBackWithId();
      }
    });

  }
  goBackWithId() {
    const url = `/cadastros/clientes`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  refreshUser(isNew: boolean = false, id = 0) {
    const url = `/cadastros/clientes`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }

  prepareUser(): ClientsModel {
    const controls = this.formGroup.controls;
    const _field = new ClientsModel();
    _field.clear();
    _field.id = this.clients.id;
    _field.name = controls.name.value;
    _field.cnpj = controls.cnpj.value;
    _field.cpf = controls.cpf.value;
    _field.email = controls.email.value;
    _field.ie = controls.ie.value;
    _field.im = controls.im.value;
    _field.type = controls.type.value;
    _field.fantasy = controls.fantasy.value;
    _field.description = controls.description.value;
    _field.address = this.addressSubject.value;
    _field.phones = this.phonesSubject.value.phone;
    _field.contacts = this.contactsSubject.value.contact;
    _field.billing = controls.billing.value;
    return _field;
  }

  update(_item: ClientsModel, withBack: boolean = false) {

    this.userService.updateClient(_item).subscribe(
        result => {
          this.loading.next(false);
          const message = `Cadastro editado com sucesso...`;
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

  getSelectedOptionText(event) {
    if (event === 'PF'){
      this.inputCPF = true;
      this.inputCNPJ  = false;
    } else {
      this.inputCPF = false;
      this.inputCNPJ  = true;
    }
  }

}
