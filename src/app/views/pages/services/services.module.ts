import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { ContractsEditComponent } from './contracts/contracts-edit/contracts-edit.component';
import { ContractsListComponent } from './contracts/contracts-list/contracts-list.component';
import {RouterModule, Routes} from '@angular/router';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PartialsModule} from '../../partials/partials.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {NgxMaskModule} from 'ngx-mask';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {HttpUtilsService, InterceptService, LayoutUtilsService, TypesUtilsService} from '../../../core/_base/crud';
import {UsersSystemService} from '../../../core/services/users-system.service';
import { ContractsViewComponent } from './contracts/contracts-view/contracts-view.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: '',
        redirectTo: 'services',
        pathMatch: 'full'
      },
      { path: 'contratos', component: ContractsListComponent},
      { path: 'contratos/add', component: ContractsEditComponent},
      { path: 'contratos/edit', component: ContractsEditComponent },
      { path: 'contratos/edit/:id', component: ContractsEditComponent },
    ]
  }
];

@NgModule({
  imports: [
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
    NgxMatFileInputModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
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
  declarations: [
      ContractsListComponent,
      ContractsEditComponent,
      ServicesComponent,
      ContractsViewComponent
  ],
  entryComponents: [
    ContractsViewComponent
  ],
})
export class ServicesModule { }
