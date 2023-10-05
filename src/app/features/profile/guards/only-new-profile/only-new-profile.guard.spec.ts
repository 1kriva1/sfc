import { Router } from "@angular/router";
import { CanMatchOnlyNewProfile } from "./only-new-profile.guard";
import { PlayerService } from "@share/services";
import { RoutKey } from "@core/enums";

describe('Features.Profile.Guard:CanMatchOnlyNewProfile', () => {
    let guard: CanMatchOnlyNewProfile;
    let routerSpy: jasmine.SpyObj<Router>;
    let playerServiceStub: Partial<PlayerService> = {};

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
        guard = new CanMatchOnlyNewProfile(playerServiceStub as PlayerService, routerSpy);
    });

    fit('Should allow access for not created profile', () => {
        (playerServiceStub as any).playerCreated = false;

        const isAccessGranted = guard.canMatch();

        expect(isAccessGranted).toBeTrue();
    });

    fit('Should not allow access for already created profile', () => {
        (playerServiceStub as any).playerCreated = true;
        (playerServiceStub as any).playerId = { value: 1 };

        const isAccessGranted = guard.canMatch();

        expect(isAccessGranted).toBeFalse();
    });

    fit('Should redirect to already created profile page', () => {
        (playerServiceStub as any).playerCreated = true;
        (playerServiceStub as any).playerId = { value: 1 };

        guard.canMatch();

        expect(routerSpy.navigate).toHaveBeenCalledWith([
            `${RoutKey.Profiles}/${playerServiceStub.playerId!.value}/${RoutKey.Edit}`
        ]);
    });
});