import { registerLocaleData } from '@angular/common';
import { APP_INITIALIZER, Injectable, LOCALE_ID } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { Feature, Locale } from '../enums';
import { CommonConstants as Constants } from '../constants';
import { mergeDeep } from 'ngx-sfc-common';

@Injectable({
    providedIn: 'root',
})
class I18n {
    locale = Locale.English;

    async setLocale() {
        const userLocale = localStorage.getItem(Constants.LOCALE_KEY) as Locale;

        if (userLocale)
            this.locale = userLocale;

        await import(
            /* webpackInclude: /\b(en-GB|ru-UA)\.mjs/ */
            `/node_modules/@angular/common/locales/${this.locale}`)
            .then(localeModule => registerLocaleData(localeModule.default))
            .catch(() => console.warn(`Missing locale: ${this.locale}`));

        const localeTranslationsModule = await import(`src/assets/i18n/${this.locale}.json`),
            welcomeTranslations = await this.loadFeatureTranslations(Feature.Welcome),
            registrationTranslations = await this.loadFeatureTranslations(Feature.Identity);

        const translations = mergeDeep(localeTranslationsModule.default,
            welcomeTranslations,
            registrationTranslations);

        loadTranslations(translations);
    }

    private async loadFeatureTranslations(featureKey: string) {
        const featureTranslations = await import(`src/app/features/${featureKey}/assets/i18n/${this.locale}.json`),
            translations = featureTranslations.default;

        return Object.keys(translations).reduce((a, c) => ((a as any)[`feature.${featureKey}.${c}`] = translations[c], a), {});
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