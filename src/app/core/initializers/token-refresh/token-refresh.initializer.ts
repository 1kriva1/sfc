import { APP_INITIALIZER, Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { IdentityService } from "@share/services/identity/identity.service";
import { IToken } from "@share/services/token/token.model";
import { TokenService } from "@share/services/token/token.service";

@Injectable({
    providedIn: 'root',
})
export class TokenRefreshInitializer {
    constructor(private tokenService: TokenService, private identityService: IdentityService) { }

    init(): Observable<any> {
        const token: IToken | null = this.tokenService.get();

        if (token) {
            if (this.identityService.rememberMe) {
                this.identityService.setAutoRefresh(token);
            } else {
                if (!this.tokenService.isExpired)
                    this.identityService.setAutoRefresh(token);
            }
        }

        return EMPTY;
    }
}

function init() {
    return {
        provide: APP_INITIALIZER,
        useFactory: (initializer: TokenRefreshInitializer) => () => initializer.init(),
        deps: [TokenRefreshInitializer],
        multi: true,
    };
}

export const TokenRefreshModule = { init: init };