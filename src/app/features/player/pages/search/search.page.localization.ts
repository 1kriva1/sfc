export class SearchPageLocalization {
    static BUTTON_SEARCH_LABEL = $localize`:@@core.action.search:Search`;
    static BUTTON_CANCEL_LABEL = $localize`:@@core.action.cancel:Cancel`;

    static ERROR = {
        FETCH: $localize`:@@feature.player.search.page.error.fetch:Can't fetch players`
    };

    static ROUTER = {
        TITLE: {
            SEARCH: $localize`:@@feature.player.search.page.router.title.search:Search players`
        }
    };

    static TITLE = {
        LABEL: $localize`:@@feature.player.search.page.title.label:Search players`,
        DESCRIPTION: $localize`:@@feature.player.search.page.title.description:Here you can find any player for your team or game.`,
        TOOLTIP: $localize`:@@feature.player.search.page.title.tooltip:Please choose criteria to search players.`
    };

    static RECOMMENDATION = {
        SEARCHING: {
            TITLE: {
                LABEL: $localize`:@@feature.player.search.page.recommendation.searching.title.label:Most searching players`,
                DESCRIPTION: $localize`:@@feature.player.search.page.recommendation.searching.title.description:Recommended to invite such players.`,
                TOOLTIP: $localize`:@@feature.player.search.page.recommendation.searching.title.tooltip:These players are in top of searching.`
            }
        },
        LOCATION: {
            TITLE: {
                LABEL: $localize`:@@feature.player.search.page.recommendation.location.title.label:Players from your city`,
                DESCRIPTION: $localize`:@@feature.player.search.page.recommendation.location.title.description:These players are from your city.`,
                TOOLTIP: $localize`:@@feature.player.search.page.recommendation.location.title.tooltip:Players that located not far from of you.`
            }
        }
    };

    static STATISTIC = {
        LABEL: {
            EXPAND: $localize`:@@feature.player.search.page.statistic.label.expand:Show statistics`,
            COLLAPSE: $localize`:@@feature.player.search.page.statistic.label.collapse:Hide statistics`
        },
        REGISTERED: {
            LABEL: $localize`:@@feature.player.search.page.statistic.registered.label:Registered`,
            DESCRIPTION_1: $localize`:@@feature.player.search.page.statistic.registered.description-1:More than`,
            DESCRIPTION_2: $localize`:@@feature.player.search.page.statistic.registered.description-2:players`
        },
        NEIGHBORS: {
            LABEL: $localize`:@@feature.player.search.page.statistic.neighbors.label:Neighbors`,
            DESCRIPTION: $localize`:@@feature.player.search.page.statistic.neighbors.description:players from your city`
        },
        AVAILABLE: {
            LABEL: $localize`:@@feature.player.search.page.statistic.available.label:Available`,
            DESCRIPTION: $localize`:@@feature.player.search.page.statistic.available.description:players can play today`
        },
        FRIENDS: {
            LABEL: $localize`:@@feature.player.search.page.statistic.friends.label:Friends`,
            DESCRIPTION_1: $localize`:@@feature.player.search.page.statistic.friends.description-1:With`,
            DESCRIPTION_2: $localize`:@@feature.player.search.page.statistic.friends.description-2:players you already play`
        }
    };

    static FILTER = {
        TITLE: {
            LABEL: $localize`:@@feature.player.search.page.filter.title.label:Search filters`,
            DESCRIPTION: $localize`:@@feature.player.search.page.filter.title.description:Please apply filters for your requirements.`,
            TOOLTIP: $localize`:@@feature.player.search.page.filter.title.tooltip:Please choose criteria to search players.`
        },
        GENERAL: {
            LABEL: $localize`:@@feature.player.search.page.filter.general.label:General`
        },
        FOOTBALL: {
            LABEL: $localize`:@@feature.player.search.page.filter.football.label:Football`
        },
        STATS: {
            LABEL: $localize`:@@feature.player.search.page.filter.stats.label:Stats`
        },
        MODAL: {
            BUTTON: {
                TEXT: $localize`:@@feature.player.search.page.filter.modal.button.text:Show filters`
            }
        }
    };

    static INPUT = {
        NAME: {
            TITLE: {
                LABEL: $localize`:@@feature.player.search.page.input.name.title.label:Search by name`,
                DESCRIPTION: $localize`:@@feature.player.search.page.input.name.title.description:Possible that you know whom exactly you want to find.`,
            },
            PLACEHOLDER: $localize`:@@feature.player.search.page.input.name.placeholder:Type name`,
        }
    };

    static TABLE = {
        COLUMNS_SHOW_LABEL: $localize`:@@core.action.show:Show`,
        COLUMNS_HIDE_LABEL: $localize`:@@core.action.hide:Hide`,
        TOTAL_LABEL: $localize`:@@core.total:Total`,
        DATA_LIST_LABEL: $localize`:@@core.list:List`,
        DATA_CARDS_LABEL: $localize`:@@core.cards:Cards`,
        NOT_FOUND_LABEL: $localize`:@@core.not-found:Not found`,
        COLUMN: {
            RAITING: $localize`:@@feature.player.search.page.table.column.raiting:Raiting`,
            NAME: $localize`:@@feature.player.search.page.table.column.name:Name`,
            AVAILABLE: $localize`:@@feature.player.search.page.table.column.available:Available`,
            POSITION: $localize`:@@feature.player.search.page.table.column.position:Position`,
            PHYSICAL_CONDITION: $localize`:@@feature.player.search.page.table.column.physicalCondition:Physical condition`,
            SIZE: $localize`:@@feature.player.search.page.table.column.size:Size`
        }
    };
}