import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClientsModel} from '../../../../../core/model/clients.model';

@Component({
  selector: 'kt-clients-view',
  templateUrl: './clients-view.component.html'
})
export class ClientsViewComponent implements OnInit {
  dialogContent: any[];
  constructor(
      public dialogRef: MatDialogRef<ClientsViewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ClientsModel) {}

  ngOnInit(): void {
    console.log(this.data);
    this.dialogContent = this.data.dataKey;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
