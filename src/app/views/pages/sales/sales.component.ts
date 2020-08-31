import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'kt-sales',
  templateUrl: './sales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

}
