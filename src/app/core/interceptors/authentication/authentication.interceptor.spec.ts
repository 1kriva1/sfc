import { HttpClient, HttpContext, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AuthenticationInterceptor, REQURED_AUTH } from "./authentication.interceptor";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpConstants } from "../../constants/http.constants";
import { environment } from "src/environments/environment";
import { IdentityService } from "src/app/share/services/identity/identity.service";
import { TokenService } from "src/app/share/services/token/token.service";

describe('Core.Interceptor:Authentication', () => {
    const url = '/test';
    let client: HttpClient;
    let controller: HttpTestingController;
    let identityServiceStub: Partial<IdentityService> = {};
    let tokenServiceStub: Partial<TokenService> = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                { provide: IdentityService, useValue: identityServiceStub },
                { provide: TokenService, useValue: tokenServiceStub },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthenticationInterceptor,
                    multi: true
                }
            ]
        });

        client = TestBed.inject(HttpClient);
        controller = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        controller.verify();
    });

    fit('Should not add bearer token for not required URI', (done) => {
        client.get(url).subscribe(_ => done());

        const testRequest = controller.expectOne(url);

        expect(testRequest.request.headers.has(HttpConstants.AUTHORIZATION_HEADER_KEY)).toBeFalse();

        testRequest.flush({});
    });

    fit('Should not add bearer token for not required context', (done) => {
        const testUrl = `${environment.url}${url}`;

        client.get(testUrl, { context: new HttpContext().set(REQURED_AUTH, false) }).subscribe(_ => done());

        const testRequest = controller.expectOne(testUrl);

        expect(testRequest.request.headers.has(HttpConstants.AUTHORIZATION_HEADER_KEY)).toBeFalse();

        testRequest.flush({});
    });

    fit('Should not add bearer token for not log in player', (done) => {
        (identityServiceStub as any).isLoggedIn = false;
        const testUrl = `${environment.url}${url}`;

        client.get(testUrl).subscribe(_ => done());

        const testRequest = controller.expectOne(testUrl);

        expect(testRequest.request.headers.has(HttpConstants.AUTHORIZATION_HEADER_KEY)).toBeFalse();

        testRequest.flush({});
    });

    fit('Should not add bearer token for empty token', (done) => {
        (identityServiceStub as any).isLoggedIn = true;
        (tokenServiceStub as any).get = () => { return null };
        const testUrl = `${environment.url}${url}`;

        client.get(testUrl).subscribe(_ => done());

        const testRequest = controller.expectOne(testUrl);

        expect(testRequest.request.headers.has(HttpConstants.AUTHORIZATION_HEADER_KEY)).toBeFalse();

        testRequest.flush({});
    });

    fit('Should add bearer token', (done) => {
        (identityServiceStub as any).isLoggedIn = true;
        (tokenServiceStub as any).get = () => { return { Access: 'access', Refresh: 'refresh' } };
        const testUrl = `${environment.url}${url}`;

        client.get(testUrl).subscribe(_ => done());

        const testRequest = controller.expectOne(testUrl);

        expect(testRequest.request.headers.has(HttpConstants.AUTHORIZATION_HEADER_KEY)).toBeTrue();

        testRequest.flush({});
    });

    fit('Should bearer token has valid value', (done) => {
        const testUrl = `${environment.url}${url}`,
            token = { Access: 'access', Refresh: 'refresh' };

        (identityServiceStub as any).isLoggedIn = true;
        (tokenServiceStub as any).get = () => { return token };

        client.get(testUrl).subscribe(_ => done());

        const testRequest = controller.expectOne(testUrl);

        expect(testRequest.request.headers.get(HttpConstants.AUTHORIZATION_HEADER_KEY))
            .toEqual(`${HttpConstants.BEARER_AUTHORIZATION_PART} ${token.Access}`);

        testRequest.flush({});
    });
})