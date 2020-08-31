import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LayoutConfigService, SubheaderService} from '../../../../../core/_base/layout';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {ProposalsModel} from '../../../../../core/model/proposals.model';
import {UploadService} from '../../../../../core/services/upload.service';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';
import {AttachmentsModel} from '../../../../../core/model/attachments.model';
@Component({
  selector: 'kt-proposals-edit',
  templateUrl: './proposals-edit.component.html'
})
export class ProposalsEditComponent implements OnInit {
  indicatorSubject = new BehaviorSubject<boolean>(false);
  formGroup: FormGroup;
  model: ProposalsModel;
  hasFormErrors = false;
  loading = false;
  loadingFile = false;
  editing = false;
  files = '';
  errosForms = [];
  clients = [];
  categories = [];
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private userFB: FormBuilder,
      private subheaderService: SubheaderService,
      private userService: UsersSystemService,
      private layoutUtilsService: LayoutUtilsService,
      private layoutConfigService: LayoutConfigService,
      private uploadService: UploadService
  ) {
    this.userService.getClients().subscribe(
        res => {
          this.clients = res.items;
        });
    this.userService.getCategories().subscribe(
        res => {
          this.categories = res.items;
        });
  }

  ngOnInit(): void {
    const routeSubscription = this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.loading = true;
        this.editing = true;
        this.userService.getProposalsById(id).subscribe(
            res => {
              this.model = res;
              this.loading = false;
              this.indicatorSubject.next(true);
              this.initItem();
            }
        )
      } else {
        this.model = new ProposalsModel();
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
      client_id: [this.model.client_id, Validators.required],
      category_id: [this.model.category_id, Validators.required],
      validity: [this.model.validity, Validators.required],
      value: [this.model.value, Validators.required],
      situation: [this.model.situation, Validators.required],
      observation: [this.model.observation],
      attachment: [this.model.attachment],
      file:[this.model.file]
    });
  }

  getComponentTitle() {
    let result = 'Criar nova proposta';
    if (!this.model || !this.model.id) {
      return result;
    }
    result = `Editar tipo de serviço - ${this.model.client.name}`;
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
      this.update(edit);
      return;
    }

    this.userService.createProposals(this.formGroup.value).subscribe(
        response => {
          if (!response.response.success) {
              this.layoutUtilsService.showActionNotification(response.response.message, MessageType.Delete, 10000, true, false);
              this.loading = false;
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

  prepareUser(): ProposalsModel {
    const controls = this.formGroup.controls;
    const _itemUpdated = new ProposalsModel();
    _itemUpdated.clear();
    _itemUpdated.id = this.model.id;
    _itemUpdated.client_id = controls.client_id.value;
    _itemUpdated.category_id = controls.category_id.value;
    _itemUpdated.validity = controls.validity.value;
    _itemUpdated.value = controls.value.value;
    _itemUpdated.situation = controls.situation.value;
    _itemUpdated.observation = controls.observation.value;
    _itemUpdated.file = this.files
    return _itemUpdated;
  }

  update(_item) {
    this.userService.updateProposals(_item).subscribe(
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
    const url = `/vendas/propostas`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  uploadFile(){
    this.loadingFile = true;
    const controls = this.formGroup.controls;
    const _itemUpdated = new ProposalsModel();
    this.uploadService.upload(controls.attachment.value, 'proposals').subscribe(
        res => {
          this.sparesData(res)
        }
    )
  }

  sparesData(data){
    const controls = this.formGroup.controls;
    const _itemUpdated = new ProposalsModel();
    controls.file.setValue(data);
    this.loadingFile = false;
    this.prepareUser();
    return;
  }

  print(item: ProposalsModel) {
    window.open('storage/' + item.file, '_blank');
  }

}
