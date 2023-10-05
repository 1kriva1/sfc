import { Route, Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { IdentityService } from "@share/services/identity/identity.service";
import { TokenService } from "@share/services/token/token.service";
import { RoutKey } from "../../enums";
import { CanMatchAuthorized } from "./authentication.guard";
import { IToken } from '@share/services/token/token.model';

describe('Core.Guard:CanMatchAuthorized', () => {
    const dummyRoute = { path: '/home' } as Route;
    let guard: CanMatchAuthorized;
    let routerSpy: jasmine.SpyObj<Router>;
    let identityServiceStub: Partial<IdentityService> = {};
    let tokenServiceStub: Partial<TokenService> = {};

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
        guard = new CanMatchAuthorized(identityServiceStub as IdentityService,
            tokenServiceStub as TokenService, routerSpy);
    });

    fit('Should allow access for log in player', () => {
        (identityServiceStub as any).isLoggedIn = true;
        (tokenServiceStub as any).invalid = false;

        const isAccessGranted = guard.canMatch(dummyRoute, []);

        expect(isAccessGranted).toBeTrue();
    });

    fit('Should disallow access and redirect to login page when token not exist', () => {
        (identityServiceStub as any).isLoggedIn = false;
        (tokenServiceStub as any).invalid = false;

        const isAccessGranted = guard.canMatch(dummyRoute, []);

        expect(isAccessGranted).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith([`${RoutKey.Identity}/${RoutKey.Login}`],
            { queryParams: { returnUrl: dummyRoute.path } });
    });

    fit('Should redirect to login page when token is invalid and remember me is false', () => {
        (identityServiceStub as any).rememberMe = false;
        (tokenServiceStub as any).invalid = true;

        const isAccessGranted = guard.canMatch(dummyRoute, []);

        expect(isAccessGranted).toBeFalse();
        expect(routerSpy.navigate).toHaveBeenCalledWith([`${RoutKey.Identity}/${RoutKey.Login}`],
            { queryParams: { returnUrl: dummyRoute.path } });
    });

    fit('Should allow access when try to refresh token with remember me is true', () => {
        (identityServiceStub as any).rememberMe = true;
        const subject = new BehaviorSubject<IToken>({ Access: 'acess token', Refresh: 'refresh token' }),
            token$ = subject.asObservable();
        (identityServiceStub as any).token$ = token$;
        (tokenServiceStub as any).invalid = true;

        const access$: Observable<boolean> = guard.canMatch(dummyRoute, []) as Observable<boolean>;

        expect(access$).toBeDefined();

        (identityServiceStub as any).isLoggedIn = true;

        access$.subscribe((access: boolean) => {
            expect(access).toBeTrue();
        });
    });

    fit('Should redirect to login page when try to refresh token with remember me is true', () => {
        (identityServiceStub as any).rememberMe = true;
        const subject = new BehaviorSubject<IToken>({ Access: 'acess token', Refresh: 'refresh token' }),
            token$ = subject.asObservable();
        (identityServiceStub as any).token$ = token$;
        (tokenServiceStub as any).invalid = true;

        const access$: Observable<boolean> = guard.canMatch(dummyRoute, []) as Observable<boolean>;

        expect(access$).toBeDefined();

        (identityServiceStub as any).isLoggedIn = false;

        access$.subscribe((access: boolean) => {
            expect(access).toBeFalse();
            expect(routerSpy.navigate).toHaveBeenCalledWith([`${RoutKey.Identity}/${RoutKey.Login}`],
                { queryParams: { returnUrl: dummyRoute.path } });
        });
    });
});