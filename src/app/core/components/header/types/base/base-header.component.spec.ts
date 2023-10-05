import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Direction, NgxSfcCommonModule, Theme, UIClass } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { of } from 'rxjs';
import { LogoComponent } from '@share/components/logo/logo.component';
import { IdentityService } from '@share/services/identity/identity.service';
import { HeaderService } from '../../services/header.service';
import { LanguageTogglerComponent } from '../../parts/language-toggler/language-toggler.component';
import { BaseHeaderComponent } from './base-header.component';

describe('Core.Component:BaseHeader', () => {
    let component: BaseHeaderComponent;
    let fixture: ComponentFixture<BaseHeaderComponent>;
    let identityServiceStub: Partial<IdentityService> = {};
    let headerServiceStub: Partial<HeaderService> = { toggle: () => { } };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcComponentsModule],
            declarations: [
                LogoComponent,
                BaseHeaderComponent,
                LanguageTogglerComponent
            ],
            providers: [
                { provide: IdentityService, useValue: identityServiceStub },
                { provide: HeaderService, useValue: headerServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BaseHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit("Should create component", () => {
            expect(component).toBeTruthy();
        });

        fit("Should have main elements", () => {
            expect(fixture.nativeElement.querySelector('header')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.logo')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-logo')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.logo > sfc-hamburger-menu')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('nav')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('nav > ul')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('div.right')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-language-toggler')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
        });

        fit("Should have dark theme class when header is open", () => {
            (headerServiceStub as any).open = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.className).toContain(Theme.Dark);
        });

        fit("Should have open class when header is open", () => {
            (headerServiceStub as any).open = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.className).toContain(UIClass.Open);
        });

        fit('Should sfc-delimeter have appropriate attributes', () => {
            const delimeterEl: DebugElement = fixture.debugElement.query(By.css('sfc-delimeter'));

            expect(delimeterEl.componentInstance.direction).toEqual(Direction.Vertical);
        });
    });

    describe('Logo', () => {
        fit("Should call toggle header", () => {
            spyOn(headerServiceStub as any, 'toggle').and.callThrough();

            const menuEl = fixture.debugElement.query(By.css('sfc-hamburger-menu'));
            menuEl.nativeElement.dispatchEvent(new MouseEvent('click'));
            fixture.detectChanges();

            expect(headerServiceStub.toggle).toHaveBeenCalledTimes(1);
        });

        fit('Should hamburger menu have appropriate attributes', () => {
            (headerServiceStub as any).open$ = of(false);
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('sfc-hamburger-menu')).componentInstance.open).toBeFalse();
        });

        fit('Should hamburger menu have open attribute with true value', () => {
            (headerServiceStub as any).open$ = of(true);
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('sfc-hamburger-menu')).componentInstance.open).toBeTrue();
        });
    });

    describe('Navigation', () => {
        fit('Should not have navigations', () => {
            expect(fixture.nativeElement.querySelectorAll('nav > ul > li').length).toEqual(0);
        });

        fit('Should have defined navigations', () => {
            component.navigations = [
                { label: 'test1', click: () => { } },
                { label: 'test2', click: () => { } }
            ];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('nav > ul > li').length).toEqual(2);
        });

        fit("Should have  defined text", () => {
            component.navigations = [
                { label: 'test0', click: () => { } },
                { label: 'test1', click: () => { } }
            ];
            fixture.detectChanges();

            fixture.nativeElement.querySelectorAll('nav > ul > li')
                .forEach((navigation: any, index: number) => expect(navigation.innerText).toEqual(`TEST${index}`));
        });

        fit("Should navigate to about", () => {
            const clickNavSpy = jasmine.createSpy();

            component.navigations = [
                { label: 'test0', click: clickNavSpy }
            ];
            fixture.detectChanges();

            const navEl = fixture.debugElement.query(By.css('nav > ul > li > a'));
            navEl.nativeElement.dispatchEvent(new MouseEvent('click'));

            expect(clickNavSpy).toHaveBeenCalledTimes(1);
        });

    });
});