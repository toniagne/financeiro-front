import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LayoutConfigService, SubheaderService} from '../../../../../core/_base/layout';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {ContractsModel} from '../../../../../core/model/contracts.model';
import {UploadService} from '../../../../../core/services/upload.service';
import {ProposalsModel} from '../../../../../core/model/proposals.model';
import {BehaviorSubject} from 'rxjs';

const TYPES: any[] = [
  {id: 'employee', title: 'FUNCIONÁRIO'},
  {id: 'provider', title: 'FORNECEDOR'},
];
@Component({
  selector: 'kt-contracts-edit',
  templateUrl: './contracts-edit.component.html'
})
export class ContractsEditComponent implements OnInit {
  indicatorSubject = new BehaviorSubject<boolean>(false);
  formGroup: FormGroup;
  model: ContractsModel;
  hasFormErrors = false;
  loading = false;
  errosForms = [];
  selectEmployee = false;
  selectProvider = false;
  providers = [];
  employees = [];
  types: any[] = [];
  status: any[] = [];
  editing = false;
  loadingFile = false;
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private userFB: FormBuilder,
      private subheaderService: SubheaderService,
      private userService: UsersSystemService,
      private layoutUtilsService: LayoutUtilsService,
      private uploadService: UploadService
  ) {
    this.userService.getProviders().subscribe( res => { this.providers = res.items  });
    this.userService.getEmployees().subscribe( res => { this.employees = res.items  });
    this.types = [
      {id: 'employee', name: 'FUNCIONÁRIO'},
      {id: 'provider', name: 'FORNECEDOR'},
    ];
    this.status = [
      {id: 1, name: 'ATIVO'},
      {id: 0, name: 'DESATIVADO'},
    ];
  }

  ngOnInit(): void {
    const routeSubscription = this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.loading = true;
        this.userService.getContractById(id).subscribe(
            res => {
              this.model = res;
              this.loading = false;
              this.editing = true;
              this.indicatorSubject.next(true);
              this.initItem();
            }
        )
      } else {
        this.model = new ContractsModel();
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
    if (this.editing){
      if (this.model.type === 'employee') {
        this.selectEmployee = true;
        this.selectProvider = false;
      } else {
        this.selectEmployee = false;
        this.selectProvider = true;
      }
    }
    this.formGroup = this.userFB.group({
      name: [this.model.name, Validators.required],
      employee_id: [this.model.employee_id],
      provider_id: [this.model.provider_id],
      observation: [this.model.observation, Validators.required],
      date_start: [this.model.date_start, Validators.required],
      date_end: [this.model.date_end, Validators.required],
      permanent: [this.model.permanent],
      attachment: [this.model.attachment],
      active: [this.model.active, Validators.required],
      type: [this.model.type, Validators.required],
      file:[this.model.file]
    });
  }

  getComponentTitle() {
    let result = 'Criar novo contrato';
    if (!this.model || !this.model.id) {
      return result;
    }
    result = `Editar contrato - ${this.model.name}`;
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

    this.userService.createContract(edit).subscribe(
        response => {
          if (!response.success){
            this.loading = false;
            this.layoutUtilsService.showActionNotification(response.message, MessageType.Create, 5000, true, false);
            return;
          }
          this.loading = false;
          const message = `Cadastro adicionado com sucesso..`;
          this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
          this.goBackWithId();
        },
        error => {
          this.hasFormErrors = true;
          this.errosForms = error.error.erros;
          return;
        }
    );

  }

  prepareUser(): ContractsModel {
    this.loadingFile = false;
    const controls = this.formGroup.controls;
    const _itemUpdated = new ContractsModel();
    _itemUpdated.clear();
    _itemUpdated.id = this.model.id;
    _itemUpdated.name = controls.name.value;
    _itemUpdated.employee_id = controls.employee_id.value;
    _itemUpdated.provider_id = controls.provider_id.value;
    _itemUpdated.observation = controls.observation .value;
    _itemUpdated.active = controls.active.value;
    _itemUpdated.date_start = new Date(controls.date_start.value);
    _itemUpdated.date_end = controls.date_end.value;
    _itemUpdated.permanent = controls.permanent.value;
    _itemUpdated.type = controls.type.value;
    _itemUpdated.file = controls.file.value;
    return _itemUpdated;
  }

  update(_item, withBack: boolean = false) {
    console.log(_item);
    this.userService.updateContract(_item).subscribe(
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
    const url = `/servicos/contratos`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  getType(event) {
    if (event === 'employee'){
      this.selectEmployee = true;
      this.selectProvider  = false;
    } else {
      this.selectEmployee = false;
      this.selectProvider  = true;
    }
  }

  uploadFile(){
    this.loadingFile = true;
    const controls = this.formGroup.controls;
    const _itemUpdated = new ContractsModel();
    this.uploadService.upload(controls.attachment.value, 'contracts').subscribe(
        res => {
          this.sparesData(res)
        }
    )
  }

  sparesData(data){
    const controls = this.formGroup.controls;
    const _itemUpdated = new ContractsModel();
    controls.file.setValue(data);
    this.loadingFile = false;
    this.prepareUser();
    return;
  }

  print(item: ContractsModel) {
    window.open('storage/' + item.file, '_blank');
  }

}
