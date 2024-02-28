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
import { CommonConstants, ComponentSize, NgxSfcCommonModule, Position, UIClass } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ITableColumnExtendedModel, NgxSfcComponentsModule } from "ngx-sfc-components";
import { CommonConstants as ApplicationCommonConstants } from '@core/constants/common.constants';
import { ISearchPageTableModel } from "../../../models/search-page-table.model";
import { BasePlayersTableConstants } from "../base-players.constants";
import { PlayersRowComponent } from "./players-row.component";
import { SearchPageLocalization } from "../../../search.page.localization";
import { SearchPageColumn } from "../../../enums/search-page-column.enum";
import { PlayersRowConstants } from "./players-row.constants";
import { ENUM_SERVICE } from "@test/stubs";

describe('Features.Player.Page:PlayersSearch.Part: PlayersRow', () => {
    let component: PlayersRowComponent;
    let fixture: ComponentFixture<PlayersRowComponent>;
    let routerMock = { navigate: jasmine.createSpy('navigate') };
    let storageServiceStub: Partial<StorageService> = {
        set: () => { },
        get: () => Locale.English as any
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcComponentsModule, ShareModule],
            declarations: [PlayersRowComponent],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: EnumService, useValue: ENUM_SERVICE },
                { provide: StorageService, useValue: storageServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayersRowComponent);
        component = fixture.componentInstance;
        component.model = buildDefaultSearchPageTableModel();
        component.columns = buildTableColumns();
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
        });

        fit('Should have columns', () => {
            expect(component.columns).toEqual(buildTableColumns());
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

    describe('Expanded', () => {
        fit("Should not have class", () => {
            expect(fixture.nativeElement.className).not.toContain(UIClass.Expanded);
        });

        fit("Should have class", () => {
            component.expanded = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.className).toContain(UIClass.Expanded);
        });
    });

    describe('Columns', () => {
        fit('Should all columns have width', () => {
            fixture.nativeElement.querySelectorAll('.column')
                .forEach((columnEl: any) => expect(columnEl.style['width']).toEqual('7%'));
        });

        describe('Photo', () => {
            fit("Should player info panel has defined attributes", () => {
                const playerInfoPanelEl = fixture.debugElement.query(By.css('.column.photo > sfc-player-info-panel')),
                    playerInfoPanelComponent = playerInfoPanelEl.componentInstance;

                expect(playerInfoPanelComponent.radius).toEqual(PlayersRowConstants.AVATAR_RADIUS);
                expect(playerInfoPanelComponent.info).toBeFalse();
                expect(playerInfoPanelComponent.model).toEqual({
                    raiting: 50,
                    photo: ApplicationCommonConstants.DEFAULT_AVATAR_PATH
                });
            });
        });

        describe('Name', () => {
            fit("Should player info panel has defined attributes", () => {
                const playerInfoPanelEl = fixture.debugElement.query(By.css('.column.name > sfc-player-info-panel')),
                    playerInfoPanelComponent = playerInfoPanelEl.componentInstance;

                expect(playerInfoPanelComponent.info).toBeTrue();
                expect(playerInfoPanelComponent.avatar).toBeFalse();
                expect(playerInfoPanelComponent.model).toEqual({
                    firstName: 'First name',
                    lastName: 'Last name',
                    age: null,
                    city: 'Test city',
                    raiting: 50
                });
            });
        });

        describe('Available', () => {
            fit('Should mobile title has defined text', () => {
                expect(fixture.nativeElement.querySelector('.column.available > span.title.mobile').innerText)
                    .toEqual('availability:');
            });

            fit('Should no data component exist', () => {
                expect(fixture.nativeElement.querySelector('.column.available > sfc-no-data'))
                    .toBeTruthy();
            });

            fit('Should no data component does not exist', () => {
                component.model.general.availability.days = [2, 3];
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.column.available > sfc-no-data'))
                    .toBeNull();
            });

            describe('Days', () => {
                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('.column.available > div.days'))
                        .toBeNull();
                });

                fit('Should exist', () => {
                    component.model.general.availability.days = [2, 3];
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.available > div.days'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    component.model.general.availability.days = [2, 3];
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.available > div.days > span.title').innerText)
                        .toEqual('Days:');
                });

                fit('Should tags has appropriate attributes', () => {
                    component.model.general.availability.days = [2, 3];
                    component.ngOnInit();
                    fixture.detectChanges();

                    const tagsEl: DebugElement = fixture.debugElement.query(By.css('.column.available > div.days > sfc-tags'));

                    expect(tagsEl.componentInstance.tags).toEqual([{ label: 'Tuesday' }, { label: 'Wednesday' }]);
                    expect(tagsEl.attributes['ng-reflect-custom-size']).toEqual('0.7');
                });
            });

            describe('Time', () => {
                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('.column.available > div.time'))
                        .toBeNull();
                });

                fit('Should exist when from has value', () => {
                    component.model.general.availability.from = new Date();
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.available > div.time'))
                        .toBeTruthy();
                });

                fit('Should exist when to has value', () => {
                    component.model.general.availability.to = new Date();
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.available > div.time'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    component.model.general.availability.from = new Date();
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.available > div.time > span.title').innerText)
                        .toEqual('Hours:');
                });

                fit('Should have defined content', () => {
                    component.model.general.availability.from = new Date(2024, 2, 20, 16, 25, 0);
                    component.model.general.availability.to = new Date(2024, 2, 20, 18, 25, 0);
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement
                        .querySelector('.column.available > div.time > .icon-content fa-icon svg')
                        .classList)
                        .toContain('fa-clock');
                    expect(fixture.nativeElement.querySelector('.column.available > div.time > .icon-content p').innerText)
                        .toEqual('From 16:25 To 18:25');

                    component.model.general.availability.from = new Date(2024, 2, 20, 16, 25, 0);
                    component.model.general.availability.to = null;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.available > div.time > .icon-content p').innerText)
                        .toEqual('From 16:25');

                    component.model.general.availability.from = null;
                    component.model.general.availability.to = new Date(2024, 2, 20, 18, 25, 0);
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.available > div.time > .icon-content p').innerText)
                        .toEqual('To 18:25');
                });
            });
        });

        describe('Position', () => {
            fit('Should mobile title has defined text', () => {
                expect(fixture.nativeElement.querySelector('.column.position > span.title.mobile').innerText)
                    .toEqual('position:');
            });

            fit('Should no data component exist', () => {
                expect(fixture.nativeElement.querySelector('.column.position > sfc-no-data'))
                    .toBeTruthy();
            });

            fit('Should no data component does not exist', () => {
                component.model.football.position = 2;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.column.position > sfc-no-data'))
                    .toBeNull();
            });

            fit('Should not exist', () => {
                expect(fixture.nativeElement.querySelector('.column.position > .mark.image'))
                    .toBeNull();
            });

            fit('Should exist', () => {
                component.model.football.position = 2;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.column.position > .mark.image'))
                    .toBeTruthy();
            });

            fit('Should have defined image', () => {
                component.model.football.position = 2;
                component.ngOnInit();
                fixture.detectChanges();

                const iconEl = fixture.debugElement.query(By.css('.column.position > .mark.image > sfc-icon'));

                expect(iconEl.query(By.css('img')).nativeElement.src).toContain(ENUM_SERVICE.enums?.footballPositions[2].image);
                expect(iconEl.attributes['ng-reflect-size']).toEqual(ComponentSize.Large);
            });

            fit('Should have defined text', () => {
                component.model.football.position = 2;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.column.position > .mark.image > span').innerText)
                    .toEqual('Midfielder');
            });
        });

        describe('Physical condition', () => {
            fit('Should title has defined text', () => {
                expect(fixture.nativeElement.querySelector('.column.physical-condition > span.title').innerText)
                    .toEqual('Physical condition:');
            });

            fit('Should stars have valid attributes', () => {
                component.model.football.physicalCondition = 2;
                component.ngOnInit();
                fixture.detectChanges();

                const starsEl: DebugElement = fixture.debugElement.query(By.css('.column.physical-condition > sfc-stars'));

                expect(starsEl.componentInstance.value).toEqual(component.model.football.physicalCondition);
                expect(starsEl.attributes['ng-reflect-custom-size']).toEqual('0.6');
            });
        });

        describe('Size', () => {
            fit('Should mobile title has defined text', () => {
                expect(fixture.nativeElement.querySelector('.column.size > span.title.mobile').innerText)
                    .toEqual('size:');
            });

            fit('Should no data component exist', () => {
                expect(fixture.nativeElement.querySelector('.column.size > sfc-no-data'))
                    .toBeTruthy();
            });

            fit('Should no data component does not exist', () => {
                component.model.football.height = 180;
                component.ngOnInit();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.column.size > sfc-no-data'))
                    .toBeNull();
            });

            describe('Height', () => {
                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('.column.size > .size-container > div.height'))
                        .toBeNull();
                });

                fit('Should exist when from has value', () => {
                    component.model.football.height = 180;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.size > .size-container > div.height'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    component.model.football.height = 180;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.size > .size-container > div.height > span.title').innerText)
                        .toEqual('Height:');
                });

                fit('Should have defined content', () => {
                    component.model.football.height = 180;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement
                        .querySelector('.column.size > .size-container > div.height > .icon-content fa-icon svg')
                        .classList)
                        .toContain('fa-ruler-vertical');
                    expect(fixture.nativeElement.querySelector('.column.size > .size-container > div.height > .icon-content p').innerText)
                        .toEqual('180 cm');
                });
            });

            describe('Weight', () => {
                fit('Should not exist', () => {
                    expect(fixture.nativeElement.querySelector('.column.size > .size-container > div.weight'))
                        .toBeNull();
                });

                fit('Should exist when from has value', () => {
                    component.model.football.weight = 80;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.size > .size-container > div.weight'))
                        .toBeTruthy();
                });

                fit('Should title has defined text', () => {
                    component.model.football.weight = 80;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement.querySelector('.column.size > .size-container > div.weight > span.title').innerText)
                        .toEqual('Weight:');
                });

                fit('Should have defined content', () => {
                    component.model.football.weight = 80;
                    component.ngOnInit();
                    fixture.detectChanges();

                    expect(fixture.nativeElement
                        .querySelector('.column.size > .size-container > div.weight > .icon-content fa-icon svg')
                        .classList)
                        .toContain('fa-weight-scale');
                    expect(fixture.nativeElement.querySelector('.column.size > .size-container > div.weight > .icon-content p').innerText)
                        .toEqual('80 kg');
                });
            });
        });

        describe('Actions', () => {
            fit('Should dropdown menu has appropriate attributes', () => {
                const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.column.actions > sfc-dropdown-menu'));

                expect(dropdownMenuEl.componentInstance.bordered).toBeFalse();
                expect(dropdownMenuEl.componentInstance.filled).toBeTrue();
                expect(dropdownMenuEl.componentInstance.items).toEqual(component.ACTION_ITEMS);
                expect(dropdownMenuEl.componentInstance.position).toEqual([Position.Bottom, Position.Center]);
                expect(dropdownMenuEl.attributes['ng-reflect-custom-size']).toEqual('0.9');
            });

            fit('Should navigate to profile page for profile action', () => {
                const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.column.actions > sfc-dropdown-menu')),
                    profilefitem: IDropdownMenuItemModel = dropdownMenuEl.componentInstance.items[2];

                (profilefitem.click as any)();

                expect(routerMock.navigate)
                    .toHaveBeenCalledWith([`${RoutKey.Profiles}/${component.model.id}/${RoutKey.Edit}`]);
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

    function buildTableColumns(): ITableColumnExtendedModel[] {
        return [
            {
                name: SearchPageLocalization.TABLE.COLUMN.RAITING,
                field: SearchPageColumn.Photo,
                calculatedWidth: '7%'
            },
            {
                name: SearchPageLocalization.TABLE.COLUMN.NAME,
                field: SearchPageColumn.Name,
                calculatedWidth: '7%'
            },
            {
                name: SearchPageLocalization.TABLE.COLUMN.AVAILABLE,
                field: SearchPageColumn.Available,
                calculatedWidth: '7%'
            },
            {
                name: SearchPageLocalization.TABLE.COLUMN.POSITION,
                field: SearchPageColumn.Position,
                calculatedWidth: '7%'
            },
            {
                name: SearchPageLocalization.TABLE.COLUMN.PHYSICAL_CONDITION,
                field: SearchPageColumn.PhysicalCondition,
                calculatedWidth: '7%'
            },
            {
                name: SearchPageLocalization.TABLE.COLUMN.SIZE,
                field: SearchPageColumn.Size,
                calculatedWidth: '7%'
            },
            {
                name: CommonConstants.EMPTY_STRING,
                field: SearchPageColumn.Actions,
                calculatedWidth: '7%'
            }
        ];
    }
});