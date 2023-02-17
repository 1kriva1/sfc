import { IDropdownMenuItemModel } from "ngx-sfc-components";

export class HeaderConstants {
    static STICK_CLASS = 'stick';
    static LANGUAGES: IDropdownMenuItemModel[] = [
        {
            label: 'Українська',
            image: 'assets/images/core/flags/ukraine.png'
        },
        {
            label: 'English',
            image: 'assets/images/core/flags/united-kingdom.png',
            active: true
        }
    ];
}