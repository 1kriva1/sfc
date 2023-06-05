import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpConstants } from "../../constants";
import { Locale } from "../../enums";
import { StorageService } from "../../services/storage/storage.service";
import { CommonConstants } from "../../constants";

@Injectable()
export class LocaleInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (request.headers.has(HttpConstants.ACCEPT_LANGUAGE))
            return next.handle(request);

        const userLocale = this.storageService.get<Locale>(CommonConstants.LOCALE_KEY, Locale.English) as Locale,
            acceptLanguageRequest = request.clone({
                headers: request.headers.set(HttpConstants.ACCEPT_LANGUAGE, userLocale)
            });

        return next.handle(acceptLanguageRequest);
    }
}