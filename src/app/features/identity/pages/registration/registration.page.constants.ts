import { ISliderItemModel } from "ngx-sfc-components";

export class RegistrationPageConstants {
    static SLIDER_ITEMS: ISliderItemModel[] = [
        {
            imageSrc: '/assets/images/identity/registration/slider-default.png'
        },
        {
            imageSrc: '/assets/images/identity/registration/slider-default.png'
        },
        {
            imageSrc: '/assets/images/identity/registration/slider-default.png'
        }
    ];
    static PASSWORD_PATTERN = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{6,}$';
}