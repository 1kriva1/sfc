import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonConstants, isDefined, isNullOrEmptyString, parseBoolean } from 'ngx-sfc-common';
import { BehaviorSubject, map, Observable, Subject, Subscription } from 'rxjs';
import { LOADER } from 'src/app/core/interceptors/loader/loader.interceptor';
import { StorageService } from 'src/app/core/services/storage/storage.service';
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

  constructor(private http: HttpClient, private tokenService: TokenService, private storageService: StorageService) { }

  public userId$: Observable<string | null> = this.userSubject.asObservable();

  public token$: Observable<IToken> = this.tokenSubject.asObservable();

  public get userId(): string | null {
    return this.userSubject.value || this.storageService.get(IdentityConstants.USER_ID_KEY);
  }

  public get isLoggedIn() {
    return !isNullOrEmptyString(this.userId) && this.tokenService.valid;
  }

  public get hasProfile() {
    return false;
  }

  public get rememberMe(): boolean {
    return parseBoolean(this.storageService.get<string>(IdentityConstants.REMEMBER_ME_KEY)
      || CommonConstants.EMPTY_STRING);
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
        this.storageService.set(IdentityConstants.REMEMBER_ME_KEY, request.RememberMe);
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

        this.storageService.remove(IdentityConstants.USER_ID_KEY);

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
    this.storageService.set(IdentityConstants.USER_ID_KEY, userId);
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
