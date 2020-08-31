// Angular
import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Translate
import { TranslateModule } from '@ngx-translate/core';
import { PartialsModule } from '../../partials/partials.module';
// Services
import { HttpUtilsService, TypesUtilsService, InterceptService, LayoutUtilsService} from '../../../core/_base/crud';
// Shared
import {ActionNotificationComponent, DeleteEntityDialogComponent} from '../../partials/content/crud';
// Components
import { NgxMaskModule, IConfig } from 'ngx-mask'

// material - layout
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdministrativeComponent } from './administrative.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsEditComponent } from './clients/clients-edit/clients-edit.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UsersSystemService } from '../../../core/services/users-system.service';
import { ServicesEditComponent } from './services/services-edit/services-edit.component';
import { ProvidersEditComponent } from './providers/providers-edit/providers-edit.component';
import { ProvidersListComponent } from './providers/providers-list/providers-list.component';
import { ServicesListComponent } from './services/services-list/services-list.component';
import { EmployeesListComponent} from './employees/employees-list/employees-list.component';
import { EmployeesEditComponent } from './employees/employees-edit/employees-edit.component';
import { PhonesComponent } from './_subs/phones/phones.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { TypeServicesListComponent } from './type_services/type-services-list/type-services-list.component';
import { TypeServicesEditComponent } from './type_services/type-services-edit/type-services-edit.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { RecurrencesListComponent } from './recurrences/recurrences-list/recurrences-list.component';
import { RecurrencesEditComponent } from './recurrences/recurrences-edit/recurrences-edit.component';
import {AddressesComponent} from './_subs/addresses/addresses.component';
import { EmailsComponent } from './_subs/emails/emails.component';
import { PermissionsComponent } from './_subs/permissions/permissions.component';
import { UserViewComponent } from './users/user-view/user-view.component';
import { EmployeesViewComponent } from './employees/employees-view/employees-view.component';
import { ClientsViewComponent } from './clients/clients-view/clients-view.component';
import { ProvidersViewComponent } from './providers/providers-view/providers-view.component';
import { ServicesViewComponent } from './services/services-view/services-view.component';
import { ContactsComponent } from './_subs/contacts/contacts.component';
import { BanksComponent } from './_subs/banks/banks.component';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';
import { ProductsViewComponent } from './products/products-view/products-view.component';
import { ProductDetailsComponent } from './_subs/product-details/product-details.component';
import {NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDividerModule} from '@angular/material/divider';
import {ActivePipe} from '../../../core/_base/layout/pipes/active.pipe';
import {CoreModule} from '../../../core/core.module';
import {NgBrazil} from 'ng-brazil';
const routes: Routes = [
  {
    path: '',
    component: AdministrativeComponent,
    children: [
      {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full'
      },
      { path: 'clientes', component: ClientsListComponent},
      { path: 'clientes/add', component: ClientsEditComponent},
      { path: 'clientes/edit', component: ClientsEditComponent },
      { path: 'clientes/edit/:id', component: ClientsEditComponent },
      // USUÁRIOS
      { path: 'usuarios', component: UsersListComponent},
      { path: 'usuarios/add', component: UsersEditComponent},
      { path: 'usuarios/edit', component: UsersEditComponent },
      { path: 'usuarios/edit/:id', component: UsersEditComponent },
      // SERVIÇOS
      { path: 'servicos', component: ServicesListComponent},
      { path: 'servicos/add', component: ServicesEditComponent},
      { path: 'servicos/edit', component: ServicesEditComponent},
      { path: 'servicos/edit/:id', component: ServicesEditComponent},
      // FORNECEDORES
      { path: 'fornecedores', component: ProvidersListComponent},
      { path: 'fornecedores/add', component: ProvidersEditComponent},
      { path: 'fornecedores/edit', component: ProvidersEditComponent},
      { path: 'fornecedores/edit/:id', component: ProvidersEditComponent},
      // EMPREGADOS
      { path: 'funcionarios', component: EmployeesListComponent},
      { path: 'funcionarios/add', component: EmployeesEditComponent},
      { path: 'funcionarios/edit', component: EmployeesEditComponent},
      { path: 'funcionarios/edit/:id', component: EmployeesEditComponent},
      // CATEGORIAS
      { path: 'categorias', component: CategoriesListComponent},
      { path: 'categorias/add', component: CategoriesEditComponent},
      { path: 'categorias/edit', component: CategoriesEditComponent},
      { path: 'categorias/edit/:id', component: CategoriesEditComponent},
      // TIPOS DE SERVIÇOS
      { path: 'tipo-de-servicos', component: TypeServicesListComponent},
      { path: 'tipo-de-servicos/add', component: TypeServicesEditComponent},
      { path: 'tipo-de-servicos/edit', component: TypeServicesEditComponent},
      { path: 'tipo-de-servicos/edit/:id', component: TypeServicesEditComponent},
      // RECORRÊNCIAS
      { path: 'recorrencias', component: RecurrencesListComponent},
      { path: 'recorrencias/add', component: RecurrencesEditComponent},
      { path: 'recorrencias/edit', component: RecurrencesEditComponent},
      { path: 'recorrencias/edit/:id', component: RecurrencesEditComponent},
      // PRODUTOS
      { path: 'produtos', component: ProductsListComponent},
      { path: 'produtos/add', component: ProductsEditComponent},
      { path: 'produtos/edit', component: ProductsEditComponent},
      { path: 'produtos/edit/:id', component: ProductsEditComponent},
    ]
  }
];

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
    imports: [
        NgbDropdownModule,
        CurrencyMaskModule,
        CommonModule,
        HttpClientModule,
        PartialsModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatIconModule,
        MatDividerModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatTabsModule,
        MatTooltipModule,
        MatDialogModule,
        NgxMaskModule.forRoot(),
        NgxMatFileInputModule,
        CoreModule,
        NgBrazil
    ],
  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'kt-mat-dialog-container__wrapper',
        height: 'auto',
        width: '900px'
      }
    },
    HttpUtilsService,
    TypesUtilsService,
    LayoutUtilsService,
    UsersSystemService
  ],
  entryComponents: [
    ActionNotificationComponent,
    UserViewComponent,
    EmployeesViewComponent,
    ClientsViewComponent,
    ProvidersViewComponent,
    ServicesViewComponent,
    DeleteEntityDialogComponent,
    ProductsViewComponent
  ],
  declarations: [
      AddressesComponent,
  AdministrativeComponent,
  ClientsListComponent,
  ClientsEditComponent,
  UsersListComponent,
  UsersEditComponent,
  ServicesEditComponent,
  ProvidersEditComponent,
  ProvidersListComponent,
  ServicesListComponent,
  EmployeesListComponent,
  EmployeesEditComponent,
  PhonesComponent,
  CategoriesListComponent,
  CategoriesEditComponent,
  TypeServicesListComponent,
  TypeServicesEditComponent,
  RecurrencesListComponent,
  RecurrencesEditComponent,
  EmailsComponent,
  PermissionsComponent,
    UserViewComponent,
    EmployeesViewComponent,
    ClientsViewComponent,
    ProvidersViewComponent,
    ServicesViewComponent,
    ContactsComponent,
    BanksComponent,
    ProductsListComponent,
    ProductsEditComponent,
    ProductsViewComponent,
    ProductDetailsComponent
  ]
})
export class AdministrativeModule { }
