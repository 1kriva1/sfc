import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isDefined, isNullOrEmptyString } from 'ngx-sfc-common';
import { BehaviorSubject, map, Observable, Subject, Subscription } from 'rxjs';
import { LOADER } from 'src/app/core/interceptors/loader/loader.interceptor';
import { environment } from 'src/environments/environment';
import { IToken } from '../token/token.model';
import { TokenService } from '../token/token.service';
import { IdentityConstants } from './identity.constants';
import { ILoginRequest } from './models/login/login.request';
import { ILoginResponse } from './models/login/login.response';
import { ILogoutResponse } from './models/logout/logout.response';
import { IRefreshTokenRequest } from './models/refresh-token/refresh-token.request';
import { IRefreshTokenResponse } from './models/refresh-token/refresh-token.response';
import { IRegistrationRequest } from './models/registration/registration.request';
import { IRegistrationResponse } from './models/registration/registration.response';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private userSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private tokenSubject: Subject<IToken> = new Subject<IToken>();

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public userId$: Observable<string | null> = this.userSubject.asObservable();

  public token$: Observable<IToken> = this.tokenSubject.asObservable();

  public get userId(): string | null {
    return this.userSubject.value || window.localStorage.getItem(IdentityConstants.USER_ID_KEY);
  }

  public get isLoggedIn() {
    return !isNullOrEmptyString(this.userId) && this.tokenService.valid;
  }

  public get rememberMe(): boolean {
    return window.localStorage.getItem(IdentityConstants.REMEMBER_ME_KEY) === "true";
  }

  private refreshTokenTimeout?: NodeJS.Timeout;

  private _refreshSubscription?: Subscription;

  public register(request: IRegistrationRequest): Observable<IRegistrationResponse> {
    return this.http.post<IRegistrationResponse>(
      `${environment.url}${IdentityConstants.IDENTITY_URI_PART}/register`,
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
      `${environment.url}${IdentityConstants.IDENTITY_URI_PART}/login`,
      request,
      { context: new HttpContext().set(LOADER, true) }
    ).pipe(
      map(response => {
        this.setIdentity(response.Token, response.UserId as string);
        window.localStorage.setItem(IdentityConstants.REMEMBER_ME_KEY, `${request.RememberMe}`);
        return response;
      })
    );
  }

  public refreshToken(request: IRefreshTokenRequest): Observable<IRefreshTokenResponse> {
    return this.http.post<IRefreshTokenResponse>(
      `${environment.url}${IdentityConstants.IDENTITY_URI_PART}/refresh`,
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
      `${environment.url}${IdentityConstants.IDENTITY_URI_PART}/logout`,
      { UserId: this.userId as string },
      { context: new HttpContext().set(LOADER, true) }
    ).pipe(
      map(response => {
        this.tokenService.remove();

        window.localStorage.removeItem(IdentityConstants.USER_ID_KEY);

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

    this.refreshTokenTimeout = setTimeout(() =>
      {
        this._refreshSubscription = this.refreshToken({ Token: token as IToken }).subscribe()
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
    window.localStorage.setItem(IdentityConstants.USER_ID_KEY, userId);
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
