import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProvidersModel} from '../../../../../core/model/providers.model';

@Component({
  selector: 'kt-providers-view',
  templateUrl: './providers-view.component.html'
})
export class ProvidersViewComponent implements OnInit {
  dialogContent: any[];
  constructor(
      public dialogRef: MatDialogRef<ProvidersViewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ProvidersModel) {}

  ngOnInit(): void {
    console.log(this.data);
    this.dialogContent = this.data.dataKey;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
