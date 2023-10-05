import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaLimits, ResizeService } from 'ngx-sfc-common';
import { filter, map, startWith, Subscription } from 'rxjs';
import { IdentityService } from '@share/services/identity/identity.service';
import { AuthenticatedHeaderComponent } from './types/authenticated/authenticated-header.component';
import { WelcomeHeaderComponent } from './types/welcome/welcome-header.component';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'sfc-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit, OnDestroy {

  @ViewChild(WelcomeHeaderComponent, { static: false, read: ElementRef })
  welcomeHeader!: ElementRef;

  @ViewChild(AuthenticatedHeaderComponent, { static: false, read: ElementRef })
  authenticatedHeader!: ElementRef;

  private get headerHeight(): number {
    return this.identityService.isLoggedIn
      ? this.authenticatedHeader.nativeElement?.offsetHeight
      : this.welcomeHeader.nativeElement?.offsetHeight;
  }

  private _resizeSubscription?: Subscription;

  constructor(public identityService: IdentityService,
    private resizeService: ResizeService,
    private headerService: HeaderService) { }

  ngAfterViewInit(): void {
    this.headerService.height$ = this.resizeService.onResize$.pipe(
      startWith(this.headerHeight),
      filter(_ => !this.headerService.open),
      map(_ => this.headerHeight)
    );

    this._resizeSubscription = this.resizeService.onResize$
      .subscribe(window => {
        if (window.innerWidth > MediaLimits.MobileLarge && this.headerService.open)
          this.headerService.toggleByValue(false);
      });
  }

  ngOnDestroy(): void {
    this._resizeSubscription?.unsubscribe();
  }
}