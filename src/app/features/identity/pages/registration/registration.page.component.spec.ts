import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  ButtonType, CommonConstants, ComponentSize, Direction, ILoaderEvent, LoaderService,
  nameof,
  NgxSfcCommonModule, Theme, UIConstants
} from 'ngx-sfc-common';
import { NgxSfcComponentsModule, SliderType } from 'ngx-sfc-components';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { of, throwError } from 'rxjs';
import { CommonConstants as ApplicationCommonConstants } from '@core/constants';
import { RoutKey } from '@core/enums';
import { StorageService } from '@core/services/storage/storage.service';
import { LogoComponent } from '@share/components/logo/logo.component';
import { IdentityService } from '@share/services/identity/identity.service';
import { IRegistrationRequest, IRegistrationResponse } from '@share/services/identity/models';
import { IExistenceResponse } from '../../services/existence/existence.response';
import { ExistenceService } from '../../services/existence/existence.service';
import { RegistrationPageComponent } from './registration.page.component';
import { RegistrationPageConstants } from './registration.page.constants';
import { IRegistrationFormModel } from './registration-form.model';
import { buildTitle } from '@core/utils';

describe('Features.Identity.Page:Registration', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let existenceServiceStub: Partial<ExistenceService> = {},
    identityServiceStub: Partial<IdentityService> = { register: (_: IRegistrationRequest) => { return of(); } },
    loaderServiceStub: Partial<LoaderService> = {
      show: (id?: string, register?: boolean) => { return null; },
      hide: () => { },
      register: (_: ILoaderEvent) => { return of(); }
    },
    storageServiceStub: Partial<StorageService> = {
      set: () => { },
      get: () => Theme.Default as any
    };

  let routerMock = { navigate: (routes: string[]) => { } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, NgxSfcCommonModule, NgxSfcInputsModule, NgxSfcComponentsModule],
      declarations: [LogoComponent, RegistrationPageComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ExistenceService, useValue: existenceServiceStub },
        { provide: IdentityService, useValue: identityServiceStub },
        { provide: LoaderService, useValue: loaderServiceStub },
        { provide: StorageService, useValue: storageServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPageComponent);
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
      expect(fixture.nativeElement.querySelector('sfc-text-input#password')).toBeTruthy();
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

      expect(titleService.getTitle()).toBe(buildTitle('Registration'));
    });
  });

  describe('Left side', () => {
    fit('Should have appropriate attributes for slider', () => {
      const sliderEl: DebugElement = fixture.debugElement.query(By.css('sfc-slider'));

      expect(sliderEl.componentInstance.items).toEqual(RegistrationPageConstants.SLIDER_ITEMS);
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
      const passwordInput: DebugElement = fixture.debugElement.query(By.css('sfc-text-input#password'));

      expect(passwordInput.componentInstance.label).toEqual('Password');
      expect(passwordInput.componentInstance.placeholder).toEqual('Password');
    });

    fit('Should have appropriate attributes for sign up button', () => {
      const registrationBtn: DebugElement = fixture.debugElement.query(By.css('.action > sfc-button'));

      expect(registrationBtn.componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
      expect(registrationBtn.componentInstance.text).toEqual('Sign up!');
    });

    fit('Should have appropriate attributes for delimeter', () => {
      const delimeterEl: DebugElement = fixture.debugElement.query(By.css('.action > sfc-delimeter'));

      expect(delimeterEl.componentInstance.label).toEqual('or');
      expect(delimeterEl.componentInstance.direction).toEqual(Direction.Horizontal);
    });

    fit('Should have appropriate href for google sso', () => {
      expect(fixture.nativeElement.querySelector('.sso-link').href).toEqual('https://google.com/');
    });

    fit('Should have appropriate route link for sign in link', () => {
      expect(fixture.debugElement.query(By.css('.redirect a')).attributes['routerLink'])
        .toEqual(`/${RoutKey.Identity}/${RoutKey.Login}`);
    });

    describe('Form', () => {
      fit('Should have valid inputs count', () => {
        const formEl = fixture.nativeElement.querySelector('form'),
          inputs = formEl.querySelectorAll('input');

        expect(inputs.length).toEqual(3);
      });

      fit('Should have initial value', () => {
        expect(component.registrationForm.value).toEqual({
          userNameEmail: null,
          password: null,
          confirmPassword: null
        });
      });

      fit('Should have valid autocomplete attribute', () => {
        expect(fixture.nativeElement.querySelector('form').attributes['autocomplete'].nodeValue).toEqual('off');
      });

      fit('Should be invalid', () => {
        expect(component.registrationForm.valid).toBeFalse();
      });

      fit('Should be valid', fakeAsync(() => {
        makeFormValid();

        expect(component.registrationForm.valid).toBeTrue();

        discardPeriodicTasks();
      }));

      fit('Should submit button be enabled by default', () => {
        expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.disabled).toBeFalse();
      });

      fit('Should submit button be disabled after click with invalid state', () => {
        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(submitBtnEl.componentInstance.disabled).toBeTrue();
      });

      fit('Should submit button become enabled after make form valid', fakeAsync(() => {
        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(submitBtnEl.componentInstance.disabled).toBeTrue();

        makeFormValid();

        expect(submitBtnEl.componentInstance.disabled).toBeFalse();
      }));

      fit('Should make form controls dirty on submit button click', () => {
        Object.keys(component.registrationForm.controls).forEach(key =>
          expect(component.registrationForm.get(key)?.dirty).toBeFalse());

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        Object.keys(component.registrationForm.controls).forEach(key =>
          expect(component.registrationForm.get(key)?.dirty).toBeTrue());
      });

      describe('UserNameEmail input', () => {
        fit('Should have bounce loader', () => {
          expect(fixture.nativeElement.querySelector('sfc-bounce-loader')).toBeTruthy();
        });

        fit("Should bounce loader has defined attributes", () => {
          const loader = fixture.debugElement.query(By.css('sfc-bounce-loader'));

          expect(loader.componentInstance.id).toEqual(component.userNameEmailId);
          expect(loader.componentInstance.background).toBeFalse();
          expect(loader.attributes['ng-reflect-size']).toEqual(ComponentSize.Small);
        });

        fit('Should have initial validation state', () => {
          const userNameEmailControl = component.registrationForm.get('userNameEmail');

          expect(userNameEmailControl?.errors).not.toBeNull();
          expect((userNameEmailControl?.errors as any)['required']).toBeTrue();
        });

        fit('Should change value after input', () => {
          const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
            userNameEmailControl = component.registrationForm.get('userNameEmail');

          userNameEmailInputEl.value = 'username';
          userNameEmailInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(userNameEmailControl?.value).toEqual(userNameEmailInputEl.value);
        });

        fit('Should be invalid username', () => {
          const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
            userNameEmailControl = component.registrationForm.get('userNameEmail');

          userNameEmailInputEl.value = 'username#';
          userNameEmailInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect((userNameEmailControl?.errors as any)['sfcUserName']).toBeTrue();
        });

        fit('Should be invalid when username already exist', fakeAsync(() => {
          (existenceServiceStub as any).existByUserName = () => {
            return of({
              Exist: true,
              Success: true,
              Message: 'msg'
            } as IExistenceResponse)
          };

          const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
            userNameEmailControl = component.registrationForm.get('userNameEmail');

          userNameEmailInputEl.value = 'username';
          userNameEmailInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          tick(300);

          expect((userNameEmailControl?.errors as any)['sfcUserNameAlreadyExist']).toBeTrue();

          discardPeriodicTasks();
        }));

        fit('Should be invalid when email already exist', fakeAsync(() => {
          (existenceServiceStub as any).existByEmail = () => {
            return of({
              Exist: true,
              Success: true,
              Message: 'msg'
            } as IExistenceResponse)
          };

          const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
            userNameEmailControl = component.registrationForm.get('userNameEmail');

          userNameEmailInputEl.value = 'test@mail.com';
          userNameEmailInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          tick(300);

          expect((userNameEmailControl?.errors as any)['sfcEmailAlreadyExist']).toBeTrue();

          discardPeriodicTasks();
        }));

        fit('Should be invalid when check existence failed', fakeAsync(() => {
          (existenceServiceStub as any).existByEmail = () => throwError(() => new Error('Errror'));

          const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
            userNameEmailControl = component.registrationForm.get('userNameEmail');

          userNameEmailInputEl.value = 'test@mail.com';
          userNameEmailInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          tick(300);

          expect((userNameEmailControl?.errors as any)['sfcCheckError']).toBeTrue();

          discardPeriodicTasks();
        }));

        fit('Should be valid', () => {
          const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
            userNameEmailControl = component.registrationForm.get('userNameEmail');

          userNameEmailInputEl.value = 'username';
          userNameEmailInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(userNameEmailControl?.errors).toBeNull();
        });

      });

      describe('Password input', () => {
        fit('Should have initial validation state', () => {
          const passwordControl = component.registrationForm.get('password');

          expect(passwordControl?.errors).not.toBeNull();
          expect((passwordControl?.errors as any)['required']).toBeTrue();
        });

        fit('Should change value after input', () => {
          const passwordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password'),
            passwordControlControl = component.registrationForm.get('password');

          passwordControlInputEl.value = 'pass';
          passwordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(passwordControlControl?.value).toEqual(passwordControlInputEl.value);
        });

        fit('Should be invalid', () => {
          const passwordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password'),
            passwordControlControl = component.registrationForm.get('password');

          passwordControlInputEl.value = 'pass';
          passwordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect((passwordControlControl?.errors as any)['pattern']).toBeDefined();
        });

        fit('Should be valid', () => {
          const passwordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password'),
            passwordControlControl = component.registrationForm.get('password');

          passwordControlInputEl.value = 'Test1234!';
          passwordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(passwordControlControl?.errors).toBeNull();
        });
      });

      describe('Confirm password input', () => {
        fit('Should have initial validation state', () => {
          const confirmPasswordControl = component.registrationForm.get('confirmPassword');

          expect(confirmPasswordControl?.errors).not.toBeNull();
          expect((confirmPasswordControl?.errors as any)['required']).toBeTrue();
        });

        fit('Should change value after input', () => {
          const confirmPasswordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-confirm-password'),
            confirmPasswordControlControl = component.registrationForm.get('confirmPassword');

          confirmPasswordControlInputEl.value = 'pass';
          confirmPasswordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(confirmPasswordControlControl?.value).toEqual(confirmPasswordControlInputEl.value);
        });

        fit('Should be invalid', () => {
          const confirmPasswordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-confirm-password'),
            passwordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password'),
            confirmPasswordControlControl = component.registrationForm.get(nameof<IRegistrationFormModel>('confirmPassword'));

          passwordControlInputEl.value = 'Test1234!';
          passwordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          confirmPasswordControlInputEl.value = 'Test12345!';
          confirmPasswordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect((confirmPasswordControlControl?.errors!)['sfc-match']).toBeTrue();
        });

        fit('Should be valid', () => {
          const confirmPasswordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-confirm-password'),
            passwordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password'),
            confirmPasswordControlControl = component.registrationForm.get('confirmPassword');

          passwordControlInputEl.value = 'Test1234!';
          passwordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          confirmPasswordControlInputEl.value = 'Test1234!';
          confirmPasswordControlInputEl.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(confirmPasswordControlControl?.errors).toBeNull();
        });
      });
    });

    describe('Registration process', () => {
      fit('Should not call register if form invalid', () => {
        spyOn(identityServiceStub, 'register' as any);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(identityServiceStub.register).not.toHaveBeenCalled();
      });

      fit('Should call register if form valid when using email', fakeAsync(() => {
        spyRegister('user-id');

        makeFormValid();

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(identityServiceStub.register).toHaveBeenCalledOnceWith({
          Password: 'Test1234!',
          ConfirmPassword: 'Test1234!',
          Email: 'email@mail.com'
        });

        flush();
      }));

      fit('Should call register if form valid when using username', fakeAsync(() => {
        spyRegister('user-id');

        makeFormValid(false);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(identityServiceStub.register).toHaveBeenCalledOnceWith({
          Password: 'Test1234!',
          ConfirmPassword: 'Test1234!',
          UserName: 'username'
        });

        flush();
      }));

      fit('Should show error if register failed', fakeAsync(() => {
        spyRegister('', false);

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

        flush();
      }));

      fit('Should clear previous error if register success', fakeAsync(() => {
        const registerSpy = spyRegister('', false);

        makeFormValid();

        const errorsEl = fixture.debugElement.query(By.css('.errors'));

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
        expect(errorsEl.styles['opacity']).toEqual('1');

        registerSpy.and.returnValue(of({
          Token: {},
          UserId: 'user-id',
          Errors: null,
          Success: true,
          Message: 'Success'
        } as IRegistrationResponse));

        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
        expect(errorsEl.styles['opacity']).toEqual('0');

        flush();
      }));

      fit("Should navigate to home on success", fakeAsync(() => {
        spyRegister('user-id');
        spyOn(routerMock, 'navigate');

        makeFormValid(false);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Home}`]);

        flush();
      }));

      fit("Should set default theme on success", fakeAsync(() => {
        spyOn((storageServiceStub as any), 'set').and.callThrough();
        spyRegister('user-id');
        spyOn(routerMock, 'navigate');

        makeFormValid(false);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(storageServiceStub.set).toHaveBeenCalledOnceWith(ApplicationCommonConstants.THEME_KEY, Theme.Default);

        flush();
      }));

      fit("Should not navigate to home on failure", fakeAsync(() => {
        spyOn(identityServiceStub, 'register' as any).and.returnValue(throwError(() => new Error('Registration error')));
        spyOn(routerMock, 'navigate');

        makeFormValid(false);

        const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
        submitBtnEl.nativeElement.click();
        fixture.detectChanges();

        expect(routerMock.navigate).not.toHaveBeenCalledWith([`/${RoutKey.Home}`]);

        flush();
      }));
    });

    function makeFormValid(useEmail = true): void {
      if (useEmail) {
        (existenceServiceStub as any).existByEmail = () => {
          return of({
            Exist: false,
            Success: true,
            Message: 'msg'
          } as IExistenceResponse)
        };
      } else {
        (existenceServiceStub as any).existByUserName = () => {
          return of({
            Exist: false,
            Success: true,
            Message: 'msg'
          } as IExistenceResponse)
        };
      }

      const userNameEmailInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-username-email'),
        confirmPasswordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-confirm-password'),
        passwordControlInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-password');

      userNameEmailInputEl.value = useEmail ? 'email@mail.com' : 'username';
      userNameEmailInputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(300);

      passwordControlInputEl.value = 'Test1234!';
      passwordControlInputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      confirmPasswordControlInputEl.value = 'Test1234!';
      confirmPasswordControlInputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    function spyRegister(userId: string, success: boolean = true): jasmine.Spy<any> {
      return spyOn(identityServiceStub, 'register' as any).and.returnValue(of({
        Token: {},
        UserId: userId,
        Errors: null,
        Success: success,
        Message: 'msg'
      } as IRegistrationResponse));
    }
  });
});