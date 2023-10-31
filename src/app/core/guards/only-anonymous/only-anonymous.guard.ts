import { Injectable } from '@angular/core';
import { Router, Route, UrlSegment, CanMatch } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IdentityService } from '@share/services/identity/identity.service';
import { IToken } from '@share/services/token/token.model';
import { TokenService } from '@share/services/token/token.service';
import { RoutKey } from '../../enums';
import { buildPath } from '../../utils';
import { ObservableDataModel } from '@core/models/observable.model';

@Injectable({ providedIn: 'root' })
export class CanMatchOnlyAnonymous implements CanMatch {

    constructor(private identityService: IdentityService, private tokenService: TokenService, private router: Router) { }

    canMatch(_route: Route, _segments: UrlSegment[]): Observable<boolean> | boolean {
        if (this.tokenService.invalid) {
            if (this.identityService.rememberMe) {
                return this.identityService.token.value$.pipe(
                    map((_: ObservableDataModel<IToken>) => this.handleRedirection())
                );
            }

            return true;
        }

        return this.handleRedirection();
    }

    private handleRedirection(): boolean {
        if (this.identityService.isLoggedIn) {
            this.router.navigate([buildPath(RoutKey.Home)]);
            return false;
        }

        return true;
    }
}