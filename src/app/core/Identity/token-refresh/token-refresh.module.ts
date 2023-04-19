import { APP_INITIALIZER, Injectable } from "@angular/core";
import { EMPTY } from "rxjs";
import { IdentityService } from "src/app/share/services/identity/identity.service";
import { IToken } from "src/app/share/services/token/token.model";
import { TokenService } from "src/app/share/services/token/token.service";

@Injectable({
    providedIn: 'root',
})
class TokenRefresh {

    constructor(private tokenService: TokenService, private identityService: IdentityService) { }

    init() {
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
        useFactory: (identity: TokenRefresh) => () => identity.init(),
        deps: [TokenRefresh],
        multi: true,
    };
}

export const TokenRefreshModule = {
    init: init
};