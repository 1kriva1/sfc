import { fakeAsync, tick } from "@angular/core/testing";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { RoutKey } from "@core/enums";
import { IResolverModel } from "@core/models";
import { buildPath } from "@core/utils";
import { EnumService } from "@share/services";
import { ENUM_SERVICE } from "@test/stubs";
import { LoaderService } from "ngx-sfc-common";
import { EMPTY, finalize, of, throwError } from "rxjs";
import { IProfileModel } from "../models";
import { IGetPlayerModel } from "../services/player/models";
import { PlayerService } from "../services/player/player.service";
import { ProfileResolver } from "./profile.resolver";

describe('Features.Profile.Resolver:Profile', () => {
    let resolver: ProfileResolver;
    let routerSpy: jasmine.SpyObj<Router>;
    let playerServiceStub: Partial<PlayerService> = {
        get: (_: number) => {
            return of({
                Success: true,
                Errors: null,
                Player: getPlayerModel(),
                Message: 'Success'
            })
        }
    };
    let loaderServiceStub: Partial<LoaderService> = {
        show: (_id?: string, _register?: boolean) => { return null; },
        hide: () => { }
    };

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
        resolver = new ProfileResolver(
            playerServiceStub as PlayerService,
            routerSpy,
            loaderServiceStub as LoaderService,
            ENUM_SERVICE as EnumService
        );
    });

    fit('Should not load player profile', () => {
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '' };

        const result$ = resolver.resolve(snapshot);

        expect(result$).toEqual(EMPTY);
    });

    fit('Should show loader on profile fetch', fakeAsync(() => {
        spyOn(loaderServiceStub, 'show' as any);

        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        tick();

        resolver.resolve(snapshot).subscribe((_: IResolverModel<IProfileModel>) =>
            expect(loaderServiceStub.show).toHaveBeenCalledTimes(1));
    }));

    fit('Should hide loader on profile fetch finalize', fakeAsync(() => {
        spyOn(loaderServiceStub, 'hide' as any);

        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        tick();

        resolver.resolve(snapshot).pipe(
            finalize(() => expect(loaderServiceStub.hide).toHaveBeenCalledTimes(1))
        ).subscribe();
    }));

    fit('Should call player get', fakeAsync(() => {
        spyOn(playerServiceStub, 'get' as any).and.callThrough();

        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        tick();

        resolver.resolve(snapshot).subscribe((_: IResolverModel<IProfileModel>) =>
            expect(playerServiceStub.get).toHaveBeenCalledOnceWith(1));
    }));

    fit('Should return profile model', fakeAsync(() => {
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        tick();

        resolver.resolve(snapshot).subscribe((model: IResolverModel<IProfileModel>) => {
            expect(model.success).toBeTrue();
            expect(model.result).toBeDefined();
            expect(model.result?.general.firstName).toEqual('First name');
        });
    }));

    fit('Should return empty profile on error', fakeAsync(() => {
        (playerServiceStub as any).get = () => throwError(() => new Error('Test error'));
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        tick();

        resolver.resolve(snapshot).subscribe((model: IResolverModel<IProfileModel>) => {
            expect(model.success).toBeFalse();
            expect(model.result).toBeNull();
        });
    }));

    fit('Should return empty profile on failed result', fakeAsync(() => {
        (playerServiceStub as any).get = () => {
            return of({
                Success: false,
                Errors: null,
                Player: null,
                Message: 'Failed'
            })
        }
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        tick();

        resolver.resolve(snapshot).subscribe((model: IResolverModel<IProfileModel>) => {
            expect(model.success).toBeFalse();
            expect(model.result).toBeNull();
        });
    }));

    fit('Should navigate to home page on error', fakeAsync(() => {
        (playerServiceStub as any).get = () => throwError(() => new Error('Test error'));
        const snapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
        snapshot.paramMap.get = () => { return '1' };

        tick();

        resolver.resolve(snapshot).subscribe((_: IResolverModel<IProfileModel>) =>
            expect(routerSpy.navigate).toHaveBeenCalledOnceWith([buildPath(RoutKey.Home)]));
    }));

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
                Values: [{ Type: 0, Value: 50 }]
            }
        }
    }
});