import { HttpClient, HttpContext, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoaderService } from "ngx-sfc-common";
import { LOADER, LoaderInterceptor } from "./loader.interceptor";

describe('Core.Interceptor:Loader', () => {
    const url = '/test';
    let client: HttpClient;
    let controller: HttpTestingController;
    let loaderServiceStub: Partial<LoaderService> = { show: () => null, hide: () => { } };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                { provide: LoaderService, useValue: loaderServiceStub },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: LoaderInterceptor,
                    multi: true
                }
            ]
        });

        client = TestBed.inject(HttpClient);
        controller = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        controller.verify();
    });

    fit('Should not show loader by default', (done) => {
        spyOn(loaderServiceStub, 'show' as any);

        client.get(url).subscribe(_ => done());

        expect(loaderServiceStub.show).not.toHaveBeenCalled();

        controller.expectOne(url).flush({});
    });

    fit('Should show loader', (done) => {
        spyOn(loaderServiceStub, 'show' as any);

        client.get(url, { context: new HttpContext().set(LOADER, true) }).subscribe(_ => done());

        expect(loaderServiceStub.show).toHaveBeenCalledTimes(1);

        controller.expectOne(url).flush({});
    });

    fit('Should hide loader if show it', (done) => {
        spyOn(loaderServiceStub, 'show' as any);
        spyOn(loaderServiceStub, 'hide' as any);

        client.get(url, { context: new HttpContext().set(LOADER, true) }).subscribe(_ => done());

        expect(loaderServiceStub.show).toHaveBeenCalledTimes(1);        

        controller.expectOne(url).flush({});

        expect(loaderServiceStub.hide).toHaveBeenCalledTimes(1);        
    });
});