import { HttpContext } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { ObservableDataModel, ObservableModel } from '@core/models/observable.model';
import { StorageService } from '@core/services';
import { environment } from '@environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { DataService } from '../data/data.service';
import { IGetDataResponse } from '../data/models/get-data.response';
import { IdentityService } from '../identity/identity.service';
import { EnumService } from './enum.service';
import { IEnumsModel } from './models/enums.model';

describe('Share.Service:Enum', () => {
    let service: EnumService;
    let dataServiceStub: Partial<DataService> = {
        get: () => of()
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: DataService, useValue: dataServiceStub }
            ]
        });

        service = TestBed.inject(EnumService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should return values', (done) => {
        dataServiceStub.get = () => of(buildDataResponse());

        service.load().subscribe((model: IEnumsModel) => {
            expect(model).toEqual(buildEnumsModel());
            done();
        });
    });

    fit('Should store values', (done) => {
        dataServiceStub.get = () => of(buildDataResponse());

        service.load().subscribe((model: IEnumsModel) => {
            expect(service.enums).toEqual(buildEnumsModel());
            expect(service.enums).toEqual(model);
            done();
        });
    });

    function buildDataResponse(): IGetDataResponse {
        return {
            FootballPositions: [{ Id: 0, Title: 'Goalkeeper' }],
            GameStyles: [{ Id: 0, Title: 'Attacking' }],
            StatCategories: [{ Id: 0, Title: 'Pace' }],
            StatSkills: [{ Id: 0, Title: 'Mental' }],
            StatTypes: [{ Id: 0, Title: 'SprintSpeed', Category: 0, Skill: 0 }],
            WorkingFoots: [{ Id: 0, Title: 'Right' }],
            Errors: null,
            Success: true,
            Message: 'Success'
        };
    }

    function buildEnumsModel(): IEnumsModel {
        return {
            footballPositions: [{
                key: 0,
                value: 'Goalkeeper',
                image: `app/core/assets/images/enums/position/0.png`
            }],
            gameStyles: [{
                key: 0,
                value: 'Attacking',
                image: `app/core/assets/images/enums/game-style/0.png`
            }],
            statCategories: [{
                key: 0,
                value: 'Pace'
            }],
            statSkills: [{
                key: 0,
                value: 'Mental'
            }],
            statTypes: [{
                key: 0,
                value: 'SprintSpeed',
                category: 0,
                skill: 0
            }],
            workingFoots: [{
                key: 0,
                value: 'Right',
                image: `app/core/assets/images/enums/foot/0.png`
            }]
        };
    }
});
