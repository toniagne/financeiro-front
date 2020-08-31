import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// material
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// rxjs
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
// models
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {ActivatedRoute, Router} from '@angular/router';
import {ProvidersModel} from '../../../../../core/model/providers.model';
import {EmployeesModel} from '../../../../../core/model/employees.model';
import {MatDialog} from '@angular/material/dialog';
import {ProvidersViewComponent} from '../providers-view/providers-view.component';

@Component({
  selector: 'kt-providers-list',
  templateUrl: './providers-list.component.html'
})
export class ProvidersListComponent implements OnInit {
  displayedColumns = ['name', 'cnpj', 'email', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<ProvidersModel>(true, []);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  occupations: any = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
      private http: HttpClient,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private service: UsersSystemService,
      private layoutUtilsService: LayoutUtilsService,
      public dialog: MatDialog
  ) {}

  ngOnInit() {
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.service.getProviders();
            }),
            map(data => {
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
        text: `${elem.name}, ${elem.cnpj}`,
        id: elem.id.toString()
      });
    });
    this.layoutUtilsService.fetchElements(messages);
  }

  edit(item: EmployeesModel) {
    this.router.navigate(['../fornecedores/edit', item.id], { relativeTo: this.activatedRoute });
  }

  delete(item: EmployeesModel) {
    const _title = 'Lista';
    const _description = 'Você tem certeza que deseja apagar este fornecedor ?';
    const _waitDesciption = 'Aguarde..';
    const _deleteMessage = `Fornecedor foi apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteProvider(item.id).subscribe(
          response => {
            this.ngOnInit();
          },
          error => {
            console.log(error)
          }
      );
      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
    });
  }

  refreshUser(isNew: boolean = false, id = 0) {
    const url = `/cadastros/fornecedores`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }

  view(item: EmployeesModel) {
    const dialogRef = this.dialog.open(ProvidersViewComponent, {
      width: '550px',
      data: {dataKey: item}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
