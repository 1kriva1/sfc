import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ButtonType, CheckmarkType, Direction, NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule, SliderType } from 'ngx-sfc-components';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { RoutKey } from 'src/app/core/enums';
import { LogoComponent } from 'src/app/share/components/logo/logo.component';
import { LoginPageComponent } from './login.page.component';
import { LoginPageConstants } from './login.page.constants';

describe('Features.Identity.Page:Login', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgxSfcCommonModule, NgxSfcInputsModule, NgxSfcComponentsModule],
      declarations: [LogoComponent, LoginPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create page", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.left')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.title')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-slider')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.description')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.right')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-logo')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-text-input#username-email')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-text-input#password')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-checkbox-input#remember')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action sfc-button')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action sfc-delimeter')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action .sso')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action .redirect')).toBeTruthy();
    });
  });

  describe('Left side', () => {
    fit('Should have appropriate attributes for slider', () => {
      const sliderEl: DebugElement = fixture.debugElement.query(By.css('sfc-slider'));

      expect(sliderEl.componentInstance.items).toEqual(LoginPageConstants.SLIDER_ITEMS);
      expect(sliderEl.componentInstance.showCount).toBeFalse();
      expect(sliderEl.componentInstance.showAutomaticToggle).toBeFalse();
      expect(sliderEl.componentInstance.type).toEqual(SliderType.Automatic);
    });
  });

  describe('Right side', () => {
    fit('Should logo have appropriate size', () => {
      expect(fixture.debugElement.query(By.css('sfc-logo')).attributes['ng-reflect-custom-size']).toEqual('1.3');
    });

    fit('Should username or email input have appropriate attributes', () => {
      const userNameEmailInput: DebugElement = fixture.debugElement.query(By.css('sfc-text-input#username-email'));

      expect(userNameEmailInput.componentInstance.label).toEqual('Username or Email');
      expect(userNameEmailInput.componentInstance.placeholder).toEqual('Username or Email');
    });

    fit('Should password input have appropriate attributes', () => {
      const passwordInput: DebugElement = fixture.debugElement.query(By.css('sfc-text-input#password'));

      expect(passwordInput.componentInstance.label).toEqual('Password');
      expect(passwordInput.componentInstance.placeholder).toEqual('Password');
    });

    fit('Should remember input have appropriate attributes', () => {
      const passwordInput: DebugElement = fixture.debugElement.query(By.css('sfc-checkbox-input#remember'));

      expect(passwordInput.componentInstance.sideLabel).toEqual('Remember me!');
      expect(passwordInput.componentInstance.checkmarkType).toEqual(CheckmarkType.Rounded);
    });

    fit('Should have appropriate route link for forgot password link', () => {
      expect(fixture.debugElement.query(By.css('.part.remember a.forgot')).attributes['routerLink'])
        .toEqual(`/${RoutKey.Identity}/${RoutKey.Registration}`);
    });

    fit('Should have appropriate attributes for sign in button', () => {
      const registrationBtn: DebugElement = fixture.debugElement.query(By.css('.action > sfc-button'));

      expect(registrationBtn.componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
      expect(registrationBtn.componentInstance.text).toEqual('Sign in!');
    });

    fit('Should have appropriate attributes for delimeter', () => {
      const delimeterEl: DebugElement = fixture.debugElement.query(By.css('.action > sfc-delimeter'));

      expect(delimeterEl.componentInstance.label).toEqual('or');
      expect(delimeterEl.componentInstance.direction).toEqual(Direction.Horizontal);
    });

    fit('Should have appropriate href for google sso', () => {
      expect(fixture.nativeElement.querySelector('.sso-link').href).toEqual('https://google.com/');
    });

    fit('Should have appropriate route link for sign up link', () => {
      expect(fixture.debugElement.query(By.css('.redirect a')).attributes['routerLink'])
        .toEqual(`/${RoutKey.Identity}/${RoutKey.Registration}`);
    });
  });
});