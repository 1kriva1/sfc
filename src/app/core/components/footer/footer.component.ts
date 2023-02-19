import { Component } from '@angular/core';
import { Theme } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  Theme = Theme;

  public get year(): number {
    return new Date().getFullYear();
  }
}
