import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EnumService } from "@share/services";
import { ShareModule } from "@share/share.module";
import { ENUM_SERVICE } from "@test/stubs";
import { ComponentSize, NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { ISearchPageTableModel } from "../../../models/search-page-table.model";
import { PlayersRowContentComponent } from "./players-row-content.component";

describe('Features.Player.Page:PlayersSearch.Part: PlayersRowContent', () => {
    let component: PlayersRowContentComponent;
    let fixture: ComponentFixture<PlayersRowContentComponent>;
    let storageServiceStub: Partial<StorageService> = {
        set: () => { },
        get: () => Locale.English as any
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcComponentsModule, ShareModule],
            declarations: [PlayersRowContentComponent],
            providers: [
                { provide: EnumService, useValue: ENUM_SERVICE },
                { provide: StorageService, useValue: storageServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayersRowContentComponent);
        component = fixture.componentInstance;
        component.model = buildDefaultSearchPageTableModel();
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
        });
    });

    describe('Tags', () => {
        fit('Should not exist', () => {
            expect(fixture.nativeElement.querySelector('.column.tags'))
                .toBeNull();
        });

        fit('Should exist', () => {
            component.model.general.tags = ['tag1', 'tag2'];
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.column.tags'))
                .toBeTruthy();
        });

        fit('Should title has defined text', () => {
            component.model.general.tags = ['tag1', 'tag2'];
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.column.tags > span.title').innerText)
                .toEqual('Tags:');
        });

        fit('Should tags have valid attributes', () => {
            component.model.general.tags = ['tag1', 'tag2'];
            component.ngOnInit();
            fixture.detectChanges();

            const starsEl: DebugElement = fixture.debugElement.query(By.css('.column.tags > sfc-tags'));

            expect(starsEl.componentInstance.tags).toEqual([{ label: 'tag1' }, { label: 'tag2' }]);
            expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.6');
        });
    });

    describe('Free play', () => {
        fit('Should title has defined text', () => {
            expect(fixture.nativeElement.querySelector('.column.free-play > span.title').innerText)
                .toEqual('Free play:');
        });

        fit('Should have negative icon', () => {
            expect(fixture.nativeElement
                .querySelector('.column.free-play > fa-icon svg')
                .classList)
                .toContain('fa-circle-xmark');
        });

        fit('Should have positive icon', () => {
            component.model.general.freePlay = true;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement
                .querySelector('.column.free-play > fa-icon svg')
                .classList)
                .toContain('fa-circle-check');
        });
    });

    describe('Game style', () => {
        fit('Should not exist', () => {
            expect(fixture.nativeElement.querySelector('.column.game-style > .mark.image'))
                .toBeNull();
        });

        fit('Should exist', () => {
            component.model.football.gameStyle = 2;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.column.game-style > .mark.image'))
                .toBeTruthy();
        });

        fit('Should have defined image', () => {
            component.model.football.gameStyle = 2;
            component.ngOnInit();
            fixture.detectChanges();

            const iconEl = fixture.debugElement.query(By.css('.column.game-style > .mark.image > sfc-icon'));

            expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.gameStyles[2].image);
            expect(iconEl.attributes['ng-reflect-custom-size']).toEqual('3');
        });

        fit('Should have defined text', () => {
            component.model.football.gameStyle = 2;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.column.game-style > .mark.image > span').innerText)
                .toEqual('Aggressive');
        });

        fit('Should no data component exist', () => {
            expect(fixture.nativeElement.querySelector('.column.game-style > sfc-no-data'))
                .toBeTruthy();
        });

        fit('Should no data component does not exist', () => {
            component.model.football.gameStyle = 2;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.column.game-style > sfc-no-data'))
                .toBeNull();
        });
    });

    describe('Working foot', () => {
        fit('Should not exist', () => {
            expect(fixture.nativeElement.querySelector('.column.working-foot > .mark.image'))
                .toBeNull();
        });

        fit('Should exist', () => {
            component.model.football.workingFoot = 2;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.column.working-foot > .mark.image'))
                .toBeTruthy();
        });

        fit('Should have defined image', () => {
            component.model.football.workingFoot = 2;
            component.ngOnInit();
            fixture.detectChanges();

            const iconEl = fixture.debugElement.query(By.css('.column.working-foot > .mark.image > sfc-icon'));

            expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.workingFoots[2].image);
            expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
        });

        fit('Should have defined text', () => {
            component.model.football.workingFoot = 2;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.column.working-foot > .mark.image > span').innerText)
                .toEqual('Both');
        });

        fit('Should no data component exist', () => {
            expect(fixture.nativeElement.querySelector('.column.working-foot > sfc-no-data'))
                .toBeTruthy();
        });

        fit('Should no data component does not exist', () => {
            component.model.football.workingFoot = 2;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.column.working-foot > sfc-no-data'))
                .toBeNull();
        });
    });

    describe('Skill', () => {
        fit('Should title has defined text', () => {
            expect(fixture.nativeElement.querySelector('.column.skill > span.title').innerText)
                .toEqual('Skill:');
        });

        fit('Should stars have valid attributes', () => {
            component.model.football.skill = 5;
            component.ngOnInit();
            fixture.detectChanges();

            const starsEl: DebugElement = fixture.debugElement.query(By.css('.column.skill > sfc-stars'));

            expect(starsEl.componentInstance.value).toEqual(component.model.football.skill);
            expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.6');
        });
    });

    describe('Stats', () => {
        describe('Raiting', () => {
            fit('Should title has defined text', () => {
                expect(fixture.nativeElement.querySelector('.column.stats > .column.raiting > span.title').innerText)
                    .toEqual('Rating');
            });

            fit('Should progress have valid attributes', () => {
                const progressCircleEl: DebugElement = fixture.debugElement.query(By.css('.column.stats > .column.raiting > .content > sfc-progress-circle'));

                expect(progressCircleEl.componentInstance.progress).toEqual(50);
                expect(progressCircleEl.attributes['ng-reflect-custom-size']).toEqual('0.7');
            });
        });

        describe('Types', () => {
            fit('Should exist only 3 type', () => {
                expect(fixture.nativeElement.querySelectorAll('.column.stats > .column.types > div.column').length)
                    .toEqual(3);
            });

            fit('Should every type has defined title', () => {
                fixture.debugElement.queryAll(By.css('.column.stats > .column.types > div.column > span.title'))
                    .forEach((title, index) => expect(title.nativeElement.innerText).toEqual(ENUM_SERVICE.enums?.statSkills[index].value));
            });

            fit('Should every type has defined progress', () => {
                fixture.debugElement.queryAll(By.css('.column.stats > .column.types > div.column > div.content > sfc-progress-semi-circle'))
                    .forEach(progressEl => {
                        expect(progressEl.componentInstance.progress).toEqual(50);
                        expect(progressEl.componentInstance.limits).toBeFalse();
                        expect(progressEl.attributes['ng-reflect-custom-size']).toEqual('0.7');
                    });
            });
        });
    });

    function buildDefaultSearchPageTableModel(): ISearchPageTableModel {
        return {
            general: {
                availability: { days: null, from: null, to: null },
                birthday: null,
                city: 'Test city',
                firstName: 'First name',
                lastName: 'Last name',
                freePlay: false,
                photo: null,
                tags: null
            },
            football: {
                gameStyle: null,
                height: null,
                physicalCondition: null,
                position: null,
                skill: null,
                weight: null,
                workingFoot: null
            },
            stats: {
                0: {
                    0: 50,
                    1: 50
                },
                1: {
                    2: 50,
                    3: 50,
                    4: 50,
                    5: 50,
                    6: 50,
                    7: 50
                },
                2: {
                    8: 50,
                    9: 50,
                    10: 50,
                    11: 50,
                    12: 50,
                    13: 50
                },
                3: {
                    14: 50,
                    15: 50,
                    16: 50,
                    17: 50,
                    18: 50,
                    19: 50
                },
                4: {
                    20: 50,
                    21: 50,
                    22: 50,
                    23: 50,
                    24: 50
                },
                5: {
                    25: 50,
                    26: 50,
                    27: 50,
                    28: 50
                }
            },
            id: 1
        };
    }
});