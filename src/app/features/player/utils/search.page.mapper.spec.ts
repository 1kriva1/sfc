import { EnumService } from "@share/services";
import { ENUM_SERVICE } from "@test/stubs";
import { SortingDirection } from "ngx-sfc-common";
import { SearchPageColumn } from "../pages/search/enums/search-page-column.enum";
import { SearchPageSorting } from "../pages/search/enums/search-page-sorting.enum";
import { ISearchPageFormModel } from "../pages/search/models/search-page-form.model";
import { ISearchPageTableModel } from "../pages/search/models/search-page-table.model";
import { FootballFilterConstants } from "../pages/search/parts/filters/football/football-filter.constants";
import { GeneralFilterConstants } from "../pages/search/parts/filters/general/general-filter.constants";
import { StatsFilterConstants } from "../pages/search/parts/filters/stats/stats-filter.contants";
import { IGetPlayersRequest } from "../services/player/models/get/get-players.request";
import { IGetPlayersItemModel } from "../services/player/models/get/result/get-players-item.model";
import { mapGetPlayersRequest, mapSearchPageTableModel } from "./search.page.mapper";

describe('Features.Player.Search.Utils: Mapper', () => {
    describe('GetPlayers request', () => {
        fit('Should map pagination', () => {
            const model = buildSearchPageFormModel();

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Pagination).toEqual({ Page: 1, Size: 10 });
        });

        fit('Should map sorting', () => {
            const model = buildSearchPageFormModel();

            expect(mapGetPlayersRequest(model, 1, 10,
                { id: SearchPageColumn.PhysicalCondition, direction: SortingDirection.Ascending }).Sorting)
                .toEqual([{ Name: SearchPageSorting.PhysicalCondition, Direction: SortingDirection.Ascending }]);

            expect(mapGetPlayersRequest(model, 1, 10,
                { id: SearchPageColumn.Name, direction: SortingDirection.Ascending }).Sorting)
                .toEqual([
                    { Name: SearchPageSorting.FirstName, Direction: SortingDirection.Ascending },
                    { Name: SearchPageSorting.LastName, Direction: SortingDirection.Ascending }
                ]);

            expect(mapGetPlayersRequest(model, 1, 10,
                { id: SearchPageColumn.Size, direction: SortingDirection.Ascending }).Sorting)
                .toEqual([
                    { Name: SearchPageSorting.Height, Direction: SortingDirection.Ascending },
                    { Name: SearchPageSorting.Weight, Direction: SortingDirection.Ascending }
                ]);

            expect(mapGetPlayersRequest(model, 1, 10,
                { id: SearchPageColumn.Photo, direction: SortingDirection.Ascending }).Sorting)
                .toEqual([
                    { Name: SearchPageSorting.Raiting, Direction: SortingDirection.Ascending }
                ]);

            expect(mapGetPlayersRequest(model, 1, 10,
                { id: 'Test', direction: SortingDirection.Ascending }).Sorting)
                .toEqual([]);
        });

        fit('Should map available from and to values', () => {
            const model = buildSearchPageFormModel();
            model.general.availability.from = new Date(2023, 10, 4, 14, 10);
            model.general.availability.to = new Date(2023, 10, 4, 16, 10);

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Filter.Profile.General.Availability.From).toEqual('14:10:00');
            expect(result.Filter.Profile.General.Availability.To).toEqual('16:10:00');
        });

        fit('Should map years', () => {
            const model = buildSearchPageFormModel();
            model.general.years = { from: 16, to: 80 };

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Filter.Profile.General.Years.From).toEqual(16);
            expect(result.Filter.Profile.General.Years.To).toEqual(80);
        });

        fit('Should map height', () => {
            const model = buildSearchPageFormModel();
            model.football.height = { from: 100, to: 180 };

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Filter.Profile.Football.Height.From).toEqual(100);
            expect(result.Filter.Profile.Football.Height.To).toEqual(180);
        });

        fit('Should map weight', () => {
            const model = buildSearchPageFormModel();
            model.football.weight = { from: 50, to: 240 };

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Filter.Profile.Football.Weight.From).toEqual(50);
            expect(result.Filter.Profile.Football.Weight.To).toEqual(240);
        });

        fit('Should map working foot', () => {
            const model = buildSearchPageFormModel();
            model.football.workingFoot = { key: 1, value: 'Right' };

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Filter.Profile.Football.WorkingFoot).toEqual(1);
        });

        fit('Should map total stat', () => {
            const model = buildSearchPageFormModel();
            model.stats.total = { from: 50, to: 100 };

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Filter.Stats.Total.From).toEqual(50);
            expect(result.Filter.Stats.Total.To).toEqual(100);
        });

        fit('Should map mental stat', () => {
            const model = buildSearchPageFormModel();
            model.stats.mental = { from: 50, to: 100 };

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Filter.Stats.Mental).toEqual({ From: 50, To: 100, Skill: 1 });
        });

        fit('Should map physical stat', () => {
            const model = buildSearchPageFormModel();
            model.stats.physical = { from: 50, to: 100 };

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Filter.Stats.Physical).toEqual({ From: 50, To: 100, Skill: 0 });
        });

        fit('Should map skill stat', () => {
            const model = buildSearchPageFormModel();
            model.stats.skill = { from: 50, to: 100 };

            const result: IGetPlayersRequest = mapGetPlayersRequest(model, 1, 10, null);

            expect(result.Filter.Stats.Skill).toEqual({ From: 50, To: 100, Skill: 2 });
        });
    });

    describe('SearchPageTable model', () => {
        fit('Should map id', () => {
            const model = buildPlayersItemModel();

            const result: ISearchPageTableModel = mapSearchPageTableModel(model, ENUM_SERVICE as EnumService);

            expect(result.id).toEqual(model.Id);
        });

        fit('Should map general profile', () => {
            const model = buildPlayersItemModel(),
                assertAvailableFrom = new Date();

            assertAvailableFrom.setHours(16);
            assertAvailableFrom.setMinutes(25);
            assertAvailableFrom.setSeconds(0);

            const result: ISearchPageTableModel = mapSearchPageTableModel(model, ENUM_SERVICE as EnumService);

            expect(result.general).toEqual({
                availability: { days: [1], from: assertAvailableFrom, to: null },
                birthday: new Date(1992, 4, 12),
                city: 'Test city',
                firstName: 'Testname',
                lastName: 'Testsurname',
                freePlay: true,
                photo: 'test.png',
                tags: ['tag1', 'tag2']
            });
        });

        fit('Should map football profile', () => {
            const model = buildPlayersItemModel();

            const result: ISearchPageTableModel = mapSearchPageTableModel(model, ENUM_SERVICE as EnumService);

            expect(result.football).toEqual({
                gameStyle: 1,
                height: 180,
                physicalCondition: 2,
                position: 2,
                skill: 3,
                weight: 65,
                workingFoot: 0
            });
        });

        fit('Should map stats', () => {
            const model = buildPlayersItemModel();

            const result: ISearchPageTableModel = mapSearchPageTableModel(model, ENUM_SERVICE as EnumService);

            expect(result.stats).toEqual({
                0: {
                    0: 50,
                    1: 50
                },
                1: {
                    2: 50,
                    3: 50,
                    4: 50,
                    5: 50,
                    6: 50,
                    7: 50
                },
                2: {
                    8: 50,
                    9: 50,
                    10: 50,
                    11: 50,
                    12: 50,
                    13: 50
                },
                3: {
                    14: 50,
                    15: 50,
                    16: 50,
                    17: 50,
                    18: 50,
                    19: 50
                },
                4: {
                    20: 50,
                    21: 50,
                    22: 50,
                    23: 50,
                    24: 50
                },
                5: {
                    25: 50,
                    26: 50,
                    27: 50,
                    28: 50
                }
            });
        });
    });

    function buildSearchPageFormModel(): ISearchPageFormModel {
        return {
            name: null,
            general: {
                hasPhoto: null!,
                years: { from: GeneralFilterConstants.FROM_YEARS_DEFAULT, to: GeneralFilterConstants.TO_YEARS_DEFAULT },
                city: 'Test city',
                tags: null,
                freePlay: null!,
                availability: {
                    from: null,
                    to: null,
                    days: null
                }
            },
            football: {
                height: { from: FootballFilterConstants.FROM_HEIGHT_DEFAULT, to: FootballFilterConstants.TO_HEIGHT_DEFAULT },
                weight: { from: FootballFilterConstants.FROM_WEIGHT_DEFAULT, to: FootballFilterConstants.TO_WEIGHT_DEFAULT },
                positions: null,
                workingFoot: null,
                skill: null,
                physicalCondition: null,
                gameStyles: null
            },
            stats: {
                total: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                physical: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                mental: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                skill: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                raiting: null
            }
        };
    }

    function buildPlayersItemModel(): IGetPlayersItemModel {
        return {
            Id: 1,
            Profile: {
                Football: {
                    GameStyle: 1,
                    Height: 180,
                    PhysicalCondition: 2,
                    Position: 2,
                    Skill: 3,
                    Weight: 65,
                    WorkingFoot: 0
                },
                General: {
                    Availability: { Days: [1], From: '16:25:00', To: null },
                    Birthday: new Date(1992, 4, 12),
                    City: 'Test city',
                    FirstName: 'Testname',
                    FreePlay: true,
                    LastName: 'Testsurname',
                    Photo: 'test.png',
                    Tags: ['tag1', 'tag2']
                }
            },
            Stats: {
                Values: [
                    { Type: 0, Value: 50 },
                    { Type: 1, Value: 50 },
                    { Type: 2, Value: 50 },
                    { Type: 3, Value: 50 },
                    { Type: 4, Value: 50 },
                    { Type: 5, Value: 50 },
                    { Type: 6, Value: 50 },
                    { Type: 7, Value: 50 },
                    { Type: 8, Value: 50 },
                    { Type: 9, Value: 50 },
                    { Type: 10, Value: 50 },
                    { Type: 11, Value: 50 },
                    { Type: 12, Value: 50 },
                    { Type: 13, Value: 50 },
                    { Type: 14, Value: 50 },
                    { Type: 15, Value: 50 },
                    { Type: 16, Value: 50 },
                    { Type: 17, Value: 50 },
                    { Type: 18, Value: 50 },
                    { Type: 19, Value: 50 },
                    { Type: 20, Value: 50 },
                    { Type: 21, Value: 50 },
                    { Type: 22, Value: 50 },
                    { Type: 23, Value: 50 },
                    { Type: 24, Value: 50 },
                    { Type: 25, Value: 50 },
                    { Type: 26, Value: 50 },
                    { Type: 27, Value: 50 },
                    { Type: 28, Value: 50 }
                ]
            }
        };
    }
});