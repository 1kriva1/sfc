import { AfterViewChecked, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ButtonType, MediaLimits, WINDOW } from 'ngx-sfc-common';
import { NotFoundPageConstants } from './not-found.page.constants';

@Component({
  templateUrl: './not-found.page.component.html',
  styleUrls: ['./not-found.page.component.scss']
})
export class NotFoundPageComponent implements AfterViewChecked {

  ButtonType = ButtonType;

  BUTTON_BACK_TEXT = $localize`:@@core.page.not-found.button-back:BACK THE GAME`;

  public get size(): number {
    return NotFoundPageConstants.DEFAULT_SIZE * this.sizeFactor;
  }

  private get sizeFactor() {
    if (this.window.outerWidth <= MediaLimits.Tablet)
      return NotFoundPageConstants.TABLET_AND_LESS_SIZE_FACTOR * this.window.outerWidth / MediaLimits.LaptopLarge;
    else
      return NotFoundPageConstants.DEFAULT_SIZE_FACTOR * this.window.outerWidth / MediaLimits.LaptopLarge;
  }

  constructor(private changeDetector: ChangeDetectorRef, @Inject(WINDOW) private window: Window) { }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }
}
