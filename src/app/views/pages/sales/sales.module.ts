import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
// COMPONENTS
import { SalesComponent } from './sales.component';
import { ProposalsListComponent } from './proposals/proposals-list/proposals-list.component';
import { ProposalsEditComponent } from './proposals/proposals-edit/proposals-edit.component';
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
import {HttpUtilsService, InterceptService, LayoutUtilsService, TypesUtilsService} from '../../../core/_base/crud';
import {UsersSystemService} from '../../../core/services/users-system.service';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ProposalsViewComponent } from './proposals/proposals-view/proposals-view.component';
import {DeleteEntityDialogComponent} from '../../partials/content/crud';
import {NgBrazil} from 'ng-brazil';


const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
        {
          path: '',
          redirectTo: 'proposals',
          pathMatch: 'full'
        },
      { path: 'propostas', component: ProposalsListComponent},
      { path: 'propostas/add', component: ProposalsEditComponent},
      { path: 'propostas/edit', component: ProposalsEditComponent },
      { path: 'propostas/edit/:id', component: ProposalsEditComponent },
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
  entryComponents: [ProposalsViewComponent, DeleteEntityDialogComponent],
  declarations: [ProposalsListComponent, SalesComponent, ProposalsEditComponent, ProposalsViewComponent],
})
export class SalesModule { }
