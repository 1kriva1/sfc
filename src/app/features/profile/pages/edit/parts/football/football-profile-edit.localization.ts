export class FootballProfileEditLocalization {
    static CENTIMETERS = $localize`:@@core.centimeters:centimeters`;
    static KILOGRAMS = $localize`:@@core.kilograms:kilograms`;
    static TITLE = {
        PHYSICAL: {
            LABEL: $localize`:@@feature.profile.edit.page.football.title.physical.label:Physical information`,
            DESCRIPTION: $localize`:@@feature.profile.edit.page.football.title.physical.description:Information about player`,
            TOOLTIP: $localize`:@@feature.profile.edit.page.football.title.physical.tooltip:This step not required a lot of inputs. Just enter your name, city and football position to start using SFC.`
        },
        GAME: {
            LABEL: $localize`:@@feature.profile.edit.page.football.title.game.label:Game information`,
            DESCRIPTION: $localize`:@@feature.profile.edit.page.football.title.game.description:Information about player`,
            TOOLTIP: $localize`:@@feature.profile.edit.page.football.title.game.tooltip:This step not required a lot of inputs. Just enter your name, city and football position to start using SFC.`
        }
    };
    static INPUT = {
        HEIGHT: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.height.label-placeholder:Height`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.height.helper-text:Your height in centimeters`,
            VALIDATIONS: {
                MAX: $localize`:@@feature.profile.edit.page.football.height.validation.max:Max value for height is`
            }
        },
        WEIGHT: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.weight.label-placeholder:Weight`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.weight.helper-text:Your weight in kilograms`,
            VALIDATIONS: {
                MAX: $localize`:@@feature.profile.edit.page.football.weight.validation.max:Max value for weight is`
            }
        },
        WORKING_FOOT: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.working-foot.label-placeholder:Working foot`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.working-foot.helper-text:Please choose your working foot`,
        },
        PHYSICAL_CONDITION: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.physical-condition.label-placeholder:Physical condition`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.physical-condition.helper-text:Please define your physical state`,
        },
        POSITION: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.position.helper-text:Position`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.physical-condition.helper-text:Please choose your main position on field`,
        },
        ADDITIONAL_POSITION: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.additional-position.label-placeholder:Additional position`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.additional-position.helper-text:Please choose your secondary position on field`,
        },
        GAME_STYLE: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.game-style.label-placeholder:Game style`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.game-style.helper-text:Please choose your game style on field`,
        },
        SKILL: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.skill.label-placeholder:Skill`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.skill.helper-text:Please choose your skill value`,
        },
        WEAK_FOOT: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.weak-foot.label-placeholder:Weak foot`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.weak-foot.helper-text:Please choose your weak foot value`,
        },
        NUMBER: {
            LABEL_PLACEHOLDER: $localize`:@@feature.profile.edit.page.football.number.label-placeholder:T-shirt number`,
            HELPER_TEXT: $localize`:@@feature.profile.edit.page.football.number.helper-text:Please choose your preferred game number`,
        }
    };
}