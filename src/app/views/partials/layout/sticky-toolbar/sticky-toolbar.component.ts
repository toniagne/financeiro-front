// Angular
import {Component} from '@angular/core';
// Layout
import {LayoutConfigService, OffcanvasOptions} from '../../../../core/_base/layout';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersSystemService} from '../../../../core/services/users-system.service';
import {ViewEncapsulation} from '@angular/cli/lib/config/schema';

const OPTIONS: string[] =
    ['EM ABERTO', 'EMITIDAS', 'EM ABERTO'];


@Component({
  selector: 'kt-sticky-toolbar',
  templateUrl: './sticky-toolbar.component.html',
  styleUrls: ['./sticky-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StickyToolbarComponent {
  // Public properties
  offcanvasOptions: OffcanvasOptions = {
    overlay: true,
    baseClass: 'offcanvas',
    placement: 'right',
    closeBy: 'kt_filter_receives_close',
    toggleBy: 'kt_filter_receives_toggle'
  };

  baseHref: string;
  formGroup: FormGroup;
  options: any = [];
  period: any = [];
  category: any = [];
  loading = false;

  constructor(private layoutConfigService: LayoutConfigService,  private userFB: FormBuilder, private userService: UsersSystemService,) {
    this.options = OPTIONS;
    this.userService.getAllCategories().subscribe( res => {  this.category = res.items;  });
    this.userService.getRecurrences().subscribe( res => { this.period = res.items; });
  }

  ngOnInit(): void {
    this.formGroup = this.userFB.group({
      options: [''],
      period: [''],
      category: [''],
      value: ['0,00']
    });
  }

  onSumbit(){
    console.log(this.formGroup.controls);
  }

  isActiveDemo(demo) {
    return demo === this.layoutConfigService.getConfig('demo');
  }
}
