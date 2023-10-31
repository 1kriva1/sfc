import { HttpContext } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CACHE } from '@core/interceptors/cache/cache.interceptor';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { environment } from '@environments/environment';
import { DataServiceConstants } from './data.constants';
import { DataService } from './data.service';
import { IGetDataResponse } from './models/get-data.response';

describe('Share.Service:Data', () => {
    let service: DataService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        service = TestBed.inject(DataService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should get data', (done) => {
        const response: IGetDataResponse = {
            FootballPositions: [],
            GameStyles: [],
            StatCategories: [],
            StatSkills: [],
            StatTypes: [],
            WorkingFoots: [],
            Errors: null,
            Success: true,
            Message: 'Success'
        };

        service.get().subscribe((response: IGetDataResponse) => {
            expect(response).toEqual(response);
            done();
        });

        const testRequest = httpMock.expectOne(`${environment.data_url}${DataServiceConstants.URI_PART}`);

        expect(testRequest.request.context).toEqual(new HttpContext().set(LOADER, true).set(CACHE, true));
        expect(testRequest.request.body).toBeNull();

        testRequest.flush(response);
    });
});
