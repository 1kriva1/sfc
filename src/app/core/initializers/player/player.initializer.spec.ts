import { EMPTY, of, throwError } from "rxjs";
import { IdentityService } from "@share/services/identity/identity.service";
import { PlayerInitializer } from "./player.initializer";
import { IGetPlayerByUserResponse, PlayerService } from "@share/services";
import { ILogoutResponse } from "@share/services/identity/models";

describe('Core.Infitializer:Player', () => {
    let infitializer: PlayerInitializer;
    let identityServiceStub: Partial<IdentityService> = {
        logout: () => of({} as ILogoutResponse)
    };
    let playerServiceStub: Partial<PlayerService> = {};

    beforeEach(() => {
        infitializer = new PlayerInitializer(
            identityServiceStub as IdentityService,
            playerServiceStub as PlayerService);
    });

    fit('Should return empty observable', () => {
        (identityServiceStub as any).isLoggedIn = false;

        const result = infitializer.init();

        expect(result).toEqual(EMPTY);
    });

    fit('Should return player response', () => {
        (identityServiceStub as any).isLoggedIn = true;
        (playerServiceStub as any).get = () => of({
            Success: true,
            Errors: null,
            Message: 'Success',
            Player: {}
        } as IGetPlayerByUserResponse);

        infitializer.init().subscribe(response => {
            expect(response).toBeDefined();
            expect(response.Success).toBeTrue();
            expect(response.Player).toBeDefined();
        });
    });

    fit('Should logout on error', () => {
        spyOn(identityServiceStub, 'logout' as any).and.returnValue(of({} as ILogoutResponse));
        (identityServiceStub as any).isLoggedIn = true;
        (playerServiceStub as any).get = () => throwError(() => new Error());

        infitializer.init().subscribe(_ => {
            expect(identityServiceStub.logout).toHaveBeenCalled();
        });
    });
});