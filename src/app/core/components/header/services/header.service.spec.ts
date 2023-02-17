import { TestBed } from '@angular/core/testing';
import { HeaderService } from './header.service';

describe('Core.Service: Header', () => {
    let service: HeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HeaderService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should height observable be undefined', () => {
        expect(service.height$).toBeUndefined();
    });
});
