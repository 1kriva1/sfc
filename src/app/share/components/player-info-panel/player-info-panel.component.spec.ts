import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentSize, NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { PlayerInfoPanelComponent } from './player-info-panel.component';
import { PlayerInfoPanelConstants } from './player-info-panel.constants';

describe('Share.Component: PlayerInfoPanel', () => {
    let component: PlayerInfoPanelComponent;
    let fixture: ComponentFixture<PlayerInfoPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxSfcCommonModule, NgxSfcComponentsModule],
            declarations: [PlayerInfoPanelComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayerInfoPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit("Should have main elements", () => {
            expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
        });

        fit('Should have default radius', () => {
            expect(component.radius).toEqual(PlayerInfoPanelConstants.DEFAULT_RADIUS);
        });

        fit('Should have default stroke', () => {
            expect(component.stroke).toEqual(PlayerInfoPanelConstants.DEFAULT_STROKE);
        });

        fit('Should have default model', () => {
            expect(component.model).toEqual({ raiting: 0 });
        });
    });

    describe('Avatar', () => {
        fit("Should not exist", () => {
            component.avatar = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('sfc-avatar')).toBeNull();
        });

        fit("Should exist", () => {
            expect(fixture.nativeElement.querySelector('sfc-avatar')).toBeTruthy();
        });

        fit("Should have appropriate attributes", () => {
            const avatarEl = fixture.debugElement.query(By.css('sfc-avatar'));

            expect(avatarEl.componentInstance.data).toEqual(component.avatarModel);
            expect(avatarEl.componentInstance.radius).toEqual(component.radius);
            expect(avatarEl.componentInstance.stroke).toEqual(component.stroke);
            expect(avatarEl.componentInstance.progress).toEqual(component.model.raiting);
            expect(avatarEl.componentInstance.progressModel.filledColor)
                .toEqual(component.avatarProgressModel.filledColor);
            expect(avatarEl.componentInstance.badges).toEqual(component.badges);
        });
    });

    describe('Info', () => {
        fit("Should not exist", () => {
            component.info = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.info')).toBeNull();
        });

        fit("Should exist", () => {
            expect(fixture.nativeElement.querySelector('div.info')).toBeTruthy();
        });

        fit("Should have defined name", () => {
            component.model.firstName = 'First name';
            component.model.lastName = 'Last name';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.info > h3').innerText)
                .toEqual('First name Last name');
        });

        fit("Should have defined position", () => {
            component.model.position = { key: 1, value: 'Defender' };
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.info > p').innerText)
                .toEqual('Defender •');
        });

        fit("Should have defined age", () => {
            component.model.age = 18;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.info > p').innerText)
                .toEqual('18 Years •');
        });

        fit("Should have defined city", () => {
            component.model.city = 'Konotop';
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('div.info > p').innerText)
                .toEqual('Konotop');
        });

        fit('Should stars have valid attributes', () => {
            const starsEl: DebugElement = fixture.debugElement.query(By.css('div.info > sfc-stars'));

            expect(starsEl.componentInstance.value).toEqual(0);
            expect(starsEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Small);
        });
    });
});
