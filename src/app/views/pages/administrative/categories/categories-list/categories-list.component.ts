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
import {ServicesCategories} from '../../../../../core/model/servicesCategories.model';

@Component({
  selector: 'kt-categories-list',
  templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
  displayedColumns = ['name', 'actions'];
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
      private service: UsersSystemService,
      private layoutUtilsService: LayoutUtilsService,
  ) {}

  ngOnInit() {
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.service.getCategories();
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

  delete(item: ServicesCategories) {
    const _title = 'Lista';
    const _description = 'Você tem certeza que deseja apagar esta categoria ?';
    const _waitDesciption = 'Aguarde ...';
    const _deleteMessage = `Apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteCategory(item.id).subscribe(
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
    const url = `/cadastros/categorias`;
    this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  view(item: ServicesCategories) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
