import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType, Direction, isEmail, ComponentSize, LoaderService, nameof } from 'ngx-sfc-common';
import { SliderType } from 'ngx-sfc-components';
import { map, filter, switchMap, tap, fromEvent, Subscription, startWith, catchError, of } from 'rxjs';
import { ExistenceService } from '../../services/existence/existence.service';
import { RegistrationPageConstants } from './registration.page.constants';
import { IdentityValidators } from '../../validators/identity.validators';
import { BaseErrorResponse } from 'src/app/share/models/base-error.response';
import { Router } from '@angular/router';
import { RoutKey } from 'src/app/core/enums';
import { buildPath } from 'src/app/core/utils';
import { IRegistrationFormModel } from './registration-form.model';
import { IForm } from 'src/app/core/models/form.model';
import { IdentityService } from 'src/app/share/services/identity/identity.service';
import { IRegistrationRequest, IRegistrationResponse } from 'src/app/share/services/identity/models';
import { RegistrationPageLocalization } from './registration.page.localization';
import { match } from 'ngx-sfc-inputs';

@Component({
  selector: 'sfc-registration.page',
  templateUrl: './registration.page.component.html',
  styleUrls: ['../base/base-identity.page.component.scss', './registration.page.component.scss']
})
export class RegistrationPageComponent implements OnInit, AfterViewInit, OnDestroy {

  public readonly userNameEmailId = 'username-email';

  ButtonType = ButtonType;
  Direction = Direction;
  SliderType = SliderType;
  ComponentSize = ComponentSize;

  Constants = RegistrationPageConstants;
  Localization = RegistrationPageLocalization;

  public registrationForm!: FormGroup;

  public submitted: boolean = false;

  public error: BaseErrorResponse | null = null;

  @ViewChild('submitBtn', { static: false, read: ElementRef })
  private submitBtn!: ElementRef;

  private _subscription!: Subscription;

  constructor(private fb: FormBuilder,
    private router: Router,
    private existenceService: ExistenceService,
    private loaderService: LoaderService,
    private identityService: IdentityService) { }

  ngOnInit(): void {
    const controls: IForm<IRegistrationFormModel> = {
      userNameEmail: [null,
        [Validators.required, IdentityValidators.userNameEmail],
        [IdentityValidators.userNameEmailExist(this.existenceService, this.loaderService, this.userNameEmailId)]
      ],
      password: [null,
        [
          Validators.required,
          Validators.pattern(RegistrationPageConstants.PASSWORD_PATTERN),
          match(nameof<IRegistrationFormModel>('confirmPassword'), true)
        ]
      ],
      confirmPassword: [null,
        [Validators.required, match(nameof<IRegistrationFormModel>('password'))]
      ]
    };

    this.registrationForm = this.fb.group(controls);
  }

  ngAfterViewInit(): void {
    this._subscription = this.registrationForm.valueChanges.pipe(
      startWith({}),
      tap(() => this.error = null),
      switchMap((value: IRegistrationFormModel) => {
        return fromEvent<InputEvent>(this.submitBtn.nativeElement, 'click')
          .pipe(
            tap(() => {
              if (!this.submitted) {
                this.submitted = true;
                this.registrationForm.markAllAsTouched();
                Object.keys(this.registrationForm.controls).forEach(key => this.registrationForm.get(key)?.markAsDirty());
              }
            }),
            filter(() => this.registrationForm.valid),
            map(() => {
              const request: IRegistrationRequest = {
                Password: value.password,
                ConfirmPassword: value.confirmPassword
              };

              if (isEmail(value.userNameEmail))
                request.Email = value.userNameEmail;
              else
                request.UserName = value.userNameEmail;

              return request;
            }),
            switchMap((request: IRegistrationRequest) =>
              this.identityService.register(request).pipe(
                catchError((error) => of(error))
              ))
          );
      })
    ).subscribe((response: IRegistrationResponse) => {
      this.error = response.Success ? null : response as BaseErrorResponse;

      if (response.Success)
        this.router.navigate([buildPath(RoutKey.Home)]);
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}