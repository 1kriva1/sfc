import { Component, Input } from '@angular/core';

@Component({
  selector: 'sfc-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input()
  showTitle: boolean = true;
}
