import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserModel} from '../../../../../../core/model/users-system.model';
import {UsersSystemService} from '../../../../../../core/services/users-system.service';

@Component({
  selector: 'kt-receive-view',
  templateUrl: './receive-view.component.html'
})
export class ReceiveViewComponent implements OnInit {
  dialogContent: any[];
  cssClasses: any;
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: UserModel,
      public dialogRef: MatDialogRef<ReceiveViewComponent>,
      private service: UsersSystemService
  ) {}

  ngOnInit(): void {
    this.dialogContent = this.data.dataKey;
    console.log(this.dialogContent);
  }
}
