import {
    faBaseball, faBasketball, faBowlingBall, faCirclePlus, faFootball, faFootballBall, faHockeyPuck,
    faMagnifyingGlass, faMountain, faPeopleCarryBox, faPersonBiking, faSortAmountDown, faSortAmountUp, faStrikethrough,
    faTableTennisPaddleBall, faVolleyball
} from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, SortingDirection } from "ngx-sfc-common";
import { ISideMenuModel, ITableColumnExtendedModel, SideMenuItemType } from "ngx-sfc-components";
import { SearchPageColumn } from "./enums/search-page-column.enum";
import { SearchPageLocalization } from "./search.page.localization";

export class SearchPageConstants {
    static SIDE_MENU_MODEL: ISideMenuModel = {
        items: [
            {
                label: 'Football',
                icon: faFootball,
                type: SideMenuItemType.Item,
                active: false,
                items: [
                    {
                        label: 'Find',
                        icon: faMagnifyingGlass,
                        type: SideMenuItemType.Item,
                        active: false
                    },
                    {
                        label: 'Create',
                        icon: faCirclePlus,
                        type: SideMenuItemType.Item,
                        active: false,
                    },
                    {
                        label: 'View',
                        icon: faMountain,
                        type: SideMenuItemType.Item,
                        active: false,
                    }
                ]
            },
            {
                label: 'Basketball',
                icon: faBasketball,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Tennis',
                icon: faTableTennisPaddleBall,
                type: SideMenuItemType.Item,
                active: false,
                items: [
                    {
                        label: 'Find',
                        icon: faMagnifyingGlass,
                        type: SideMenuItemType.Item,
                        active: false
                    },
                    {
                        label: 'Create',
                        icon: faCirclePlus,
                        type: SideMenuItemType.Item,
                        active: false,
                    },
                    {
                        label: 'View',
                        icon: faMountain,
                        type: SideMenuItemType.Item,
                        active: false,
                    }
                ]
            },
            {
                label: 'Volleyball',
                icon: faVolleyball,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Cricket',
                icon: faStrikethrough,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Rugby',
                icon: faFootballBall,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Boxing',
                icon: faPeopleCarryBox,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Categories',
                type: SideMenuItemType.Title,
                icon: undefined,
                active: false
            },
            {
                label: 'Baseball',
                icon: faBaseball,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Bowling',
                icon: faBowlingBall,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Hockey',
                icon: faHockeyPuck,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Biking',
                icon: faPersonBiking
                ,
                type: SideMenuItemType.Item,
                active: false
            }
        ],
        open: false
    };

    static TABLE_COLUMNS: ITableColumnExtendedModel[] = [
        {
            name: SearchPageLocalization.TABLE.COLUMN.RAITING,
            field: SearchPageColumn.Photo,
            width: 14,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Descending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            }
        },
        {
            name: SearchPageLocalization.TABLE.COLUMN.NAME,
            field: SearchPageColumn.Name,
            sorting: {
                enabled: true,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 17
        },
        {
            name: SearchPageLocalization.TABLE.COLUMN.AVAILABLE,
            field: SearchPageColumn.Available,
            width: 20
        },
        {
            name: SearchPageLocalization.TABLE.COLUMN.POSITION,
            field: SearchPageColumn.Position,
            width: 11
        },
        {
            name: SearchPageLocalization.TABLE.COLUMN.PHYSICAL_CONDITION,
            field: SearchPageColumn.PhysicalCondition,
            sorting: {
                enabled: true,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 14
        },
        {
            name: SearchPageLocalization.TABLE.COLUMN.SIZE,
            field: SearchPageColumn.Size,
            sorting: {
                enabled: true,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 11
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: SearchPageColumn.Actions,
            width: 13
        }
    ];

    static TABLE_PAGINATION_SIZE: number = 7;

    static TABLE_PAGINATION_COUNT: number = 5;

    static SEARCH_DEBOUNCE_TIME: number = 1000;
}