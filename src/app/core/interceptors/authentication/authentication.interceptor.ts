import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IdentityService } from '@share/services/identity/identity.service';
import { TokenService } from '@share/services/token/token.service';
import { IToken } from '@share/services/token/token.model';
import { HttpConstants } from '../../constants';

export const REQURED_AUTH = new HttpContextToken(() => true);

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


    constructor(private identityService: IdentityService,
        private tokenService: TokenService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requiredAuth: boolean = request.context.get(REQURED_AUTH);

        if (requiredAuth && this.identityService.isLoggedIn) {
            const token: IToken | null = this.tokenService.get();

            if (token) {
                request = request.clone({
                    headers: request.headers.set(HttpConstants.AUTHORIZATION_HEADER_KEY,
                        `${HttpConstants.BEARER_AUTHORIZATION_PART} ${token.Access}`)
                });
            }
        }

        return next.handle(request);
    }
}
