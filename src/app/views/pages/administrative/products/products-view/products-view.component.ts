import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductsModel} from '../../../../../core/model/products.model';

@Component({
  selector: 'kt-products-view',
  templateUrl: './products-view.component.html'
})
export class ProductsViewComponent implements OnInit {
  @Input() cssClasses = '';
  dialogContent: any[];
  constructor(
      public dialogRef: MatDialogRef<ProductsViewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ProductsModel) {}

  ngOnInit(): void {
    console.log(this.data);
    this.dialogContent = this.data.dataKey;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
