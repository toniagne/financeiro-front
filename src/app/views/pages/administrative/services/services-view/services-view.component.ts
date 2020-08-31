import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServicesModel} from '../../../../../core/model/services.model';

@Component({
  selector: 'kt-services-view',
  templateUrl: './services-view.component.html'
})
export class ServicesViewComponent implements OnInit {
  dialogContent: any[];
  constructor(
      public dialogRef: MatDialogRef<ServicesViewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ServicesModel) {}

  ngOnInit(): void {
    console.log(this.data);
    this.dialogContent = this.data.dataKey;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
