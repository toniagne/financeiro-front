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
import {ServicesType} from '../../../../../core/model/servicesType.model';

@Component({
  selector: 'kt-type-services-list',
  templateUrl: './type-services-list.component.html'
})
export class TypeServicesListComponent implements OnInit {
  displayedColumns = ['name', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<ServicesType>(true, []);
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
              return this.service.getTypesServices();
            }),
            map(data => {
              // Flip flag to show that loading has finished.
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

  edit(item: ServicesType) {
    this.router.navigate(['../tipo-de-servicos/edit', item.id], { relativeTo: this.activatedRoute });
  }

  delete(item: ServicesType) {
    const _title = 'Tipos de serviços';
    const _description = 'Você tem certeza que deseja apagar este item ?';
    const _waitDesciption = 'Aguarde ...';
    const _deleteMessage = `Apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteTypesServices(item.id).subscribe(
          response => {
            this.ngOnInit();
          },
          error => {
            console.log(error)
          }
      );
      this.dataSource.data.splice(this.dataSource.data.indexOf(item.id), 1);
      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);

    });
  }

  goBackWithId() {
    const url = `/cadastros/tipo-de-servicos`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  view(item: ServicesType) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
