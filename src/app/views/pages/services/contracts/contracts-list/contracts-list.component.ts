import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {ProvidersModel} from '../../../../../core/model/providers.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ContractsModel} from '../../../../../core/model/contracts.model';
import {ClientsModel} from '../../../../../core/model/clients.model';
import {ClientsViewComponent} from '../../../administrative/clients/clients-view/clients-view.component';
import {ContractsViewComponent} from '../contracts-view/contracts-view.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'kt-contracts-list',
  templateUrl: './contracts-list.component.html'
})
export class ContractsListComponent implements OnInit {
  displayedColumns = ['name', 'client', 'date_start', 'date_end', 'type', 'actions'];
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
              return this.service.getContracts();
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
        text: `${elem.name}`,
        id: elem.id.toString()
      });
    });
    this.layoutUtilsService.fetchElements(messages);
  }

  edit(item: ContractsModel) {
    this.router.navigate(['../contratos/edit', item.id], { relativeTo: this.activatedRoute });
  }

  delete(item: ContractsModel) {
    const _title = 'Lista';
    const _description = 'Você tem certeza que deseja apagar este contrato ?';
    const _waitDesciption = 'Aguarde..';
    const _deleteMessage = `Contrato foi apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteContract(item.id).subscribe(
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
    const url = `/servicos/contratos`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }

  view(item: ContractsModel) {
    const dialogRef = this.dialog.open(ContractsViewComponent, {
      width: '550px',
      data: {dataKey: item}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  print(item: ContractsModel) {
    window.open('storage/' + item.file, '_blank');
  }
}
