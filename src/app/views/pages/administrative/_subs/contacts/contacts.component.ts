import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {ContactsModel} from '../../../../../core/model/contacts.model';

@Component({
  selector: 'kt-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  public form: FormGroup;
  public contactList: any[] = [''];
  @Input() contactsSubject: BehaviorSubject<any>;
  hasFormErrors: false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.contactsSubject.value) {
      const newContact = [];
      this.contactsSubject.next(newContact);
    }

    this.createContactsForm();
    this.form.valueChanges
        .pipe(
            // tslint:disable-next-line:max-line-length
            debounceTime(150), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
            distinctUntilChanged(), // This operator will eliminate duplicate values
            tap(() => {
              this.updateContacts();
            })
        )
        .subscribe();
      this.setItens(this.contactsSubject.value);
  }

  get contactsForms() {
    return this.form.get('contact') as FormArray
  }

  createContactsForm() {
    this.form = this.fb.group({
      contact: this.fb.array([])
    });
  }

  /**
   * Update address
   */
  updateContacts() {
    this.hasFormErrors = false;
    const controls = this.form.controls;
    const newContact = new ContactsModel();
    newContact.clear();
    newContact.contact = this.form.get(['contact']).value;
    console.log(newContact);
    this.contactsSubject.next(newContact);
  }

  addContact() {
    this.contactsForms.push(
        this.fb.group({
          name: [],
          email: [],
          phone: []
        })
    );
  }

  deleteContact(i) {
    this.contactsForms.removeAt(i)
  }

    setItens(data){
        const control = this.form.get('contact') as FormArray
        data.forEach(x => {
            control.push(this.fb.group({
                name: [x.name],
                email: [x.email],
                phone: [x.phone]
            }))
        })
    }

}
