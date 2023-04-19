import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isEmail } from 'ngx-sfc-common';
import { ButtonType, CheckmarkType, Direction } from 'ngx-sfc-common';
import { SliderType } from 'ngx-sfc-components';
import { Subscription, startWith, switchMap, fromEvent, tap, map, filter, catchError, of } from 'rxjs';
import { RoutKey } from 'src/app/core/enums';
import { IForm } from 'src/app/core/models';
import { buildPath } from 'src/app/core/utils';
import { BaseErrorResponse } from 'src/app/share/models/base-error.response';
import { IdentityService } from 'src/app/share/services/identity/identity.service';
import { ILoginRequest, ILoginResponse } from 'src/app/share/services/identity/models';
import { ILoginFormModel } from './login-form.model';
import { LoginPageConstants } from './login.page.constants';
import { LoginPageLocalization } from './login.page.localization';

@Component({
  selector: 'sfc-login.page',
  templateUrl: './login.page.component.html',
  styleUrls: ['../base/base-identity.page.component.scss', './login.page.component.scss']
})
export class LoginPageComponent implements OnInit, AfterViewInit, OnDestroy {

  ButtonType = ButtonType;
  Direction = Direction;
  SliderType = SliderType;
  CheckmarkType = CheckmarkType;

  Constants = LoginPageConstants;
  Localization = LoginPageLocalization;

  public submitted: boolean = false;

  public error: BaseErrorResponse | null = null;

  @ViewChild('submitBtn', { static: false, read: ElementRef })
  private submitBtn!: ElementRef;

  private _subscription!: Subscription;

  public loginForm!: FormGroup

  constructor(private fb: FormBuilder,
    private router: Router,
    private identityService: IdentityService) { }

  ngOnInit(): void {
    const controls: IForm<ILoginFormModel> = {
      userNameEmail: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    };

    this.loginForm = this.fb.group(controls);
  }

  ngAfterViewInit(): void {
    this._subscription = this.loginForm.valueChanges.pipe(
      startWith({}),
      tap(() => this.error = null),
      switchMap((value: ILoginFormModel) => {
        return fromEvent<InputEvent>(this.submitBtn.nativeElement, 'click')
          .pipe(
            tap(() => {
              if (!this.submitted) {
                this.submitted = true;
                this.loginForm.markAllAsTouched();
                Object.keys(this.loginForm.controls).forEach(key => this.loginForm.get(key)?.markAsDirty());
              }
            }),
            filter(() => this.loginForm.valid),
            map(() => {
              const request: ILoginRequest = {
                Password: value.password,
                RememberMe: value.remember
              };

              if (isEmail(value.userNameEmail))
                request.Email = value.userNameEmail;
              else
                request.UserName = value.userNameEmail;

              return request;
            }),
            switchMap((request: ILoginRequest) =>
              this.identityService.login(request).pipe(
                catchError((error) => of(error))
              ))
          );
      })
    ).subscribe((response: ILoginResponse) => {
      this.error = response.Success ? null : response as BaseErrorResponse;

      if (response.Success)
        this.router.navigate([buildPath(RoutKey.Home)]);
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
