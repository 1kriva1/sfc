export class GeneralProfileEditLocalization {
    static BUTTON_OK_LABEL = $localize`:@@core.action.ok: Ok`;
    static BUTTON_CANCEL_LABEL = $localize`:@@core.action.cancel: Cancel`;
    static CHARACTERS = $localize`:@@core.characters:characters`;
    static TITLE = {
        GENERAL: {
            LABEL: $localize`:@@feature.profile.edit.page.general.title.general.label:General player information`,
            DESCRIPTION: $localize`:@@feature.profile.edit.page.general.title.general.description:Information about player`,
            TOOLTIP: $localize`:@@feature.profile.edit.page.general.title.general.tooltip:This step not required a lot of inputs. Just enter your name, city and football position to start using SFC.`
        },
        AVAILABILITY: {
            LABEL: $localize`:@@feature.profile.edit.page.general.title.availability.label:Availability information`,
            DESCRIPTION: $localize`:@@feature.profile.edit.page.general.title.availability.description:Information about player`,
            TOOLTIP: $localize`:@@feature.profile.edit.page.general.title.availability.tooltip:This step not required a lot of inputs. Just enter your name, city and football position to start using SFC.`
        },
        FINANCIAL: {
            LABEL: $localize`:@@feature.profile.edit.page.general.title.financial.label:Financial information`,
            DESCRIPTION: $localize`:@@feature.profile.edit.page.general.title.financial.description:Information about player`,
            TOOLTIP: $localize`:@@feature.profile.edit.page.general.title.financial.tooltip:This step not required a lot of inputs. Just enter your name, city and football position to start using SFC.`
        }
    };
    static INPUT = {
        FIRST_NAME: {
            LABEL_PLACEHOLDER: $localize`:@@core.first-name:First name`,
            VALIDATIONS: {
                REQUIRED: $localize`:@@core.validation.first-name.required:First name is required.`,
                MAX_LENGTH: $localize`:@@feature.profile.edit.page.general.first-name.validation.max-length:First name is too long.`
            }
        },
        LAST_NAME: {
            LABEL_PLACEHOLDER: $localize`:@@core.last-name:Last name`,
            VALIDATIONS: {
                REQUIRED: $localize`:@@core.validation.last-name.required:Last name is required.`,
                MAX_LENGTH: $localize`:@@feature.profile.edit.page.general.last-name.validation.max-length:Last name is too long.`
            }
        },
        BIRTHDAY: {
            LABEL_PLACEHOLDER: $localize`:@@core.birthday:Birthday`
        },
        CITY: {
            LABEL_PLACEHOLDER: $localize`:@@core.city:City`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.general.city.helper-text:City where you plan to play football`,
            VALIDATIONS: {
                REQUIRED: $localize`:@@core.validation.city.required:City is required.`,
                MAX_LENGTH: $localize`:@@feature.profile.edit.page.general.city.validation.max-length:City is too long.`
            }
        },
        BIOGRAPHY: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.general.biography.label-placeholder:Biography`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.general.biography.helper-text:A few words about you and your football experience`,
            VALIDATIONS: {
                MAX_LENGTH: $localize`:@@feature.profile.edit.page.general.biography.validation.max-length:Biography is too long.`
            }
        },
        TAGS: {
            LABEL_PLACEHOLDER: $localize`:@@core.tags:Tags`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.general.tags.helper-text:A few tags that can identify you or your interests`,
            NEW_TAG_PLACEHOLDER: $localize`:@@core.tag:Tag`,
            VALIDATIONS: {
                EMPTY: $localize`:@@core.validation.empty:Should not be empty.`,
                DUPLICATE: $localize`:@@core.validation.duplicate:Duplicate value.`,
                TAG_LENGTH: $localize`:@@feature.profile.edit.page.general.tags.validation.tag-length:Tag value is too long, allowed length `,
                TAGS_LENGTH: $localize`:@@feature.profile.edit.page.general.tags.validation.tags-length:Too much tags.`
            }
        },
        AVAILABLE_FROM: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.general.available-from-time.label-placeholder:Available from such time`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.general.available-from-time.helper-text:From which time you can play`,
            VALIDATIONS: {
                COMPARE: $localize`:@@feature.profile.edit.page.general.available-from.validation.compare:Must be less than available to value.`
            }
        },
        AVAILABLE_TO: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.general.available-to-time.label-placeholder:Available to such time`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.general.available-to-time.helper-text:To what time you can play`,
            VALIDATIONS: {
                COMPARE: $localize`:@@feature.profile.edit.page.general.available-to.validation.compare:Must be more than available from value.`
            }
        },
        AVAILABLE_DAYS: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.general.available-days.label-placeholder:Available days`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.general.available-days.helper-text:Please choose available days`
        },
        FREE_PLAY: {
            LABEL: $localize`:@@feature.profile.edit.page.general.free-play.label:If you dont wan't to pay for football stuff`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.general.free-play.helper-text:Choose if you dont wan't to pay`
        }
    };
}