import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { ButtonType, CommonConstants, Direction, MediaLimits, NgxSfcCommonModule, Theme, UIClass, UIConstants, WINDOW } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { of } from 'rxjs';
import { LogoComponent } from 'src/app/share/components/logo/logo.component';
import { Locale, RoutKey } from '../../enums';
import { HeaderComponent } from './header.component';
import { HeaderConstants } from './header.constants';
import { HeaderPart } from './header.enum';
import { CommonConstants as Constants } from '../../constants';

describe('Core.Component:Header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let windowMock: any = <any>{
    location: {}
  };
  let resizeServiceMock: any = { onResize$: of(windowMock) };
  let routerMock = { navigate: jasmine.createSpy('navigate') };
  let store: any = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    clear: () => {
      store = {};
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, NgxSfcCommonModule, NgxSfcComponentsModule],
      declarations: [LogoComponent, HeaderComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    mockLocalStorage.clear();
    windowMock.location.reload = jasmine.createSpy('reload');
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('header')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.logo')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-logo')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.logo > sfc-hamburger-menu')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('nav')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('nav > ul')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li').length).toEqual(4);
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li > a').length).toEqual(4);
      expect(fixture.nativeElement.querySelector('div.right')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.languages')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-dropdown-menu')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.identity')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('div.identity > sfc-button').length).toEqual(2);
    });

    fit("Should have dark theme class by default", () => {
      expect(fixture.nativeElement.className).toContain(Theme.Dark);
    });

    fit("Should have dark theme class when mobile header is open", () => {
      const menuEl = fixture.debugElement.query(By.css('sfc-hamburger-menu'));
      menuEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(Theme.Dark);
    });

    fit("Should not have dark theme when stick", () => {
      windowMock.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(Theme.Dark);
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

  describe('Stick', () => {
    fit("Should not have stick class by default", () => {
      expect(fixture.nativeElement.className).not.toContain(HeaderConstants.STICK_CLASS);
    });

    fit("Should have stick class", () => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(HeaderConstants.STICK_CLASS);
    });
  });

  describe('Open', () => {
    fit("Should not have open class by default", () => {
      expect(fixture.nativeElement.className).not.toContain(UIClass.Open);
    });

    fit("Should have open class when mobile header is open", () => {
      const menuEl = fixture.debugElement.query(By.css('sfc-hamburger-menu'));
      menuEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Open);
    });

    fit("Should toggle body overflow value", () => {
      const menuEl = fixture.debugElement.query(By.css('sfc-hamburger-menu'));

      menuEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(document.body.style.overflow).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);

      menuEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(document.body.style.overflow).toEqual(UIConstants.CSS_INITIAL);
    });

    fit("Should close mobile header when window width more than MobileLarge", () => {
      const menuEl = fixture.debugElement.query(By.css('sfc-hamburger-menu'));
      menuEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Open);

      windowMock.innerWidth = MediaLimits.MobileLarge + 1;
      (component as any).resizeService = resizeServiceMock;
      component.ngOnDestroy();
      component.ngAfterViewInit();

      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Open);
    });

    fit("Should not close mobile header when window width less than MobileLarge", () => {
      const menuEl = fixture.debugElement.query(By.css('sfc-hamburger-menu'));
      menuEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Open);

      windowMock.innerWidth = MediaLimits.MobileLarge - 1;
      (component as any).resizeService = resizeServiceMock;
      component.ngOnDestroy();
      component.ngAfterViewInit();

      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Open);
    });
  });

  describe('Logo', () => {
    fit('Should hamburger menu have appropriate attributes', () => {
      expect(fixture.debugElement.query(By.css('sfc-hamburger-menu')).componentInstance.open).toBeFalse();
    });

    fit('Should toggle hamburger menu', () => {
      const menuEl = fixture.debugElement.query(By.css('sfc-hamburger-menu'));
      menuEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(menuEl.componentInstance.open).toBeTrue();
    });
  });

  describe('Navigation', () => {
    fit("Should have text for about", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[0].innerText).toEqual('ABOUT');
    });

    fit("Should navigate to about", () => {
      const aboutLink = fixture.debugElement.queryAll(By.css('nav > ul > li > a'))[0],
        fragment = HeaderPart.About;
      aboutLink.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Welcome}`], { fragment });
    });

    fit("Should have text for locations", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[1].innerText).toEqual('LOCATIONS');
    });

    fit("Should navigate to locations", () => {
      const aboutLink = fixture.debugElement.queryAll(By.css('nav > ul > li > a'))[1],
        fragment = HeaderPart.Locations;
      aboutLink.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Welcome}`], { fragment });
    });

    fit("Should have text for process", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[2].innerText).toEqual('PROCESS');
    });

    fit("Should navigate to process", () => {
      const aboutLink = fixture.debugElement.queryAll(By.css('nav > ul > li > a'))[2],
        fragment = HeaderPart.Process;
      aboutLink.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Welcome}`], { fragment });
    });

    fit("Should have text for contact us", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[3].innerText).toEqual('CONTACT US');
    });

    fit("Should navigate to contact us", () => {
      const aboutLink = fixture.debugElement.queryAll(By.css('nav > ul > li > a'))[3],
        fragment = HeaderPart.Contact;
      aboutLink.nativeElement.dispatchEvent(new MouseEvent('click'));

      expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Welcome}`], { fragment });
    });

    fit("Should close mobile header", () => {
      const menuEl = fixture.debugElement.query(By.css('sfc-hamburger-menu')),
        aboutLink = fixture.debugElement.queryAll(By.css('nav > ul > li > a'))[0];

      menuEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).toContain(UIClass.Open);

      aboutLink.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(fixture.nativeElement.className).not.toContain(UIClass.Open);
    });
  });

  describe('Languages', () => {
    fit('Should sfc-dropdown-menu have appropriate attributes', () => {
      localStorage.setItem(Constants.LOCALE_KEY, Locale.English);
      component.ngOnInit();
      fixture.detectChanges();

      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('sfc-dropdown-menu'));

      expect(dropdownMenuEl.componentInstance.label).toEqual(HeaderConstants.LANGUAGES[1].label);
      expect(dropdownMenuEl.componentInstance.items).toEqual(HeaderConstants.LANGUAGES);
      expect(dropdownMenuEl.componentInstance.icon).toEqual(faGlobe);
    });

    fit('Should language has default value', () => {
      component.Languages = [];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-dropdown-menu')).componentInstance.label)
        .toEqual(HeaderConstants.DEFAULT_LANGUAGE);
    });

    fit('Should sfc-delimeter have appropriate attributes', () => {
      const delimeterEl: DebugElement = fixture.debugElement.query(By.css('sfc-delimeter'));

      expect(delimeterEl.componentInstance.direction).toEqual(Direction.Vertical);
    });

    fit('Should change language value', () => {
      expect(fixture.debugElement.query(By.css('sfc-dropdown-menu')).componentInstance.label)
        .toEqual(HeaderConstants.DEFAULT_LANGUAGE);

      const uaLangItemEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-dropdown-menu-item'))[0];
      uaLangItemEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-dropdown-menu')).componentInstance.label)
        .toEqual('Українська');
    });

    fit('Should change locale value', () => {
      expect(localStorage.getItem(Constants.LOCALE_KEY)).toBeNull();

      const uaLangItemEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-dropdown-menu-item'))[0];
      uaLangItemEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(localStorage.getItem(Constants.LOCALE_KEY)).toEqual(Locale.Ukraine);
    });

    fit('Should reload page on change language', () => {
      const uaLangItemEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-dropdown-menu-item'))[0];
      uaLangItemEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(windowMock.location.reload).toHaveBeenCalledTimes(1);
    });
  });

  describe('Identity', () => {
    fit('Should have appropriate attributes for login', () => {
      const loginBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[0];

      expect(loginBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
      expect(loginBtn.attributes['ng-reflect-custom-size']).toEqual('0.7');
      expect(loginBtn.componentInstance.text).toEqual('Sign in');
      expect(loginBtn.componentInstance.iconBefore.iconName).toEqual('arrow-right-to-bracket');
      expect(loginBtn.componentInstance.iconBefore.prefix).toEqual('fas');
    });

    fit("Should navigate to sign in", () => {
      expect(fixture.debugElement.queryAll(By.css('sfc-button'))[0].attributes['routerLink'])
        .toEqual(`${RoutKey.Identity}/${RoutKey.Login}`);
    });

    fit('Should have appropriate attributes for sign up', () => {
      const registrationBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[1];

      expect(registrationBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
      expect(registrationBtn.attributes['ng-reflect-custom-size']).toEqual('0.7');
      expect(registrationBtn.componentInstance.text).toEqual('Sign up');
      expect(registrationBtn.componentInstance.iconBefore.iconName).toEqual('user-plus');
      expect(registrationBtn.componentInstance.iconBefore.prefix).toEqual('fas');
    });

    fit("Should navigate to sign up", () => {
      expect(fixture.debugElement.queryAll(By.css('sfc-button'))[1].attributes['routerLink'])
        .toEqual(`${RoutKey.Identity}/${RoutKey.Registration}`);
    });
  });
});
