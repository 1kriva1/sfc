import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent, ButtonType, ComponentSizeDirective, WINDOW } from 'ngx-sfc-common';
import { HeaderComponent } from './header.component';

describe('Core.Component:Header', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let windowMock: any = <any>{};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ButtonComponent, ComponentSizeDirective, HeaderComponent],
      providers: [
        { provide: WINDOW, useFactory: (() => { return windowMock; }) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create component", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('header')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.logo')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.logo > a')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.logo > a > img')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.logo > a > span')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('nav')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('nav > ul')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li').length).toEqual(3);
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li > a').length).toEqual(3);
      expect(fixture.nativeElement.querySelector('div.identity')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('div.identity > sfc-button').length).toEqual(2);
    });
  });

  describe('Logo', () => {
    fit("Should have reference to root", () => {
      expect(fixture.nativeElement.querySelector('div.logo > a').pathname).toEqual('/');
    });

    fit("Should have constant image", () => {
      expect(fixture.nativeElement.querySelector('div.logo > a> img').src).toContain('/assets/images/home/logo.png');
    });

    fit("Should have constant text", () => {
      expect(fixture.nativeElement.querySelector('div.logo > a> span').innerText).toEqual('STREET FOOTBALL CLUB');
    });
  });

  describe('Navigation', () => {
    fit("Should have reference for process", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li > a')[0].pathname).toEqual('/');
    });

    fit("Should have reference for about", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li > a')[1].pathname).toEqual('/');
    });

    fit("Should have reference for contact us", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li > a')[2].pathname).toEqual('/');
    });

    fit("Should have text for process", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[0].innerText).toEqual('PROCESS');
    });

    fit("Should have text for about", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[1].innerText).toEqual('ABOUT');
    });

    fit("Should have text for contact us", () => {
      expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[2].innerText).toEqual('CONTACT US');
    });
  });

  describe('Identity', () => {
    fit('Should have appropriate attributes for login', () => {
      const loginBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[0];

      expect(loginBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
      expect(loginBtn.attributes['ng-reflect-custom-size']).toEqual('0.7');
      expect(loginBtn.componentInstance.text).toEqual('Login');
      expect(loginBtn.componentInstance.iconBefore.iconName).toEqual('arrow-right-to-bracket');
      expect(loginBtn.componentInstance.iconBefore.prefix).toEqual('fas');
    });

    fit('Should have appropriate attributes for sign up', () => {
      const registrationBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[1];

      expect(registrationBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
      expect(registrationBtn.attributes['ng-reflect-custom-size']).toEqual('0.7');
      expect(registrationBtn.componentInstance.text).toEqual('Sign up');
      expect(registrationBtn.componentInstance.iconBefore.iconName).toEqual('user-plus');
      expect(registrationBtn.componentInstance.iconBefore.prefix).toEqual('fas');
    });
  });
});
