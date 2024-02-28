import { HttpContext, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpConstants } from '@core/constants';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { environment } from '@environments/environment';
import { SortingDirection } from 'ngx-sfc-common';
import { IGetPlayersFilterModel } from './models/get/filters/get-players-filter.model';
import { IGetPlayersRequest } from './models/get/get-players.request';
import { IGetPlayersResponse } from './models/get/get-players.response';
import { PlayerServiceConstants } from './player.constants';
import { PlayerService } from './player.service';

describe('Features.Player.Service: Player', () => {
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

    describe('By filters', () => {
        fit('Should have valid url', (done) => {
            const request: IGetPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.get(request, false).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byfilters`));

            expect(testRequest.request.url).toEqual(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byfilters`);

            testRequest.flush({});
        });

        fit('Should use GET method', (done) => {
            const request: IGetPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.get(request, false).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byfilters`));

            expect(testRequest.request.method).toEqual('GET');

            testRequest.flush({});
        });

        fit('Should have defined params', (done) => {
            const request: IGetPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.get(request, false).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byfilters`));
            expect(testRequest.request.params.get('Pagination.Page')).toEqual('1');
            expect(testRequest.request.params.get('Pagination.Size')).toEqual('10');
            expect(testRequest.request.params.get('Sorting[0].Name')).toEqual('City');
            expect(testRequest.request.params.get('Sorting[0].Direction')).toEqual(SortingDirection.Descending);
            expect(testRequest.request.params.get('Filter.Profile.Football.Weight.From')).toEqual('30');
            expect(testRequest.request.params.get('Filter.Profile.Football.Weight.To')).toEqual('300');

            testRequest.flush({});
        });

        fit('Should return players', (done) => {
            const request: IGetPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            }, body: IGetPlayersResponse = {
                Items: [
                    { Id: 1, Profile: {} as any, Stats: [] as any },
                    { Id: 2, Profile: {} as any, Stats: [] as any }
                ],
                Errors: null,
                Success: true,
                Message: 'msg'
            };

            service.get(request).subscribe((resultResponse: HttpResponse<IGetPlayersResponse>) => {
                expect(resultResponse.body).toEqual(body);
                expect(resultResponse.body?.Items.length).toEqual(2);
                done();
            });

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byfilters`));

            testRequest.flush(body);
        });

        fit('Should return pagination metadata in headers', (done) => {
            const request: IGetPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            }, headers: HttpHeaders = new HttpHeaders().append(HttpConstants.PAGINATION_HEADER_KEY, JSON.stringify({
                TotalCount: 10,
                HasNextPage: true
            }));

            service.get(request).subscribe((resultResponse: HttpResponse<IGetPlayersResponse>) => {
                expect(JSON.parse(resultResponse.headers.get(HttpConstants.PAGINATION_HEADER_KEY)!)).toEqual({
                    TotalCount: 10,
                    HasNextPage: true
                });
                done();
            });

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byfilters`));

            testRequest.flush({}, { headers });
        });

        fit('Should return players without loader', (done) => {
            const request: IGetPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.get(request, false).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byfilters`));

            expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, false));

            testRequest.flush({});
        });

        fit('Should return players with loader', (done) => {
            const request: IGetPlayersRequest = {
                Pagination: { Page: 1, Size: 10 },
                Sorting: [{ Name: 'City', Direction: SortingDirection.Descending }],
                Filter: getPlayerFilterModel()
            };

            service.get(request, true).subscribe(() => done());

            const testRequest = httpMock.expectOne((req: HttpRequest<any>) =>
                req.url.includes(`${environment.players_url}${PlayerServiceConstants.URI_PART}/byfilters`));

            expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true));

            testRequest.flush({});
        });
    });

    function getPlayerFilterModel(): IGetPlayersFilterModel {
        return {
            Profile: {
                General: ({
                    Availability: {
                        Days: [],
                        From: null!,
                        To: null!,
                    },
                    City: null,
                    Name: null,
                    FreePlay: false,
                    Tags: null,
                    HasPhoto: false,
                    Years: { From: 16, To: 55 }
                }),
                Football: {
                    GameStyles: null,
                    Height: { From: 100, To: 200 },
                    Weight: { From: 30, To: 300 },
                    PhysicalCondition: null,
                    Skill: null,
                    Positions: null,
                    WorkingFoot: null
                }
            },
            Stats: {
                Total: { From: 0, To: 100 },
                Mental: {
                    From: 0,
                    To: 100,
                    Skill: 1
                },
                Physical: {
                    From: 0,
                    To: 100,
                    Skill: 0
                },
                Skill: {
                    From: 0,
                    To: 100,
                    Skill: 2
                },
                Raiting: null
            }
        }
    }
});