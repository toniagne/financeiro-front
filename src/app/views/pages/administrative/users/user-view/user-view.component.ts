import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserModel} from '../../../../../core/model/users-system.model';
import {UsersSystemService} from '../../../../../core/services/users-system.service';
import {PermissionsModel} from '../../../../../core/model/permissions.model';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'kt-user-view',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit {
  dialogContent: any[];
  loadingPermissions = new BehaviorSubject<boolean>(true);
  permissions: PermissionsModel;
  constructor(
        @Inject(MAT_DIALOG_DATA) public data: UserModel,
        public dialogRef: MatDialogRef<UserViewComponent>,
        private service: UsersSystemService
      ) {}

  ngOnInit(): void {
    this.dialogContent = this.data.dataKey;
    // @ts-ignore
    this.service.getPermissions(this.dialogContent.id).subscribe(
        response => {
          this.permissions = response;
          this.loadingPermissions.next(false);
        }
    )
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
