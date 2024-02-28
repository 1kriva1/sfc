export class GeneralFilterLocalization {
    static BUTTON_OK_LABEL = $localize`:@@core.action.ok:Ok`;
    static BUTTON_CANCEL_LABEL = $localize`:@@core.action.cancel:Cancel`;
    static BUTTON_CLEAR_LABEL = $localize`:@@core.action.clear:Clear`;
    static CHARACTERS = $localize`:@@core.characters:characters`;
    static INPUT = {
        CITY: {
            LABEL: $localize`:@@core.city:City`,
            PLACEHOLDER: $localize`:@@feature.player.search.page.filter.general.input.city.placeholder:Type city`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.general.input.city.helper-text:City where you planned to find players`,
            VALIDATIONS: {
                MAX_LENGTH: $localize`:@@feature.player.search.page.filter.general.input.city.validation.max-length:City is too long.`
            }
        },
        TAGS: {
            LABEL: $localize`:@@core.tags:Tags`,
            PLACEHOLDER: $localize`:@@feature.player.search.page.filter.general.input.tags.placeholder:Add tags`,
            NEW_TAG_PLACEHOLDER: $localize`:@@core.tag:Tag`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.general.input.tags.helper-text:Maybe, tag can help to find players`,
            VALIDATIONS: {
                EMPTY: $localize`:@@core.validation.empty:Should not be empty.`,
                DUPLICATE: $localize`:@@core.validation.duplicate:Duplicate value.`,
                TAG_LENGTH: $localize`:@@core.validation.tag.length:Tag value is too long, allowed length`,
                TAGS_LENGTH: $localize`:@@core.validation.tags.length:Too much tags.`
            }
        },
        YEARS: {
            LABEL: $localize`:@@feature.player.search.page.filter.general.input.years.label:Years range`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.general.input.years.helper-text:Find players by age range`,
            MULTIPLE_LABEL_PART_1: $localize`:@@core.from:From`,
            MULTIPLE_LABEL_PART_2: $localize`:@@core.to:To`,
            MULTIPLE_LABEL_PART_3: $localize`:@@core.years:years`
        },
        AVAILABLE_DAYS: {
            LABEL: $localize`:@@feature.player.search.page.filter.general.input.available-days.label:Choose available days`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.general.input.available-days.helper-text:Find players that fit your requirements by days`
        },
        AVAILABLE_FROM: {
            LABEL: $localize`:@@feature.player.search.page.filter.general.input.available-from.label:Choose available from time`,
            PLACEHOLDER: $localize`:@@feature.player.search.page.filter.general.input.available-from.placeholder:Available from`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.general.input.available-from.helper-text:Find players that fit your requirements by time`,
            VALIDATIONS: {
                COMPARE: $localize`:@@core.validation.available-from.compare:Must be less than available to value.`
            }
        },
        AVAILABLE_TO: {
            LABEL: $localize`:@@feature.player.search.page.filter.general.input.available-to.label:Choose available to time`,
            PLACEHOLDER: $localize`:@@feature.player.search.page.filter.general.input.available-to.placeholder:Available to`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.general.input.available-to.helper-text:Find players that fit your requirements by time`,
            VALIDATIONS: {
                COMPARE: $localize`:@@core.validation.available-to.compare:Must be more than available from value.`
            }
        },
        HAS_PHOTO: {
            LABEL: $localize`:@@feature.player.search.page.filter.general.input.has-photo.label:Photo`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.general.input.has-photo.helper-text:Show players only with own photo`,
            ITEMS: {
                NO_MATTER: $localize`:@@core.no-matter:No matter`,
                REQUIRED: $localize`:@@core.required:Required`,
            }
        },
        FREE_PLAY: {
            LABEL: $localize`:@@feature.player.search.page.filter.general.input.free-play.label:Free play`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.general.input.free-play.helper-text:Show players that can't pay for games`,
            ITEMS: {
                NO_MATTER: $localize`:@@core.no-matter:No matter`,
                ONLY: $localize`:@@feature.player.search.page.filter.general.input.free-play.item.only-free:Only free`,
            }
        }
    };
}