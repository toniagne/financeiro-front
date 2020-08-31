import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhonesModel} from '../../../../../core/model/phones.model';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
@Component({
  selector: 'kt-phones',
  templateUrl: './phones.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhonesComponent implements OnInit {
    public form: FormGroup;
    public mobiles: FormArray;
    public phoneType = false;
    public phoneList: any[] = [''];
    @Input() phonesSubject: BehaviorSubject<any>;
    hasFormErrors: false;
    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        if (!this.phonesSubject.value) {
            const newPhone = new PhonesModel();
            newPhone.clear();
            this.phonesSubject.next(newPhone);
        }
        this.createPhoneForm();
        this.form.valueChanges
            .pipe(
                // tslint:disable-next-line:max-line-length
                debounceTime(150), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
                distinctUntilChanged(), // This operator will eliminate duplicate values
                tap(() => {
                    this.update();
                })
            )
            .subscribe();

        this.setItens(this.phonesSubject.value);
    }

    get phoneForms() {
        return this.form.get('phone') as FormArray
    }

    createPhoneForm() {
        this.form = this.fb.group({
            phone: this.fb.array([])
        });
    }

    /**
     * Update address
     */
    update() {
        this.hasFormErrors = false;
        const controls = this.form.controls;
        const newPhone = new PhonesModel();
        newPhone.clear();
        newPhone.phone = this.form.get(['phone']).value;
        this.phonesSubject.next(newPhone);
        console.log(newPhone);
    }

    addPhone() {
        this.phoneForms.push(
            this.fb.group({
                phone: []
            })
        );
    }

    deletePhone(i) {
        this.phoneForms.removeAt(i)
    }

    setItens(data){
        const control = this.form.get('phone') as FormArray
        data.forEach(x => {
            control.push(this.fb.group({
                phone: [x.phone]
            }))
        })
    }

    selectPhone(value){
        this.phoneType = value;
    }

}
