import { ProfileEditPageMapper } from "./edit.page.mapper";
import { IGetPlayerModel } from "../services/player/models";
import { IEditPageFormModel } from "../pages/edit/models/edit-page-form.model";
import { EnumService } from "@share/services";

describe('Features.Profile.Utils:Mapper', () => {
    let enumServiceStub: Partial<EnumService> = {
        enums: {
            footballPositions: [
                { key: 0, value: 'Goalkeeper' },
                { key: 1, value: 'Defender' },
                { key: 2, value: 'Midfielder' },
                { key: 3, value: 'Forward' }
            ],
            gameStyles: [
                { key: 0, value: 'Defend' },
                { key: 1, value: 'Attacking' },
                { key: 2, value: 'Aggressive' },
                { key: 3, value: 'Control' },
                { key: 4, value: 'Counter Attacks' }
            ],
            statCategories: [
                { key: 0, value: 'Defend' },
                { key: 1, value: 'Shooting' },
                { key: 2, value: 'Passing' },
                { key: 3, value: 'Dribbling' },
                { key: 4, value: 'Defending' },
                { key: 5, value: 'Physicality' }
            ],
            statSkills: [
                { key: 0, value: 'Physical' },
                { key: 1, value: 'Mental' },
                { key: 2, value: 'Skill' },
            ],
            statTypes: [
                {
                    category: 0,
                    skill: 0,
                    key: 0,
                    value: "Acceleration",
                },
                {
                    category: 0,
                    skill: 0,
                    key: 1,
                    value: "Sprint Speed"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 2,
                    value: "Positioning"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 3,
                    value: "Finishing"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 4,
                    value: "Shot Power"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 5,
                    value: "Long Shots"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 6,
                    value: "Volleys"
                },
                {
                    category: 1,
                    skill: 2,
                    key: 7,
                    value: "Penalties"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 8,
                    value: "Vision"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 9,
                    value: "Crossing"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 10,
                    value: "FK. Accuracy"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 11,
                    value: "Short Passing"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 12,
                    value: "Long Passing"
                },
                {
                    category: 2,
                    skill: 2,
                    key: 13,
                    value: "Curve"
                },
                {
                    category: 3,
                    skill: 0,
                    key: 14,
                    value: "Agility"
                },
                {
                    category: 3,
                    skill: 0,
                    key: 15,
                    value: "Balance"
                },
                {
                    category: 3,
                    skill: 0,
                    key: 16,
                    value: "Reactions"
                },
                {
                    category: 3,
                    skill: 2,
                    key: 17,
                    value: "Ball Control"
                },
                {
                    category: 3,
                    skill: 2,
                    key: 18,
                    value: "Dribbling"
                },
                {
                    category: 3,
                    skill: 1,
                    key: 19,
                    value: "Composure"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 20,
                    value: "Interceptions"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 21,
                    value: "Heading Accuracy"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 22,
                    value: "Def. Awareness"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 23,
                    value: "Standing Tackle"
                },
                {
                    category: 4,
                    skill: 2,
                    key: 24,
                    value: "Sliding Tackle"
                },
                {
                    category: 5,
                    skill: 0,
                    key: 25,
                    value: "Jumping"
                },
                {
                    category: 5,
                    skill: 0,
                    key: 26,
                    value: "Stamina"
                },
                {
                    category: 5,
                    skill: 0,
                    key: 27,
                    value: "Strength"
                },
                {
                    category: 5,
                    skill: 1,
                    key: 28,
                    value: "Aggression"
                }
            ],
            workingFoots: [
                { key: 0, value: "Right" },
                { key: 1, value: "Left" },
                { key: 2, value: "Both" }
            ]
        }
    };

    describe('To server', () => {
        fit('Should map available days', async () => {
            const model = buildProfileFormValue(null!, null!, null!),
                statsModel = { available: 2, used: 1 };
            model.general.availability.days = [{ key: 1, value: 'Monday' }, { key: 2, value: 'Tuesday' }];

            const result = await ProfileEditPageMapper.mapToServer(model, statsModel);

            expect(result.Player.Profile.General.Availability.Days).toEqual([1, 2]);
        });

        fit('Should map available from and to values', async () => {
            const model = buildProfileFormValue(null!, null!, null!),
                statsModel = { available: 2, used: 1 };
            model.general.availability.from = new Date(2023, 10, 4, 14, 10);
            model.general.availability.to = new Date(2023, 10, 4, 16, 10);

            const result = await ProfileEditPageMapper.mapToServer(model, statsModel);

            expect(result.Player.Profile.General.Availability.From).toEqual('14:10:00');
            expect(result.Player.Profile.General.Availability.To).toEqual('16:10:00');
        });

        fit('Should map birthday', async () => {
            const model = buildProfileFormValue(null!, null!, null!),
                statsModel = { available: 2, used: 1 };
            model.general.birthday = new Date(1992, 11, 4, 0, 0, 0);

            const result = await ProfileEditPageMapper.mapToServer(model, statsModel);

            expect((result.Player.Profile.General.Birthday as Date).toDateString()).toEqual('Fri Dec 04 1992');
        });

        fit('Should map photo', async () => {
            const model = buildProfileFormValue(null!, null!, null!),
                statsModel = { available: 2, used: 1 };
            model.photo = new File([''], 'Avatar.png');

            const result = await ProfileEditPageMapper.mapToServer(model, statsModel);

            expect(result.Player.Profile.General.Photo).toBeDefined();
        });

        fit('Should map enum value (position)', async () => {
            const model = buildProfileFormValue(null!, null!, null!),
                statsModel = { available: 2, used: 1 };
            model.football.position = { key: 0, value: 'Goalkeeper' };

            const result = await ProfileEditPageMapper.mapToServer(model, statsModel);

            expect(result.Player.Profile.Football.Position).toEqual(0);
        });

        fit('Should map pure values', async () => {
            const model = buildProfileFormValue('First name', 'Last name', 'City'),
                statsModel = { available: 2, used: 1 };

            const result = await ProfileEditPageMapper.mapToServer(model, statsModel);

            expect(result.Player.Profile.General.FirstName).toEqual('First name');
            expect(result.Player.Profile.General.LastName).toEqual('Last name');
            expect(result.Player.Profile.General.City).toEqual('City');
        });

        fit('Should map stats', async () => {
            const model = buildProfileFormValue('First name', 'Last name', 'City'),
                statsModel = { available: 2, used: 1 };

            const result = await ProfileEditPageMapper.mapToServer(model, statsModel);

            expect(result.Player.Stats.Values.length).toEqual(29);
            expect(result.Player.Stats.Values[0]).toEqual({ Category: 0, Type: 0, Value: 50 });
        });
    });

    describe('From server', () => {
        fit('Should map photo', async () => {
            const model = getPlayerModel();
            model.Profile.General.Photo = 'data:application/octet-stream;base64,';

            const result = await ProfileEditPageMapper.mapFromServer(model, enumServiceStub as EnumService);

            expect(result.general.photo).toBeDefined();
            expect(result.general.photo?.name).toEqual('avatar.ation/octet-stream');
        });

        fit('Should map available days', async () => {
            const model = getPlayerModel();
            model.Profile.General.Availability.Days = [1, 2];

            const result = await ProfileEditPageMapper.mapFromServer(model, enumServiceStub as EnumService);

            expect(result.general.availability.days)
                .toEqual([{ key: 1, value: 'Monday' }, { key: 2, value: 'Tuesday' }]);
        });

        fit('Should map from and to values', async () => {
            const model = getPlayerModel();
            model.Profile.General.Availability.From = '14:10:00';
            model.Profile.General.Availability.To = '16:10:00';

            const result = await ProfileEditPageMapper.mapFromServer(model, enumServiceStub as EnumService);

            expect(result.general.availability.from?.toTimeString())
                .toContain('14:10:00');
            expect(result.general.availability.to?.toTimeString())
                .toContain('16:10:00');
        });

        fit('Should map enum values', async () => {
            const model = getPlayerModel();
            model.Profile.Football.Position = 0;
            model.Profile.Football.AdditionalPosition = 1;
            model.Profile.Football.WorkingFoot = 0;
            model.Profile.Football.GameStyle = 0;

            const result = await ProfileEditPageMapper.mapFromServer(model, enumServiceStub as EnumService);

            expect(result.football.position).toEqual({ key: 0, value: 'Goalkeeper' });
            expect(result.football.additionalPosition).toEqual({ key: 1, value: 'Defender' });
            expect(result.football.workingFoot).toEqual({ key: 0, value: 'Right' });
            expect(result.football.gameStyle).toEqual({ key: 0, value: 'Defend' });
        });

        fit('Should map pure values', async () => {
            const model = getPlayerModel();

            const result = await ProfileEditPageMapper.mapFromServer(model, enumServiceStub as EnumService);

            expect(result.general.firstName).toEqual('First name');
            expect(result.general.lastName).toEqual('Last name');
            expect(result.general.city).toEqual('City');
        });

        fit('Should map stats', async () => {
            const model = getPlayerModel();

            const result = await ProfileEditPageMapper.mapFromServer(model, enumServiceStub as EnumService);

            expect(result.stats.value['0']).toEqual({ 0: 50, 1: 50 });
            expect(result.stats.value['4']).toEqual({
                20: 50,
                21: 50,
                22: 50,
                23: 50,
                24: 50
            });
            expect(result.stats.value['3']).toEqual({
                14: 50,
                15: 50,
                16: 50,
                17: 50,
                18: 50,
                19: 50
            });
            expect(result.stats.value['2']).toEqual({
                8: 50,
                9: 50,
                10: 50,
                11: 50,
                12: 50,
                13: 50
            });
            expect(result.stats.value['5']).toEqual({
                25: 50,
                26: 50,
                27: 50,
                28: 50
            });
            expect(result.stats.value['1']).toEqual({
                2: 50,
                3: 50,
                4: 50,
                5: 50,
                6: 50,
                7: 50
            });
        });
    });

    function buildProfileFormValue(firstName: string, lastName: string, city: string)
        : IEditPageFormModel {
        return {
            photo: null,
            general: {
                firstName: firstName,
                lastName: lastName,
                biography: null,
                birthday: null,
                city: city,
                tags: null,
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
                position: null,
                additionalPosition: null,
                workingFoot: null,
                number: null,
                gameStyle: null,
                skill: null,
                weakFoot: null,
                physicalCondition: null,
            },
            stats: {
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
            }
        };
    }

    function getPlayerModel(): IGetPlayerModel {
        return {
            Id: 1,
            Profile: {
                General: {
                    Photo: null,
                    FirstName: 'First name',
                    LastName: 'Last name',
                    Biography: null,
                    Birthday: null,
                    City: 'City',
                    Tags: null,
                    FreePlay: false,
                    Availability: {
                        From: null,
                        To: null,
                        Days: null
                    }
                },
                Football: {
                    Height: null,
                    Weight: null,
                    Position: null,
                    AdditionalPosition: null,
                    WorkingFoot: null,
                    Number: null,
                    GameStyle: null,
                    Skill: null,
                    WeakFoot: null,
                    PhysicalCondition: null,
                }
            },
            Stats: {
                Points: {
                    Available: 2,
                    Used: 1
                },
                Values: [
                    { Category: 0, Type: 0, Value: 50 },
                    { Category: 0, Type: 1, Value: 50 },
                    { Category: 1, Type: 3, Value: 50 },
                    { Category: 1, Type: 2, Value: 50 },
                    { Category: 1, Type: 4, Value: 50 },
                    { Category: 1, Type: 5, Value: 50 },
                    { Category: 1, Type: 6, Value: 50 },
                    { Category: 1, Type: 7, Value: 50 },
                    { Category: 2, Type: 8, Value: 50 },
                    { Category: 2, Type: 9, Value: 50 },
                    { Category: 2, Type: 10, Value: 50 },
                    { Category: 2, Type: 11, Value: 50 },
                    { Category: 2, Type: 12, Value: 50 },
                    { Category: 2, Type: 13, Value: 50 },
                    { Category: 3, Type: 14, Value: 50 },
                    { Category: 3, Type: 15, Value: 50 },
                    { Category: 3, Type: 16, Value: 50 },
                    { Category: 3, Type: 17, Value: 50 },
                    { Category: 3, Type: 18, Value: 50 },
                    { Category: 3, Type: 19, Value: 50 },
                    { Category: 4, Type: 20, Value: 50 },
                    { Category: 4, Type: 21, Value: 50 },
                    { Category: 4, Type: 22, Value: 50 },
                    { Category: 4, Type: 23, Value: 50 },
                    { Category: 4, Type: 24, Value: 50 },
                    { Category: 5, Type: 25, Value: 50 },
                    { Category: 5, Type: 26, Value: 50 },
                    { Category: 5, Type: 27, Value: 50 },
                    { Category: 5, Type: 28, Value: 50 }
                ]
            }
        }
    }
});