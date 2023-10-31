import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstants, isDefined, isNullOrEmptyString, parseBoolean } from 'ngx-sfc-common';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { Process, RoutKey } from '@core/enums';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { StorageService } from '@core/services/storage/storage.service';
import { buildPath } from '@core/utils';
import { environment } from '@environments/environment';
import { BaseErrorResponse } from '@core/models/http/base-error.response';
import { IToken } from '../token/token.model';
import { TokenService } from '../token/token.service';
import { IdentityServiceConstants } from './identity.constants';
import {
  ILoginRequest, ILoginResponse, ILogoutResponse,
  IRegistrationRequest, IRegistrationResponse, IRefreshTokenRequest, IRefreshTokenResponse
} from './models';
import { ObservableModel } from '@core/models/observable.model';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  public userId: ObservableModel<string> = new ObservableModel(this.storageService.get(IdentityServiceConstants.USER_ID_KEY));

  public get isLoggedIn() { return !isNullOrEmptyString(this.userId.value) && this.tokenService.valid; }

  public token: ObservableModel<IToken> = new ObservableModel();

  public get rememberMe(): boolean {
    return parseBoolean(this.storageService.get<string>(IdentityServiceConstants.REMEMBER_ME_KEY)
      || CommonConstants.EMPTY_STRING);
  }

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private storageService: StorageService,
    private router: Router) { }

  private refreshTokenTimeout?: NodeJS.Timeout;

  private _refreshSubscription?: Subscription;

  public register(request: IRegistrationRequest): Observable<IRegistrationResponse> {
    return this.http.post<IRegistrationResponse>(
      `${environment.identity_url}${IdentityServiceConstants.URI_PART}/register`,
      request,
      { context: new HttpContext().set(LOADER, true) }
    ).pipe(
      map(response => {
        this.setIdentity(response.Token, response.UserId!, Process.Registration);
        return response;
      })
    );
  }

  public login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${environment.identity_url}${IdentityServiceConstants.URI_PART}/login`,
      request,
      { context: new HttpContext().set(LOADER, true) }
    ).pipe(
      map(response => {
        this.setIdentity(response.Token, response.UserId!, Process.Login);
        this.storageService.set(IdentityServiceConstants.REMEMBER_ME_KEY, request.RememberMe);
        return response;
      })
    );
  }

  public refreshToken(request: IRefreshTokenRequest): Observable<IRefreshTokenResponse> {
    return this.http.post<IRefreshTokenResponse>(
      `${environment.identity_url}${IdentityServiceConstants.URI_PART}/refresh`,
      request
    ).pipe(
      map((response: IRefreshTokenResponse) => {
        this.setToken(response.Token);
        return response;
      })
    );
  }

  public logout(): Observable<ILogoutResponse> {
    return this.http.post<ILogoutResponse>(
      `${environment.identity_url}${IdentityServiceConstants.URI_PART}/logout`,
      { UserId: this.userId.value! },
      { context: new HttpContext().set(LOADER, true) }
    ).pipe(
      map(response => {
        this.tokenService.remove();

        this.token.subject.next({ data: null });

        this.storageService.remove(IdentityServiceConstants.USER_ID_KEY);

        this.userId.subject.next({ data: null });

        this.clearTokenSubscriptions();

        return response;
      })
    );
  }

  public setAutoRefresh(token: IToken) {
    if (!this.tokenService.expiredDate)
      return;

    const timeout = this.tokenService.expiredDate.getTime() - Date.now() - (60 * 1000);

    this.clearTokenSubscriptions();

    this.refreshTokenTimeout = setTimeout(() => {
      this._refreshSubscription = this.refreshToken({ Token: token! })
        .pipe(catchError((error) => of(error)))
        .subscribe((response: BaseErrorResponse) => {
          if (!response.Success)
            this.logout().subscribe(() =>
              this.router.navigate([buildPath(RoutKey.Home)]));
        });
    }, timeout);
  }

  private setIdentity(token: IToken, userId: string, process: Process) {
    this.setToken(token);
    this.setUserId(userId, process);
  }

  private setToken(token: IToken): void {
    this.tokenService.set(token);
    this.setAutoRefresh(token);
    this.token.subject.next({ data: token });
  }

  private setUserId(userId: string, process: Process): void {
    this.storageService.set(IdentityServiceConstants.USER_ID_KEY, userId);
    this.userId.subject.next({ data: userId, process: process });
  }

  private clearTokenSubscriptions(): void {
    if (isDefined(this.refreshTokenTimeout)) {
      clearTimeout(this.refreshTokenTimeout);

      if (isDefined(this._refreshSubscription))
        this._refreshSubscription?.unsubscribe();
    }
  }
}
