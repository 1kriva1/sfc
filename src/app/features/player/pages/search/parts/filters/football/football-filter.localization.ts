export class FootballFilterLocalization {
    static FROM = $localize`:@@core.from:From`;
    static TO = $localize`:@@core.to:To`;
    static CM = $localize`:@@core.cm:cm`;
    static KG = $localize`:@@core.kg:kg`;
    static RESET_LABEL = $localize`:@@core.action.reset:Reset`;
    static INPUT = {
        POSITIONS: {
            LABEL: $localize`:@@feature.player.search.page.filter.football.input.positions.label:Choose positions`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.football.input.positions.helper-text:Find players with specific position`
        },
        PHYSICAL_CONDITION: {
            LABEL: $localize`:@@feature.player.search.page.filter.football.input.physical-condition.label:Physical condition`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.football.input.physical-condition.helper-text:Will return players from such physical condition value`,
        },
        GAME_STYLES: {
            LABEL: $localize`:@@feature.player.search.page.filter.football.input.game-styles.label:Choose game styles`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.football.input.game-styles.helper-text:Find players with specific playing style`
        },
        WORKING_FOOT: {
            LABEL: $localize`:@@feature.player.search.page.filter.football.input.working-foot.label:Working foot`,
            PLACEHOLDER: $localize`:@@feature.player.search.page.filter.football.input.working-foot.placeholder:Choose working foot`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.football.input.working-foot.helper-text:If you need player with specific working foot`,
            DEFAULT_ITEM_LABEL: $localize`:@@feature.player.search.page.filter.football.input.working-foot.default-item-label:No need specific foot`
        },
        HEIGHT: {
            LABEL: $localize`:@@feature.player.search.page.filter.football.input.height.label:Height`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.football.input.height.helper-text:Find players by height range`
        },
        WEIGHT: {
            LABEL: $localize`:@@feature.player.search.page.filter.football.input.weight.label:Weight`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.football.input.weight.helper-text:Find players by weight range`
        },
        SKILL: {
            LABEL: $localize`:@@feature.player.search.page.filter.football.input.skill.label:Skill`,
            HELPER_TEXT: $localize`:@@feature.player.search.page.filter.football.input.skill.helper-text:Will return players from such skill value`
        }
    };
}