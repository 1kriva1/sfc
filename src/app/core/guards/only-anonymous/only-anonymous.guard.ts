import { Injectable } from '@angular/core';
import { Router, Route, UrlSegment, CanMatch } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IdentityService } from 'src/app/share/services/identity/identity.service';
import { IToken } from 'src/app/share/services/token/token.model';
import { TokenService } from 'src/app/share/services/token/token.service';
import { RoutKey } from '../../enums';
import { buildPath } from '../../utils';

@Injectable({ providedIn: 'root' })
export class CanMatchOnlyAnonymous implements CanMatch {

    constructor(private identityService: IdentityService, private tokenService: TokenService, private router: Router) { }

    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
        if (this.tokenService.invalid) {
            if (this.identityService.rememberMe) {
                return this.identityService.token$.pipe(
                    map((_: IToken) => this.handleRedirection())
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