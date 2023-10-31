import { EnumService, IdentityService } from "@share/services";
import { IEnumsModel } from "@share/services/enum/models/enums.model";
import { EMPTY, of } from "rxjs";
import { DataInitializer } from "./data.initializer";

describe('Core.Infitializer:Data', () => {
    let identityServiceStub: Partial<IdentityService> = {};
    let enumServiceStub: Partial<EnumService> = {};
    let infitializer: DataInitializer = new DataInitializer(
        identityServiceStub as IdentityService,
        enumServiceStub as EnumService
    );

    fit('Should return empty observable', () => {
        (identityServiceStub as any).isLoggedIn = false;

        const result = infitializer.init();

        expect(result).toEqual(EMPTY);
    });

    fit('Should return player response', () => {
        const enumsModel: IEnumsModel = {
            footballPositions: [
                { key: 0, value: 'Goalkeeper' },
                { key: 1, value: 'Defender' },
                { key: 2, value: 'Midfielder' },
                { key: 3, value: 'Forward' }
            ],
            gameStyles: [],
            statCategories: [],
            statSkills: [],
            statTypes: [],
            workingFoots: []
        };
        (identityServiceStub as any).isLoggedIn = true;
        (enumServiceStub as any).load = () => of(enumsModel);

        infitializer.init().subscribe(model => {
            expect(model).toBeDefined();
            expect(model.footballPositions).toEqual(enumsModel.footballPositions);
        });
    });
});