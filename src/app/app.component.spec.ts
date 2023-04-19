import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationStart, convertToParamMap, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DOCUMENT, NgxSfcCommonModule, WINDOW } from 'ngx-sfc-common';
import { INotificationContentModel, NgxSfcComponentsModule } from 'ngx-sfc-components';
import { of, Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent } from './core/components';
import { ILayoutModel } from './core/models';
import { NotificationService } from './core/services/notification/notification.service';
import { ShareModule } from './share/share.module';

describe('Component: Application', () => {
    const routerEventsSubject = new Subject<RouterEvent>(),
        routerStub = {
            events: routerEventsSubject.asObservable()
        };

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let notificationServiceStub: Partial<NotificationService> = { remove: (notification: INotificationContentModel) => { } };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                NgxSfcCommonModule,
                NgxSfcComponentsModule,
                ShareModule,
            ],
            declarations: [
                HeaderComponent,
                FooterComponent,
                AppComponent
            ],
            providers: [
                { provide: WINDOW, useValue: {} },
                { provide: DOCUMENT, useValue: window.document },
                { provide: NotificationService, useValue: notificationServiceStub },
                { provide: Router, useValue: routerStub },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of(convertToParamMap({})),
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-bounce-loader')).toBeTruthy();
        });

        fit("Should call unsubscribe on layout observable, when component destroyed", () => {
            const unsubscribeSpy = spyOn(
                (component as any)._layoutSubscription,
                'unsubscribe'
            ).and.callThrough();

            component?.ngOnDestroy();

            expect(unsubscribeSpy).toHaveBeenCalled();
        });
    });

    describe('Layout', () => {
        fit('Should have default layout model', () => {
            expect(component.layout).toEqual({ header: false, footer: false });
        });

        fit('Should create header', () => {
            expect(fixture.nativeElement.querySelector('sfc-header')).toBeNull();

            component.layout = { header: true, footer: false };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('sfc-header')).toBeTruthy();
        });

        fit('Should create footer', () => {
            expect(fixture.nativeElement.querySelector('sfc-footer')).toBeNull();

            component.layout = { header: false, footer: true };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('sfc-footer')).toBeTruthy();
        });

        fit('Should change layout', () => {
            const newLayout: ILayoutModel = { footer: true, header: true },
                snapshot: ActivatedRouteSnapshot = ({ data: newLayout } as unknown) as ActivatedRouteSnapshot;

            routerEventsSubject.next(new ActivationStart(snapshot) as any);

            expect(component.layout).toEqual(newLayout);
        });
    });

    describe('Notifications', () => {
        fit('Should not exist any notifications', () => {
            expect(fixture.nativeElement.querySelector('div.notifications')).toBeNull();
        });

        fit('Should exist notifications', () => {
            notificationServiceStub.notifications$ = of([
                { id: 'test-id' } as INotificationContentModel
            ]);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.notifications')).toBeTruthy();
        });

        fit('Should valid count of notifications', () => {
            notificationServiceStub.notifications$ = of([
                { id: 'test-id-1' } as INotificationContentModel,
                { id: 'test-id-2' } as INotificationContentModel
            ]);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-notification').length).toEqual(2);
        });

        fit('Should notifications have valid models', () => {
            const notificationsStub = [
                { id: 'test-id-1' } as INotificationContentModel,
                { id: 'test-id-2' } as INotificationContentModel
            ];
            notificationServiceStub.notifications$ = of(notificationsStub);
            fixture.detectChanges();

            fixture.debugElement.queryAll(By.css('sfc-notification')).forEach((el, index) => {
                expect(el.componentInstance.model).toEqual(notificationsStub[index]);
                expect(el.componentInstance.autoCloseModel).toEqual(component.notificationAutoCloseModel);
            });
        });

        fit('Should remove notification ', () => {
            spyOn(notificationServiceStub, 'remove' as any);

            notificationServiceStub.notifications$ = of([
                { id: 'test-id-1' } as INotificationContentModel,
                { id: 'test-id-2' } as INotificationContentModel
            ]);
            fixture.detectChanges();

            fixture.debugElement.queryAll(By.css('sfc-notification'))[1]
                .query(By.css('sfc-close')).nativeElement.dispatchEvent(new MouseEvent('click'));

            expect(notificationServiceStub.remove).toHaveBeenCalledOnceWith({ id: 'test-id-2' });
        });

        fit('Should have default notification model', () => {
            expect(component.notificationAutoCloseModel).toEqual({ enabled: true, interval: 3000 });
        });
    });
});
