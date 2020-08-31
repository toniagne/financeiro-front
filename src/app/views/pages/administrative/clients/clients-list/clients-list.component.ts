import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// material
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// rxjs
import {fromEvent, merge, Observable, of as observableOf, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
// models
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType, QueryParamsModel} from '../../../../../core/_base/crud';
import {ClientsModel} from '../../../../../core/model/clients.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ClientsViewComponent} from '../clients-view/clients-view.component';


@Component({
  selector: 'kt-clients-list',
  templateUrl: './clients-list.component.html'
})

export class ClientsListComponent implements OnInit {
  displayedColumns = ['name', 'type', 'email', 'document', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<ClientsModel>(true, []);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  private subscriptions: Subscription[] = [];
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
          return this.service.getClients();
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

  loadUsersList() {
    this.selection.clear();
    const queryParams = new QueryParamsModel(
        this.filterConfiguration(),
        this.sort.direction,
        this.sort.active,
        this.paginator.pageIndex,
        this.paginator.pageSize
    );

    this.service.searchClient(queryParams) .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getClients();
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
    this.service.searchClient(queryParams).pipe(
        map(
            res => {
              console.log(res);
            }
        )
    )
    this.selection.clear();
  }

  /** FILTRATION */
  filterConfiguration(): any {
    const filter: any = {};
    const searchText: string = this.searchInput.nativeElement.value;
    filter.words = searchText;
    return filter;
  }


  featch() {
    const messages = [];
    this.selection.selected.forEach(elem => {
      messages.push({
        text: `${elem.name}, ${elem.cnpj}`,
        id: elem.id.toString(),
        status: elem.status
      });
    });
    this.layoutUtilsService.fetchElements(messages);
  }

  edit(item: ClientsModel) {
    this.router.navigate(['../clientes/edit', item.id], { relativeTo: this.activatedRoute });
  }

  delete(item: ClientsModel) {
    const _title = 'Lista';
    const _description = 'Você tem certeza que deseja apagar este cliente ?';
    const _waitDesciption = 'Cliente esta sendo apagado...';
    const _deleteMessage = `Cliente foi apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteClient(item.id).subscribe(
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

  view(item: ClientsModel) {
    const dialogRef = this.dialog.open(ClientsViewComponent, {
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
