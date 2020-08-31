// Angular
import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
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
import {EmployeesModel} from '../../../../../core/model/employees.model';
import {PhonesModel} from '../../../../../core/model/phones.model';
import {Address, SocialNetworks} from '../../../../../core/auth';
import {BanksModel} from '../../../../../core/model/banks.model';
import {ProposalsModel} from '../../../../../core/model/proposals.model';
import {UploadService} from '../../../../../core/services/upload.service';
import {NgBrazilValidators} from 'ng-brazil';

@Component({
  selector: 'kt-employees-edit',
  templateUrl: './employees-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesEditComponent implements OnInit {
  indicatorSubject = new BehaviorSubject<boolean>(false);
  formEmployess: FormGroup;
  model: EmployeesModel;
  hasFormErrors = false;
  addressSubject = new BehaviorSubject<Address>(new Address());
  phonesSubject = new BehaviorSubject<any>([]);
  banksSubject = new BehaviorSubject<any>([]);
  loading = false;
  occupations: any = [];
  statusItens: any = [];
  workflows: any = [];
  types: any = [];
  typeContract: any = [];
  company = false;
  person = false;
  editing = false;
  loadImgProfile = false;
  loadImgDocument = false;
  loadImgAddress = false;
  loadImgGraduation = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userFB: FormBuilder,
              private subheaderService: SubheaderService,
              private userService: UsersSystemService,
              private layoutUtilsService: LayoutUtilsService,
              private layoutConfigService: LayoutConfigService,
              private uploadService: UploadService) {
    this.userService.getAllServiceType().subscribe(res => { this.types = res.items;});
    this.workflows =  [
      { id: 'homeoffice', name: 'HOMEOFFICE'},
      { id: 'fulltime', name: 'ESCRITÓRIO'},
    ];
    this.typeContract = [
      { id: 'outsourced', name: 'TERCERIZADO'},
      { id: 'fixed', name: 'CLT'},
    ]
    this.statusItens = [
      { id: 1, name: 'ATIVADO'},
      { id: 0, name: 'DESATIVADO'},
    ]
  }

  ngOnInit(): void {
    this.userService.getOccupations().subscribe(
        res => {
          this.occupations = res.items
        });
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.editing = true;
        this.loading = true;
            this.userService.getEmployeesById(id).subscribe(
          res => {
            this.model = res;
            this.addressSubject.next(this.model.address[0]);
            this.phonesSubject.next(this.model.phones);
            this.banksSubject.next(this.model.banks);
            this.indicatorSubject.next(true);
            this.loading = false;
            this.initUser();
          }
        )
      } else {
        this.model = new EmployeesModel();
        this.addressSubject.next(this.model.address);
        this.phonesSubject.next(this.model.phones);
        this.banksSubject.next(this.model.banks);
        this.model.clear();
        this.indicatorSubject.next(true);
        this.initUser();
      }
    });
  }

  initUser() {
    this.createForm();
    if (!this.model.id) {
      this.subheaderService.setTitle('Criar um funcionario');
      return;
    }
    this.subheaderService.setTitle('Editar Funcionário' + this.model.name);
    return;
  }
  /**
   * Create form
   */
  createForm() {
    if (this.editing){
      this.getTypeContract(this.model.pay_type);
    }
    this.formEmployess = this.userFB.group({
      name: [this.model.name, Validators.required],
      cpf: [this.model.cpf, NgBrazilValidators.cpf],
      cnpj: [this.model.cnpj, NgBrazilValidators.cnpj],
      email: [this.model.email, Validators.required],
      occupattion_id: [this.model.occupattion_id, Validators.required],
      workflow: [this.model.workflow, Validators.required],
      observation: [this.model.observation],
      status: [this.model.status, Validators.required],
      salary: [this.model.salary, Validators.required],
      graduation_details: [this.model.graduation_details],
      pay_type: [this.model.pay_type],
      pay_day: [this.model.pay_day],
      img_profile: [this.model.img_profile],
      img_document: [this.model.img_document],
      img_address: [this.model.img_address],
      img_graduation: [this.model.img_graduation],
      contract_type: [this.model.contract_type, Validators.required],
      attachment_profile: [],
      attachment_document: [],
      attachment_graduation: [],
      attachment_address: [],
    });
  }

  getComponentTitle() {
    let result = 'Criar um funcionário';
    if (!this.model || !this.model.id) {
      return result;
    }

    result = `Editar funcionário - ${this.model.name}`;
    return result;
  }

  onSumbit(withBack: boolean = false) {
    this.loading = true;
    this.hasFormErrors = false;
    const controls = this.formEmployess.controls;
    console.log(controls);
    /** check form */
    if (this.formEmployess.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      return;
    }
    const editedUser = this.prepareUser();

    if (editedUser.id > 0) {
      this.updateUser(editedUser);
      return;
    }
    this.userService.createEmployees(editedUser).subscribe(newId => {
      const message = `Adicionado com sucesso.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
      if (newId) {
        this.loading = false;
        this.goBackWithId();
      }
    });

  }
  goBackWithId() {
    const url = `/cadastros/funcionarios`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  refreshUser(isNew: boolean = false, id = 0) {
    const url = `/cadastros/funcionarios`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }

  prepareUser(): EmployeesModel {
    const controls = this.formEmployess.controls;
    const _employee = new EmployeesModel();
    _employee.clear();
    _employee.id = this.model.id;
    _employee.name = controls.name.value;
    _employee.email = controls.email.value;
    _employee.cpf = controls.cpf.value;
    _employee.cnpj = controls.cnpj.value;
    _employee.workflow = controls.workflow.value;
    _employee.observation = controls.observation.value;
    _employee.status = controls.status.value;
    _employee.salary = controls.salary.value;
    _employee.graduation_details = controls.graduation_details.value;
    _employee.pay_type = controls.pay_type.value;
    _employee.pay_day = controls.pay_day.value;
    _employee.img_profile = controls.img_profile.value;
    _employee.img_document = controls.img_document.value;
    _employee.img_address = controls.img_address.value;
    _employee.img_graduation = controls.img_graduation.value;
    _employee.occupattion_id = controls.occupattion_id.value;
    _employee.contract_type = controls.contract_type.value;
    _employee.occupattion_id = controls.occupattion_id.value;
    _employee.address = this.addressSubject.value;
    _employee.banks = this.banksSubject.value.banks;
    _employee.phones = this.phonesSubject.value.phone;
    return _employee;
  }

  updateUser(_employee: EmployeesModel) {

    this.userService.updateEmployee(_employee).subscribe(
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

  getTypeContract(data){
    switch(data){
      case 'outsourced': this.company = true; this.person = false;  break;
      case 'fixed': this.company = false; this.person = true; break;
    }
  }


  uploadFileProfile(){
    this.loadImgProfile = true;
    const controls = this.formEmployess.controls;
    const _itemUpdated = new EmployeesModel();
    this.uploadService.upload(controls.attachment_profile.value, 'employees').subscribe(
        res => {
          this.formEmployess.patchValue({
            img_profile: res,
          })
        },
        () => {},
        () => {
          this.loadImgProfile = false;
        }
    )
  }

  uploadFileDocument(){
    this.loadImgDocument = true;
    const controls = this.formEmployess.controls;
    const _itemUpdated = new EmployeesModel();
    this.uploadService.upload(controls.attachment_document.value, 'employees').subscribe(
        res => {
          this.formEmployess.patchValue({
            img_document: res,
          })
        },
        () => {},
        () => {
          this.loadImgDocument = false;
        }
    )
  }

  uploadFileAddress(){
    this.loadImgAddress = true;
    const controls = this.formEmployess.controls;
    const _itemUpdated = new EmployeesModel();
    this.uploadService.upload(controls.attachment_address.value, 'employees').subscribe(
        res => {
          this.formEmployess.patchValue({
            img_address: res,
          })
        },
        () => {},
        () => {
          this.loadImgAddress = false;
        }
    )
  }

  uploadFileGraduation(){
    this.loadImgGraduation = true;
    const controls = this.formEmployess.controls;
    const _itemUpdated = new EmployeesModel();
    this.uploadService.upload(controls.attachment_graduation.value, 'employees').subscribe(
        res => {
          this.formEmployess.patchValue({
            img_graduation: res,
          })
        },
        () => {},
        () => {
          this.loadImgGraduation = false;
        }
    )
  }
}
