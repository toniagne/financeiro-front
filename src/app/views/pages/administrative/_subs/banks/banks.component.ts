import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {BanksModel} from '../../../../../core/model/banks.model';

@Component({
  selector: 'kt-banks',
  templateUrl: './banks.component.html'
})
export class BanksComponent implements OnInit {
  public form: FormGroup;
  public bankList: any[] = [''];
  @Input() banksSubject: BehaviorSubject<any>;
  hasFormErrors: false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.banksSubject.value) {
      const newContact = new BanksModel();
      newContact.clear();
      this.banksSubject.next(newContact);
    }else {}
    this.createBanksForm();
    this.form.valueChanges
        .pipe(
            // tslint:disable-next-line:max-line-length
            debounceTime(150), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
            distinctUntilChanged(), // This operator will eliminate duplicate values
            tap(() => {
              this.updateBanks();
            })
        )
        .subscribe();

    this.setItens(this.banksSubject.value);
  }

  get bankForms() {
    return this.form.get('banks') as FormArray
  }

  createBanksForm() {
    this.form = this.fb.group({
      banks: this.fb.array([])
    });
  }

  /**
   * Update address
   */
  updateBanks() {
    this.hasFormErrors = false;
    const controls = this.form.controls;
    const newContact = new BanksModel();
    newContact.clear();
    newContact.banks = this.form.get(['banks']).value;
    this.banksSubject.next(newContact);
  }

  addBank() {
    this.bankForms.push(
        this.fb.group({
          bank_name: [],
          agency: [],
          account: []
        })
    );
  }

  deleteBank(i) {
    this.bankForms.removeAt(i)
  }

  setItens(data){
    const control = this.form.get('banks') as FormArray
    data.forEach(x => {
      control.push(this.fb.group({
        bank_name: [x.bank_name],
        agency: [x.agency],
        account: [x.account]
      }))
    })
  }

}
