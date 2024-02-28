import { HttpContext } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { environment } from '@environments/environment';
import { CommonConstants } from 'ngx-sfc-common';
import {
    ICreatePlayerRequest,
    ICreatePlayerResponse,
    IGetPlayerResponse,
    IPlayerModel,
    IUpdatePlayerRequest,
    IUpdatePlayerResponse
} from './models';
import { PlayerServiceConstants } from './player.constants';
import { PlayerService } from './player.service';

describe('Features.Profile.Service:Player', () => {
    let service: PlayerService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(PlayerService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should create profile', (done) => {
        const request: ICreatePlayerRequest = { Player: getPlayerModel() },
            response: ICreatePlayerResponse = {
                Player: { Id: 1, ...getPlayerModel() },
                Errors: null,
                Success: true,
                Message: 'msg'
            };

        service.create(request).subscribe((resultResponse: ICreatePlayerResponse) => {
            expect(resultResponse).toEqual(response);
            done();
        });

        const testRequest = httpMock.expectOne(`${environment.players_url}${PlayerServiceConstants.URI_PART}`);

        expect(testRequest.request.body).toEqual(request);
        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

        testRequest.flush(response);
    });

    fit('Should update profile', (done) => {
        const request: IUpdatePlayerRequest = { Player: getPlayerModel() };

        service.update(1, request).subscribe((resultResponse: IUpdatePlayerResponse) => {
            expect(resultResponse).toEqual({ Success: true, Errors: null, Message: CommonConstants.EMPTY_STRING });
            done();
        });

        const testRequest = httpMock.expectOne(`${environment.players_url}${PlayerServiceConstants.URI_PART}/1`);

        expect(testRequest.request.body).toEqual(request);
        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

        testRequest.flush(null);
    });

    fit('Should update profile with validation errors', (done) => {
        const request: IUpdatePlayerRequest = { Player: getPlayerModel() },
            response: IUpdatePlayerResponse = {
                Message: "Error",
                Success: false,
                Errors: ['key', ['description']]
            };

        service.update(1, request).subscribe((resultResponse: IUpdatePlayerResponse) => {
            expect(resultResponse).toEqual(response);
            done();
        });

        const testRequest = httpMock.expectOne(`${environment.players_url}${PlayerServiceConstants.URI_PART}/1`);

        expect(testRequest.request.body).toEqual(request);
        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

        testRequest.flush(response);
    });

    fit('Should get profile', (done) => {
        const response: IGetPlayerResponse = {
            Player: { Id: 1, ...getPlayerModel() },
            Errors: null,
            Success: true,
            Message: 'msg'
        };

        service.get(1).subscribe((resultResponse: IGetPlayerResponse) => {
            expect(resultResponse).toEqual(response);
            done();
        });

        const testRequest = httpMock.expectOne(`${environment.players_url}${PlayerServiceConstants.URI_PART}/1`);

        expect(testRequest.request.body).toBeNull();
        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

        testRequest.flush(response);
    });

    function getPlayerModel(): IPlayerModel {
        return {
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
