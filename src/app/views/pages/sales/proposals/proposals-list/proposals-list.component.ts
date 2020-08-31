import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ProposalsModel} from '../../../../../core/model/proposals.model';
import {ClientsModel} from '../../../../../core/model/clients.model';
import {ClientsViewComponent} from '../../../administrative/clients/clients-view/clients-view.component';
import {MatDialog} from '@angular/material/dialog';
import {ProposalsViewComponent} from '../proposals-view/proposals-view.component';

@Component({
  selector: 'kt-proposals-list',
  templateUrl: './proposals-list.component.html'
})
export class ProposalsListComponent implements OnInit {

  displayedColumns = ['client', 'category',  'value', 'validity', 'situation', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<ProposalsModel>(true, []);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

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
              return this.service.getProposals();
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
        text: `${elem.value}, ${elem.validity}`,
        id: elem.id.toString(),
        situation: elem.situation
      });
    });
    this.layoutUtilsService.fetchElements(messages);
  }

  edit(item: ProposalsModel) {
    this.router.navigate(['../propostas/edit', item.id], { relativeTo: this.activatedRoute });
  }

  delete(item: ProposalsModel) {
    const _title = 'Lista';
    const _description = 'Você tem certeza que deseja apagar esta proposta ?';
    const _waitDesciption = 'Aguarde..';
    const _deleteMessage = `Proposta foi apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteProposals(item.id).subscribe(
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
    const url = `/vendas/propostas`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }

  view(item: ClientsModel) {
    const dialogRef = this.dialog.open(ProposalsViewComponent, {
      width: '550px',
      data: {dataKey: item}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  print(item: ProposalsModel) {
    window.open('storage/' + item.file, '_blank');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
