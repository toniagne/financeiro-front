import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, fromEvent } from 'rxjs';
// NGRX
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import {Address, AuthService} from '../../../../../core/auth';
import {AppState} from '../../../../../core/reducers';
import {LayoutUtilsService} from '../../../../../core/_base/crud';
import {UsersSystemService} from '../../../../../core/services/users-system.service';

@Component({
  selector: 'kt-addresses',
  templateUrl: './addresses.component.html'
})
export class AddressesComponent implements OnInit {
  // Public properties
  // Incoming data
  @Input() addressSubject: BehaviorSubject<Address>;
  hasFormErrors = false;
  addressForm: FormGroup;
  cities: any = [];
  states: any = [];
  loading = false;
  loadingStates = false;
  loadingAll = false;
  /**
   * Component Costructor
   *
   * @param fb: FormBuilder
   * @param auth: AuthServiceProd
   * @param store: Store<AppState>
   * @param layoutUtilsService: LayoutUtilsService
   */
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private store: Store<AppState>,
              private userService: UsersSystemService,
              private layoutUtilsService: LayoutUtilsService) {
  }


  ngOnInit() {
    this.loadingStates = true;
    this.userService.getStates().subscribe(
        res => {
          this.states = res;
          this.loadingStates = false;
        });
    this.userService.getCities().subscribe(
        res => {
          this.cities = res;
          this.loading = false;
        });
    if (!this.addressSubject.value) {
      const newAddress = new Address();
      newAddress.clear();
      this.addressSubject.next(newAddress);
    }

    this.createForm();
    this.addressForm.valueChanges
        .pipe(
            // tslint:disable-next-line:max-line-length
            debounceTime(150), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
            tap(() => {
              console.log('atualiza');
              this.updateAddress();
            })
        )
        .subscribe();
  }

  /**
   * Init form
   */
  createForm() {
    this.addressForm = this.fb.group({
      address: [this.addressSubject.value.address, Validators.required],
      city_id: [this.addressSubject.value.city_id, Validators.required],
      state: [this.addressSubject.value.state, Validators.required],
      number: [this.addressSubject.value.number, Validators.required],
      neighborhood: [this.addressSubject.value.neighborhood, Validators.required],
      zipcode: [this.addressSubject.value.zipcode, Validators.required],
      complement: [this.addressSubject.value.complement]
    });
  }

  /**
   * Update address
   */
  updateAddress() {
    this.hasFormErrors = false;
    const controls = this.addressForm.controls;
    /** check form */
    if (this.addressForm.invalid) {
      Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;

      return;
    }

    const newAddress = new Address();
    newAddress.clear();
    newAddress.address = controls.address.value;
    newAddress.city_id = controls.city_id.value;
    newAddress.zipcode = controls.zipcode.value;
    newAddress.state = controls.state.value;
    newAddress.number = controls.number.value;
    newAddress.neighborhood = controls.neighborhood.value;
    newAddress.complement = controls.complement.value;
    this.addressSubject.next(newAddress);
  }

  onChanges(): void {
    this.addressForm.get('state').valueChanges.subscribe(val => {
   console.log(val);
    });
    return;
  }

  showCities(event){
    this.loading = true;
    this.userService.getCityById(event).subscribe(
        val =>{
          this.loading = false;
          this.cities = val;
        }
    )
  }
  /**
   * Close alert
   *
   * @param $event: Event
   */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }

  checkZipcode(){
    this.loading = true;
    this.userService.getCepDetails(this.addressForm.get('zipcode').value).subscribe(
        val => this.sparesData(val)
    );
  }
    sparesData(data){
        this.loading = false;
        this.addressForm.patchValue({
            address: data.logradouro,
            city_id: data.cidade,
            state: data.estado,
            neighborhood: data.bairro,
            zipcode: data.cep
        })
        this.updateAddress();
    }

}
