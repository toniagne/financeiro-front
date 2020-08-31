import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {ServicesCategories} from '../../../../../../core/model/servicesCategories.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersSystemService} from '../../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../../core/_base/crud';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {FinancesService} from '../../../../../../core/services/finances.service';
import {BillsReceivesModel} from '../../../../../../core/model/bills-receives.model';
import {CustomerModel} from '../../../../../../core/e-commerce';
import { MatDialog } from '@angular/material/dialog';
import {ReceiveEditComponent} from '../receive-edit/receive-edit.component';
import {EmployeesModel} from '../../../../../../core/model/employees.model';
import {EmployeesViewComponent} from '../../../../administrative/employees/employees-view/employees-view.component';
import {ReceiveCheckComponent} from '../receive-check/receive-check.component';
import {ReceiveCancelComponent} from '../receive-cancel/receive-cancel.component';
import {ReceiveViewComponent} from '../receive-view/receive-view.component';

@Component({
  selector: 'kt-receive-list',
  templateUrl: './receive-list.component.html'
})
export class ReceiveListComponent implements OnInit {
  displayedColumns = ['client', 'history', 'due', 'amount', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<ServicesCategories>(true, []);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
      private http: HttpClient,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private service: FinancesService,
      private layoutUtilsService: LayoutUtilsService,
      public dialog: MatDialog,
  ) {}

  ngOnInit() {
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.service.getReceives();
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              console.log('terminou');
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = data.totalCount;
              return data.items;
            }),
            catchError(() => {
              this.isLoadingResults = false;
              // Catch if the GitHub API has reached its rate limit. Return empty data.
              this.isRateLimitReached = true;
              return observableOf([]);
            })
        ).subscribe(data => this.dataSource.data = data);
  }

  featch() {
    const messages = [];
    this.selection.selected.forEach(elem => {
      messages.push({
        text: `${elem.name}`,
        id: elem.id.toString(),
        status: elem.status
      });
    });
    this.layoutUtilsService.fetchElements(messages);
  }

  edit(item: ServicesCategories) {
    this.router.navigate(['../categorias/edit', item.id], { relativeTo: this.activatedRoute });
  }

  delete(item: BillsReceivesModel) {
    const _title = 'Lista';
    const _description = 'Você tem certeza que deseja apagar esta categoria ?';
    const _waitDesciption = 'Aguarde ...';
    const _deleteMessage = `Apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteReceives(item.id).subscribe(
          response => {
            this.goBackWithId();
          },
          error => {
            console.log(error)
          }
      );
      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
    });
  }

  goBackWithId() {
    const url = `/financas/contas-receber`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  addReceive() {
    const newCustomer = new CustomerModel();
    const dialogRef = this.dialog.open(ReceiveEditComponent);
    newCustomer.clear(); // Set all defaults fields
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        this.goBackWithId();
        return;
      }
      console.log(res);
      this.goBackWithId();
    });
  }

  /**
   * Show Edit customer dialog and save after success close result
   * @param customer: CustomerModel
   */
  editCustomer(customer: CustomerModel) {
    let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
    saveMessageTranslateParam += customer.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
    const _saveMessage = 'xx';
    const _messageType = customer.id > 0 ? MessageType.Update : MessageType.Create;
    const dialogRef = this.dialog.open(ReceiveEditComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        this.goBackWithId();
        return;
      }
      console.log(res);
      this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);
      this.goBackWithId();
    });
  }


  billCheck(item: BillsReceivesModel) {
    const dialogRef = this.dialog.open(ReceiveCheckComponent, {
      data: {dataKey: item}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  billCancel(item: BillsReceivesModel) {
    const dialogRef = this.dialog.open(ReceiveCancelComponent, {
      data: {dataKey: item}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  billView(item: BillsReceivesModel) {
    const dialogRef = this.dialog.open(ReceiveViewComponent, {
      height: '700px',
      data: {dataKey: item}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
