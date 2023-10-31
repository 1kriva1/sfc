import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  ButtonType,
  CheckmarkType,
  CommonConstants,
  Direction,
  nameof,
  NgxSfcCommonModule,
  UIConstants
} from 'ngx-sfc-common';
import { NgxSfcComponentsModule, SliderType } from 'ngx-sfc-components';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { of, throwError } from 'rxjs';
import { RoutKey } from '@core/enums';
import { IdentityService } from '@share/services/identity/identity.service';
import { ILoginRequest, ILoginResponse } from '@share/services/identity/models';
import { LoginPageComponent } from './login.page.component';
import { LoginPageConstants } from './login.page.constants';
import { PlayerService } from '@share/services';
import { ILoginFormModel } from './login-form.model';
import { ShareModule } from '@share/share.module';
import { buildTitle } from '@core/utils';

describe('Features.Identity.Page:Login', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let identityServiceStub: Partial<IdentityService> = {
    login: (_: ILoginRequest) => { return of(); },
    logout: () => { return of(); }
  };
  let routerMock = { navigate: (_: string[]) => { } };
  let playerServiceStub: any = {
    player: { value$: of(null) },
    get: () => { return of(); }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, NgxSfcCommonModule, NgxSfcInputsModule, NgxSfcComponentsModule,
        ShareModule],
      declarations: [LoginPageComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: PlayerService, useValue: playerServiceStub },
        { provide: IdentityService, useValue: identityServiceStub }
      ]
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
      expect(fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-checkbox-input .sfc-input#sfc-remember')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.errors')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action sfc-button')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action sfc-delimeter')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action .sso')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.action .redirect')).toBeTruthy();
    });

    fit("Should call unsubscribe", () => {
      const unsubscribeSpy = spyOn(
        (component as any)._subscription,
        'unsubscribe'
      ).and.callThrough();

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });

    fit('Should have page title', () => {
      const titleService = TestBed.inject(Title);

      expect(titleService.getTitle()).toBe(buildTitle('Login'));
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

    fit('Should logo have appropriate route link', () => {
      expect(fixture.debugElement.query(By.css('sfc-logo')).attributes['routerLink'])
        .toEqual('/');
    });

    fit('Should username or email input have appropriate attributes', () => {
      const userNameEmailInput: DebugElement = fixture.debugElement.query(By.css('sfc-text-input .sfc-input#sfc-username-email'));

      expect(userNameEmailInput.componentInstance.label).toEqual('Username or Email');
      expect(userNameEmailInput.componentInstance.placeholder).toEqual('Username or Email');
    });

    fit('Should password input have appropriate attributes', () => {
      const passwordInput: DebugElement = fixture.debugElement.query(By.css('sfc-text-input .sfc-input#sfc-password'));

      expect(passwordInput.componentInstance.label).toEqual('Password');
      expect(passwordInput.componentInstance.placeholder).toEqual('Password');
    });

    fit('Should remember input have appropriate attributes', () => {
      const passwordInput: DebugElement = fixture.debugElement.query(By.css('sfc-checkbox-input .sfc-input#sfc-remember'));

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

    describe('Form', () => {
      fit('Should have valid inputs count', () => {
        const formEl = fixture.nativeElement.querySelector('form'),
          inputs = formEl.querySelectorAll('input');

        expect(inputs.length).toEqual(3);
      });

      fit('Should have initial value', () => {
        expect(component.loginForm.value).toEqual({
          userNameEmail: null,
          password: null,
          remember: false
        });
      });

      fit('Should have valid autocomplete attribute', () => {
        expect(fixture.nativeElement.querySelector('form').attributes['autocomplete'].nodeValue).toEqual('off');
      });

      fit('Should be invalid', () => {
        expect(component.loginForm.valid).toBeFalse();
      });

      fit('Should be valid', () => {
        makeFormValid();

        expect(component.loginForm.valid).toBeTrue();
      });

      fit('Should submit button be enabled by default', () => {
        expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.disabled).toBeFalse();
      });

      fit('Should submit button be disabled after click with invalid state', () => {
        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(submitBtnEl.componentInstance.disabled).toBeTrue();
      });

      fit('Should submit button become enabled after make form valid', () => {
        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(submitBtnEl.componentInstance.disabled).toBeTrue();

        makeFormValid();

        expect(submitBtnEl.componentInstance.disabled).toBeFalse();
      });

      fit('Should make form controls dirty on submit button click', () => {
        const passwordInput = component.loginForm.get(nameof<ILoginFormModel>('password')),
          userNameEmailInput = component.loginForm.get(nameof<ILoginFormModel>('userNameEmail'));

        expect(passwordInput!.dirty).toBeFalse();
        expect(userNameEmailInput!.dirty).toBeFalse();

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(passwordInput!.dirty).toBeTrue();
        expect(userNameEmailInput!.dirty).toBeTrue();
      });

      describe('UserNameEmail input', () => {
        fit('Should have initial validation state', () => {
          const userNameEmailControl = component.loginForm.get('userNameEmail');

          expect(userNameEmailControl?.errors).not.toBeNull();
          expect((userNameEmailControl?.errors as any)['required']).toBeTrue();
        });

        fit('Should change value after input', () => {
          const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
            userNameEmailControl = component.loginForm.get('userNameEmail');

          userNameEmailInputEl.value = 'username';
          userNameEmailInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(userNameEmailControl?.value).toEqual(userNameEmailInputEl.value);
        });

        fit('Should be valid', () => {
          const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
            userNameEmailControl = component.loginForm.get('userNameEmail');

          userNameEmailInputEl.value = 'username';
          userNameEmailInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(userNameEmailControl?.errors).toBeNull();
        });
      });

      describe('Password input', () => {
        fit('Should have initial validation state', () => {
          const passwordControl = component.loginForm.get('password');

          expect(passwordControl?.errors).not.toBeNull();
          expect((passwordControl?.errors as any)['required']).toBeTrue();
        });

        fit('Should change value after input', () => {
          const passwordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password'),
            passwordControlControl = component.loginForm.get('password');

          passwordControlInputEl.value = 'pass';
          passwordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(passwordControlControl?.value).toEqual(passwordControlInputEl.value);
        });

        fit('Should be valid', () => {
          const passwordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password'),
            passwordControlControl = component.loginForm.get('password');

          passwordControlInputEl.value = 'Test1234!';
          passwordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(passwordControlControl?.errors).toBeNull();
        });
      });

      describe('Remember input', () => {
        fit('Should have initial validation state', () => {
          const passwordControl = component.loginForm.get('remember');

          expect(passwordControl?.errors).toBeNull();
        });

        fit('Should change value after input', () => {
          const passwordControlInputEl = fixture.debugElement.query(By.css('sfc-checkbox-input .sfc-input#sfc-remember')),
            passwordControlControl = component.loginForm.get('remember');

          passwordControlInputEl.triggerEventHandler('input', { target: { nativeElement: passwordControlInputEl.nativeElement, checked: true } });
          fixture.detectChanges();

          expect(`${passwordControlControl?.value}`).toEqual(passwordControlInputEl.nativeElement.value);
        });
      });
    });

    describe('Login process', () => {
      fit('Should not call login if form invalid', () => {
        spyOn(identityServiceStub, 'login' as any);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(identityServiceStub.login).not.toHaveBeenCalled();
      });

      fit('Should call login if form valid when using email', () => {
        spyLogin('user-id');

        makeFormValid();

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(identityServiceStub.login).toHaveBeenCalledOnceWith({ Password: 'Test1234!', RememberMe: true, Email: 'email@mail.com' });
      });

      fit('Should call login if form valid when using username', () => {
        spyLogin('user-id');

        makeFormValid(false);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(identityServiceStub.login).toHaveBeenCalledOnceWith({ Password: 'Test1234!', RememberMe: true, UserName: 'username' });
      });

      fit('Should show error if login failed', () => {
        spyLogin('', false);

        makeFormValid();

        const errorsEl = fixture.debugElement.query(By.css('.errors'));

        expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
        expect(errorsEl.styles['opacity']).toEqual('0');
        expect(fixture.nativeElement.querySelector('.error-message').textContent).toEqual(CommonConstants.EMPTY_STRING);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
        expect(errorsEl.styles['opacity']).toEqual('1');
        expect(fixture.nativeElement.querySelector('.error-message').textContent).toEqual('msg');
      });

      fit('Should clear previous error if login success', () => {
        const loginSpy = spyLogin('', false);

        makeFormValid();

        const errorsEl = fixture.debugElement.query(By.css('.errors'));

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
        expect(errorsEl.styles['opacity']).toEqual('1');

        loginSpy.and.returnValue(of({
          Token: {},
          UserId: 'user-id',
          Errors: null,
          Success: true,
          Message: 'Success'
        } as ILoginResponse));

        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
        expect(errorsEl.styles['opacity']).toEqual('0');
      });

      fit("Should navigate to home on success", () => {
        spyLogin('user-id');
        spyOn(routerMock, 'navigate');

        makeFormValid(false);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Home}`]);
      });

      fit("Should not navigate to home on failure", () => {
        spyOn(identityServiceStub, 'login' as any).and.returnValue(throwError(() => new Error('Login error')));
        spyOn(routerMock, 'navigate');

        makeFormValid(false);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(routerMock.navigate).not.toHaveBeenCalledWith([`/${RoutKey.Home}`]);
      });
    });
  });

  function makeFormValid(useEmail = true): void {
    const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
      rememberControlInputEl = fixture.debugElement.query(By.css('sfc-checkbox-input .sfc-input#sfc-remember')),
      passwordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password');

    userNameEmailInputEl.value = useEmail ? 'email@mail.com' : 'username';
    userNameEmailInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    rememberControlInputEl.triggerEventHandler('input', { target: { nativeElement: rememberControlInputEl.nativeElement, checked: true } });
    fixture.detectChanges();

    passwordControlInputEl.value = 'Test1234!';
    passwordControlInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function spyLogin(userId: string, success: boolean = true): jasmine.Spy<any> {
    return spyOn(identityServiceStub, 'login' as any).and.returnValue(of({
      Token: {},
      UserId: userId,
      Errors: null,
      Success: success,
      Message: 'msg'
    } as ILoginResponse));
  }
});