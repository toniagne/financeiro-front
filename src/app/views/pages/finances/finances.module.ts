import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancesComponent } from './finances.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PartialsModule} from '../../partials/partials.module';
import {RouterModule, Routes} from '@angular/router';
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
import {ReceiveListComponent} from './bills/receive/receive-list/receive-list.component';
import {MatDividerModule} from '@angular/material/divider';
import { ReceiveEditComponent } from './bills/receive/receive-edit/receive-edit.component';
import {
  ActionNotificationComponent,
  DeleteEntityDialogComponent,
  FetchEntityDialogComponent,
  UpdateStatusDialogComponent
} from '../../partials/content/crud';
import { ReceiveCheckComponent } from './bills/receive/receive-check/receive-check.component';
import { ReceiveCancelComponent } from './bills/receive/receive-cancel/receive-cancel.component';
import {ClientsEditComponent} from '../administrative/clients/clients-edit/clients-edit.component';
import { ReceiveViewComponent } from './bills/receive/receive-view/receive-view.component';
import {NgBrazil} from 'ng-brazil';
import { ChargingsListComponent } from './chargings/chargings-list/chargings-list.component';
import { ChargingsEditComponent } from './chargings/chargings-edit/chargings-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FinancesComponent,
    children: [
      {
        path: '',
        redirectTo: 'contas-receber',
        pathMatch: 'full'
      },
      { path: 'contas-receber', component: ReceiveListComponent},
      { path: 'contas-receber/add', component: ReceiveEditComponent},
      { path: 'contas-receber/edit', component: ReceiveEditComponent },
      { path: 'contas-receber/edit/:id', component: ReceiveEditComponent },
      // COBRANÇAS
      { path: 'cobrancas', component: ChargingsListComponent},
      { path: 'cobrancas/add', component: ChargingsEditComponent},
      { path: 'cobrancas/edit', component: ChargingsEditComponent },
      { path: 'cobrancas/edit/:id', component: ChargingsEditComponent },
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
    NgxMatFileInputModule,
    MatDividerModule,
    NgBrazil
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
      FinancesComponent,
    ReceiveListComponent,
    ReceiveEditComponent,
    ReceiveCheckComponent,
    ReceiveCancelComponent,
    ReceiveViewComponent,
    ChargingsListComponent,
    ChargingsEditComponent
  ],
  entryComponents: [
    ActionNotificationComponent,
    ReceiveEditComponent,
    DeleteEntityDialogComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent,
      ReceiveCheckComponent,
      ReceiveCancelComponent,
    ReceiveViewComponent
  ],
})
export class FinancesModule { }
