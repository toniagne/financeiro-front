import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientsModel} from '../../../../../core/model/clients.model';

@Component({
  selector: 'kt-proposals-view',
  templateUrl: './proposals-view.component.html'
})
export class ProposalsViewComponent implements OnInit {

  dialogContent: any[];
  constructor(
      public dialogRef: MatDialogRef<ProposalsViewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ClientsModel) {}

  ngOnInit(): void {
    console.log(this.data);
    this.dialogContent = this.data.dataKey;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
