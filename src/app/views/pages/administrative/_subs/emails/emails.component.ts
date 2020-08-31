import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhonesModel} from '../../../../../core/model/phones.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {EmailsModel} from '../../../../../core/model/emails.model';

@Component({
  selector: 'kt-emails',
  templateUrl: './emails.component.html'
})
export class EmailsComponent implements OnInit {

  teamForm: FormGroup;
  isValidFormSubmitted = null;
  allSkills: Observable<any[]>;
  @Input() emailsSubject: BehaviorSubject<any>;
  constructor(
      private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.allSkills = this.emailsSubject.value;
    this.teamForm = this.formBuilder.group({
      employees: this.formBuilder.array([
        this.formBuilder.group(new EmailsModel())
      ])
    });

  }
  get teamName() {
    return this.teamForm.get('teamName');
  }
  get employees(): FormArray {
    return this.teamForm.get('employees') as FormArray;
  }
  addEmployee() {
    const fg = this.formBuilder.group(new EmailsModel());
    this.employees.push(fg);
  }
  deleteEmployee(idx: number) {
    this.employees.removeAt(idx);
  }
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.teamForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.teamForm.reset();
  }
  patchEmployeeValues() {
    this.employees.patchValue([
      { id: '111', contact: 'Mohan', email:'teste@test.com.br'},
      { id: '112', contact: 'Angular', email:'teste2@test.com.br'}
    ]);
  }
  setEmployeeValues() {
    this.employees.setValue([
      { id: '111', contact: 'Mohan', email:'teste@test.com.br'},
      { id: '112', contact: 'Angular', email:'teste2@test.com.br'}
    ]);
  }
  resetTeamForm() {
    this.teamForm.reset();
  }

}
