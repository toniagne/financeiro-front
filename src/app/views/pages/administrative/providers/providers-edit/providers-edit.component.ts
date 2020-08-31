// Angular
import {Component, OnInit, OnDestroy, Provider} from '@angular/core';
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
import {ProvidersModel} from '../../../../../core/model/providers.model';
import {Address} from '../../../../../core/auth';
import {NgBrazilValidators} from 'ng-brazil';

const TYPES: string[] =
  ['PF', 'PJ'];

@Component({
  selector: 'kt-providers-edit',
  templateUrl: './providers-edit.component.html'
})
export class ProvidersEditComponent implements OnInit {
  indicatorSubject = new BehaviorSubject<boolean>(false);
  formGroup: FormGroup;
  model: ProvidersModel;
  hasFormErrors = false;
  addressSubject = new BehaviorSubject<Address>(new Address());
  phonesSubject = new BehaviorSubject<any>([]);
  loading = false;
  occupations: any = [];
  active: any = [];
  inputCPF = false;
  inputCNPJ = false;
  orders: any = [];
  editing = false;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userFB: FormBuilder,
              private subheaderService: SubheaderService,
              private userService: UsersSystemService,
              private layoutUtilsService: LayoutUtilsService,
              private layoutConfigService: LayoutConfigService) {
    this.orders = TYPES;
    this.userService.getProviders().subscribe(res => {this.occupations = res.items});
    this.active = [
      {id: 1, title: 'ATIVO'},
      {id: 0, title: 'INATIVO'}
    ];
  }

  ngOnInit(): void {
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.loading = true;
        this.userService.getProviderById(id).subscribe(
            res => {
              this.model = res;
              this.editing = true;
              this.addressSubject.next(this.model.address[0]);
              this.phonesSubject.next(this.model.phones);
              this.loading = false;
              this.indicatorSubject.next(true);
              this.initUser();
            }
        )
      } else {
        this.model = new ProvidersModel();
        this.addressSubject.next(this.model.address);
        this.phonesSubject.next(this.model.phones);
        this.model.clear();
        this.indicatorSubject.next(true);
        this.initUser();
      }
    });
  }

  initUser() {

    this.createForm();
    if (!this.model.id) {
      this.subheaderService.setTitle('Criar um fornecedor');
      return;
    }
    this.subheaderService.setTitle('Editando o fornecedor:' + this.model.name);
    return;
  }
  /**
   * Create form
   */
  createForm() {
    if (this.editing){
      if (this.model.type === 'PJ'){
        this.inputCNPJ = true;
        this.inputCPF = false;
      } else {
        this.inputCNPJ = false;
        this.inputCPF = true;
      }
    }
    this.getSelectedOptionText(this.model.type);
    this.formGroup = this.userFB.group({
      name: [this.model.name, Validators.required],
      type: [{value: this.model.type, disabled: this.editing}, Validators.required],
      email: [this.model.email, Validators.required],
      active: [this.model.active, Validators.required],
      cpf: [this.model.cpf],
      ie: [this.model.ie],
      im: [this.model.im],
      cnpj: [this.model.cnpj],
      fantasy: [this.model.fantasy],
      description: [this.model.description]
    });
  }

  getComponentTitle() {
    let result = 'Criar um fornecedor';
    if (!this.model || !this.model.id) {
      return result;
    }

    result = `Editar o fornecedor:  ${this.model.name}`;
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
    const editedUser = this.prepareUser();

    if (editedUser.id > 0) {
      this.updateUser(editedUser, withBack);
      return;
    }
    this.userService.createProvider(editedUser).subscribe(newId => {
      const message = `Adicionado com sucesso.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
      if (newId) {
        this.loading = false;
        this.goBackWithId();
      }
    });

  }
  goBackWithId() {
    const url = `/cadastros/fornecedores`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  refreshUser(isNew: boolean = false, id = 0) {
    const url = `/cadastros/fornecedores`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }

  prepareUser(): ProvidersModel {
    const controls = this.formGroup.controls;
    const _field = new ProvidersModel();
    _field.clear();
    _field.id = this.model.id;
    _field.name = controls.name.value;
    _field.cnpj = controls.cnpj.value;
    _field.cpf = controls.cpf.value;
    _field.email = controls.email.value;
    _field.ie = controls.ie.value;
    _field.im = controls.im.value;
    _field.fantasy = controls.fantasy.value;
    _field.description = controls.description.value;
    _field.address = this.addressSubject.value;
    _field.phones = this.phonesSubject.value.phones;
    return _field;
  }
  updateUser(_user: ProvidersModel, withBack: boolean = false) {

    this.userService.updateProvider(_user).subscribe(
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
