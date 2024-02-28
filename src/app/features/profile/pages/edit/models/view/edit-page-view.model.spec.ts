import { EditPagePersonalViewModel } from "./edit-page-personal-view.model";
import { IEditPageFormModel } from "../edit-page-form.model";
import { EditPageLocalization } from "../../edit.page.localization";
import { EditPageProgressViewModel } from "./edit-page-progress-view.model";
import { EditPageRaitingViewModel } from "./edit-page-raiting-view.model";
import { EnumService } from "@share/services";
import { IValueModel } from "@core/types";
import { StatsValue } from "@share/types";
import { ENUM_SERVICE } from "@test/stubs";

describe('Features.Profile.Page:ProfileEdit.ViewModels', () => {
    describe('Personal', () => {
        fit('Should first name has placeholder value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.firstName).toEqual(`[${EditPageLocalization.VIEW_MODEL.NAME}]`);
        });

        fit('Should first name has form value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('FirstName', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.firstName).toEqual('FirstName');
        });

        fit('Should last name has placeholder value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.lastName).toEqual(`[${EditPageLocalization.VIEW_MODEL.SURNAME}]`);
        });

        fit('Should last name has form value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', 'LastName', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.lastName).toEqual('LastName');
        });

        fit('Should city has placeholder value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.city).toEqual(`[${EditPageLocalization.VIEW_MODEL.CITY}]`);
        });

        fit('Should city has form value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', 'City', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.city).toEqual('City');
        });

        fit('Should position has placeholder value', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '', null);

            const result = new EditPagePersonalViewModel(model);

            expect(result.position).toEqual({ key: null, value: `[${EditPageLocalization.VIEW_MODEL.POSITION}]` });
        });

        fit('Should position has form value', () => {
            const assertPosfition = { key: 1, value: 'Defender' },
                model: IEditPageFormModel = buildProfileFormValue('', '', '', { key: 1, value: 'Defender' });

            const result = new EditPagePersonalViewModel(model);

            expect(result.position).toEqual(assertPosfition);
        });
    });

    describe('Progress', () => {
        fit('Should general profile have default progress', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '');

            const result = new EditPageProgressViewModel(model);

            expect(result.general.properties).toEqual(11);
            expect(result.general.filled).toEqual(1);
            expect(result.general.percentage).toEqual(10);
        });

        fit('Should general profile have partially filled progress', () => {
            const model: IEditPageFormModel = buildProfileFormValue('First name', 'Last name', 'City',
                { key: 1, value: 'Defender' }, ['tag1', 'tag2']);

            const result = new EditPageProgressViewModel(model);

            expect(result.general.properties).toEqual(11);
            expect(result.general.filled).toEqual(5);
            expect(result.general.percentage).toEqual(46);
        });

        fit('Should football profile have default progress', () => {
            const model: IEditPageFormModel = buildProfileFormValue('', '', '');

            const result = new EditPageProgressViewModel(model);

            expect(result.football.properties).toEqual(10);
            expect(result.football.filled).toEqual(0);
            expect(result.football.percentage).toEqual(0);
        });

        fit('Should football profile have partially filled progress', () => {
            const model: IEditPageFormModel = buildProfileFormValue('First name', 'Last name', 'City',
                { key: 1, value: 'Defender' }, ['tag1', 'tag2']);

            const result = new EditPageProgressViewModel(model);

            expect(result.football.properties).toEqual(10);
            expect(result.football.filled).toEqual(1);
            expect(result.football.percentage).toEqual(10);
        });
    });

    describe('Raiting', () => {
        fit('Should raiting has valid model value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), ENUM_SERVICE as EnumService),
                paceResult = result.model['0'];

            expect(paceResult.total).toEqual(200);
            expect(paceResult.value).toEqual(100);
            expect(paceResult.average).toEqual(50);
            expect(paceResult.count).toEqual(2);
            expect(paceResult.color).toEqual('#FFCE54');
        });

        fit('Should raiting has valid types value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), ENUM_SERVICE as EnumService);

            expect(result.types['0']).toEqual({ label: 'Physical', total: 800, value: 400 });
            expect(result.types['1']).toEqual({ label: 'Mental', total: 200, value: 100 });
            expect(result.types['2']).toEqual({ label: 'Skill', total: 1900, value: 950 });
        });

        fit('Should raiting has valid total value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), ENUM_SERVICE as EnumService);

            expect(result.total).toEqual(2900);
        });

        fit('Should raiting has valid value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), ENUM_SERVICE as EnumService);

            expect(result.value).toEqual(1450);
        });

        fit('Should raiting has valid percentage value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), ENUM_SERVICE as EnumService);

            expect(result.percentage).toEqual(50);
        });

        fit('Should raiting has valid stars value', () => {
            const result = new EditPageRaitingViewModel(buildStatsValue(), ENUM_SERVICE as EnumService);

            expect(result.stars).toEqual(2.5);
        });
    });

    function buildProfileFormValue(firstName: string, lastName: string, city: string,
        position: IValueModel<number> | null = null, tags: string[] | null = null)
        : IEditPageFormModel {
        return {
            photo: null,
            general: {
                firstName: firstName,
                lastName: lastName,
                biography: null,
                birthday: null,
                city: city,
                tags: tags,
                freePlay: false,
                availability: {
                    from: null,
                    to: null,
                    days: null
                }
            },
            football: {
                height: null,
                weight: null,
                position: position,
                additionalPosition: null,
                workingFoot: null,
                number: null,
                gameStyle: null,
                skill: null,
                weakFoot: null,
                physicalCondition: null,
            },
            stats: buildStatsValue()
        };
    }

    function buildStatsValue(): StatsValue {
        return {
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
        };
    }
});