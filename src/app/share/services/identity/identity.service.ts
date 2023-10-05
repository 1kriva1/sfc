import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstants, isDefined, isNullOrEmptyString, parseBoolean } from 'ngx-sfc-common';
import { BehaviorSubject, catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { RoutKey } from '@core/enums';
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

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private userSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private tokenSubject: Subject<IToken> = new Subject<IToken>();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private storageService: StorageService,
    private router: Router) { }

  public userId$: Observable<string | null> = this.userSubject.asObservable();

  public token$: Observable<IToken> = this.tokenSubject.asObservable();

  public get userId(): string | null {
    return this.userSubject.value || this.storageService.get(IdentityServiceConstants.USER_ID_KEY);
  }

  public get isLoggedIn() {
    return !isNullOrEmptyString(this.userId) && this.tokenService.valid;
  }

  public get rememberMe(): boolean {
    return parseBoolean(this.storageService.get<string>(IdentityServiceConstants.REMEMBER_ME_KEY)
      || CommonConstants.EMPTY_STRING);
  }

  private refreshTokenTimeout?: NodeJS.Timeout;

  private _refreshSubscription?: Subscription;

  public register(request: IRegistrationRequest): Observable<IRegistrationResponse> {
    return this.http.post<IRegistrationResponse>(
      `${environment.identity_url}${IdentityServiceConstants.URI_PART}/register`,
      request,
      { context: new HttpContext().set(LOADER, true) }
    ).pipe(
      map(response => {
        this.setIdentity(response.Token, response.UserId as string);
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
        this.setIdentity(response.Token, response.UserId as string);
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
      { UserId: this.userId as string },
      { context: new HttpContext().set(LOADER, true) }
    ).pipe(
      map(response => {
        this.tokenService.remove();

        this.storageService.remove(IdentityServiceConstants.USER_ID_KEY);

        this.userSubject.next(null);

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
      this._refreshSubscription = this.refreshToken({ Token: token as IToken })
        .pipe(catchError((error) => of(error)))
        .subscribe((response: BaseErrorResponse) => {
          if (!response.Success)
            this.logout().subscribe(() =>
              this.router.navigate([buildPath(RoutKey.Home)]));
        });
    }, timeout);
  }

  private setIdentity(token: IToken, userId: string) {
    this.setToken(token);
    this.setUserId(userId);
  }

  private setToken(token: IToken): void {
    this.tokenService.set(token);
    this.setAutoRefresh(token);
    this.tokenSubject.next(token);
  }

  private setUserId(userId: string): void {
    this.storageService.set(IdentityServiceConstants.USER_ID_KEY, userId);
    this.userSubject.next(userId);
  }

  private clearTokenSubscriptions(): void {
    if (isDefined(this.refreshTokenTimeout)) {
      clearTimeout(this.refreshTokenTimeout);

      if (isDefined(this._refreshSubscription))
        this._refreshSubscription?.unsubscribe();
    }
  }
}
