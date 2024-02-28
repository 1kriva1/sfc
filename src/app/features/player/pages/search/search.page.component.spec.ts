import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderService } from "@core/components";
import { HttpConstants } from "@core/constants";
import { NotificationService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService } from "@share/services";
import { ShareModule } from "@share/share.module";
import { ENUM_SERVICE } from "@test/stubs";
import {
    ButtonType, CommonConstants, MediaLimits, ModalService,
    NgxSfcCommonModule, PaginationConstants, Position, ResizeService, Theme, WINDOW
} from "ngx-sfc-common";
import { NgxSfcComponentsModule } from "ngx-sfc-components";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { of, throwError } from "rxjs";
import { IGetPlayersItemModel } from "../../services/player/models/get/result/get-players-item.model";
import { PlayerService } from "../../services/player/player.service";
import { ISearchPageFormModel } from "./models/search-page-form.model";
import { FootballFilterComponent } from "./parts/filters/football/football-filter.component";
import { FootballFilterConstants } from "./parts/filters/football/football-filter.constants";
import { GeneralFilterComponent } from "./parts/filters/general/general-filter.component";
import { GeneralFilterConstants } from "./parts/filters/general/general-filter.constants";
import { StatsFilterComponent } from "./parts/filters/stats/stats-filter.component";
import { StatsFilterConstants } from "./parts/filters/stats/stats-filter.contants";
import { PlayerRecommendationComponent } from "./parts/recomendation/parts/player/player-recommendation.component";
import { PlayersRecommendationComponent } from "./parts/recomendation/players-recommendation.component";
import { PlayersCardComponent } from "./parts/table/card/players-card.component";
import { PlayersRowContentComponent } from "./parts/table/row-content/players-row-content.component";
import { PlayersRowComponent } from "./parts/table/row/players-row.component";
import { PlayersSearchPageComponent } from "./search.page.component";
import { SearchPageConstants } from "./search.page.constants";
import { SearchPageLocalization } from "./search.page.localization";


describe('Features.Player.Page: PlayersSearch', () => {
    let component: PlayersSearchPageComponent;
    let fixture: ComponentFixture<PlayersSearchPageComponent>;
    let headerServiceStub: Partial<HeaderService> = {};
    let notificationServiceStub: any = { notify: () => { } };
    let themeServiceMock: Partial<ThemeService> = { theme: Theme.Default };
    let windowMock: any = <any>{};
    let resizeServiceStub: Partial<ResizeService> = { onResize$: of(windowMock) };
    let getSpy: jasmine.Spy;
    let playerServiceStub: Partial<PlayerService> = {
        get: () => (of(getPlayersResponse([])))
    }

    beforeEach(async () => {
        getSpy = spyOn(playerServiceStub as any, 'get').and.callThrough();

        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                NoopAnimationsModule,
                FontAwesomeModule,
                NgxSfcCommonModule,
                NgxSfcInputsModule,
                NgxSfcComponentsModule,
                ShareModule
            ],
            declarations: [
                GeneralFilterComponent,
                FootballFilterComponent,
                StatsFilterComponent,
                PlayersRecommendationComponent,
                PlayerRecommendationComponent,
                PlayersCardComponent,
                PlayersRowComponent,
                PlayersRowContentComponent,
                PlayersSearchPageComponent
            ],
            providers: [
                { provide: PlayerService, useValue: playerServiceStub },
                { provide: NotificationService, useValue: notificationServiceStub },
                { provide: HeaderService, useValue: headerServiceStub },
                { provide: EnumService, useValue: ENUM_SERVICE },
                { provide: ThemeService, useValue: themeServiceMock },
                { provide: WINDOW, useFactory: (() => { return windowMock; }) },
                { provide: ResizeService, useValue: resizeServiceStub },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayersSearchPageComponent);
        component = fixture.componentInstance;
        (themeServiceMock as any).theme = Theme.Default;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create page', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content > .title > sfc-title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.additional')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.statistics')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.statistics > sfc-collapse-expand-container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.recommendations')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .filters')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .filters > sfc-title')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.form > form > .filters > sfc-collapse-expand-container').length).toEqual(3);
            expect(fixture.nativeElement.querySelector('.form > form > .filters sfc-general-filter')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .filters sfc-football-filter')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .filters sfc-stats-filter')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .main')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .main > .name')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .main > .name > sfc-title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .main > .name > sfc-text-input')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .main > .name > sfc-delimeter')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .main > .modal')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .main > .modal > sfc-button')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .main > sfc-table')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form > form > .recommendations')).toBeTruthy();
        });

        fit('Should show side menu', () => {
            (headerServiceStub as any).open = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.container > .side')).toBeTruthy();
        });

        fit('Should hide side menu', () => {
            (headerServiceStub as any).open = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.container > .side')).toBeNull();
        });

        fit('Should have constant columns', () => {
            expect(component.columns).toEqual(SearchPageConstants.TABLE_COLUMNS);
        });

        fit('Should have constant pagination', () => {
            expect(component.pagination).toEqual({ page: PaginationConstants.DEFAULT_PAGE, size: SearchPageConstants.TABLE_PAGINATION_SIZE });
        });

        fit('Should show statistics by default', () => {
            expect(component.showStatistic).toBeTrue();
        });

        fit('Should show loading by default', () => {
            expect(component.showLoading).toBeTrue();
        });

        fit('Should not show loading', () => {
            (themeServiceMock as any).theme = Theme.Dark;
            fixture.detectChanges();

            expect(component.showLoading).toBeFalse();
        });

        fit('Should call unsubscribe for resize subscription', () => {
            const unsubscribeSpy = spyOn(
                (component as any)._resizeSubscription,
                'unsubscribe'
            ).and.callThrough();

            component.ngOnDestroy();

            expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('Content', () => {
        fit('Should title have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.query(By.css('.content > .title > sfc-title'));

            expect(titleEl.componentInstance.label).toEqual(SearchPageLocalization.TITLE.LABEL);
            expect(titleEl.componentInstance.description).toEqual(SearchPageLocalization.TITLE.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(SearchPageLocalization.TITLE.TOOLTIP);
        });

        describe('Additional', () => {
            describe('Statistics', () => {
                fit('Should statistic collapse container has appropriate attributes', () => {
                    const expandContainerEl: DebugElement = fixture.debugElement.query(By.css('.statistics > sfc-collapse-expand-container'));

                    expect(expandContainerEl.componentInstance.expand).toBeTrue();
                    expect(expandContainerEl.componentInstance.labelExpand).toEqual(SearchPageLocalization.STATISTIC.LABEL.EXPAND);
                    expect(expandContainerEl.componentInstance.labelCollapse).toEqual(SearchPageLocalization.STATISTIC.LABEL.COLLAPSE);
                });

                fit('Should statistic panels exist with defined length', () => {
                    expect(fixture.nativeElement.querySelectorAll('.statistic-content > sfc-info-panel').length).toEqual(4);
                });

                fit('Should statistic panels have defined model', () => {
                    fixture.debugElement.queryAll(By.css('.statistic-content > sfc-info-panel')).forEach((panel, index) => {
                        expect(panel.componentInstance.model).toEqual(component.statistics[index]);
                    });
                });
            });

            describe('Recommendations', () => {
                describe('Searching', () => {
                    fit('Should exist', () => {
                        expect(fixture.nativeElement.querySelector('.recommendation.searching')).toBeTruthy();
                    });

                    fit('Should not exist', () => {
                        component.recommendationsVisability.search = false;
                        fixture.detectChanges();

                        expect(fixture.nativeElement.querySelector('.recommendation.searching')).toBeNull();
                    });

                    fit('Should close component exist', () => {
                        expect(fixture.nativeElement.querySelector('.recommendation.searching > sfc-close')).toBeTruthy();
                    });

                    fit('Should hide when click on close', () => {
                        expect(fixture.nativeElement.querySelector('.recommendation.searching')).toBeTruthy();

                        fixture.nativeElement.querySelector('.recommendation.searching > sfc-close')
                            .dispatchEvent(new MouseEvent('click', {}));
                        fixture.detectChanges();

                        expect(fixture.nativeElement.querySelector('.recommendation.searching')).toBeNull();
                    });

                    fit('Should have title with appropriate attributes', () => {
                        const titleEl: DebugElement = fixture.debugElement.query(By.css('.recommendation.searching > sfc-title'));

                        expect(titleEl.componentInstance.label).toEqual(SearchPageLocalization.RECOMMENDATION.SEARCHING.TITLE.LABEL);
                        expect(titleEl.componentInstance.description).toEqual(SearchPageLocalization.RECOMMENDATION.SEARCHING.TITLE.DESCRIPTION);
                        expect(titleEl.componentInstance.tooltip).toEqual(SearchPageLocalization.RECOMMENDATION.SEARCHING.TITLE.TOOLTIP);
                    });

                    fit('Should have recommendations', () => {
                        component.searchRecommendations = [
                            { raiting: 50, },
                            { raiting: 51, },
                            { raiting: 52, },
                            { raiting: 53, }
                        ];
                        fixture.detectChanges();

                        expect(fixture.nativeElement.querySelector('.recommendation.searching >sfc-players-recommendation')).toBeTruthy()
                    });

                    fit('Should recommendations have defined items', () => {
                        component.searchRecommendations = [
                            { raiting: 50, }
                        ];
                        fixture.detectChanges();

                        expect(fixture.debugElement.query(By.css('.recommendation.searching >sfc-players-recommendation')).componentInstance.items)
                            .toEqual(component.searchRecommendations);
                    });
                });

                describe('Location', () => {
                    fit('Should exist', () => {
                        expect(fixture.nativeElement.querySelector('.recommendation.location')).toBeTruthy();
                    });

                    fit('Should not exist', () => {
                        component.recommendationsVisability.location = false;
                        fixture.detectChanges();

                        expect(fixture.nativeElement.querySelector('.recommendation.location')).toBeNull();
                    });

                    fit('Should close component exist', () => {
                        expect(fixture.nativeElement.querySelector('.recommendation.location > sfc-close')).toBeTruthy();
                    });

                    fit('Should hide when click on close', () => {
                        expect(fixture.nativeElement.querySelector('.recommendation.location')).toBeTruthy();

                        fixture.nativeElement.querySelector('.recommendation.location > sfc-close')
                            .dispatchEvent(new MouseEvent('click', {}));
                        fixture.detectChanges();

                        expect(fixture.nativeElement.querySelector('.recommendation.location')).toBeNull();
                    });

                    fit('Should have title with appropriate attributes', () => {
                        const titleEl: DebugElement = fixture.debugElement.query(By.css('.recommendation.location > sfc-title'));

                        expect(titleEl.componentInstance.label).toEqual(SearchPageLocalization.RECOMMENDATION.LOCATION.TITLE.LABEL);
                        expect(titleEl.componentInstance.description).toEqual(SearchPageLocalization.RECOMMENDATION.LOCATION.TITLE.DESCRIPTION);
                        expect(titleEl.componentInstance.tooltip).toEqual(SearchPageLocalization.RECOMMENDATION.LOCATION.TITLE.TOOLTIP);
                    });

                    fit('Should have recommendations', () => {
                        component.locationRecommendations = [
                            { raiting: 50, },
                            { raiting: 51, },
                            { raiting: 52, },
                            { raiting: 53, }
                        ];
                        fixture.detectChanges();

                        expect(fixture.nativeElement.querySelector('.recommendation.location > sfc-players-recommendation')).toBeTruthy()
                    });

                    fit('Should recommendations have defined items', () => {
                        component.locationRecommendations = [
                            { raiting: 50, }
                        ];
                        fixture.detectChanges();

                        expect(fixture.debugElement.query(By.css('.recommendation.location > sfc-players-recommendation')).componentInstance.items)
                            .toEqual(component.locationRecommendations);
                    });
                });
            });
        });
    });

    describe('Form', () => {
        fit('Should have valid inputs count', () => {
            const formEl = fixture.nativeElement.querySelector('form'),
                inputs = formEl.querySelectorAll('input');

            expect(inputs.length).toEqual(45);
        });

        fit('Should have initial value', () => {
            expect(component.searchForm.value).toEqual(buildSearchFormValue());
        });

        fit('Should have valid autocomplete attribute', () => {
            expect(fixture.nativeElement.querySelector('form').attributes['autocomplete'].nodeValue).toEqual('off');
        });

        fit('Should be invalid', () => {
            component.searchForm.setValue(buildSearchFormValue(new Array(GeneralFilterConstants.MAX_CITY_LENGTH + 2).join('c')));
            fixture.detectChanges();

            expect(component.searchForm.valid).toBeFalse();
        });

        fit('Should be valid', () => {
            expect(component.searchForm.valid).toBeTrue();
        });

        describe('Name input', () => {
            fit('Should have appropriate attributes', () => {
                const nameInput: DebugElement = fixture.debugElement.query(By.css('form > .main > .name > sfc-text-input#name'));

                expect(nameInput.componentInstance.placeholder).toEqual(SearchPageLocalization.INPUT.NAME.PLACEHOLDER);
                expect(nameInput.componentInstance.showPlaceholderOnFocus).toBeTrue();
                expect(nameInput.componentInstance.label).toEqual(CommonConstants.EMPTY_STRING);
                expect(nameInput.componentInstance.bordered).toBeFalse();
                expect(nameInput.attributes['ng-reflect-custom-size']).toEqual('4');
                expect(nameInput.attributes['ng-reflect-focus']).toEqual('true');
            });

            fit('Should have title with appropriate attributes', () => {
                const titleEl: DebugElement = fixture.debugElement.query(By.css('form > .main > .name > sfc-title'));

                expect(titleEl.componentInstance.label).toEqual(SearchPageLocalization.INPUT.NAME.TITLE.LABEL);
                expect(titleEl.componentInstance.description).toEqual(SearchPageLocalization.INPUT.NAME.TITLE.DESCRIPTION);
                expect(titleEl.componentInstance.delimeter).toBeFalse();
                expect(titleEl.attributes['ng-reflect-custom-size']).toEqual('1.3');
            });

            fit('Should have delimeter', () => {
                expect(fixture.nativeElement.querySelector('form > .main > .name > sfc-delimeter')).toBeTruthy();
            });
        });
    });

    describe('Filters', () => {
        fit('Should exist three collapse containers', () => {
            expect(fixture.nativeElement.querySelectorAll('form > .filters > sfc-collapse-expand-container').length)
                .toEqual(3);
        });

        fit('Should have title with appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.query(By.css('form > .filters > sfc-title'));

            expect(titleEl.componentInstance.label).toEqual(SearchPageLocalization.FILTER.TITLE.LABEL);
            expect(titleEl.componentInstance.description).toEqual(SearchPageLocalization.FILTER.TITLE.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(SearchPageLocalization.FILTER.TITLE.TOOLTIP);
            expect(titleEl.componentInstance.delimeter).toBeFalse();
        });

        describe('General', () => {
            fit('Should collapse container has appropriate attributes', () => {
                const expandContainerEl: DebugElement = fixture.debugElement.queryAll(By.css('form > .filters > sfc-collapse-expand-container'))[0];

                expect(expandContainerEl.componentInstance.expand).toBeTrue();
                expect(expandContainerEl.componentInstance.labelExpand).toEqual(SearchPageLocalization.FILTER.GENERAL.LABEL);
                expect(expandContainerEl.componentInstance.labelCollapse).toEqual(SearchPageLocalization.FILTER.GENERAL.LABEL);
                expect(expandContainerEl.componentInstance.delimeter).toBeTrue();
            });

            fit('Should exist filter component', () => {
                expect(fixture.debugElement.queryAll(By.css('form > .filters > sfc-collapse-expand-container'))[0]
                    .query(By.css('sfc-general-filter')))
                    .toBeTruthy();
            });
        });

        describe('Football', () => {
            fit('Should collapse container has appropriate attributes', () => {
                const expandContainerEl: DebugElement = fixture.debugElement.queryAll(By.css('form > .filters > sfc-collapse-expand-container'))[1];

                expect(expandContainerEl.componentInstance.expand).toBeFalse();
                expect(expandContainerEl.componentInstance.labelExpand).toEqual(SearchPageLocalization.FILTER.FOOTBALL.LABEL);
                expect(expandContainerEl.componentInstance.labelCollapse).toEqual(SearchPageLocalization.FILTER.FOOTBALL.LABEL);
                expect(expandContainerEl.componentInstance.delimeter).toBeTrue();
            });

            fit('Should exist filter component', () => {
                expect(fixture.debugElement.queryAll(By.css('form > .filters > sfc-collapse-expand-container'))[1]
                    .query(By.css('sfc-football-filter')))
                    .toBeTruthy();
            });
        });

        describe('Stats', () => {
            fit('Should collapse container has appropriate attributes', () => {
                const expandContainerEl: DebugElement = fixture.debugElement.queryAll(By.css('form > .filters > sfc-collapse-expand-container'))[2];

                expect(expandContainerEl.componentInstance.expand).toBeFalse();
                expect(expandContainerEl.componentInstance.labelExpand).toEqual(SearchPageLocalization.FILTER.STATS.LABEL);
                expect(expandContainerEl.componentInstance.labelCollapse).toEqual(SearchPageLocalization.FILTER.STATS.LABEL);
                expect(expandContainerEl.componentInstance.delimeter).toBeFalse();
            });

            fit('Should exist filter component', () => {
                expect(fixture.debugElement.queryAll(By.css('form > .filters > sfc-collapse-expand-container'))[2]
                    .query(By.css('sfc-stats-filter')))
                    .toBeTruthy();
            });
        });
    });

    describe('Modal', () => {
        fit('Should have appropriate attributes for modal button', () => {
            const modalBtn: DebugElement = fixture.debugElement.query(By.css('form > .main > .modal > sfc-button'));

            expect(modalBtn.componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
            expect(modalBtn.componentInstance.text).toEqual(SearchPageLocalization.FILTER.MODAL.BUTTON.TEXT);
            expect(modalBtn.attributes['ng-reflect-custom-size']).toEqual('0.9');
        });

        fit('Should show modal on modal button click', () => {
            expect(fixture.nativeElement.querySelector('form > .main > .modal > sfc-modal')).toBeNull();

            openFiltersModal();

            expect(fixture.nativeElement.querySelector('form > .main > .modal > sfc-modal')).toBeTruthy();
        });

        fit('Should have appropriate attributes', () => {
            openFiltersModal();

            const modalEl: DebugElement = fixture.debugElement.query(By.css('form > .main > .modal > sfc-modal'));

            expect(modalEl.componentInstance.hideOnClickOutside).toBeTrue();
            expect(modalEl.componentInstance.hideOnEsc).toBeFalse();
            expect(modalEl.componentInstance.defaultHeaderModel).toEqual(component.filtersModalHeaderModel);
            expect(modalEl.componentInstance.defaultFooterModel.applyButton).toBeTrue();
            expect(modalEl.componentInstance.defaultFooterModel.cancelButton).toBeTrue();
            expect(modalEl.componentInstance.defaultFooterModel.applyButtonText).toEqual(SearchPageLocalization.BUTTON_SEARCH_LABEL);
            expect(modalEl.componentInstance.defaultFooterModel.cancelButtonText).toEqual(SearchPageLocalization.BUTTON_CANCEL_LABEL);
        });

        describe('Ok event', () => {
            fit('Should toggle modal', () => {
                const modalService = TestBed.inject(ModalService);

                openFiltersModal();

                spyOn(modalService, 'toggle').and.callThrough();

                startSearchingByModal();

                expect(modalService.toggle).toHaveBeenCalledTimes(1);
            });

            fit('Should set form value', () => {
                openFiltersModal();

                spyOn(component.searchForm, 'setValue').and.callThrough();

                startSearchingByModal();

                expect(component.searchForm.setValue).toHaveBeenCalledOnceWith(component.searchForm.value, { emitEvent: false });
            });

            fit('Should emit changes', () => {
                openFiltersModal();

                (component as any).modalSearch$.subscribe((value: any) => expect(value).toEqual(component.searchForm.value));

                changeCityInputFilter();

                startSearchingByModal();
            });

            fit('Should not emit changes', () => {
                openFiltersModal();

                let dataEmitted = false;
                (component as any).modalSearch$.subscribe((value: any) => dataEmitted = true);

                startSearchingByModal();

                expect(dataEmitted).toBeFalse();
            });
        });

        describe('Cancel event', () => {
            fit('Should close modal', () => {
                const modalService = TestBed.inject(ModalService);

                openFiltersModal();

                spyOn(modalService, 'close').and.callThrough();

                fixture.debugElement.queryAll(By.css('form > .main > .modal > sfc-modal sfc-default-modal-footer sfc-button'))[1]
                    .nativeElement.click();
                fixture.detectChanges();

                expect(modalService.close).toHaveBeenCalledTimes(1);
            });

            fit('Should set form value', () => {
                openFiltersModal();

                spyOn(component.searchForm, 'setValue').and.callThrough();

                changeCityInputFilter();

                fixture.debugElement.queryAll(By.css('form > .main > .modal > sfc-modal sfc-default-modal-footer sfc-button'))[1]
                    .nativeElement.click();
                fixture.detectChanges();

                expect(component.searchForm.setValue).toHaveBeenCalledOnceWith((component as any).previousFormValue, { emitEvent: false });
            });

            fit('Should not set form value', () => {
                openFiltersModal();

                spyOn(component.searchForm, 'setValue').and.callThrough();

                fixture.debugElement.queryAll(By.css('form > .main > .modal > sfc-modal sfc-default-modal-footer sfc-button'))[1]
                    .nativeElement.click();
                fixture.detectChanges();

                expect(component.searchForm.setValue).not.toHaveBeenCalled();
            });
        });

        describe('Resize event', () => {
            fit('Should close modal', () => {
                const modalService = TestBed.inject(ModalService);

                openFiltersModal();

                spyOn(modalService, 'close').and.callThrough();

                resizeWindow(MediaLimits.Laptop + 1);

                expect(modalService.close).toHaveBeenCalledTimes(1);
            });

            fit('Should set form value', () => {
                openFiltersModal();

                const modalService = TestBed.inject(ModalService);

                changeNameInputFilter();

                spyOn(modalService, 'close').and.callThrough();
                spyOn(component.searchForm, 'setValue').and.callThrough();

                resizeWindow(MediaLimits.Laptop + 1);

                expect(component.searchForm.setValue).toHaveBeenCalledOnceWith((component as any).previousFormValue, { emitEvent: false });
            });

            fit('Should not close modal and set form value, when modal not openned', () => {
                const modalService = TestBed.inject(ModalService);

                changeNameInputFilter();

                spyOn(modalService, 'close').and.callThrough();
                spyOn(component.searchForm, 'setValue').and.callThrough();

                resizeWindow(MediaLimits.Laptop + 1);

                expect(component.searchForm.setValue).not.toHaveBeenCalled();
                expect(modalService.close).not.toHaveBeenCalled();
            });

            fit('Should not close modal and set form value, window width not more Laptop size', () => {
                const modalService = TestBed.inject(ModalService);

                openFiltersModal();

                changeCityInputFilter();

                spyOn(modalService, 'close').and.callThrough();
                spyOn(component.searchForm, 'setValue').and.callThrough();

                resizeWindow(MediaLimits.Mobile);

                expect(component.searchForm.setValue).not.toHaveBeenCalled();
                expect(modalService.close).not.toHaveBeenCalled();
            });
        });

        describe('Filters', () => {
            fit('Should exist three collapse containers for filters', () => {
                openFiltersModal();

                expect(fixture.nativeElement.querySelectorAll('form > .main > .modal > sfc-modal .modal-filters sfc-collapse-expand-container').length)
                    .toEqual(3);
            });

            describe('General', () => {
                fit('Should collapse container has appropriate attributes', () => {
                    openFiltersModal();

                    const expandContainerEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('form > .main > .modal > sfc-modal .modal-filters sfc-collapse-expand-container')
                    )[0];

                    expect(expandContainerEl.componentInstance.expand).toBeTrue();
                    expect(expandContainerEl.componentInstance.labelExpand).toEqual(SearchPageLocalization.FILTER.GENERAL.LABEL);
                    expect(expandContainerEl.componentInstance.labelCollapse).toEqual(SearchPageLocalization.FILTER.GENERAL.LABEL);
                    expect(expandContainerEl.componentInstance.delimeter).toBeTrue();
                });

                fit('Should exist filter component', () => {
                    openFiltersModal();

                    expect(fixture.debugElement.queryAll(
                        By.css('form > .main > .modal > sfc-modal .modal-filters sfc-collapse-expand-container')
                    )[0].query(By.css('sfc-general-filter')))
                        .toBeTruthy();
                });
            });

            describe('Football', () => {
                fit('Should collapse container has appropriate attributes', () => {
                    openFiltersModal();
                    const expandContainerEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('form > .main > .modal > sfc-modal .modal-filters sfc-collapse-expand-container')
                    )[1];

                    expect(expandContainerEl.componentInstance.expand).toBeFalse();
                    expect(expandContainerEl.componentInstance.labelExpand).toEqual(SearchPageLocalization.FILTER.FOOTBALL.LABEL);
                    expect(expandContainerEl.componentInstance.labelCollapse).toEqual(SearchPageLocalization.FILTER.FOOTBALL.LABEL);
                    expect(expandContainerEl.componentInstance.delimeter).toBeTrue();
                });

                fit('Should exist filter component', () => {
                    openFiltersModal();

                    expect(fixture.debugElement.queryAll(
                        By.css('form > .main > .modal > sfc-modal .modal-filters sfc-collapse-expand-container')
                    )[1].query(By.css('sfc-football-filter')))
                        .toBeTruthy();
                });
            });

            describe('Stats', () => {
                fit('Should collapse container has appropriate attributes', () => {
                    openFiltersModal();

                    const expandContainerEl: DebugElement = fixture.debugElement.queryAll(
                        By.css('form > .main > .modal > sfc-modal .modal-filters sfc-collapse-expand-container')
                    )[2];

                    expect(expandContainerEl.componentInstance.expand).toBeFalse();
                    expect(expandContainerEl.componentInstance.labelExpand).toEqual(SearchPageLocalization.FILTER.STATS.LABEL);
                    expect(expandContainerEl.componentInstance.labelCollapse).toEqual(SearchPageLocalization.FILTER.STATS.LABEL);
                    expect(expandContainerEl.componentInstance.delimeter).toBeFalse();
                });

                fit('Should exist filter component', () => {
                    openFiltersModal();

                    expect(fixture.debugElement.queryAll(
                        By.css('form > .main > .modal > sfc-modal .modal-filters sfc-collapse-expand-container')
                    )[2].query(By.css('sfc-stats-filter')))
                        .toBeTruthy();
                });
            });
        });
    });

    describe('Table', () => {
        fit('Should have appropriate attributes', () => {
            const tableEl: DebugElement = fixture.debugElement.query(By.css('form > .main > sfc-table'));

            expect(tableEl.componentInstance.columns).toEqual(SearchPageConstants.TABLE_COLUMNS);
            expect(tableEl.componentInstance.predicate$).toEqual(component.predicate$);
            expect(tableEl.componentInstance.loader).toBeTruthy();
            expect(tableEl.componentInstance.pagination).toEqual(component.pagination);
            expect(tableEl.componentInstance.position).toEqual(Position.Center);
            expect(tableEl.componentInstance.showColumns).toBeTrue();
            expect(tableEl.componentInstance.columnsToggle).toBeTrue();
            expect(tableEl.componentInstance.showTotal).toBeTrue();
            expect(tableEl.componentInstance.showLoading).toBeTrue();
            expect(tableEl.componentInstance.paginationCount).toEqual(SearchPageConstants.TABLE_PAGINATION_COUNT);
            expect(tableEl.componentInstance.paginationLimits).toBeTrue();
            expect(tableEl.componentInstance.showColumnsLabel).toEqual(SearchPageLocalization.TABLE.COLUMNS_SHOW_LABEL);
            expect(tableEl.componentInstance.hideColumnsLabel).toEqual(SearchPageLocalization.TABLE.COLUMNS_HIDE_LABEL);
            expect(tableEl.componentInstance.totalLabel).toEqual(SearchPageLocalization.TABLE.TOTAL_LABEL);
            expect(tableEl.componentInstance.dataListLabel).toEqual(SearchPageLocalization.TABLE.DATA_LIST_LABEL);
            expect(tableEl.componentInstance.dataCardsLabel).toEqual(SearchPageLocalization.TABLE.DATA_CARDS_LABEL);
            expect(tableEl.componentInstance.notFoundLabel).toEqual(SearchPageLocalization.TABLE.NOT_FOUND_LABEL);
        });

        describe('Expanded', () => {
            fit('Should have expanded rows', fakeAsync(() => {
                getSpy.and.returnValue(of(getPlayersResponse([
                    buildPlayersItemModel(),
                    buildPlayersItemModel()
                ])));

                changeNameInputFilter();

                tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
                fixture.detectChanges();

                expect(fixture.debugElement.queryAll(By.css('form > .main > sfc-table sfc-expanded-table-row')).length).toEqual(2);
            }));

            fit('Should expanded rows have defined attributes', fakeAsync(() => {
                getSpy.and.returnValue(of(getPlayersResponse([
                    buildPlayersItemModel(),
                    buildPlayersItemModel()
                ])));

                changeNameInputFilter();

                tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
                fixture.detectChanges();

                fixture.debugElement.queryAll(By.css('form > .main > sfc-table sfc-expanded-table-row'))
                    .forEach(row => {
                        expect(row.componentInstance.columns.length).toEqual(component.columns.length);
                        expect(row.componentInstance.model).toBeTruthy();
                        expect(row.componentInstance.position).toEqual(Position.Center);
                    });
            }));
        });

        describe('Rows', () => {
            fit('Should have rows', fakeAsync(() => {
                getSpy.and.returnValue(of(getPlayersResponse([
                    buildPlayersItemModel(),
                    buildPlayersItemModel()
                ])));

                changeNameInputFilter();

                tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
                fixture.detectChanges();

                expect(fixture.debugElement.queryAll(By.css('form > .main > sfc-table sfc-expanded-table-row sfc-players-row')).length)
                    .toEqual(2);
            }));

            fit('Should rows have defined attributes', fakeAsync(() => {
                getSpy.and.returnValue(of(getPlayersResponse([
                    buildPlayersItemModel(),
                    buildPlayersItemModel()
                ])));

                changeNameInputFilter();

                tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
                fixture.detectChanges();

                fixture.debugElement.queryAll(By.css('form > .main > sfc-table sfc-expanded-table-row sfc-players-row'))
                    .forEach(row => {
                        expect(row.componentInstance.columns.length).toEqual(component.columns.length);
                        expect(row.componentInstance.model).toBeTruthy();
                        expect(row.componentInstance.expanded).toBeFalse();
                    });
            }));
        });

        describe('Rows content', () => {
            fit('Should have rows content', fakeAsync(() => {
                getSpy.and.returnValue(of(getPlayersResponse([
                    buildPlayersItemModel(),
                    buildPlayersItemModel()
                ])));

                changeNameInputFilter();

                tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
                fixture.detectChanges();

                expect(fixture.debugElement.queryAll(By.css('form > .main > sfc-table sfc-expanded-table-row sfc-players-row-content')).length)
                    .toEqual(2);
            }));

            fit('Should rows have defined attributes', fakeAsync(() => {
                getSpy.and.returnValue(of(getPlayersResponse([
                    buildPlayersItemModel(),
                    buildPlayersItemModel()
                ])));

                changeNameInputFilter();

                tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
                fixture.detectChanges();

                fixture.debugElement.queryAll(By.css('form > .main > sfc-table sfc-expanded-table-row sfc-players-row-content'))
                    .forEach(row => expect(row.componentInstance.model).toBeTruthy());
            }));
        });

        describe('Cards', () => {
            fit('Should have cards', fakeAsync(() => {
                fixture.nativeElement.querySelector('form > .main > sfc-table sfc-toggle-switcher').dispatchEvent(new MouseEvent('click', {}));
                fixture.detectChanges();

                getSpy.and.returnValue(of(getPlayersResponse([
                    buildPlayersItemModel(),
                    buildPlayersItemModel()
                ])));

                changeNameInputFilter();

                tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
                fixture.detectChanges();

                expect(fixture.debugElement.queryAll(By.css('form > .main > sfc-table sfc-players-card')).length)
                    .toEqual(2);
            }));

            fit('Should cards have defined attributes', fakeAsync(() => {
                fixture.nativeElement.querySelector('form > .main > sfc-table sfc-toggle-switcher').dispatchEvent(new MouseEvent('click', {}));
                fixture.detectChanges();

                getSpy.and.returnValue(of(getPlayersResponse([
                    buildPlayersItemModel(),
                    buildPlayersItemModel()
                ])));

                changeNameInputFilter();

                tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
                fixture.detectChanges();

                fixture.debugElement.queryAll(By.css('form > .main > sfc-table sfc-players-card'))
                    .forEach(row => expect(row.componentInstance.model).toBeTruthy());
            }));
        });
    });

    describe('Recommendations', () => {
        describe('Searching', () => {
            fit('Should exist', () => {
                expect(fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.searching')).toBeTruthy();
            });

            fit('Should not exist', () => {
                component.recommendationsVisability.search = false;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.searching')).toBeNull();
            });

            fit('Should close component exist', () => {
                expect(fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.searching > sfc-close')).toBeTruthy();
            });

            fit('Should hide when click on close', () => {
                expect(fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.searching')).toBeTruthy();

                fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.searching > sfc-close')
                    .dispatchEvent(new MouseEvent('click', {}));
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.searching')).toBeNull();
            });

            fit('Should have title with appropriate attributes', () => {
                const titleEl: DebugElement = fixture.debugElement.query(By.css('.form > form > .recommendations .recommendation.searching > sfc-title'));

                expect(titleEl.componentInstance.label).toEqual(SearchPageLocalization.RECOMMENDATION.SEARCHING.TITLE.LABEL);
                expect(titleEl.componentInstance.description).toEqual(SearchPageLocalization.RECOMMENDATION.SEARCHING.TITLE.DESCRIPTION);
                expect(titleEl.componentInstance.tooltip).toEqual(SearchPageLocalization.RECOMMENDATION.SEARCHING.TITLE.TOOLTIP);
            });

            fit('Should have recommendations', () => {
                component.searchRecommendations = [
                    { raiting: 50, },
                    { raiting: 51, },
                    { raiting: 52, },
                    { raiting: 53, }
                ];
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.searching > sfc-players-recommendation')).toBeTruthy()
            });

            fit('Should recommendations have defined items', () => {
                component.searchRecommendations = [
                    { raiting: 50, }
                ];
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css('.form > form > .recommendations .recommendation.searching > sfc-players-recommendation')).componentInstance.items)
                    .toEqual(component.searchRecommendations);
            });
        });

        describe('Location', () => {
            fit('Should exist', () => {
                expect(fixture.nativeElement.querySelector('.form > form > .recommendations  .recommendation.location')).toBeTruthy();
            });

            fit('Should not exist', () => {
                component.recommendationsVisability.location = false;
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.form > form > .recommendations  .recommendation.location')).toBeNull();
            });

            fit('Should close component exist', () => {
                expect(fixture.nativeElement.querySelector('.form > form > .recommendations  .recommendation.location > sfc-close')).toBeTruthy();
            });

            fit('Should hide when click on close', () => {
                expect(fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.location')).toBeTruthy();

                fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.location > sfc-close')
                    .dispatchEvent(new MouseEvent('click', {}));
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.location')).toBeNull();
            });

            fit('Should have title with appropriate attributes', () => {
                const titleEl: DebugElement = fixture.debugElement.query(By.css('.form > form > .recommendations .recommendation.location > sfc-title'));

                expect(titleEl.componentInstance.label).toEqual(SearchPageLocalization.RECOMMENDATION.LOCATION.TITLE.LABEL);
                expect(titleEl.componentInstance.description).toEqual(SearchPageLocalization.RECOMMENDATION.LOCATION.TITLE.DESCRIPTION);
                expect(titleEl.componentInstance.tooltip).toEqual(SearchPageLocalization.RECOMMENDATION.LOCATION.TITLE.TOOLTIP);
            });

            fit('Should have recommendations', () => {
                component.locationRecommendations = [
                    { raiting: 50, },
                    { raiting: 51, },
                    { raiting: 52, },
                    { raiting: 53, }
                ];
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.form > form > .recommendations .recommendation.location > sfc-players-recommendation')).toBeTruthy()
            });

            fit('Should recommendations have defined items', () => {
                component.locationRecommendations = [
                    { raiting: 50, }
                ];
                fixture.detectChanges();

                expect(fixture.debugElement.query(By.css('.form > form > .recommendations .recommendation.location > sfc-players-recommendation')).componentInstance.items)
                    .toEqual(component.locationRecommendations);
            });
        });
    });

    describe('Search process', () => {
        fit('Should start searching on init', () => {
            expect(playerServiceStub.get).toHaveBeenCalledTimes(1);
        });

        fit('Should searching on filter changes', fakeAsync(() => {
            changeNameInputFilter();

            tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
            fixture.detectChanges();

            expect(playerServiceStub.get).toHaveBeenCalledTimes(2);
        }));

        fit('Should not searching, when filter form is invalid', fakeAsync(() => {
            component.searchForm.setValue(buildSearchFormValue(new Array(GeneralFilterConstants.MAX_CITY_LENGTH + 2).join('c')));
            fixture.detectChanges();

            changeNameInputFilter();

            tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
            fixture.detectChanges();

            expect(playerServiceStub.get).toHaveBeenCalledTimes(1);
        }));

        fit('Should not searching, when change filter inside modal', fakeAsync(() => {
            openFiltersModal();

            changeCityInputFilter();

            tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
            fixture.detectChanges();

            expect(playerServiceStub.get).toHaveBeenCalledTimes(1);
        }));

        fit('Should searching, when change filter inside modal and click ok button', fakeAsync(() => {
            openFiltersModal();

            changeCityInputFilter();

            startSearchingByModal();

            tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
            fixture.detectChanges();

            expect(playerServiceStub.get).toHaveBeenCalledTimes(2);
        }));

        fit('Should searching with debounce time on filter changes', fakeAsync(() => {
            changeNameInputFilter();

            expect(playerServiceStub.get).toHaveBeenCalledTimes(1);

            tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
            fixture.detectChanges();

            expect(playerServiceStub.get).toHaveBeenCalledTimes(2);
        }));

        fit('Should map get request', fakeAsync(() => {
            expect(playerServiceStub.get).toHaveBeenCalledOnceWith({
                Filter: {
                    Profile: {
                        General: {
                            Availability: { Days: null, From: undefined, To: undefined },
                            City: null,
                            FreePlay: null,
                            HasPhoto: null,
                            Name: null,
                            Tags: null,
                            Years: { From: GeneralFilterConstants.FROM_YEARS_DEFAULT, To: GeneralFilterConstants.TO_YEARS_DEFAULT }
                        },
                        Football: {
                            GameStyles: null,
                            Height: { From: FootballFilterConstants.FROM_HEIGHT_DEFAULT, To: FootballFilterConstants.TO_HEIGHT_DEFAULT },
                            PhysicalCondition: null,
                            Positions: null,
                            Skill: null,
                            Weight: { From: FootballFilterConstants.FROM_WEIGHT_DEFAULT, To: FootballFilterConstants.TO_WEIGHT_DEFAULT },
                            WorkingFoot: undefined
                        }
                    },
                    Stats: {
                        Mental: { From: StatsFilterConstants.FROM_STATS_DEFAULT, To: StatsFilterConstants.TO_STATS_DEFAULT, Skill: 1 },
                        Physical: { From: StatsFilterConstants.FROM_STATS_DEFAULT, To: StatsFilterConstants.TO_STATS_DEFAULT, Skill: 0 },
                        Raiting: null,
                        Skill: { From: StatsFilterConstants.FROM_STATS_DEFAULT, To: StatsFilterConstants.TO_STATS_DEFAULT, Skill: 2 },
                        Total: { From: StatsFilterConstants.FROM_STATS_DEFAULT, To: StatsFilterConstants.TO_STATS_DEFAULT }
                    }
                },
                Pagination: { Page: component.pagination.page, Size: component.pagination.size },
                Sorting: [{ Name: 'Raiting', Direction: 'descending' }]
            }, !component.showLoading);
        }));

        fit('Should send notification on error', fakeAsync(() => {
            spyOn(notificationServiceStub as any, 'notify').and.callThrough();

            changeNameInputFilter();

            getSpy.and.returnValue(throwError(() => new Error()));

            tick(SearchPageConstants.SEARCH_DEBOUNCE_TIME);
            fixture.detectChanges();

            expect(notificationServiceStub.notify).toHaveBeenCalledOnceWith({
                severity: MessageSeverity.ERROR,
                value: undefined,
                title: SearchPageLocalization.ERROR.FETCH
            });
        }));
    });

    function buildSearchFormValue(city: string | null = null): ISearchPageFormModel {
        return {
            name: null,
            general: {
                hasPhoto: null!,
                years: { from: GeneralFilterConstants.FROM_YEARS_DEFAULT, to: GeneralFilterConstants.TO_YEARS_DEFAULT },
                city: city,
                tags: null,
                freePlay: null!,
                availability: {
                    from: null,
                    to: null,
                    days: null
                }
            },
            football: {
                height: { from: FootballFilterConstants.FROM_HEIGHT_DEFAULT, to: FootballFilterConstants.TO_HEIGHT_DEFAULT },
                weight: { from: FootballFilterConstants.FROM_WEIGHT_DEFAULT, to: FootballFilterConstants.TO_WEIGHT_DEFAULT },
                positions: null,
                workingFoot: null,
                skill: null,
                physicalCondition: null,
                gameStyles: null
            },
            stats: {
                total: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                physical: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                mental: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                skill: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                raiting: null
            }
        };
    }

    function openFiltersModal(): void {
        fixture.debugElement.query(By.css('form > .main > .modal > sfc-button'))
            .nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
    }

    function getPlayersResponse(items: IGetPlayersItemModel[], total: number = 0, next: boolean = false): any {
        return {
            body: {
                Errors: null,
                Items: items,
                Message: 'Success',
                Success: true
            },
            headers: new HttpHeaders().set(HttpConstants.PAGINATION_HEADER_KEY, JSON.stringify({
                TotalCount: total,
                HasNextPage: next
            }))
        }
    }

    function buildPlayersItemModel(): IGetPlayersItemModel {
        return {
            Id: 1,
            Profile: {
                Football: {
                    GameStyle: 1,
                    Height: 180,
                    PhysicalCondition: 2,
                    Position: 2,
                    Skill: 3,
                    Weight: 65,
                    WorkingFoot: 0
                },
                General: {
                    Availability: { Days: null, From: null, To: null },
                    Birthday: null,
                    City: 'Test city',
                    FirstName: 'Testname',
                    FreePlay: false,
                    LastName: 'Testsurname',
                    Photo: null,
                    Tags: []
                }
            },
            Stats: {
                Values: [
                    { Type: 0, Value: 50 },
                    { Type: 1, Value: 50 },
                    { Type: 2, Value: 50 },
                    { Type: 3, Value: 50 },
                    { Type: 4, Value: 50 },
                    { Type: 5, Value: 50 },
                    { Type: 6, Value: 50 },
                    { Type: 7, Value: 50 },
                    { Type: 8, Value: 50 },
                    { Type: 9, Value: 50 },
                    { Type: 10, Value: 50 },
                    { Type: 11, Value: 50 },
                    { Type: 12, Value: 50 },
                    { Type: 13, Value: 50 },
                    { Type: 14, Value: 50 },
                    { Type: 15, Value: 50 },
                    { Type: 16, Value: 50 },
                    { Type: 17, Value: 50 },
                    { Type: 18, Value: 50 },
                    { Type: 19, Value: 50 },
                    { Type: 20, Value: 50 },
                    { Type: 21, Value: 50 },
                    { Type: 22, Value: 50 },
                    { Type: 23, Value: 50 },
                    { Type: 24, Value: 50 },
                    { Type: 25, Value: 50 },
                    { Type: 26, Value: 50 },
                    { Type: 27, Value: 50 },
                    { Type: 28, Value: 50 }
                ]
            }
        };
    }

    function changeNameInputFilter(): void {
        const nameInputEl = fixture.nativeElement.querySelector('form > .main > .name > sfc-text-input#name .sfc-input#sfc-name');
        nameInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }

    function changeCityInputFilter(): void {
        const cityInputEl = fixture.nativeElement.querySelector('form > .main > .modal > sfc-modal sfc-text-input#city .sfc-input#sfc-city');
        cityInputEl.value = 'Test city';
        cityInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }

    function resizeWindow(width: number): void {
        windowMock.innerWidth = width;
        (component as any).resizeService = resizeServiceStub;
        component.ngOnDestroy();
        component.ngAfterViewInit();

        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
    }

    function startSearchingByModal(): void {
        fixture.debugElement.queryAll(By.css('form > .main > .modal > sfc-modal sfc-default-modal-footer sfc-button'))[0]
            .nativeElement.click();
        fixture.detectChanges();
    }
});