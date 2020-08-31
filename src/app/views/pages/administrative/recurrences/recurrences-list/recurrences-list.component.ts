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
import {RecurrencesModel} from '../../../../../core/model/recurrences.model';

@Component({
  selector: 'kt-recurrences-list',
  templateUrl: './recurrences-list.component.html'
})
export class RecurrencesListComponent implements OnInit {
  displayedColumns = ['name', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<RecurrencesModel>(true, []);
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
  ) {}

  ngOnInit() {
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.service.getRecurrences();
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

  edit(item: RecurrencesModel) {
    this.router.navigate(['../recorrencias/edit', item.id], { relativeTo: this.activatedRoute });
  }

  delete(item: RecurrencesModel) {
    const _title = 'Lista';
    const _description = 'Você tem certeza que deseja apagar esta recorrência ?';
    const _waitDesciption = 'Aguarde ...';
    const _deleteMessage = `Apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteRecurrence(item.id).subscribe(
          response => {
            this.ngOnInit()
          },
          error => {
            console.log(error)
          }
      );
      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
    });
  }

  goBackWithId() {
    const url = `/cadastros/recorrencias`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  view(item: RecurrencesModel) {
  }

}
