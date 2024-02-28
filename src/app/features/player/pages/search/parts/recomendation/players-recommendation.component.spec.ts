import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ShareModule } from "@share/share.module";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { PlayerRecommendationComponent } from "./parts/player/player-recommendation.component";
import { PlayersRecommendationComponent } from "./players-recommendation.component";

describe('Features.Player.Page:PlayersSearch.Part: PlayersRecommendation', () => {
    let component: PlayersRecommendationComponent;
    let fixture: ComponentFixture<PlayersRecommendationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcComponentsModule, ShareModule],
            declarations: [PlayerRecommendationComponent, PlayersRecommendationComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayersRecommendationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit("Should have main elements", () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
        });

        fit("Should have default items", () => {
            expect(component.items).toEqual([]);
        });
    });

    describe('Player recommendations', () => {
        fit("Should not exist", () => {
            expect(fixture.nativeElement.querySelector('sfc-player-recommendation')).toBeNull();
        });

        fit("Should exist defined count", () => {
            component.items = [
                { raiting: 0 },
                { raiting: 1 },
                { raiting: 2 }
            ];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelectorAll('sfc-player-recommendation').length).toEqual(3);
        });

        fit("Should have defined attributes", () => {
            component.items = [
                { raiting: 0 },
                { raiting: 1 },
                { raiting: 2 }
            ];
            fixture.detectChanges();

            fixture.debugElement.queryAll(By.css('sfc-player-recommendation'))
                .forEach((recommendationEl, index) => expect(recommendationEl.componentInstance.model).toEqual(component.items[index]));
        });
    });

    describe('No data', () => {
        fit("Should exist", () => {
            expect(fixture.nativeElement.querySelector('sfc-no-data')).toBeTruthy();
        });

        fit("Should not exist", () => {
            component.items = [{ raiting: 0 }];
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('sfc-no-data')).toBeNull();
        });
    });
});