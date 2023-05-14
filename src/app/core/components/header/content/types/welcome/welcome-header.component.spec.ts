import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonType, NgxSfcCommonModule, WINDOW } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { LogoComponent } from 'src/app/share/components/logo/logo.component';
import { RoutKey } from '../../../../../enums';
import { WelcomeHeaderComponent } from './welcome-header.component';
import { WelcomeHeaderConstants } from './welcome-header.constants';
import { WelcomeHeaderPart } from './welcome-header.enum';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BaseHeaderComponent, HeaderService, LanguageTogglerComponent } from 'src/app/core/components';
import { HttpClientModule } from '@angular/common/http';

describe('Core.Component:WelcomeHeader', () => {
    let component: WelcomeHeaderComponent;
    let fixture: ComponentFixture<WelcomeHeaderComponent>;
    let windowMock: any = <any>{
        location: {}
    };
    let routerMock = { navigate: jasmine.createSpy('navigate') };
    let headerServiceStub: Partial<HeaderService> = { toggleByValue: () => { } };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule, FontAwesomeModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcComponentsModule],
            declarations: [LogoComponent, LanguageTogglerComponent, BaseHeaderComponent,
                WelcomeHeaderComponent],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: WINDOW, useFactory: (() => { return windowMock; }) },
                { provide: HeaderService, useValue: headerServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(WelcomeHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit("Should create component", () => {
            expect(component).toBeTruthy();
        });

        fit("Should have main elements", () => {
            expect(fixture.nativeElement.querySelector('sfc-base-header')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.identity')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('div.identity > sfc-button').length).toEqual(2);
        });

        fit("Should make header not openned", () => {
            spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

            component.ngOnInit();

            expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
        });
    });

    describe('Stick', () => {
        fit("Should not have stick class by default", () => {
            expect(fixture.nativeElement.className).not.toContain(WelcomeHeaderConstants.STICK_CLASS);
        });

        fit("Should have stick class", () => {
            windowMock.scrollY = 100;
            window.dispatchEvent(new Event('scroll'));
            fixture.detectChanges();

            expect(fixture.nativeElement.className).toContain(WelcomeHeaderConstants.STICK_CLASS);
        });
    });

    describe('Navigation', () => {
        fit("Should have text for about", () => {
            expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[0].innerText).toEqual('ABOUT');
        });

        fit("Should navigate to about", () => {
            spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

            const aboutLink = fixture.debugElement.queryAll(By.css('nav > ul > li > a'))[0],
                fragment = WelcomeHeaderPart.About;
            aboutLink.nativeElement.dispatchEvent(new MouseEvent('click'));

            expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Welcome}`], { fragment });
            expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
        });

        fit("Should have text for locations", () => {
            expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[1].innerText).toEqual('LOCATIONS');
        });

        fit("Should navigate to locations", () => {
            spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

            const aboutLink = fixture.debugElement.queryAll(By.css('nav > ul > li > a'))[1],
                fragment = WelcomeHeaderPart.Locations;
            aboutLink.nativeElement.dispatchEvent(new MouseEvent('click'));

            expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Welcome}`], { fragment });
            expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
        });

        fit("Should have text for process", () => {
            expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[2].innerText).toEqual('PROCESS');
        });

        fit("Should navigate to process", () => {
            spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

            const aboutLink = fixture.debugElement.queryAll(By.css('nav > ul > li > a'))[2],
                fragment = WelcomeHeaderPart.Process;
            aboutLink.nativeElement.dispatchEvent(new MouseEvent('click'));

            expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Welcome}`], { fragment });
            expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
        });

        fit("Should have text for contact us", () => {
            expect(fixture.nativeElement.querySelectorAll('nav > ul > li')[3].innerText).toEqual('CONTACT US');
        });

        fit("Should navigate to contact us", () => {
            spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

            const aboutLink = fixture.debugElement.queryAll(By.css('nav > ul > li > a'))[3],
                fragment = WelcomeHeaderPart.Contact;
            aboutLink.nativeElement.dispatchEvent(new MouseEvent('click'));

            expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Welcome}`], { fragment });
            expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
        });
    });

    describe('Identity', () => {
        fit('Should have appropriate attributes for login', () => {
            const loginBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[0];

            expect(loginBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
            expect(loginBtn.attributes['ng-reflect-custom-size']).toEqual('0.7');
            expect(loginBtn.componentInstance.text).toEqual('Sign in');
            expect(loginBtn.componentInstance.iconBefore.iconName).toEqual('arrow-right-to-bracket');
            expect(loginBtn.componentInstance.iconBefore.prefix).toEqual('fas');
        });

        fit("Should navigate to sign in", () => {
            expect(fixture.debugElement.queryAll(By.css('sfc-button'))[0].attributes['routerLink'])
                .toEqual(`${RoutKey.Identity}/${RoutKey.Login}`);
        });

        fit('Should have appropriate attributes for sign up', () => {
            const registrationBtn: DebugElement = fixture.debugElement.queryAll(By.css('sfc-button'))[1];

            expect(registrationBtn.componentInstance.types).toEqual([ButtonType.Rounded]);
            expect(registrationBtn.attributes['ng-reflect-custom-size']).toEqual('0.7');
            expect(registrationBtn.componentInstance.text).toEqual('Sign up');
            expect(registrationBtn.componentInstance.iconBefore.iconName).toEqual('user-plus');
            expect(registrationBtn.componentInstance.iconBefore.prefix).toEqual('fas');
        });

        fit("Should navigate to sign up", () => {
            expect(fixture.debugElement.queryAll(By.css('sfc-button'))[1].attributes['routerLink'])
                .toEqual(`${RoutKey.Identity}/${RoutKey.Registration}`);
        });
    });
});
