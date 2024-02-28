import { Component, Input } from '@angular/core';

@Component({
  selector: 'sfc-no-data',
  template: `<span>{{label}}</span>`,
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {

  @Input()
  label: string = $localize`:@@core.no-data:No data`;
}
