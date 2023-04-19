export class LoginPageLocalization {
    static USERNAME_EMAIL_LABEL_PLACEHOLDER = $localize`:@@feature.identity.login.page.username-email.label-placeholder:Username or Email`;
    static PASSWORD_LABEL_PLACEHOLDER = $localize`:@@feature.identity.login.page.password.label-placeholder:Password`;
    static REMEMBER_LABEL = $localize`:@@feature.identity.login.page.remember.label:Remember me!`;
    static SIGN_IN_BUTTON_TEXT = $localize`:@@feature.identity.login.page.sign-in:Sign in!`;
    static DELIMETER_TEXT = $localize`:@@feature.identity.login.page.delimeter:or`;
    static VALIDATIONS = {
        USER_NAME_EMAIL: {
            REQUIRED: $localize`:@@feature.identity.login.page.username-email.validation.required:User name or email is required.`
        },
        PASSWORD:{
            REQUIRED: $localize`:@@feature.identity.login.page.password.validation.required:Password required.`
        }
    }
}