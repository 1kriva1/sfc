import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { Locale } from "../../enums";

export class HeaderConstants {
    static STICK_CLASS = 'stick';
    static DEFAULT_LANGUAGE = 'English';
    static LANGUAGES: IDropdownMenuItemModel[] = [
        {
            label: 'Українська',
            image: 'assets/images/core/flags/ukraine.png',
            value: Locale.Ukraine
        },
        {
            label: 'English',
            image: 'assets/images/core/flags/united-kingdom.png',
            value: Locale.English
        }
    ];
}