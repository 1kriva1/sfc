import { Component, ElementRef, HostBinding, HostListener, Inject } from '@angular/core';
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ButtonType, WINDOW } from 'ngx-sfc-common';
import { HeaderConstants } from './header.constants';

@Component({
  selector: 'sfc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faSignIn = faSignIn;
  faUserPlus = faUserPlus;

  ButtonType = ButtonType;

  @HostBinding(`class.${HeaderConstants.STICK_CLASS}`)
  private _stick: boolean = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this._stick = this.window.scrollY > this.element.nativeElement?.offsetHeight;
  }

  constructor(private element: ElementRef, @Inject(WINDOW) private window: Window) { }
}
