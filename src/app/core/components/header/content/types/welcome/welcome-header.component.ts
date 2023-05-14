import { Component, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { WINDOW, ButtonType } from 'ngx-sfc-common';
import { RoutKey } from '../../../../../enums';
import { buildPath } from '../../../../../utils';
import { WelcomeHeaderConstants } from './welcome-header.constants';
import { WelcomeHeaderPart } from './welcome-header.enum';
import { HeaderService } from '../../../services/header.service';
import { IHeaderNavigationModel } from '../../base/header-navigation.model';

@Component({
  selector: 'sfc-welcome-header',
  templateUrl: './welcome-header.component.html',
  styleUrls: ['./welcome-header.component.scss']
})
export class WelcomeHeaderComponent implements OnInit {

  faSignIn = faSignIn;
  faUserPlus = faUserPlus;

  ButtonType = ButtonType;

  BUTTON_SIGN_IN_TEXT = $localize`:@@core.component.header-welcome.identity.login:Sign in`;
  BUTTON_SIGN_UP_TEXT = $localize`:@@core.component.header-welcome.identity.registration:Sign up`;

  @HostBinding(`class.${WelcomeHeaderConstants.STICK_CLASS}`)
  private _stick: boolean = false;

  public navigations: IHeaderNavigationModel[] = [
    {
      label: $localize`:@@core.component.header-welcome.navigation.about:About`,
      click: () => this.navigate(WelcomeHeaderPart.About)
    },
    {
      label: $localize`:@@core.component.header-welcome.navigation.locations:Locations`,
      click: () => this.navigate(WelcomeHeaderPart.Locations)
    },
    {
      label: $localize`:@@core.component.header-welcome.navigation.process:Process`,
      click: () => this.navigate(WelcomeHeaderPart.Process)
    },
    {
      label: $localize`:@@core.component.header-welcome.navigation.contact-us:Contact Us`,
      click: () => this.navigate(WelcomeHeaderPart.Contact)
    }
  ]

  @HostListener('window:scroll')
  onScroll(): void {
    this._stick = this.window.scrollY > 0;
  }

  constructor(@Inject(WINDOW) private window: Window,
    private headerService: HeaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.headerService.toggleByValue(false);
  }

  private navigate(fragment: string): void {
    this.headerService.toggleByValue(false);
    this.router.navigate([buildPath(RoutKey.Welcome)], { fragment });
  }
}
