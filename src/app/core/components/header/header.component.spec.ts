import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MediaLimits, NgxSfcCommonModule, ResizeService, WINDOW } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { of } from 'rxjs';
import { LogoComponent } from '@share/components/logo/logo.component';
import { IdentityService } from '@share/services/identity/identity.service';
import { BaseHeaderComponent } from './types/base/base-header.component';
import { LanguageTogglerComponent } from './parts/language-toggler/language-toggler.component';
import { AuthenticatedHeaderComponent } from './types/authenticated/authenticated-header.component';
import { WelcomeHeaderComponent } from './types/welcome/welcome-header.component';
import { HeaderComponent } from './header.component';
import { HeaderService } from './services/header.service';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from '@share/services';

describe('Core.Component:Header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let windowMock: any = <any>{ location: {} };
  let resizeServiceStub: Partial<ResizeService> = { onResize$: of(windowMock) };
  let playerServiceStub: any = { player: { value$: of(null) } };
  let identityServiceStub: Partial<IdentityService> = {};
  let headerServiceStub: Partial<HeaderService> = { toggleByValue: () => { } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FontAwesomeModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcComponentsModule],
      declarations: [
        LogoComponent,
        HeaderComponent,
        BaseHeaderComponent,
        WelcomeHeaderComponent,
        AuthenticatedHeaderComponent,
        LanguageTogglerComponent
      ],
      providers: [
        { provide: IdentityService, useValue: identityServiceStub },
        { provide: ResizeService, useValue: resizeServiceStub },
        { provide: HeaderService, useValue: headerServiceStub },
        { provide: PlayerService, useValue: playerServiceStub },
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit("Should create component", () => {
    expect(component).toBeTruthy();
  });

  fit("Should have main elements", () => {
    expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
  });

  fit("Should show welcome header", () => {
    expect(fixture.nativeElement.querySelector('sfc-welcome-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('sfc-authenticated-header')).toBeNull();
  });

  fit("Should show authenticated header", () => {
    (identityServiceStub as any).isLoggedIn = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('sfc-welcome-header')).toBeNull();
    expect(fixture.nativeElement.querySelector('sfc-authenticated-header')).toBeTruthy();
  });

  fit("Should header service height$ be defined", () => {
    expect((component as any).headerService).toBeTruthy();
  });

  fit("Should welcome header has defined height", (done) => {
    (identityServiceStub as any).isLoggedIn = false;
    fixture.detectChanges();

    (component as any).headerService.height$.subscribe((height: number) => {
      expect(height).toBeDefined();
    });

    done();
  });

  fit("Should authenticated header has defined height", (done) => {
    (identityServiceStub as any).isLoggedIn = true;
    fixture.detectChanges();

    (component as any).headerService.height$.subscribe((height: number) => {
      expect(height).toBeDefined();
    });

    done();
  });

  fit("Should not emit header's height", (done) => {
    (identityServiceStub as any).isLoggedIn = false;
    (headerServiceStub as any).open = true;
    fixture.detectChanges();

    let emitted = false;

    (component as any).headerService.height$.subscribe({
      next: () => emitted = true,
      complete: () => {
        expect(emitted).toBeFalse();
        done();
      }
    });
  });

  fit("Should toggle header when window width more than MobileLarge", () => {
    spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

    (headerServiceStub as any).open = true;

    windowMock.innerWidth = MediaLimits.MobileLarge + 1;
    (component as any).resizeService = resizeServiceStub;
    component.ngOnDestroy();
    component.ngAfterViewInit();

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
  });

  fit("Should not toggle header when window width more than MobileLarge", () => {
    spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

    (headerServiceStub as any).open = true;

    windowMock.innerWidth = MediaLimits.MobileLarge;
    (component as any).resizeService = resizeServiceStub;
    component.ngOnDestroy();
    component.ngAfterViewInit();

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(headerServiceStub.toggleByValue).not.toHaveBeenCalledOnceWith(false);
  });

  fit("Should not toggle header when not openned", () => {
    spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

    (headerServiceStub as any).open = false;

    windowMock.innerWidth = MediaLimits.MobileLarge + 1;
    (component as any).resizeService = resizeServiceStub;
    component.ngOnDestroy();
    component.ngAfterViewInit();

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(headerServiceStub.toggleByValue).not.toHaveBeenCalledOnceWith(false);
  });

  fit("Should call unsubscribe on resize observable, when component destroyed", () => {
    const unsubscribeSpy = spyOn(
      (component as any)._resizeSubscription,
      'unsubscribe'
    ).and.callThrough();

    component?.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
