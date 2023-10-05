import { TestBed } from '@angular/core/testing';
import { CommonConstants } from '@core/constants';
import { IToken } from './token.model';
import { TokenService } from './token.service';

describe('Share.Service: Token', () => {
    const NOT_EXPIRED_JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODE2Njc3NjYsImV4cCI6MjAyODczNjU2NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.gqSMherVriWZlBzgjco51fDyN4AXIctD-jSYCAs4LRA',
        EXPIRED_JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODE2Njc3NjYsImV4cCI6MTY4MTU4MTM2NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.KnEKYOKkW65ANDncsJm06N70uWhtXVPgnOISNixEAJw'
    let service: TokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TokenService);

        let store: any = {};
        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
            removeItem: (key: string) => {
                delete store[key];
            }
        };

        spyOn(window.localStorage, 'getItem')
            .and.callFake(mockLocalStorage.getItem);
        spyOn(window.localStorage, 'setItem')
            .and.callFake(mockLocalStorage.setItem);
        spyOn(window.localStorage, 'removeItem')
            .and.callFake(mockLocalStorage.removeItem);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should not get token', () => {
        expect(service.get()).toBeNull();
    });

    fit('Should set token', () => {
        const token: IToken = { Access: 'access', Refresh: 'refresh' };

        service.set(token)

        expect(window.localStorage.setItem).toHaveBeenCalledOnceWith(`${CommonConstants.APPLICATION_PREFIX}-token`,
            JSON.stringify(token));
    });

    fit('Should get token', () => {
        const token: IToken = { Access: 'access', Refresh: 'refresh' };

        service.set(token);

        expect(service.get()).toEqual(token);
    });

    fit('Should override token', () => {
        const token1: IToken = { Access: 'access1', Refresh: 'refresh1' },
            token2: IToken = { Access: 'access2', Refresh: 'refresh2' };

        service.set(token1);

        expect(service.get()).toEqual(token1);

        service.set(token2);

        expect(service.get()).toEqual(token2);
    });

    fit('Should remove token', () => {
        const token: IToken = { Access: 'access', Refresh: 'refresh' };

        service.set(token);

        expect(service.get()).toEqual(token);

        service.remove();

        expect(service.get()).toBeNull();
    });

    fit('Should be JWT token', () => {
        const token: IToken = { Access: NOT_EXPIRED_JWT_TOKEN, Refresh: 'refresh' };

        service.set(token);

        expect(service.jwt).toBeDefined();
    });

    fit('Should JWT token be null', () => {
        expect(service.jwt).toBeNull();
    });

    fit('Should JWT token be null if parsing error', () => {
        const token: IToken = { Access: 'error_token', Refresh: 'refresh' };

        service.set(token);

        expect(service.jwt).toBeNull();
    });

    fit('Should JWT token exist', () => {
        const token: IToken = { Access: NOT_EXPIRED_JWT_TOKEN, Refresh: 'refresh' };

        service.set(token);

        expect(service.exist).toBeTrue();
    });

    fit('Should JWT token has expired value', () => {
        const token: IToken = { Access: NOT_EXPIRED_JWT_TOKEN, Refresh: 'refresh' };

        service.set(token);

        expect(service.expired).toBeDefined();
    });

    fit('Should JWT token has not expired value when not exist', () => {
        expect(service.expired).toBeNull();
    });

    fit('Should JWT token has expired date', () => {
        const token: IToken = { Access: NOT_EXPIRED_JWT_TOKEN, Refresh: 'refresh' };

        service.set(token);

        expect(service.expiredDate).toBeDefined();
    });

    fit('Should JWT token has not expired date when not exist', () => {
        expect(service.expiredDate).toBeNull();
    });

    fit('Should JWT token be not expired', () => {
        const token: IToken = { Access: NOT_EXPIRED_JWT_TOKEN, Refresh: 'refresh' };

        service.set(token);

        expect(service.isExpired).toBeFalse();
    });

    fit('Should JWT token has not be expired when not exist', () => {
        expect(service.isExpired).toBeFalse();
    });

    fit('Should JWT token be expired', () => {
        const token: IToken = { Access: EXPIRED_JWT_TOKEN, Refresh: 'refresh' };

        service.set(token);

        expect(service.isExpired).toBeTrue();
    });

    fit('Should token be valid', () => {
        const token: IToken = { Access: NOT_EXPIRED_JWT_TOKEN, Refresh: 'refresh' };

        service.set(token);

        expect(service.valid).toBeTrue();
    });

    fit('Should token be invalid', () => {
        const token: IToken = { Access: EXPIRED_JWT_TOKEN, Refresh: 'refresh' };

        service.set(token);

        expect(service.invalid).toBeTrue();
    });

    fit('Should token be invalid when not exist', () => {
        expect(service.invalid).toBeFalse();
    });

    fit('Should token be not valid when not exist', () => {
        expect(service.valid).toBeFalse();
    });
});