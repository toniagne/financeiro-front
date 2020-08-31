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
import {UserModel} from '../../../../../core/model/users-system.model';
import {Address} from '../../../../../core/auth';
import {PermissionsModel} from '../../../../../core/model/permissions.model';
@Component({
  selector: 'kt-users-edit',
  templateUrl: './users-edit.component.html'
})
export class UsersEditComponent implements OnInit {
  indicatorSubject = new BehaviorSubject<boolean>(false);
  confirmErrors = new BehaviorSubject<boolean>(false);
  phonesSubject = new BehaviorSubject<any>([]);
  userForm: FormGroup;
  user: any;
  hasFormErrors = false;
  loading = false;
  editing = false;
  status = [];
  messages: Array<any> = [];
  userPermissions = [];
   permissionsSubject = new BehaviorSubject<any>([]);
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userFB: FormBuilder,
              private subheaderService: SubheaderService,
              private userService: UsersSystemService,
              private layoutUtilsService: LayoutUtilsService,
              private layoutConfigService: LayoutConfigService) {}

  ngOnInit(): void {
    this.status = [
      {id: 0, name: 'ATIVO'},
      {id: 1, name: 'DESATIVADO'},
    ];
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id && id > 0) {
        this.editing = true;
        this.loading = true;
        this.userService.getUserById(id).subscribe(
          res => {
            this.loading = false;
            this.user = res.user;
            this.permissionsSubject.next(res.permissions)
            this.indicatorSubject.next(true);
            this.initUser();
          }
        )
      } else {
        this.user = new UserModel();
        this.permissionsSubject.next(this.user.permissions)
        this.user.clear();
        this.indicatorSubject.next(true);
        this.initUser();
      }
    });
  }

  initUser() {
    this.createForm();
    if (!this.user.id) {
      this.subheaderService.setTitle('Create user');
      return;
    }
    this.subheaderService.setTitle('Editar Usuário');
    return;
  }
  /**
   * Create form
   */
  createForm() {
    this.userForm = this.userFB.group({
      name: [this.user.name, Validators.required],
      cpf: [this.user.cpf, Validators.required],
      email: [this.user.email, Validators.email],
      blocked: [this.user.blocked, Validators.required],
      password: ['', Validators.required],
      permissions: []
    });
  }

  getComponentTitle() {
    let result = 'Criar um usuário';
    if (!this.user || !this.user.id) {
      return result;
    }

    result = `Editar usuário - ${this.user.name}`;
    return result;
  }

  onSumbit(withBack: boolean = false) {
    this.hasFormErrors = false;
    this.loading = true;
    const controls = this.userForm.controls;
    /** check form */
    if (this.userForm.invalid) {
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
    this.userService.createUser(editedUser).subscribe(
        response => {
                        if (response.success){
                          this.loading = false;
                          const message = `Adicionado com sucesso.`;
                          this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
                          this.goBackWithId();
                        } else {
                          this.loading = false;
                         this.confirmErrors.next(true);
                          this.messages = response.data;
                        }

                    } ,
        error => {
          this.layoutUtilsService.showActionNotification(error.message, MessageType.Create, 5000, true, false);
        }
    );

  }
  goBackWithId() {
    const url = `/cadastros/usuarios`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  refreshUser(isNew: boolean = false, id = 0) {
    const url = `/cadastros/usuarios`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }

  prepareUser(): UserModel {
    const controls = this.userForm.controls;
    const _user = new UserModel();
    _user.clear();
    _user.id = this.user.id;
    _user.name = controls.name.value;
    _user.cpf = controls.cpf.value;
    _user.email = controls.email.value;
    _user.password = controls.password.value;
    _user.blocked = controls.blocked.value;
    _user.permissions = this.permissionsSubject.value;
    _user.phones = this.phonesSubject.value.phone;
    return _user;
  }

  addUser(_user: UserModel, withBack: boolean = false) {
  }

  updateUser(_user) {
    this.loading = true;
    this.userService.updateUser(_user).subscribe(
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

}
