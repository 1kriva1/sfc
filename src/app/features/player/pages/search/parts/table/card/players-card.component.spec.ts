import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { Locale, RoutKey } from "@core/enums";
import { StorageService } from "@core/services";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EnumService } from "@share/services";
import { ShareModule } from "@share/share.module";
import { ComponentSize, NgxSfcCommonModule, Position } from "ngx-sfc-common";
import { IDropdownMenuItemModel, NgxSfcComponentsModule } from "ngx-sfc-components";
import { PlayersCardComponent } from "./players-card.component";
import { CommonConstants as ApplicationCommonConstants } from '@core/constants/common.constants';
import { ISearchPageTableModel } from "../../../models/search-page-table.model";
import { BasePlayersTableConstants } from "../base-players.constants";
import { PlayersCardSide } from "./players-card-side.enum";
import { ENUM_SERVICE } from "@test/stubs";

describe('Features.Player.Page:PlayersSearch.Part: PlayersCard', () => {
    let component: PlayersCardComponent;
    let fixture: ComponentFixture<PlayersCardComponent>;
    let routerMock = { navigate: jasmine.createSpy('navigate') };
    let storageServiceStub: Partial<StorageService> = {
        set: () => { },
        get: () => Locale.English as any
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcComponentsModule, ShareModule],
            declarations: [PlayersCardComponent],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: EnumService, useValue: ENUM_SERVICE },
                { provide: StorageService, useValue: storageServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayersCardComponent);
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
            expect(fixture.nativeElement.querySelector('.front')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .actions > sfc-dropdown-menu')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .column.name')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > sfc-delimeter')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > .position')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > .game-style')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > .working-foot')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.physical-condition')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.skill')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.free-play')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.back')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.back > .actions sfc-dropdown-menu')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.back > .column.raiting')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.back > .column.types')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.back > sfc-delimeter')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.back > .column.stats')).toBeTruthy();
        });
    });

    describe('Position', () => {
        fit("Should not have position class by default", () => {
            ENUM_SERVICE.enums?.footballPositions.forEach(position =>
                expect(fixture.nativeElement.className).not.toContain(`${BasePlayersTableConstants.POSITION_CLASS_PART}${position.key}`)
            );
        });

        fit("Should have position class", () => {
            component.model.football.position = 2;
            component.ngOnInit();
            fixture.detectChanges();

            expect(fixture.nativeElement.className)
                .toContain(`${BasePlayersTableConstants.POSITION_CLASS_PART}${component.model.football.position}`);
        });
    });

    describe('Side', () => {
        fit("Should have default value", () => {
            expect(fixture.nativeElement.className).toContain(PlayersCardSide.Front);
        });

        fit("Should toggle to back", () => {
            fixture.debugElement.nativeElement.click();
            fixture.detectChanges();

            expect(fixture.nativeElement.className).toContain(PlayersCardSide.Back);
        });
    });

    describe('Actions', () => {
        fit('Should dropdown menu has appropriate attributes for front side', () => {
            const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.front > .actions > sfc-dropdown-menu'));

            expect(dropdownMenuEl.componentInstance.bordered).toBeFalse();
            expect(dropdownMenuEl.componentInstance.filled).toBeTrue();
            expect(dropdownMenuEl.componentInstance.items).toEqual(component.ACTION_ITEMS);
            expect(dropdownMenuEl.componentInstance.position).toEqual([Position.Bottom, Position.Center]);
            expect(dropdownMenuEl.attributes['ng-reflect-custom-size']).toEqual('0.9');
        });

        fit('Should dropdown menu has appropriate attributes for back side', () => {
            const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.back > .actions > sfc-dropdown-menu'));

            expect(dropdownMenuEl.componentInstance.bordered).toBeFalse();
            expect(dropdownMenuEl.componentInstance.filled).toBeTrue();
            expect(dropdownMenuEl.componentInstance.items).toEqual(component.ACTION_ITEMS);
            expect(dropdownMenuEl.componentInstance.position).toEqual([Position.Bottom, Position.Center]);
            expect(dropdownMenuEl.attributes['ng-reflect-custom-size']).toEqual('0.9');
        });

        fit('Should navigate to profile page for profile action', () => {
            const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.actions > sfc-dropdown-menu')),
                profilefitem: IDropdownMenuItemModel = dropdownMenuEl.componentInstance.items[2];

            (profilefitem.click as any)();

            expect(routerMock.navigate)
                .toHaveBeenCalledWith([`${RoutKey.Profiles}/${component.model.id}/${RoutKey.Edit}`]);
        });
    });

    describe('Front', () => {
        describe('Name', () => {
            fit("Should player info panel has defined attributes", () => {
                const playerInfoPanelEl = fixture.debugElement.query(By.css('.front > .column.name > sfc-player-info-panel')),
                    playerInfoPanelComponent = playerInfoPanelEl.componentInstance;

                expect(playerInfoPanelComponent.radius).toEqual(45);
                expect(playerInfoPanelComponent.model).toEqual({
                    firstName: 'First name',
                    lastName: 'Last name',
                    age: null,
                    city: 'Test city',
                    raiting: 50,
                    photo: ApplicationCommonConstants.DEFAULT_AVATAR_PATH
                });
            });
        });

        describe('Available', () => {
            describe('Days', () => {
                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.days'))
                        .toBeNull();
                });

                fit('Should exist', () => {
                    component.model.general.availability.days = [2, 3];
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.days'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    component.model.general.availability.days = [2, 3];
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.days > span.title').innerText)
                        .toEqual('Days:');
                });

                fit('Should tags has appropriate attributes', () => {
                    component.model.general.availability.days = [2, 3];
                    component.ngOnInit();
                    fixture.detectChanges();

                    const tagsEl: DebugElement = fixture.debugElement.query(By.css('.front > .scroll-part > .column.available > div.days > sfc-tags'));

                    expect(tagsEl.componentInstance.tags).toEqual([{ label: 'Tuesday' }, { label: 'Wednesday' }]);
                    expect(tagsEl.attributes['ng-reflect-custom-size']).toEqual('0.7');
                });
            });

            describe('Time', () => {
                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.time'))
                        .toBeNull();
                });

                fit('Should exist when from has value', () => {
                    component.model.general.availability.from = new Date();
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.time'))
                        .toBeTruthy();
                });

                fit('Should exist when to has value', () => {
                    component.model.general.availability.to = new Date();
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.time'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    component.model.general.availability.from = new Date();
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.time > span.title').innerText)
                        .toEqual('Hours:');
                });

                fit('Should have defined content', () => {
                    component.model.general.availability.from = new Date(2024, 2, 20, 16, 25, 0);
                    component.model.general.availability.to = new Date(2024, 2, 20, 18, 25, 0);
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement
                        .querySelector('.front > .scroll-part > .column.available > div.time > .icon-content fa-icon svg')
                        .classList)
                        .toContain('fa-clock');
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.time > .icon-content p').innerText)
                        .toEqual('From 16:25 To 18:25');

                    component.model.general.availability.from = new Date(2024, 2, 20, 16, 25, 0);
                    component.model.general.availability.to = null;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.time > .icon-content p').innerText)
                        .toEqual('From 16:25');

                    component.model.general.availability.from = null;
                    component.model.general.availability.to = new Date(2024, 2, 20, 18, 25, 0);
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > div.time > .icon-content p').innerText)
                        .toEqual('To 18:25');
                });
            });

            describe('No data', () => {
                fit('Should not exist', () => {
                    component.model.general.availability.from = new Date();
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > .no-data'))
                        .toBeNull();
                });

                fit('Should exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > .no-data'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > .no-data > span.title').innerText)
                        .toEqual('Availability:');
                });

                fit('Should no data component exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.available > .no-data > sfc-no-data'))
                        .toBeTruthy();
                });
            });
        });

        describe('Position', () => {
            fit('Should not exist', () => {
                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.position > .mark.image'))
                    .toBeNull();
            });

            fit('Should exist', () => {
                component.model.football.position = 2;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.position > .mark.image'))
                    .toBeTruthy();
            });

            fit('Should have defined image', () => {
                component.model.football.position = 2;
                component.ngOnInit();
                fixture.detectChanges();

                const iconEl = fixture.debugElement.query(By.css('.front > .scroll-part > .column.combined > div.position > .mark.image > sfc-icon'));

                expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.footballPositions[2].image);
                expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
            });

            fit('Should have defined text', () => {
                component.model.football.position = 2;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.position > .mark.image > span').innerText)
                    .toEqual('Midfielder');
            });

            describe('No data', () => {
                fit('Should not exist', () => {
                    component.model.football.position = 2;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.position > .no-data'))
                        .toBeNull();
                });

                fit('Should exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.position > .no-data'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.position > .no-data > span.title').innerText)
                        .toEqual('Position:');
                });

                fit('Should no data component exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.position > .no-data > sfc-no-data'))
                        .toBeTruthy();
                });
            });
        });

        describe('Game style', () => {
            fit('Should not exist', () => {
                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.game-style > .mark.image'))
                    .toBeNull();
            });

            fit('Should exist', () => {
                component.model.football.gameStyle = 2;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.game-style > .mark.image'))
                    .toBeTruthy();
            });

            fit('Should have defined image', () => {
                component.model.football.gameStyle = 2;
                component.ngOnInit();
                fixture.detectChanges();

                const iconEl = fixture.debugElement.query(By.css('.front > .scroll-part > .column.combined > div.game-style > .mark.image > sfc-icon'));

                expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.gameStyles[2].image);
                expect(iconEl.attributes['ng-reflect-custom-size']).toEqual('3');
            });

            fit('Should have defined text', () => {
                component.model.football.gameStyle = 2;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.game-style > .mark.image > span').innerText)
                    .toEqual('Aggressive');
            });

            describe('No data', () => {
                fit('Should not exist', () => {
                    component.model.football.gameStyle = 2;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.game-style > .no-data'))
                        .toBeNull();
                });

                fit('Should exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.game-style > .no-data'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.game-style > .no-data > span.title').innerText)
                        .toEqual('Game style:');
                });

                fit('Should no data component exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.game-style > .no-data > sfc-no-data'))
                        .toBeTruthy();
                });
            });
        });

        describe('Working foot', () => {
            fit('Should not exist', () => {
                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.working-foot > .mark.image'))
                    .toBeNull();
            });

            fit('Should exist', () => {
                component.model.football.workingFoot = 2;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.working-foot > .mark.image'))
                    .toBeTruthy();
            });

            fit('Should have defined image', () => {
                component.model.football.workingFoot = 2;
                component.ngOnInit();
                fixture.detectChanges();

                const iconEl = fixture.debugElement.query(By.css('.front > .scroll-part > .column.combined > div.working-foot > .mark.image > sfc-icon'));

                expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.workingFoots[2].image);
                expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
            });

            fit('Should have defined text', () => {
                component.model.football.workingFoot = 2;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.working-foot > .mark.image > span').innerText)
                    .toEqual('Both');
            });

            describe('No data', () => {
                fit('Should not exist', () => {
                    component.model.football.workingFoot = 2;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.working-foot > .no-data'))
                        .toBeNull();
                });

                fit('Should exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.working-foot > .no-data'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.working-foot > .no-data > span.title').innerText)
                        .toEqual('Working foot:');
                });

                fit('Should no data component exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.combined > div.working-foot > .no-data > sfc-no-data'))
                        .toBeTruthy();
                });
            });
        });

        describe('Physical condition', () => {
            fit('Should title has defined text', () => {
                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.physical-condition > span.title').innerText)
                    .toEqual('Physical condition:');
            });

            fit('Should stars have valid attributes', () => {
                component.model.football.physicalCondition = 2;
                component.ngOnInit();
                fixture.detectChanges();

                const starsEl: DebugElement = fixture.debugElement.query(By.css('.front > .scroll-part > .column.physical-condition > sfc-stars'));

                expect(starsEl.componentInstance.value).toEqual(component.model.football.physicalCondition);
                expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.6');
            });
        });

        describe('Size', () => {
            describe('Height', () => {
                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > div.height'))
                        .toBeNull();
                });

                fit('Should exist when from has value', () => {
                    component.model.football.height = 180;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > div.height'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    component.model.football.height = 180;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > div.height > span.title').innerText)
                        .toEqual('Height:');
                });

                fit('Should have defined content', () => {
                    component.model.football.height = 180;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement
                        .querySelector('.front > .scroll-part > .column.size > div.height > .icon-content fa-icon svg')
                        .classList)
                        .toContain('fa-ruler-vertical');
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > div.height > .icon-content p').innerText)
                        .toEqual('180 cm');
                });
            });

            describe('Weight', () => {
                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > div.weight'))
                        .toBeNull();
                });

                fit('Should exist when from has value', () => {
                    component.model.football.weight = 80;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > div.weight'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    component.model.football.weight = 80;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > div.weight > span.title').innerText)
                        .toEqual('Weight:');
                });

                fit('Should have defined content', () => {
                    component.model.football.weight = 80;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement
                        .querySelector('.front > .scroll-part > .column.size > div.weight > .icon-content fa-icon svg')
                        .classList)
                        .toContain('fa-weight-scale');
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > div.weight > .icon-content p').innerText)
                        .toEqual('80 kg');
                });
            });

            describe('No data', () => {
                fit('Should not exist', () => {
                    component.model.football.height = null;
                    component.model.football.weight = 80;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > .no-data'))
                        .toBeNull();

                    component.model.football.height = 180;
                    component.model.football.weight = null;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > .no-data'))
                        .toBeNull();
                });

                fit('Should exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > .no-data'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > .no-data > span.title').innerText)
                        .toEqual('Size:');
                });

                fit('Should no data component exist', () => {
                    expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.size > .no-data > sfc-no-data'))
                        .toBeTruthy();
                });
            });
        });

        describe('Skill', () => {
            fit('Should title has defined text', () => {
                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.skill > span.title').innerText)
                    .toEqual('Skill:');
            });

            fit('Should stars have valid attributes', () => {
                component.model.football.skill = 5;
                component.ngOnInit();
                fixture.detectChanges();

                const starsEl: DebugElement = fixture.debugElement.query(By.css('.front > .scroll-part > .column.skill > sfc-stars'));

                expect(starsEl.componentInstance.value).toEqual(component.model.football.skill);
                expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.6');
            });
        });

        describe('Tags', () => {
            fit('Should not exist', () => {
                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.tags'))
                    .toBeNull();
            });

            fit('Should exist', () => {
                component.model.general.tags = ['tag1', 'tag2'];
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.tags'))
                    .toBeTruthy();
            });

            fit('Should title has defined text', () => {
                component.model.general.tags = ['tag1', 'tag2'];
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.tags > span.title').innerText)
                    .toEqual('Tags:');
            });

            fit('Should tags have valid attributes', () => {
                component.model.general.tags = ['tag1', 'tag2'];
                component.ngOnInit();
                fixture.detectChanges();

                const starsEl: DebugElement = fixture.debugElement.query(By.css('.front > .scroll-part > .column.tags > sfc-tags'));

                expect(starsEl.componentInstance.tags).toEqual([{ label: 'tag1' }, { label: 'tag2' }]);
                expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.6');
            });
        });

        describe('Free play', () => {
            fit('Should title has defined text', () => {
                expect(fixture.nativeElement.querySelector('.front > .scroll-part > .column.free-play > span.title').innerText)
                    .toEqual('Free play:');
            });

            fit('Should have negative icon', () => {
                expect(fixture.nativeElement
                    .querySelector('.front > .scroll-part > .column.free-play > fa-icon svg')
                    .classList)
                    .toContain('fa-circle-xmark');
            });

            fit('Should have positive icon', () => {
                component.model.general.freePlay = true;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement
                    .querySelector('.front > .scroll-part > .column.free-play > fa-icon svg')
                    .classList)
                    .toContain('fa-circle-check');
            });
        });
    });

    describe('Back', () => {
        fit('Should have appropriate attributes for delimeter', () => {
            expect(fixture.debugElement.query(By.css('.back > sfc-delimeter')).componentInstance.label)
                .toEqual('stats');
        });

        describe('Raiting', () => {
            fit('Should title has defined text', () => {
                expect(fixture.nativeElement.querySelector('.back > .column.raiting > span.title').innerText)
                    .toEqual('Total');
            });

            fit('Should progress have valid attributes', () => {
                const progressCircleEl: DebugElement = fixture.debugElement.query(By.css('.back > .column.raiting > sfc-progress-circle'));

                expect(progressCircleEl.componentInstance.progress).toEqual(50);
            });
        });

        describe('Types', () => {
            fit('Should exist only 3 type', () => {
                expect(fixture.nativeElement.querySelectorAll('.back > .column.types > div.type').length)
                    .toEqual(3);
            });

            fit('Should every type has defined title', () => {
                fixture.debugElement.queryAll(By.css('.back > .column.types > div.type > span.title'))
                    .forEach((title, index) => expect(title.nativeElement.innerText).toEqual(ENUM_SERVICE.enums?.statSkills[index].value));
            });

            fit('Should every type has defined progress', () => {
                fixture.debugElement.queryAll(By.css('.back > .column.types > div.type > sfc-progress-semi-circle'))
                    .forEach(progressEl => {
                        expect(progressEl.componentInstance.progress).toEqual(50);
                        expect(progressEl.componentInstance.limits).toBeFalse();
                        expect(progressEl.attributes['ng-reflect-custom-size']).toEqual('0.6');
                    });
            });
        });

        describe('Stats', () => {
            fit('Should exist 6 stat categories', () => {
                expect(fixture.nativeElement.querySelectorAll('.back > .column.stats > div.stat').length)
                    .toEqual(6);
            });

            describe('Header', () => {
                fit('Should every stat category has defined title', () => {
                    fixture.nativeElement.querySelectorAll('.back > .column.stats > div.stat')
                        .forEach((stat: any, index: number) => {
                            expect(stat.querySelector('.header > .title > h3').innerText)
                                .toEqual(ENUM_SERVICE.enums?.statCategories[index].value);

                            const spanEl = stat.querySelector('.header > .title > span');
                            expect(spanEl.innerText).toEqual('50');
                            expect(spanEl.style['color']).toEqual('rgb(255, 206, 84)');
                        });
                });

                fit('Should every stat category has  defined progress', () => {
                    fixture.debugElement.queryAll(By.css('.back > .column.stats > div.stat > div.header > sfc-progress-line'))
                        .forEach(progressEl => {
                            expect(progressEl.componentInstance.progress).toEqual(50);
                            expect(progressEl.componentInstance.hideEnd).toBeTrue();
                            expect(progressEl.attributes['ng-reflect-custom-size']).toEqual('0.7');
                        });
                });
            });

            describe('Content', () => {
                fit('Should exist 29 stats', () => {
                    expect(fixture.nativeElement.querySelectorAll('.back > .column.stats > div.stat > div.stat-content > .line').length)
                        .toEqual(29);
                });

                fit('Should every stat category has defined values', () => {
                    const types = ENUM_SERVICE.enums?.statTypes.map(type => type.value);

                    fixture.nativeElement.querySelectorAll('.back > .column.stats > div.stat > div.stat-content > .line')
                        .forEach((stat: any) => {
                            expect(types?.indexOf(stat.querySelector('span.label')?.innerText)! >= 0).toBeTrue();
                            expect(stat.querySelector('span.stat-value').innerText).toEqual('50');
                        });
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