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
import {EmployeesModel} from '../../../../../core/model/employees.model';
import {LayoutUtilsService, MessageType} from '../../../../../core/_base/crud';
import {ActivatedRoute, Router} from '@angular/router';
import {OccupationsModel} from '../../../../../core/model/occupations.model';
import {ProvidersViewComponent} from '../../providers/providers-view/providers-view.component';
import {MatDialog} from '@angular/material/dialog';
import {EmployeesViewComponent} from '../employees-view/employees-view.component';

@Component({
  selector: 'kt-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  displayedColumns = ['name', 'cpf', 'email', 'occupation', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<EmployeesModel>(true, []);
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
              return this.service.getEmployees();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  featch() {
    const messages = [];
    this.selection.selected.forEach(elem => {
      messages.push({
        text: `${elem.name}, ${elem.cpf}`,
        id: elem.id.toString()
      });
    });
    this.layoutUtilsService.fetchElements(messages);
  }

  edit(item: EmployeesModel) {
    this.router.navigate(['../funcionarios/edit', item.id], { relativeTo: this.activatedRoute });
  }

  delete(item: EmployeesModel) {
    const _title = 'Lista';
    const _description = 'Você tem certeza que deseja apagar este registro ?';
    const _waitDesciption = 'Aguarde..';
    const _deleteMessage = `Registro foi apagado com sucesso !`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.service.deleteEmployees(item.id).subscribe(
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

  view(item: EmployeesModel) {
    const dialogRef = this.dialog.open(EmployeesViewComponent, {
      height: '700px',
      data: {dataKey: item}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  refreshUser(isNew: boolean = false, id = 0) {
    const url = `/cadastros/funcionarios`;
    if (!isNew) {
      this.router.navigate([url], {relativeTo: this.activatedRoute});
      return;
    }
  }
}
