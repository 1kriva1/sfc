import { registerLocaleData } from '@angular/common';
import { APP_INITIALIZER, Injectable, LOCALE_ID } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { Locale } from '../enums';
import { CommonConstants as Constants } from '../constants';

@Injectable({
    providedIn: 'root',
})
class I18n {
    locale = Locale.English;

    async setLocale() {
        const userLocale = localStorage.getItem(Constants.LOCALE_KEY) as Locale;

        if (userLocale) {
            this.locale = userLocale;
        }

        import(`@/../@angular/common/locales/${this.locale}.mjs`)
            .then(localeModule => registerLocaleData(localeModule.default))
            .catch(() => console.warn(`Missing locale: ${this.locale}`));

        const localeTranslationsModule = await import(`src/assets/i18n/${this.locale}.json`);

        loadTranslations(localeTranslationsModule.default);
    }
}

function setLocale() {
    return {
        provide: APP_INITIALIZER,
        useFactory: (i18n: I18n) => () => i18n.setLocale(),
        deps: [I18n],
        multi: true,
    };
}

function setLocaleId() {
    return {
        provide: LOCALE_ID,
        useFactory: (i18n: I18n) => i18n.locale,
        deps: [I18n],
    };
}

export const I18nModule = {
    setLocale: setLocale,
    setLocaleId: setLocaleId,
};