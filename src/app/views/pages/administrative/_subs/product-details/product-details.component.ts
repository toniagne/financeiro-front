import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {ProductDetailsModel} from '../../../../../core/model/productDetails.model';

@Component({
  selector: 'kt-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

  public form: FormGroup;
  @Input() detailsSubject: BehaviorSubject<any>;
  hasFormErrors: false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.detailsSubject.value) {
      const newContact = new ProductDetailsModel();
      newContact.clear();
      this.detailsSubject.next(newContact);
    }else {}
    this.createDetailsForm();
    this.form.valueChanges
        .pipe(
            // tslint:disable-next-line:max-line-length
            debounceTime(150), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
            distinctUntilChanged(), // This operator will eliminate duplicate values
            tap(() => {
              this.updateDetails();
            })
        )
        .subscribe();

    this.setItens(this.detailsSubject.value);
  }

  get detailsForm() {
    return this.form.get('details') as FormArray
  }

  createDetailsForm() {
    this.form = this.fb.group({
      details: this.fb.array([])
    });
  }

  /**
   * Update address
   */
  updateDetails() {
    this.hasFormErrors = false;
    const controls = this.form.controls;
    const newContact = new ProductDetailsModel();
    newContact.clear();
    newContact.details = this.form.get(['details']).value;
    this.detailsSubject.next(newContact);
  }

  addDetails() {
    this.detailsForm.push(
        this.fb.group({
          key: [],
          value: [],
        })
    );
  }

  deleteDetails(i) {
    this.detailsForm.removeAt(i)
  }

  setItens(data){
    const control = this.form.get('details') as FormArray
    data.forEach(x => {
      control.push(this.fb.group({
        key: [x.key],
        value: [x.value]
      }))
    })
  }

}
