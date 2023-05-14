import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { WINDOW } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { CommonConstants } from 'src/app/core/constants';
import { Locale } from 'src/app/core/enums';
import { LanguageTogglerComponent } from './language-toggler.component';
import { LanguageTogglerConstants } from './language-toggler.constants';

describe('Core.BaseHeader.Component:LanguageToggler', () => {
  let component: LanguageTogglerComponent;
  let fixture: ComponentFixture<LanguageTogglerComponent>;
  let windowMock: any = <any>{
    location: {}
  };
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
      imports: [NoopAnimationsModule, NgxSfcComponentsModule],
      declarations: [LanguageTogglerComponent],
      providers: [
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageTogglerComponent);
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
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-dropdown-menu')).toBeTruthy();
    });
  });

  describe('Dropdown', () => {
    fit('Should have appropriate attributes', () => {
      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('sfc-dropdown-menu'));

      expect(dropdownMenuEl.componentInstance.label).toEqual(LanguageTogglerConstants.LANGUAGES[1].label);
      expect(dropdownMenuEl.componentInstance.items).toEqual(LanguageTogglerConstants.LANGUAGES);
      expect(dropdownMenuEl.componentInstance.icon).toEqual(faGlobe);
    });

    fit('Should have language from local storage', () => {
      localStorage.setItem(`${CommonConstants.APPLICATION_PREFIX}-${CommonConstants.LOCALE_KEY}`, Locale.Ukraine);
      component.ngOnInit();
      fixture.detectChanges();

      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('sfc-dropdown-menu'));

      expect(dropdownMenuEl.componentInstance.label).toEqual(LanguageTogglerConstants.LANGUAGES[0].label);
    });

    fit('Should language has default value', () => {
      component.languages = [];
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-dropdown-menu')).componentInstance.label)
        .toEqual(LanguageTogglerConstants.DEFAULT_LANGUAGE);
    });

    fit('Should change language value', () => {
      expect(fixture.debugElement.query(By.css('sfc-dropdown-menu')).componentInstance.label)
        .toEqual(LanguageTogglerConstants.DEFAULT_LANGUAGE);

      const uaLangItemEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-dropdown-menu-item'))[0];
      uaLangItemEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('sfc-dropdown-menu')).componentInstance.label)
        .toEqual(LanguageTogglerConstants.LANGUAGES[0].label);
    });
  });

  describe('Locale', () => {
    fit('Should change locale value', () => {
      expect(localStorage.getItem(`${CommonConstants.APPLICATION_PREFIX}-${CommonConstants.LOCALE_KEY}`)).toBeNull();

      const uaLangItemEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-dropdown-menu-item'))[0];
      uaLangItemEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(localStorage.getItem(`${CommonConstants.APPLICATION_PREFIX}-${CommonConstants.LOCALE_KEY}`)).toEqual(Locale.Ukraine);
    });

    fit('Should reload page on change language', () => {
      const uaLangItemEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-dropdown-menu-item'))[0];
      uaLangItemEl.nativeElement.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();

      expect(windowMock.location.reload).toHaveBeenCalledTimes(1);
    });
  });
});