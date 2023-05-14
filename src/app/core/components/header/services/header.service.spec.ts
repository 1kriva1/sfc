import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from 'ngx-sfc-common';
import { HeaderService } from './header.service';

describe('Core.Component:Header.Service: Header', () => {
    let service: HeaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: DOCUMENT, useValue: window.document },
            ]
        });
        service = TestBed.inject(HeaderService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('Should height observable be undefined', () => {
        expect(service.height$).toBeUndefined();
    });

    fit('Should open observable be defined', () => {
        expect(service.open$).toBeDefined();
    });

    fit('Should open has default value', () => {
        expect(service.open).toBeFalse();
    });

    fit('Should toggle open value', () => {
        service.toggle();

        expect(service.open).toBeTrue();
    });

    fit('Should set open value', () => {
        service.toggleByValue(true);

        expect(service.open).toBeTrue();

        service.toggleByValue(false);

        expect(service.open).toBeFalse();
    });

    fit('Should emit on toggle', (done) => {
        service.toggle();

        service.open$.subscribe((value: boolean) => {
            expect(value).toBeTrue();
            done();
        });
    });

    fit('Should emit on toggleByValue', (done) => {
        service.toggleByValue(true);

        service.open$.subscribe((value: boolean) => {
            expect(value).toBeTrue();
            done();
        });
    });
});