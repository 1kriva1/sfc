import { Component } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { Position, Theme } from 'ngx-sfc-common';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'sfc-theme-toggler',
  templateUrl: './theme-toggler.component.html'
})
export class ThemeTogglerComponent {

  faMoon = faMoon;
  faSun = faSun;

  Position = Position;

  TOOLTIP_TEXT = $localize`:@@share.component.theme-toggler.tooltip:Toggle website theme`;

  public get isActive(): boolean {
    return this.themeService.theme === Theme.Dark;
  }

  constructor(public themeService: ThemeService) { }
}
