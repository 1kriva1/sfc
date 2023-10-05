import { EMPTY } from "rxjs";
import { IdentityService } from "@share/services/identity/identity.service";
import { TokenRefreshInitializer } from "./token-refresh.initializer";
import { TokenService } from "@share/services/token/token.service";
import { IToken } from "@share/services/token/token.model";

describe('Core.Infitializer:Token refresh', () => {
    let infitializer: TokenRefreshInitializer;
    let identityServiceStub: Partial<IdentityService> = { setAutoRefresh: (_: IToken) => { } };
    let tokenServiceStub: Partial<TokenService> = {};

    beforeEach(() => {
        infitializer = new TokenRefreshInitializer(
            tokenServiceStub as TokenService,
            identityServiceStub as IdentityService
        );
    });

    fit('Should return empty observable, when token not find', () => {
        (tokenServiceStub as any).get = () => null;

        const result = infitializer.init();

        expect(result).toEqual(EMPTY);
    });

    fit('Should return empty observable, when token is expired and not remembered me', () => {
        (tokenServiceStub as any).get = () => ({} as IToken);
        (tokenServiceStub as any).isExpired = true;
        (identityServiceStub as any).rememberMe = false;

        const result = infitializer.init();

        expect(result).toEqual(EMPTY);
    });

    fit('Should auto refresh token, when remembered me', () => {
        spyOn(identityServiceStub, 'setAutoRefresh' as any);
        const token: IToken = { Access: 'access', Refresh: 'refresh' };
        (tokenServiceStub as any).get = () => (token);
        (identityServiceStub as any).rememberMe = true;

        infitializer.init();

        expect(identityServiceStub.setAutoRefresh).toHaveBeenCalledOnceWith(token);
    });

    fit('Should auto refresh token, when token is not expired and not remembered me', () => {
        spyOn(identityServiceStub, 'setAutoRefresh' as any);
        const token: IToken = { Access: 'access', Refresh: 'refresh' };
        (tokenServiceStub as any).get = () => (token);
        (tokenServiceStub as any).isExpired = false;
        (identityServiceStub as any).rememberMe = false;

        infitializer.init();

        expect(identityServiceStub.setAutoRefresh).toHaveBeenCalledOnceWith(token);
    });
});