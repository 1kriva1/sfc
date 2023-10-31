import { HttpContext } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { ObservableModel } from '@core/models/observable.model';
import { StorageService } from '@core/services';
import { environment } from '@environments/environment';
import { IdentityService } from '../identity/identity.service';
import { IGetPlayerByUserResponse, IPlayerByUserModel } from './models/get-player-by-user.response';
import { PlayerServiceConstants } from './player.constants';
import { PlayerService } from './player.service';

describe('Share.Service:Player', () => {
    let service: PlayerService;
    let storageServiceStub: Partial<StorageService> = {
        set: () => { },
        remove: () => { }
    };
    let identityServiceStub: Partial<IdentityService> = { userId: new ObservableModel<string>('test_id') };
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: IdentityService, useValue: identityServiceStub },
                { provide: StorageService, useValue: storageServiceStub }
            ]
        });

        service = TestBed.inject(PlayerService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should get player', (done) => {
        const response: IGetPlayerByUserResponse = {
            Player: {
                Id: 1,
                Profile: {
                    General: { FirstName: 'First name', LastName: 'Last name', Photo: null },
                    Football: { Position: 1 }
                }
            },
            Errors: null,
            Success: true,
            Message: 'Success'
        };

        service.get().subscribe((response: IGetPlayerByUserResponse) => {
            expect(response).toEqual(response);
            done();
        });

        const testRequest = httpMock.expectOne(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byuser`);

        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));
        expect(testRequest.request.body).toBeNull();

        testRequest.flush(response);
    });

    fit('Should set data on get player', (done) => {
        spyOn(storageServiceStub, 'set' as any);

        const response: IGetPlayerByUserResponse = callGetPlayer(done);

        expect(storageServiceStub.set).toHaveBeenCalledOnceWith(PlayerServiceConstants.PLAYER_ID_KEY, response.Player.Id);
    });

    fit('Should emit player id on get player', (done) => {
        expect(service.playerId.value).toBeNull();

        const response: IGetPlayerByUserResponse = callGetPlayer(done);

        expect(service.playerId.value).toEqual(response.Player.Id);
    });

    fit('Should emit player data on get player', (done) => {
        expect(service.player.value).toBeNull();

        const response: IGetPlayerByUserResponse = callGetPlayer(done);

        expect(service.player.value).toEqual(response.Player.Profile);
    });

    fit('Should emit and set player id and player data on update call', (done) => {
        spyOn(storageServiceStub, 'set' as any);
        const playerId = 100, model: IPlayerByUserModel = {
            Id: playerId,
            Profile: {
                General: { FirstName: 'First name', LastName: 'Last name', Photo: null },
                Football: { Position: 1 }
            }
        };

        expect(service.playerId.value).toBeNull();
        expect(service.player.value).toBeNull();

        service.update(model);

        expect(storageServiceStub.set).toHaveBeenCalledOnceWith(PlayerServiceConstants.PLAYER_ID_KEY, playerId);
        expect(service.playerId.value).toEqual(playerId);
        expect(service.player.value).toEqual(model.Profile);

        done();
    });

    fit('Should player be created', (done) => {
        callGetPlayer(done);

        expect(service.playerCreated).toBeTrue();
    });

    function callGetPlayer(done: any): IGetPlayerByUserResponse {
        const playerId = 100, response: IGetPlayerByUserResponse = {
            Player: {
                Id: playerId,
                Profile: {
                    General: { FirstName: 'First name', LastName: 'Last name', Photo: null },
                    Football: { Position: 1 }
                }
            },
            Errors: null,
            Success: true,
            Message: 'Success'
        };

        service.get().subscribe((_: IGetPlayerByUserResponse) => done());

        const testRequest = httpMock.expectOne(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byuser`);
        testRequest.flush(response);

        return response;
    }
});
