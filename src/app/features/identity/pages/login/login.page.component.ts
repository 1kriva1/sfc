import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonType, CheckmarkType, Direction, isEmail } from 'ngx-sfc-common';
import { SliderType } from 'ngx-sfc-components';
import { Subscription, startWith, switchMap, fromEvent, tap, map, filter, catchError, of } from 'rxjs';
import { RoutKey } from '@core/enums';
import { BaseResponse, IForm } from '@core/models';
import { buildPath, buildTitle, markFormTouchedAndDirty } from '@core/utils';
import { BaseErrorResponse } from '@core/models/http/base-error.response';
import { IdentityService } from '@share/services/identity/identity.service';
import { ILoginRequest, ILoginResponse } from '@share/services/identity/models';
import { ILoginFormModel } from './login-form.model';
import { LoginPageConstants } from './login.page.constants';
import { LoginPageLocalization } from './login.page.localization';
import { PlayerService } from '@share/services/player/player.service';
import { IGetPlayerByUserResponse } from '@share/services';
import { Title } from '@angular/platform-browser';
import { HttpConstants } from '@core/constants';

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

  private _logoutSubscription!: Subscription;

  public loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private identityService: IdentityService,
    private playerService: PlayerService,
    private titleService: Title) { }

  ngOnInit(): void {
    const controls: IForm<ILoginFormModel> = {
      userNameEmail: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    };

    this.loginForm = this.fb.group(controls);
    this.titleService.setTitle(buildTitle(this.Localization.PAGE_TITLE));
  }

  ngAfterViewInit(): void {
    this._subscription = this.loginForm.valueChanges.pipe(
      startWith({}),
      tap(() => this.error = null),
      switchMap((value: ILoginFormModel) => {
        return fromEvent<InputEvent>(this.submitBtn.nativeElement, 'click')
          .pipe(
            tap(() => this.tapSubmit()),
            filter(() => this.loginForm.valid),
            map(() => this.mapRequest(value)),
            switchMap((request: ILoginRequest) =>
              this.identityService.login(request).pipe(
                filter((response: ILoginResponse) => response.Success),
                switchMap(() => this.playerService.get()
                  .pipe(
                    catchError(() => {
                      this._logoutSubscription = this.identityService.logout()
                        .subscribe();
                      return of(HttpConstants.FAILED_RESPONSE);
                    }))),
                catchError(error => of(error))
              ))
          );
      })
    ).subscribe((response: IGetPlayerByUserResponse | BaseResponse) => {
      this.error = response.Success ? null : response as BaseErrorResponse;

      if (response.Success)
        this.router.navigate([buildPath(RoutKey.Home)]);
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._logoutSubscription?.unsubscribe();
  }

  private tapSubmit(): void {
    if (!this.submitted) {
      this.submitted = true;
      markFormTouchedAndDirty(this.loginForm);
    }
  }

  private mapRequest(value: ILoginFormModel): ILoginRequest {
    const request: ILoginRequest = {
      Password: value.password,
      RememberMe: value.remember
    };

    if (isEmail(value.userNameEmail))
      request.Email = value.userNameEmail;
    else
      request.UserName = value.userNameEmail;

    return request;
  }
}
