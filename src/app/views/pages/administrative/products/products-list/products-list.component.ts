import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {MatDialog} from '@angular/material/dialog';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ProductsModel} from '../../../../../core/model/products.model';
import {ProductsViewComponent} from '../products-view/products-view.component';

@Component({
  selector: 'kt-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  displayedColumns = ['name', 'category', 'value', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<ProductsModel>(true, []);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  productCategories: any = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
      private http: HttpClient,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private service: UsersSystemService,
      private layoutUtilsService: LayoutUtilsService,
      public dialog: MatDialog
  ) {
    this.service.getProductCategory().subscribe(res => { this.productCategories = res;});
  }

  ngOnInit() {
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.service.getProducts();
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

  applyFilter(event: Event, selectOpitions = false) {
    if (selectOpitions){
      // @ts-ignore
      this.dataSource.filter = event;
    } else {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  featch() {
    const messages = [];
    this.selection.selected.forEach(elem => {
      messages.push({
        text: `${elem.name}, ${elem.name}`,
        id: elem.id.toString()
      });
    });
    this.layoutUtilsService.fetchElements(messages);
  }

  edit(item: ProductsModel) {
    this.router.navigate(['../produtos/edit', item.id], { relativeTo: this.activatedRoute });
  }

  delete(item: ProductsModel) {
    const _title = 'Lista';
    const _description = 'Você tem certeza que deseja apagar este registro ?';
    const _waitDesciption = 'Aguarde..';
    const _deleteMessage = `Registro foi apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteProduct(item.id).subscribe(
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

  view(item: ProductsModel) {
    const dialogRef = this.dialog.open(ProductsViewComponent, {
      maxHeight: '90vh',
      data: {dataKey: item}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  applyFilterResources(isNew: boolean = false, id = 0) {
    const url = `/cadastros/produtos`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }

  refreshUser(isNew: boolean = false, id = 0) {
    const url = `/cadastros/produtos`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }
}
