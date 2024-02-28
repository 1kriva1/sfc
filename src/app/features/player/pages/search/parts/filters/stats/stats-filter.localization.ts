export class StatsFilterLocalization {
    static FROM = $localize`:@@core.from:From`;
    static TO = $localize`:@@core.to:To`;
    static RESET_LABEL = $localize`:@@core.action.reset:Reset`;
    static INPUT = {
        TOTAL: {
            LABEL: $localize`:@@feature.player.search.page.filter.stats.input.total.label:Total`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.total.helper-text:Find players by stats total rating range value`
        },
        RAITING: {
            LABEL: $localize`:@@feature.player.search.page.filter.stats.input.raiting.label:Or use rating stars`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.raiting.helper-text:Find players by rating stars`
        },
        PHYSICAL: {
            LABEL: $localize`:@@feature.player.search.page.filter.stats.input.physical.label:Physical`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.physical.helper-text:Find players by physical stats rating range value`
        },
        MENTAL: {
            LABEL: $localize`:@@feature.player.search.page.filter.stats.input.mental.label:Mental`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.mental.helper-text:Find players by mental stats rating range value`
        },
        SKILL: {
            LABEL: $localize`:@@feature.player.search.page.filter.stats.input.skill.label:Skill`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.stats.input.skill.helper-text:Find players by skill stats rating range value`
        }
    };
}