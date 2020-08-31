// Angular
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
// AppState
import { AppState } from '../../../core/reducers';
// Auth
import { Permission } from '../../../core/auth';

const userManagementPermissionId = 2;
@Component({
  selector: 'kt-administrative',
  templateUrl: './administrative.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministrativeComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
  }

}
