import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { RoutKey } from "@core/enums";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ShareModule } from "@share/share.module";
import { NgxSfcCommonModule, Position } from "ngx-sfc-common";
import { IDropdownMenuItemModel, NgxSfcComponentsModule } from "ngx-sfc-components";
import { PlayerRecommendationComponent } from "./player-recommendation.component";
import { PlayerRecomendationConstants } from "./player-recommendation.constants";

describe('Features.Player.Page:PlayersSearch.Part: PlayerRecommendation', () => {
    let component: PlayerRecommendationComponent;
    let fixture: ComponentFixture<PlayerRecommendationComponent>;
    let routerMock = { navigate: jasmine.createSpy('navigate') };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcComponentsModule, ShareModule],
            declarations: [PlayerRecommendationComponent],
            providers: [
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayerRecommendationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit("Should have main elements", () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-player-info-panel')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-dropdown-menu')).toBeTruthy();
        });

        fit('Should have default model', () => {
            expect(component.model).toEqual({ raiting: 0 });
        });
    });

    describe('Player info panel', () => {
        fit("Should player info panel has defined attributes", () => {
            const playerInfoPanelEl = fixture.debugElement.query(By.css('sfc-player-info-panel')),
                playerInfoPanelComponent = playerInfoPanelEl.componentInstance;

            expect(playerInfoPanelComponent.radius).toEqual(PlayerRecomendationConstants.AVATAR_RADIUS);
            expect(playerInfoPanelComponent.model).toEqual(component.model);
        });
    });

    describe('Dropdown', () => {
        fit('Should have appropriate attributes', () => {
            const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('sfc-dropdown-menu'));

            expect(dropdownMenuEl.componentInstance.bordered).toBeFalse();
            expect(dropdownMenuEl.componentInstance.filled).toBeTrue();
            expect(dropdownMenuEl.componentInstance.filled).toBeTrue();
            expect(dropdownMenuEl.componentInstance.items).toEqual(component.actionItems);
            expect(dropdownMenuEl.componentInstance.position).toEqual([Position.Center]);
            expect(dropdownMenuEl.attributes['ng-reflect-custom-size']).toEqual('0.9');
        });

        fit('Should navigate to profile page for profile action', () => {
            const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('sfc-dropdown-menu')),
                profilefitem: IDropdownMenuItemModel = dropdownMenuEl.componentInstance.items[2];

            (profilefitem.click as any)();

            expect(routerMock.navigate)
                .toHaveBeenCalledWith([`${RoutKey.Profiles}/${1}/${RoutKey.Edit}`]);
        });
    });
});