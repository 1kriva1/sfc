export class EditPageLocalization {
    static BUTTON_OK_LABEL = $localize`:@@core.action.ok:Ok`;
    static BUTTON_CANCEL_LABEL = $localize`:@@core.action.cancel:Cancel`;
    static BUTTON_CREATE_TEXT = $localize`:@@core.action.create:Create`;
    static BUTTON_UPDATE_TEXT = $localize`:@@core.action.update:Update`;
    static TITLE = {
        CREATE: {
            LABEL: $localize`:@@feature.profile.edit.page.title-create.label:Create profile`,
            DESCRIPTION: $localize`:@@feature.profile.edit.page.title-create.description:Please create profile`,
            TOOLTIP: $localize`:@@feature.profile.edit.page.title-create.tooltip:This step not required a lot of inputs. Just enter your name, city and football position to start using SFC.`
        },
        UPDATE: {
            LABEL: $localize`:@@feature.profile.edit.page.title-update.label:Your profile`,
            DESCRIPTION: $localize`:@@feature.profile.edit.page.title-update.description:Here you can change your personal information`,
            TOOLTIP: $localize`:@@feature.profile.edit.page.title-update.tooltip:This step not required a lot of inputs. Just enter your name, city and football position to start using SFC.`
        }
    };
    static INPUT = {
        PHOTO: {
            LABEL: $localize`:@@feature.profile.edit.page.photo-input.label:Photo`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.photo-input.placeholder:Please add your photo(avatar)`,
            VALIDATIONS: {
                INVALID_FORMAT: $localize`:@@core.validation.file-format:Invalid file format.`,
                MAX_SIZE_PART_1: $localize`:@@feature.profile.edit.page.photo-input.validation.max-size-1:Max allowed size`,
                MAX_SIZE_PART_2: $localize`:@@feature.profile.edit.page.photo-input.validation.max-size-2:your file size is`
            }
        }
    };
    static STARS_TOOLTIP = $localize`:@@feature.profile.edit.page.stars.tooltip:This stars define your stats rating`;
    static PROGRESS = {
        GENERAL_LABEL: $localize`:@@feature.profile.edit.page.progress.general.label:General`,
        FOOTBALL_LABEL: $localize`:@@feature.profile.edit.page.progress.football.label:Football`,
        STATS_LABEL: $localize`:@@feature.profile.edit.page.progress.stats.label:Stats`,
        OF: $localize`:@@core.of: of`,
        FILLED: $localize`:@@feature.profile.edit.page.progress.filled:fields are filled.`,
        POINTS: $localize`:@@feature.profile.edit.page.progress.points:stat's points are used.`
    };
    static TABS = {
        GENERAL_LABEL: $localize`:@@feature.profile.edit.page.tab.general:General`,
        FOOTBALL_LABEL: $localize`:@@feature.profile.edit.page.tab.football:Football`,
        STATS_LABEL: $localize`:@@feature.profile.edit.page.tab.stats:Stats`
    };
    static VIEW_MODEL = {
        NAME: $localize`:@@core.name:Name`,
        SURNAME: $localize`:@@core.surname:Surname`,
        POSITION: $localize`:@@core.position:Position`,
        CITY: $localize`:@@core.city:City`
    };
    static CHANGES_MODAL = {
        BUTTONS: {
            NO: $localize`:@@core.no:No`,
            YES_DISCARD_CHANGES: $localize`:@@core.action.discard-changes:Yes, discard changes`
        },
        TITLE: $localize`:@@core.unsaved-changes:Unsaved changes!`,
        TEXT: $localize`:@@feature.profile.edit.page.changes-modal.text:Are you sure what leave page without save profile changes?`
    };
    static ROUTER = {
        TITLE: {
            CREATE: $localize`:@@feature.profile.edit.page.router.title.create:Create Profile`,
            UPDATE: $localize`:@@feature.profile.edit.page.router.title.update:Update Profile`
        }
    };
    static NOTIFICATIONS = {
        CREATE: {
            TITLE: $localize`:@@feature.profile.edit.page.notification.create.title:Profile successfully created!`,
            VALUE: $localize`:@@feature.profile.edit.page.notification.create.value:You are ready for football.`
        },
        UPDATE: {
            TITLE: $localize`:@@feature.profile.edit.page.notification.update.title:Profile successfully updated!`,
            VALUE: $localize`:@@feature.profile.edit.page.notification.update.value:Your changes have applied.`
        }
    };
}