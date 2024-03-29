import { Injectable } from '@angular/core';
import { Router, CanMatch, Route, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IdentityService } from '@share/services/identity/identity.service';
import { IToken } from '@share/services/token/token.model';
import { TokenService } from '@share/services/token/token.service';
import { RoutKey } from '../../enums';
import { ObservableDataModel } from '@core/models/observable.model';

@Injectable({ providedIn: 'root' })
export class CanMatchAuthorized implements CanMatch {

    constructor(private identityService: IdentityService, private tokenService: TokenService, private router: Router) { }

    canMatch(route: Route, _: UrlSegment[]): Observable<boolean> | boolean {
        // token exist and it's expired
        if (this.tokenService.invalid) {
            // try to refresh existing token
            if (this.identityService.rememberMe) {
                return this.identityService.token.value$.pipe(
                    // if token refreshed - allow
                    // if not - redirect to login
                    map((_: ObservableDataModel<IToken>) => this.handleRedirection(route.path))
                )
            }

            // redirect to login
            this.router.navigate([`${RoutKey.Identity}/${RoutKey.Login}`], { queryParams: { returnUrl: route.path } });
            return false;
        }

        // token not exist or it not expired
        return this.handleRedirection(route.path);
    }

    private handleRedirection(returnUrl: string | undefined): boolean {
        // token exist and not expired 
        // userid exist
        if (!this.identityService.isLoggedIn) {
            this.router.navigate([`${RoutKey.Identity}/${RoutKey.Login}`], { queryParams: { returnUrl } });
            return false;
        }

        return true;
    }
}