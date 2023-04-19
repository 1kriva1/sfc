import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpContextToken,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from 'ngx-sfc-common';

export const LOADER = new HttpContextToken(() => false);

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.context.get(LOADER)) {
            this.loaderService.show();

            return next.handle(request).pipe(
                finalize(() => this.loaderService.hide())
            );
        }

        return next.handle(request);
    }
}
