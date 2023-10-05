import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { Locale } from "@core/enums/locale.enum";

export class LanguageTogglerConstants {
    static DEFAULT_LANGUAGE = 'English';
    static LANGUAGES: IDropdownMenuItemModel[] = [
        {
            label: 'Українська',
            image: 'app/core/assets/images/flags/ukraine.png',
            value: Locale.Ukraine
        },
        {
            label: 'English',
            image: 'app/core/assets/images/flags/united-kingdom.png',
            value: Locale.English
        }
    ];
}