import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGlobe, faSignIn, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { WINDOW, ButtonType, firstOrDefault, CommonConstants, UIClass, DOCUMENT, ResizeService, MediaLimits, Direction, Theme, UIConstants } from 'ngx-sfc-common';
import { IDropdownMenuItemModel } from 'ngx-sfc-components';
import { filter, map, startWith, Subscription } from 'rxjs';
import { Locale, RoutKey } from '../../enums';
import { buildPath } from '../../utils';
import { HeaderConstants } from './header.constants';
import { HeaderPart } from './header.enum';
import { HeaderService } from './services/header.service';
import { CommonConstants as Constants } from '../../constants';

@Component({
  selector: 'sfc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  faSignIn = faSignIn;
  faUserPlus = faUserPlus;
  faGlobe = faGlobe;

  ButtonType = ButtonType;
  Direction = Direction;
  Languages = HeaderConstants.LANGUAGES;
  HeaderPart = HeaderPart;

  BUTTON_SIGN_IN_TEXT = $localize`:@@core.component.header.identity.login:Sign in`;
  BUTTON_SIGN_UP_TEXT = $localize`:@@core.component.header.identity.registration:Sign up`;

  @HostBinding(`class.${HeaderConstants.STICK_CLASS}`)
  private _stick: boolean = false;

  @HostBinding(`class.${Theme.Dark}`)
  private get _darkTheme(): boolean {
    return !this._stick || this.open;
  }

  @HostBinding(`class.${UIClass.Open}`)
  private _open: boolean = false;
  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    this._open = value;
    this.document.body.style.overflow = value
      ? UIConstants.CSS_VISIBILITY_HIDDEN
      : UIConstants.CSS_INITIAL;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this._stick = this.window.scrollY > 0;
  }

  public get language(): string {
    return firstOrDefault(this.Languages, language => { return language.active || false; })?.label || HeaderConstants.DEFAULT_LANGUAGE;
  }

  private get headerHeight(): number {
    return this.element.nativeElement?.offsetHeight;
  }

  private userLocale: Locale = Locale.English;

  private _resizeSubscription?: Subscription;

  constructor(private element: ElementRef,
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private resizeService: ResizeService,
    private headerService: HeaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.userLocale = localStorage.getItem(Constants.LOCALE_KEY) as Locale;

    this.Languages.forEach(item => item.active = this.userLocale === item.value);

    this.headerService.height$ = this.resizeService.onResize$.pipe(
      startWith(this.headerHeight),
      filter(_ => !this.open),
      map(_ => this.headerHeight)
    );
  }

  ngAfterViewInit(): void {
    this._resizeSubscription = this.resizeService.onResize$
      .subscribe(window => {
        if (window.innerWidth > MediaLimits.MobileLarge && this.open)
          this.open = false;
      });
  }

  ngOnDestroy(): void {
    this._resizeSubscription?.unsubscribe();
  }

  changeLocale(model: IDropdownMenuItemModel) {
    localStorage.setItem(Constants.LOCALE_KEY, model.value);
    this.window.location.reload();
  }

  public navigate(fragment: string): void {
    this.open = false;
    this.router.navigate([buildPath(RoutKey.Welcome)], { fragment });
  }
}
