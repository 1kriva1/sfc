import { HttpContext } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CommonConstants } from '@core/constants';
import { Process, RoutKey } from '@core/enums';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { ObservableDataModel } from '@core/models/observable.model';
import { StorageService } from '@core/services';
import { buildPath } from '@core/utils';
import { environment } from '@environments/environment';
import { filter, of, throwError } from 'rxjs';
import { IToken } from '../token/token.model';
import { TokenService } from '../token/token.service';
import { IdentityServiceConstants } from './identity.constants';
import { IdentityService } from './identity.service';
import {
    ILoginRequest, ILoginResponse, ILogoutRequest, ILogoutResponse,
    IRegistrationRequest, IRegistrationResponse
} from './models';
import { IRefreshTokenRequest } from './models/refresh-token/refresh-token.request';
import { IRefreshTokenResponse } from './models/refresh-token/refresh-token.response';

describe('Share.Service:Identity', () => {
    let service: IdentityService;
    let tokenServiceStub: Partial<TokenService> = {
        remove: () => { },
        set: (_: IToken) => { },
        expiredDate: null,
        valid: false
    };
    let httpMock: HttpTestingController;
    let routerMock = { navigate: jasmine.createSpy('navigate') };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: TokenService, useValue: tokenServiceStub }
            ],
            teardown: { destroyAfterEach: false }
        });

        let store: any = {};
        const mockLocalStorage = {
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            removeItem: (key: string) => {
                delete store[key];
            }
        };

        spyOn(window.localStorage, 'setItem')
            .and.callFake(mockLocalStorage.setItem);
        spyOn(window.localStorage, 'getItem')
            .and.callFake(mockLocalStorage.getItem);
        spyOn(window.localStorage, 'removeItem')
            .and.callFake(mockLocalStorage.removeItem);

        service = TestBed.inject(IdentityService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should register player', (done) => {
        spyOn(tokenServiceStub, 'set' as any);
        spyOn((service as any), 'setAutoRefresh');

        const request: IRegistrationRequest = {
            UserName: 'username',
            Password: 'pass',
            ConfirmPassword: 'pass'
        }, response: IRegistrationResponse = {
            Token: { Access: 'access', Refresh: 'refresh' },
            UserId: 'userid',
            Success: true,
            Errors: null,
            Message: 'msg'
        };

        service.register(request).subscribe((registrationResponse: IRegistrationResponse) =>
            expect(registrationResponse).toEqual(response));

        service.token.value$.pipe(filter((model: ObservableDataModel<IToken>) => model.process !== Process.Init))
            .subscribe((model: ObservableDataModel<IToken>) => expect(model.data).toEqual(response.Token));

        const testRequest = httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/register`);

        expect(testRequest.request.body).toEqual(request);
        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

        testRequest.flush(response);

        service.userId.value$.subscribe((model: ObservableDataModel<string>) => {
            expect(model.data).toEqual(response.UserId);
            done();
        });

        expect(tokenServiceStub.set).toHaveBeenCalledOnceWith(response.Token);
        expect((service as any).setAutoRefresh).toHaveBeenCalledOnceWith(response.Token);
        expect(window.localStorage.setItem)
            .toHaveBeenCalledOnceWith(`${CommonConstants.APPLICATION_PREFIX}-${IdentityServiceConstants.USER_ID_KEY}`, response.UserId as string);
    });

    fit('Should login player', (done) => {
        spyOn(tokenServiceStub, 'set' as any);
        spyOn((service as any), 'setAutoRefresh');

        const request: ILoginRequest = {
            UserName: 'username',
            Password: 'pass',
            RememberMe: true
        },
            response: ILoginResponse = {
                Token: { Access: 'access', Refresh: 'refresh' },
                UserId: 'userid',
                Success: true,
                Errors: null,
                Message: 'msg'
            };

        service.login(request).subscribe((loginResponse: ILoginResponse) =>
            expect(loginResponse).toEqual(response));

        service.token.value$.pipe(filter((model: ObservableDataModel<IToken>) => model.process !== Process.Init))
            .subscribe((model: ObservableDataModel<IToken>) =>
                expect(model.data).toEqual(response.Token));

        const testRequest = httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/login`);

        expect(testRequest.request.body).toEqual(request);
        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

        testRequest.flush(response);

        service.userId.value$.subscribe((model: ObservableDataModel<string>) => {
            expect(model.data).toEqual(response.UserId);
            done();
        });

        expect(tokenServiceStub.set).toHaveBeenCalledOnceWith(response.Token);
        expect((service as any).setAutoRefresh).toHaveBeenCalledOnceWith(response.Token);
        expect((window.localStorage.setItem as any).calls.allArgs())
            .toEqual([
                [`${CommonConstants.APPLICATION_PREFIX}-${IdentityServiceConstants.USER_ID_KEY}`, response.UserId],
                [`${CommonConstants.APPLICATION_PREFIX}-${IdentityServiceConstants.REMEMBER_ME_KEY}`, `${request.RememberMe}`]
            ]);
    });

    fit('Should refresh token', (done) => {
        spyOn(tokenServiceStub, 'set' as any);
        spyOn((service as any), 'setAutoRefresh');

        const request: IRefreshTokenRequest = {
            Token: { Access: 'access', Refresh: 'refresh' }
        },
            response: IRefreshTokenResponse = {
                Token: { Access: 'access', Refresh: 'refresh' },
                Success: true,
                Errors: null,
                Message: 'msg'
            };

        service.refreshToken(request).subscribe((refreshTokenResponse: IRefreshTokenResponse) =>
            expect(refreshTokenResponse).toEqual(response));

        service.token.value$.pipe(filter((model: ObservableDataModel<IToken>) => model.process !== Process.Init))
            .subscribe((model: ObservableDataModel<IToken>) => {
                expect(model.data).toEqual(response.Token);
                done();
            });

        const testRequest = httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/refresh`);

        expect(testRequest.request.body).toEqual(request);

        testRequest.flush(response);

        expect(tokenServiceStub.set).toHaveBeenCalledOnceWith(response.Token);
        expect((service as any).setAutoRefresh).toHaveBeenCalledOnceWith(response.Token);
    });

    fit('Should logout player', (done) => {
        spyOn(tokenServiceStub, 'set' as any);
        spyOn(tokenServiceStub, 'remove' as any);
        spyOn(window, 'clearTimeout').and.callThrough();

        const nowDate = new Date();
        nowDate.setMinutes(nowDate.getMinutes() + 2);
        (tokenServiceStub as any).expiredDate = nowDate;

        const loginResponse: ILoginResponse = loginPlayer(),
            request: ILogoutRequest = {
                UserId: loginResponse.UserId as string
            },
            response: ILogoutResponse = {
                Success: true,
                Message: 'msg'
            };

        service.logout().subscribe((logoutResponse: ILogoutResponse) =>
            expect(logoutResponse).toEqual(response));

        let tokenCount = 0;
        service.token.value$.pipe(filter((model: ObservableDataModel<IToken>) => model.process !== Process.Init))
            .subscribe((model: ObservableDataModel<IToken>) => {
                if (tokenCount == 0)
                    expect(model.data).toEqual(loginResponse.Token)
                else
                    expect(model.data).toBeNull();
                tokenCount++;
            });

        const testRequest = httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/logout`);

        expect(testRequest.request.body).toEqual(request);
        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

        testRequest.flush(response);

        service.userId.value$.subscribe((model: ObservableDataModel<string>) => {
            expect(model.data).toBeNull();
            done();
        });

        expect(tokenServiceStub.remove).toHaveBeenCalledTimes(1);
        expect(window.localStorage.removeItem)
            .toHaveBeenCalledOnceWith(`${CommonConstants.APPLICATION_PREFIX}-${IdentityServiceConstants.USER_ID_KEY}`);
        expect(clearTimeout).toHaveBeenCalledWith((service as any).refreshTokenTimeout);
    });

    fit('Should not auto refresh token, if expiredDate not exist', () => {
        (tokenServiceStub as any).expiredDate = null;

        service.setAutoRefresh({ Access: 'access', Refresh: 'refresh' });

        expect((service as any).refreshTokenTimeout).toBeUndefined();
    });

    fit('Should auto refresh token', fakeAsync(() => {
        (tokenServiceStub as any).expiredDate = new Date();

        service.setAutoRefresh({ Access: 'access', Refresh: 'refresh' });

        tick();

        httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/refresh`);

        expect((service as any).refreshTokenTimeout).toBeDefined();
        expect((service as any)._refreshSubscription).toBeDefined();
    }));

    fit('Should logout on failed auto refresh', fakeAsync(() => {
        spyOn(service, 'logout').and.callThrough();
        spyOn(service, 'refreshToken' as any).and.returnValue(of({
            Token: null,
            Success: false,
            Errors: null,
            Message: 'msg'
        }));
        (tokenServiceStub as any).expiredDate = new Date();

        service.setAutoRefresh({ Access: 'access', Refresh: 'refresh' });

        tick();

        const logoutTestRequest = httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/logout`);
        logoutTestRequest.flush({ Success: true, Message: 'msg' });

        expect((service as any).refreshTokenTimeout).toBeDefined();
        expect((service as any)._refreshSubscription).toBeDefined();
        expect(service.logout).toHaveBeenCalledTimes(1);
        expect(routerMock.navigate).toHaveBeenCalledWith([buildPath(RoutKey.Home)]);
    }));

    fit('Should logout on auto refresh error', fakeAsync(() => {
        spyOn(service, 'logout').and.callThrough();
        spyOn(service, 'refreshToken' as any).and.returnValue(throwError(() => new Error()));
        (tokenServiceStub as any).expiredDate = new Date();

        service.setAutoRefresh({ Access: 'access', Refresh: 'refresh' });

        tick();

        const logoutTestRequest = httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/logout`);
        logoutTestRequest.flush({ Success: true, Message: 'msg' });

        expect((service as any).refreshTokenTimeout).toBeDefined();
        expect((service as any)._refreshSubscription).toBeDefined();
        expect(service.logout).toHaveBeenCalledTimes(1);
        expect(routerMock.navigate).toHaveBeenCalledWith([buildPath(RoutKey.Home)]);
    }));

    fit('Should clear previous timers during auto refresh', fakeAsync(() => {
        spyOn(window, 'clearTimeout').and.callThrough();
        (tokenServiceStub as any).expiredDate = new Date();

        loginPlayer();

        const prevRefreshTokenTimeout = (service as any).refreshTokenTimeout;

        tick(60000);

        httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/refresh`);

        const spyUnsubscribe = spyOn(
            (service as any)._refreshSubscription,
            'unsubscribe'
        ).and.callThrough();

        service.setAutoRefresh({ Access: 'access', Refresh: 'refresh' });

        expect(clearTimeout).toHaveBeenCalledOnceWith(prevRefreshTokenTimeout);
        expect(spyUnsubscribe).toHaveBeenCalled();
        expect((service as any).refreshTokenTimeout).toBeDefined();

        tick();

        httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/refresh`);

        discardPeriodicTasks();
    }));

    fit('Should return user id', () => {
        const loginResponse: ILoginResponse = loginPlayer();

        expect(service.userId.value).toEqual(loginResponse.UserId);
    });

    fit('Should return user id from local storage', () => {
        const assertUserId = 'local-user-id';

        window.localStorage.setItem(`${CommonConstants.APPLICATION_PREFIX}-${IdentityServiceConstants.USER_ID_KEY}`,
            assertUserId);

        expect(new IdentityService(null!, tokenServiceStub as TokenService, new StorageService(), null!).userId.value)
            .toEqual(assertUserId);
    });

    fit('Should be log in', () => {
        (tokenServiceStub as any).valid = true;
        loginPlayer();

        expect(service.isLoggedIn).toBeTrue();
    });

    fit('Should not be log in', () => {
        (tokenServiceStub as any).valid = true;

        expect(service.isLoggedIn).toBeFalse();
    });

    fit('Should not be log in if token expired', () => {
        (tokenServiceStub as any).valid = false;
        loginPlayer();

        expect(service.isLoggedIn).toBeFalse();
    });

    fit('Should be remembered user', () => {
        loginPlayer();

        expect(service.rememberMe).toBeTrue();
    });

    fit('Should not be remembered user', () => {
        expect(service.rememberMe).toBeFalse();
    });

    fit('Should not be remembered user, if explicfity defined', () => {
        loginPlayer(false);

        expect(service.rememberMe).toBeFalse();
    });

    function loginPlayer(rememberMe: boolean = true): ILoginResponse {
        const request: ILoginRequest = {
            UserName: 'username',
            Password: 'pass',
            RememberMe: rememberMe
        },
            response: ILoginResponse = {
                Token: { Access: 'access', Refresh: 'refresh' },
                UserId: 'userid',
                Success: true,
                Errors: null,
                Message: 'msg'
            };

        service.login(request).subscribe();

        httpMock.expectOne(`${environment.identity_url}${IdentityServiceConstants.URI_PART}/login`)
            .flush(response);

        return response;
    }
});
