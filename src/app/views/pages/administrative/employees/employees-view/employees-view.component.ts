import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProvidersModel} from '../../../../../core/model/providers.model';

@Component({
  selector: 'kt-employees-view',
  templateUrl: './employees-view.component.html'
})
export class EmployeesViewComponent implements OnInit {

  dialogContent: any[];
  constructor(
      public dialogRef: MatDialogRef<EmployeesViewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ProvidersModel) {}

  ngOnInit(): void {
    console.log(this.data);
    this.dialogContent = this.data.dataKey;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
