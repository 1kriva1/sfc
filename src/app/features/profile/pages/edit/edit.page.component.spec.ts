import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '@core/components';
import { CommonConstants as ApplicationCommonConstants } from '@core/constants';
import { RoutKey } from '@core/enums';
import { IChangesCheckGuardModel } from '@core/guards/changes-check/changes-check.model';
import { IValueModel } from '@core/models';
import { NotificationService } from '@core/services';
import { MessageSeverity } from '@core/services/message/message-severity.enum';
import { buildTitle } from '@core/utils';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFutbol, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faG, faStar } from '@fortawesome/free-solid-svg-icons';
import { PlayerService as SharePlayerService } from '@share/services';
import { ShareModule } from '@share/share.module';
import { ButtonType, CommonConstants, ModalService, nameof, NgxSfcCommonModule, UIConstants } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { of, throwError } from 'rxjs';
import { IProfileModel } from '../../models';
import { ICreatePlayerResponse } from '../../services/player/models/create/create.response';
import { IUpdatePlayerResponse } from '../../services/player/models/update/update.response';
import { PlayerService } from '../../services/player/player.service';
import { ProfileEditPageComponent } from './edit.page.component';
import { EditPageConstants } from './edit.page.constants';
import { EditPageLocalization } from './edit.page.localization';
import { IEditPageFormModel } from './models/edit-page-form.model';
import { FootballProfileEditComponent } from './parts/football/football-profile-edit.component';
import { GeneralProfileEditComponent } from './parts/general/general-profile-edit.component';
import { IGeneralProfileEditModel } from './parts/general/general-profile-edit.model';
import { StatsService } from './parts/stats/services/stats.service';
import { StatsProfileEditComponent } from './parts/stats/stats-profile-edit.component';

describe('Features.Profile.Page:ProfileEdfit', () => {
    let component: ProfileEditPageComponent;
    let fixture: ComponentFixture<ProfileEditPageComponent>;
    let routerMock = { navigate: (_: string[]) => { } };
    let activateRouteMock = { snapshot: { data: {} } };
    let sharePlayerServiceStub: any = {
        player: { value$: of(null) },
        playerId: { value: 100 },
        update: () => { }
    };
    let headerServiceStub: Partial<HeaderService> = {};
    let notificationServiceStub: any = { notify: () => { } };
    let playerServiceStub: Partial<PlayerService> = {
        create: () => { return of(); },
        update: () => { return of(); }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule, HttpClientModule,
                FontAwesomeModule, NoopAnimationsModule,
                NgxSfcCommonModule, NgxSfcInputsModule,
                NgxSfcComponentsModule, ShareModule
            ],
            declarations: [GeneralProfileEditComponent, FootballProfileEditComponent,
                StatsProfileEditComponent, ProfileEditPageComponent],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: ActivatedRoute, useValue: activateRouteMock },
                { provide: SharePlayerService, useValue: sharePlayerServiceStub },
                { provide: PlayerService, useValue: playerServiceStub },
                { provide: NotificationService, useValue: notificationServiceStub },
                { provide: HeaderService, useValue: headerServiceStub },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileEditPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        (sharePlayerServiceStub as any).playerCreated = false;
        activateRouteMock = { snapshot: { data: {} } };
    });

    describe('General', () => {
        fit('Should create page', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title > .back')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title > sfc-title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.form form')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.parts')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.part.left')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.photo sfc-image-input')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.info .stars sfc-stars')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.errors .error-message')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.actions sfc-button')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.progress .item sfc-progress-line').length).toEqual(3);
            expect(fixture.nativeElement.querySelector('.combined-part')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.combined-part .part.center')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.part.center sfc-tabs')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-tabs sfc-tab-label-line')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-tabs sfc-tab-label-line-slider')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-tabs .tabs-container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-general-profile-edit')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-football-profile-edit')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-stats-profile-edit')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.combined-part .part.right')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.element sfc-progress-circle').length).toEqual(2);
            expect(fixture.nativeElement.querySelectorAll('.element .label').length).toEqual(2);
        });

        fit('Should call unsubscribe', () => {
            const unsubscribeSpy = spyOn(
                (component as any)._subscription,
                'unsubscribe'
            ).and.callThrough();

            component.ngOnDestroy();

            expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
        });

        fit('Should have page title for created profile', () => {
            const profile: IProfileModel = buildProfileModel();
            (sharePlayerServiceStub as any).playerCreated = true;
            (activateRouteMock.snapshot.data as any).profile = { result: profile };
            component.ngAfterViewInit();

            const titleService = TestBed.inject(Title);

            expect(titleService.getTitle()).toBe(buildTitle(`${profile.general.firstName} ${profile.general.lastName}`));
        });

        fit('Should show side menu', () => {
            (headerServiceStub as any).open = false;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.side')).toBeTruthy();
        });

        fit('Should hide side menu', () => {
            (headerServiceStub as any).open = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.side')).toBeNull();
        });

        fit('Should guard changes modal has configuration as constant', () => {
            expect(component.changesModalFooterModel.applyButton).toBeTrue();
            expect(component.changesModalFooterModel.cancelButton).toBeTrue();
            expect(component.changesModalFooterModel.applyButtonText)
                .toEqual(EditPageLocalization.CHANGES_MODAL.BUTTONS.YES_DISCARD_CHANGES);
            expect(component.changesModalFooterModel.cancelButtonText)
                .toEqual(EditPageLocalization.CHANGES_MODAL.BUTTONS.NO);
            expect(component.changesModalHeaderModel.showCloseIcon).toBeTrue();
            expect(component.changesModalHeaderModel.text)
                .toEqual(EditPageLocalization.CHANGES_MODAL.TITLE);
        });

        fit('Should stats service has default values', () => {
            const statsService = TestBed.inject(StatsService);

            expect(statsService.stats.available).toEqual(EditPageConstants.NEW_PROFILE_AVAILABLE_POINTS);
            expect(statsService.stats.used).toEqual(0);
        });

        fit('Should stats service has values for created profile', () => {
            const profile: IProfileModel = buildProfileModel(),
                statsService = TestBed.inject(StatsService);
            (sharePlayerServiceStub as any).playerCreated = true;
            (activateRouteMock.snapshot.data as any).profile = { result: profile };
            component.ngAfterViewInit();

            expect(statsService.stats.available).toEqual(profile.stats.points.available);
            expect(statsService.stats.used).toEqual(profile.stats.points.used);
        });
    });

    describe('Content', () => {
        describe('Title', () => {
            fit('Should navigate to home page', () => {
                expect(fixture.debugElement.query(By.css('a.back')).attributes['routerLink'])
                    .toEqual(`/${RoutKey.Home}`);
            });

            fit('Should back navigator have appropriate attributes', () => {
                expect(fixture.nativeElement.querySelector('a.back fa-icon svg').classList).toContain('fa-arrow-left');
                expect(fixture.nativeElement.querySelector('a.back span').innerText).toEqual('Back');
            });

            fit('Should title have appropriate attributes for not created profile', () => {
                (sharePlayerServiceStub as any).playerCreated = false;
                fixture.detectChanges();

                const titleEl: DebugElement = fixture.debugElement.query(By.css('sfc-title'));

                expect(titleEl.componentInstance.label).toEqual(EditPageLocalization.TITLE.CREATE.LABEL);
                expect(titleEl.componentInstance.description).toEqual(EditPageLocalization.TITLE.CREATE.DESCRIPTION);
                expect(titleEl.componentInstance.tooltip).toEqual(EditPageLocalization.TITLE.CREATE.TOOLTIP);
            });

            fit('Should title have appropriate attributes for created profile', () => {
                (sharePlayerServiceStub as any).playerCreated = true;
                fixture.detectChanges();

                const titleEl: DebugElement = fixture.debugElement.query(By.css('sfc-title'));

                expect(titleEl.componentInstance.label).toEqual(EditPageLocalization.TITLE.UPDATE.LABEL);
                expect(titleEl.componentInstance.description).toEqual(EditPageLocalization.TITLE.UPDATE.DESCRIPTION);
                expect(titleEl.componentInstance.tooltip).toEqual(EditPageLocalization.TITLE.UPDATE.TOOLTIP);
            });
        });

        describe('Info', () => {
            fit('Should stars have valid attributes', () => {
                const starsEl: DebugElement = fixture.debugElement.query(By.css('.info .stars sfc-stars')),
                    iconTooltipEl: DebugElement = fixture.debugElement.query(By.css('.info .stars sfc-icon-tooltip'));

                expect(starsEl.componentInstance.value).toEqual(3);
                expect(iconTooltipEl.componentInstance.tooltip).toEqual(EditPageLocalization.STARS_TOOLTIP);
                expect(iconTooltipEl.componentInstance.icon).toEqual(faQuestionCircle);
            });

            fit('Should have text for not created profile', () => {
                expect(fixture.nativeElement.querySelector('.info h3').innerText).toEqual('[Name] [Surname]');
                expect(fixture.nativeElement.querySelector('.info p').innerText).toEqual('[Position] • [City]');
            });

            fit('Should have text for created profile', () => {
                const profile: IProfileModel = buildProfileModel();
                (sharePlayerServiceStub as any).playerCreated = true;
                (activateRouteMock.snapshot.data as any).profile = { result: profile };
                component.ngAfterViewInit();

                expect(fixture.nativeElement.querySelector('.info h3').innerText).toEqual(`${profile.general.firstName} ${profile.general.lastName}`);
                expect(fixture.nativeElement.querySelector('.info p').innerText).toEqual(`${profile.football.position?.value} • ${profile.general.city}`);
            });
        });

        describe('Form', () => {
            fit('Should have valid inputs count', () => {
                const formEl = fixture.nativeElement.querySelector('form'),
                    inputs = formEl.querySelectorAll('input');

                expect(inputs.length).toEqual(64);
            });

            fit('Should have initial value', () => {
                expect(component.profileForm.value).toEqual(buildProfileFormValue(null!, null!, null!));
            });

            fit('Should have value for created profile', () => {
                const profile: IProfileModel = buildProfileModel();
                (sharePlayerServiceStub as any).playerCreated = true;
                (activateRouteMock.snapshot.data as any).profile = { result: profile };
                component.ngAfterViewInit();

                expect(component.profileForm.value).toEqual(buildProfileFormValue(
                    profile.general.firstName,
                    profile.general.lastName,
                    profile.general.city,
                    profile.football.position)
                );
            });

            fit('Should have valid autocomplete attribute', () => {
                expect(fixture.nativeElement.querySelector('form').attributes['autocomplete'].nodeValue).toEqual('off');
            });

            fit('Should be invalid', () => {
                expect(component.profileForm.valid).toBeFalse();
            });

            fit('Should be valid', () => {
                makeFormValid();

                expect(component.profileForm.valid).toBeTrue();
            });

            fit('Should submit button be enabled by default', () => {
                expect(fixture.debugElement.query(By.css('sfc-button')).componentInstance.disabled).toBeFalse();
            });

            fit('Should submit button be disabled after click with invalid state', () => {
                const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
                submitBtnEl.nativeElement.click();
                fixture.detectChanges();

                expect(submitBtnEl.componentInstance.disabled).toBeTrue();
            });

            fit('Should submit button become enabled after make form valid', () => {
                const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
                submitBtnEl.nativeElement.click();
                fixture.detectChanges();

                expect(submitBtnEl.componentInstance.disabled).toBeTrue();

                makeFormValid();

                expect(submitBtnEl.componentInstance.disabled).toBeFalse();
            });

            fit('Should submit button disabled when no changes happened', () => {
                const profile: IProfileModel = buildProfileModel();
                (sharePlayerServiceStub as any).playerCreated = true;
                (activateRouteMock.snapshot.data as any).profile = { result: profile };
                component.ngAfterViewInit();
                fixture.detectChanges();

                const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));

                expect(submitBtnEl.componentInstance.disabled).toBeTrue();
            });

            fit('Should submit button become enabled when changes happened', () => {
                const profile: IProfileModel = buildProfileModel(),
                    firstNameInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-first-name');
                (sharePlayerServiceStub as any).playerCreated = true;
                (activateRouteMock.snapshot.data as any).profile = { result: profile };
                component.ngAfterViewInit();
                fixture.detectChanges();

                firstNameInputEl.value = 'New value';
                firstNameInputEl.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));

                expect(submitBtnEl.componentInstance.disabled).toBeFalse();
            });

            fit('Should make form controls dirty on submit button click', () => {
                const generalProfileControlGroup = component.profileForm.get(nameof<IEditPageFormModel>('general')),
                    firstNameInput = generalProfileControlGroup!.get(nameof<IGeneralProfileEditModel>('firstName')),
                    lastNameInput = generalProfileControlGroup!.get(nameof<IGeneralProfileEditModel>('lastName')),
                    cfityInput = generalProfileControlGroup!.get(nameof<IGeneralProfileEditModel>('city'));

                expect(firstNameInput!.dirty).toBeFalse();
                expect(lastNameInput!.dirty).toBeFalse();
                expect(cfityInput!.dirty).toBeFalse();

                const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
                submitBtnEl.nativeElement.click();
                fixture.detectChanges();

                expect(firstNameInput!.dirty).toBeTrue();
                expect(lastNameInput!.dirty).toBeTrue();
                expect(cfityInput!.dirty).toBeTrue();
            });

            describe('Photo input', () => {
                fit('Should have appropriate attributes', () => {
                    const photoInput: DebugElement = fixture.debugElement.query(By.css('sfc-image-input#photo'));

                    expect(photoInput.componentInstance.label).toEqual(EditPageLocalization.INPUT.PHOTO.LABEL);
                    expect(photoInput.componentInstance.helperText).toEqual(EditPageLocalization.INPUT.PHOTO.HELPER_TEXT);
                    expect(photoInput.componentInstance.icon).toEqual(faCamera);
                    expect(photoInput.componentInstance.clearButton).toBeFalse();
                    expect(photoInput.componentInstance.hideOnClickOutside).toBeTrue();
                    expect(photoInput.componentInstance.defaultPhoto).toEqual(ApplicationCommonConstants.DEFAULT_AVATAR_PATH);
                    expect(photoInput.componentInstance.okLabel).toEqual(EditPageLocalization.BUTTON_OK_LABEL);
                    expect(photoInput.componentInstance.cancelLabel).toEqual(EditPageLocalization.BUTTON_CANCEL_LABEL);
                    expect(photoInput.componentInstance.validations).toEqual({
                        'sfc-format': EditPageLocalization.INPUT.PHOTO.VALIDATIONS.INVALID_FORMAT,
                        'sfc-file-max-size': component.PHOTO_MAX_SIZE_VALIDATION
                    });
                });

                fit('Should be invalid by file size', () => {
                    const photoInputEl = fixture.debugElement.query(By.css('sfc-image-input#photo')),
                        photoControl = component.profileForm.get('photo'),
                        invalidPhoto = getHugeFile('test.jpg', EditPageConstants.MAX_PHOTO_SIZE + 1);

                    photoInputEl.componentInstance.onChange(invalidPhoto);
                    fixture.detectChanges();

                    expect(photoControl?.errors).not.toBeNull();
                    expect((photoControl?.errors as any)['sfc-file-max-size']).toEqual({
                        actualSize: 5242881,
                        file: invalidPhoto,
                        requiredSize: 5242880
                    });
                    expect(photoInputEl.componentInstance.validations['sfc-file-max-size']).toEqual(component.PHOTO_MAX_SIZE_VALIDATION);
                });

                fit('Should be inner invalid by file extension', () => {
                    const photoInputEl = fixture.debugElement.query(By.css('sfc-image-input#photo input[type="file"]')),
                        photoControl = component.profileForm.get('photo'),
                        invalidPhoto = getHugeFile('test.txt', 1);

                    photoInputEl.triggerEventHandler('change', {
                        target: {
                            target: photoInputEl.nativeElement,
                            files: { item: () => invalidPhoto }
                        }
                    });
                    fixture.detectChanges();

                    expect(photoControl?.errors).toBeNull();
                    expect(fixture.nativeElement.querySelector('sfc-image-input#photo span.helper-text').innerText)
                        .toEqual(EditPageLocalization.INPUT.PHOTO.VALIDATIONS.INVALID_FORMAT);
                });
            });
        });

        describe('Tabs', () => {
            fit('Should validation asteriks exist', () => {
                const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
                submitBtnEl.nativeElement.click();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.invalid-asterisk')).toBeTruthy();
            });

            fit('Should validation asteriks exist without submfitting', () => {
                const profile: IProfileModel = buildProfileModel(),
                    firstNameInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-first-name');
                (sharePlayerServiceStub as any).playerCreated = true;
                (activateRouteMock.snapshot.data as any).profile = { result: profile };
                component.ngAfterViewInit();
                fixture.detectChanges();

                firstNameInputEl.value = '';
                firstNameInputEl.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.invalid-asterisk')).toBeTruthy();
            });

            fit('Should validation asteriks not exist', () => {
                makeFormValid();

                const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
                submitBtnEl.nativeElement.click();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.invalid-asterisk')).toBeNull();
            });

            fit('Should show general profile tab', () => {
                selectTab(0);

                expect(fixture.debugElement.query(By.css('sfc-general-profile-edit')).styles['display'])
                    .toEqual(UIConstants.CSS_INITIAL);
                expect(fixture.debugElement.query(By.css('sfc-football-profile-edit')).styles['display'])
                    .toEqual(UIConstants.CSS_NONE);
                expect(fixture.debugElement.query(By.css('sfc-stats-profile-edit')).styles['display'])
                    .toEqual(UIConstants.CSS_NONE);
            });

            fit('Should show football profile tab', () => {
                selectTab(1);

                expect(fixture.debugElement.query(By.css('sfc-football-profile-edit')).styles['display'])
                    .toEqual(UIConstants.CSS_INITIAL);
                expect(fixture.debugElement.query(By.css('sfc-general-profile-edit')).styles['display'])
                    .toEqual(UIConstants.CSS_NONE);
                expect(fixture.debugElement.query(By.css('sfc-stats-profile-edit')).styles['display'])
                    .toEqual(UIConstants.CSS_NONE);
            });

            fit('Should show stats profile tab', () => {
                selectTab(2);

                expect(fixture.debugElement.query(By.css('sfc-football-profile-edit')).styles['display'])
                    .toEqual(UIConstants.CSS_NONE);
                expect(fixture.debugElement.query(By.css('sfc-general-profile-edit')).styles['display'])
                    .toEqual(UIConstants.CSS_NONE);
                expect(fixture.debugElement.query(By.css('sfc-stats-profile-edit')).styles['display'])
                    .toEqual(UIConstants.CSS_INITIAL);
            });

            fit('Should tabs have defined labels', () => {
                selectTab(0);

                const tabLabelEls = fixture.debugElement.queryAll(By.css('sfc-tab-label-line'));

                expect(tabLabelEls[0].componentInstance.selected).toBeTrue();
                expect(tabLabelEls[0].componentInstance.disabled).toBeUndefined();
                expect(tabLabelEls[0].componentInstance.label).toEqual(EditPageLocalization.TABS.GENERAL_LABEL);
                expect(tabLabelEls[0].componentInstance.icon).toEqual(faG);
                expect(tabLabelEls[1].componentInstance.selected).toBeFalse();
                expect(tabLabelEls[1].componentInstance.disabled).toBeUndefined();
                expect(tabLabelEls[1].componentInstance.label).toEqual(EditPageLocalization.TABS.FOOTBALL_LABEL);
                expect(tabLabelEls[1].componentInstance.icon).toEqual(faFutbol);
                expect(tabLabelEls[2].componentInstance.selected).toBeFalse();
                expect(tabLabelEls[2].componentInstance.disabled).toBeUndefined();
                expect(tabLabelEls[2].componentInstance.label).toEqual(EditPageLocalization.TABS.STATS_LABEL);
                expect(tabLabelEls[2].componentInstance.icon).toEqual(faStar);
            });
        });

        describe('Actions', () => {
            fit('Should submit button have appropriate attributes', () => {
                const registrationBtn: DebugElement = fixture.debugElement.query(By.css('.actions > sfc-button'));

                expect(registrationBtn.componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
                expect(registrationBtn.componentInstance.text).toEqual(EditPageLocalization.BUTTON_CREATE_TEXT);
            });

            fit('Should submit button have appropriate attributes for already created profile', () => {
                (sharePlayerServiceStub as any).playerCreated = true;
                fixture.detectChanges();

                const registrationBtn: DebugElement = fixture.debugElement.query(By.css('.actions > sfc-button'));

                expect(registrationBtn.componentInstance.types).toEqual([ButtonType.Rounded, ButtonType.Filled]);
                expect(registrationBtn.componentInstance.text).toEqual(EditPageLocalization.BUTTON_UPDATE_TEXT);
            });
        });

        describe('Progress', () => {
            fit('Should general progress have appropriate attributes', () => {
                const generalProgressEl: DebugElement = fixture.debugElement.queryAll(By.css('.progress .item sfc-progress-line'))[0],
                    generalProgressSpanEl = fixture.nativeElement.querySelectorAll('.progress > .item > span')[0];

                expect(generalProgressEl.componentInstance.labelStart).toEqual(EditPageLocalization.PROGRESS.GENERAL_LABEL);
                expect(generalProgressEl.componentInstance.progress).toEqual(10);
                expect(generalProgressEl.componentInstance.labelSuffix).toEqual(CommonConstants.PERCENTAGE_SYMBOL);
                expect(generalProgressSpanEl.innerText).toEqual('1 of 11 fields are filled.');
            });

            fit('Should football progress have appropriate attributes', () => {
                const generalProgressEl: DebugElement = fixture.debugElement.queryAll(By.css('.progress .item sfc-progress-line'))[1],
                    generalProgressSpanEl = fixture.nativeElement.querySelectorAll('.progress > .item > span')[1];

                expect(generalProgressEl.componentInstance.labelStart).toEqual(EditPageLocalization.PROGRESS.FOOTBALL_LABEL);
                expect(generalProgressEl.componentInstance.progress).toEqual(0);
                expect(generalProgressEl.componentInstance.labelSuffix).toEqual(CommonConstants.PERCENTAGE_SYMBOL);
                expect(generalProgressSpanEl.innerText).toEqual('0 of 10 fields are filled.');
            });

            fit('Should stats progress have appropriate attributes', () => {
                const generalProgressEl: DebugElement = fixture.debugElement.queryAll(By.css('.progress .item sfc-progress-line'))[2],
                    generalProgressSpanEl = fixture.nativeElement.querySelectorAll('.progress > .item > span')[2];

                expect(generalProgressEl.componentInstance.labelStart).toEqual(EditPageLocalization.PROGRESS.STATS_LABEL);
                expect(generalProgressEl.componentInstance.progress).toEqual(0);
                expect(generalProgressEl.componentInstance.labelSuffix).toEqual(CommonConstants.PERCENTAGE_SYMBOL);
                expect(generalProgressSpanEl.innerText).toEqual('3 stat\'s points are used.');
            });
        });

        describe('Stats progress', () => {
            fit('Should percentage progress have appropriate attributes', () => {
                const percentageProgressEl: DebugElement = fixture.debugElement.queryAll(By.css('.part.right .element sfc-progress-circle'))[0],
                    percentageProgressTfitleEl = fixture.nativeElement.querySelectorAll('.part.right > .element > .label > h4')[0],
                    percentageProgressDescriptionEl = fixture.nativeElement.querySelectorAll('.part.right > .element > .label > span')[0];

                expect(percentageProgressEl.componentInstance.progress).toEqual(50);
                expect(percentageProgressTfitleEl.innerText).toEqual('Total rating (percentage)');
                expect(percentageProgressDescriptionEl.innerText).toEqual('Average value from your stats');
            });

            fit('Should absolute progress have appropriate attributes', () => {
                const percentageProgressEl: DebugElement = fixture.debugElement.queryAll(By.css('.part.right .element sfc-progress-circle'))[1],
                    percentageProgressTfitleEl = fixture.nativeElement.querySelectorAll('.part.right > .element > .label > h4')[1],
                    percentageProgressDescriptionEl = fixture.nativeElement.querySelectorAll('.part.right > .element > .label > span')[1];

                expect(percentageProgressEl.componentInstance.progress).toEqual(1450);
                expect(percentageProgressTfitleEl.innerText).toEqual('Total rating (absolute value)');
                expect(percentageProgressDescriptionEl.innerText).toEqual('Sum of your all stats');
            });
        });

        describe('Guard changes modal', () => {
            fit('Should have appropriate attributes', () => {
                const modalService = TestBed.inject(ModalService);
                modalService.open();
                fixture.detectChanges();

                const modalEl = fixture.debugElement.query(By.css('sfc-modal'));

                expect(modalEl.componentInstance.hideOnClickOutside).toBeFalse();
                expect(modalEl.componentInstance.defaultFooterModel.applyButtonText)
                    .toEqual(component.changesModalFooterModel.applyButtonText);
                expect(modalEl.componentInstance.defaultFooterModel.cancelButtonText)
                    .toEqual(component.changesModalFooterModel.cancelButtonText);
                expect(modalEl.componentInstance.defaultHeaderModel).toEqual(component.changesModalHeaderModel);
            });

            fit('Should modal body have appropriate value', () => {
                const modalService = TestBed.inject(ModalService);
                modalService.open();
                fixture.detectChanges();

                expect(fixture.nativeElement.querySelector('.changes-warning-body fa-icon svg').classList)
                    .toContain('fa-triangle-exclamation');
                expect(fixture.nativeElement.querySelector('.changes-warning-body h3').textContent)
                    .toEqual('Are you sure want to leave page without save profile changes?');
            });
        });
    });

    describe('Guard changes', () => {
        fit('Should emit that page data is not dirty infitialy', () => {
            const profile: IProfileModel = buildProfileModel();
            (sharePlayerServiceStub as any).playerCreated = true;
            (activateRouteMock.snapshot.data as any).profile = { result: profile };
            component.ngAfterViewInit();

            component.guardChanges$.subscribe((model: IChangesCheckGuardModel) =>
                expect(model).toEqual({ dirty: false, discardChanges: false }));
        });

        fit('Should emit that page data is not dirty', () => {
            const profile: IProfileModel = buildProfileModel(),
                firstNameInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-first-name');
            (sharePlayerServiceStub as any).playerCreated = true;
            (activateRouteMock.snapshot.data as any).profile = { result: profile };
            component.ngAfterViewInit();

            firstNameInputEl.value = profile.general.firstName;
            firstNameInputEl.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            component.guardChanges$.subscribe((model: IChangesCheckGuardModel) =>
                expect(model).toEqual({ dirty: false, discardChanges: false }));
        });

        fit('Should emit that page data is dirty', () => {
            const profile: IProfileModel = buildProfileModel(),
                firstNameInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-first-name');
            (sharePlayerServiceStub as any).playerCreated = true;
            (activateRouteMock.snapshot.data as any).profile = { result: profile };
            component.ngAfterViewInit();

            firstNameInputEl.value = 'New value';
            firstNameInputEl.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            component.guardChanges$.subscribe((model: IChangesCheckGuardModel) =>
                expect(model).toEqual({ dirty: true, discardChanges: false }));
        });

        fit('Should emit that need to discard changes', () => {
            spyOn(routerMock, 'navigate');
            const profile: IProfileModel = buildProfileModel(),
                firstNameInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-first-name'),
                modalService = TestBed.inject(ModalService),
                assertUrl = '/test';
            (sharePlayerServiceStub as any).playerCreated = true;
            (activateRouteMock.snapshot.data as any).profile = { result: profile };
            component.ngAfterViewInit();

            firstNameInputEl.value = 'New value';
            firstNameInputEl.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            modalService.open(assertUrl);
            fixture.detectChanges();

            const modalDiscardChangesBtnEl = fixture.debugElement.queryAll(By.css('sfc-default-modal-footer sfc-button'))[0];
            modalDiscardChangesBtnEl.nativeElement.click();
            fixture.detectChanges();

            component.guardChanges$.subscribe((model: IChangesCheckGuardModel) =>
                expect(model).toEqual({ dirty: true, discardChanges: true }));
            expect(routerMock.navigate).toHaveBeenCalledWith([assertUrl]);
        });
    });

    describe('Create process', () => {
        fit('Should not call create profile if form invalid', () => {
            spyOn(playerServiceStub, 'create' as any);

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();
            fixture.detectChanges();

            expect(playerServiceStub.create).not.toHaveBeenCalled();
        });

        fit('Should call create profile if form valid', fakeAsync(() => {
            spyCreate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();
            fixture.detectChanges();

            tick();

            expect(playerServiceStub.create).toHaveBeenCalledOnceWith({
                Player: {
                    Profile: {
                        General: {
                            Availability: {
                                Days: undefined,
                                From: undefined,
                                To: undefined
                            },
                            Biography: null,
                            Birthday: null,
                            City: 'City',
                            FirstName: 'First name',
                            FreePlay: false,
                            LastName: 'Last name',
                            Photo: null,
                            Tags: null
                        },
                        Football: {
                            Position: undefined,
                            AdditionalPosition: undefined,
                            GameStyle: undefined,
                            Height: null,
                            Weight: null,
                            Number: null,
                            PhysicalCondition: null,
                            Skill: null,
                            WeakFoot: null,
                            WorkingFoot: undefined
                        }
                    },
                    Stats: {
                        Points: {
                            Available: 3,
                            Used: 0
                        },
                        Values: [
                            { Category: 0, Type: 0, Value: 50 },
                            { Category: 0, Type: 1, Value: 50 },
                            { Category: 1, Type: 3, Value: 50 },
                            { Category: 1, Type: 2, Value: 50 },
                            { Category: 1, Type: 4, Value: 50 },
                            { Category: 1, Type: 5, Value: 50 },
                            { Category: 1, Type: 6, Value: 50 },
                            { Category: 1, Type: 7, Value: 50 },
                            { Category: 2, Type: 8, Value: 50 },
                            { Category: 2, Type: 9, Value: 50 },
                            { Category: 2, Type: 10, Value: 50 },
                            { Category: 2, Type: 11, Value: 50 },
                            { Category: 2, Type: 12, Value: 50 },
                            { Category: 2, Type: 13, Value: 50 },
                            { Category: 3, Type: 14, Value: 50 },
                            { Category: 3, Type: 15, Value: 50 },
                            { Category: 3, Type: 16, Value: 50 },
                            { Category: 3, Type: 17, Value: 50 },
                            { Category: 3, Type: 18, Value: 50 },
                            { Category: 3, Type: 19, Value: 50 },
                            { Category: 4, Type: 20, Value: 50 },
                            { Category: 4, Type: 21, Value: 50 },
                            { Category: 4, Type: 22, Value: 50 },
                            { Category: 4, Type: 23, Value: 50 },
                            { Category: 4, Type: 24, Value: 50 },
                            { Category: 5, Type: 25, Value: 50 },
                            { Category: 5, Type: 26, Value: 50 },
                            { Category: 5, Type: 27, Value: 50 },
                            { Category: 5, Type: 28, Value: 50 }
                        ]
                    }
                }
            });
        }));

        fit('Should show error if create failed', fakeAsync(() => {
            spyCreate(false);

            makeFormValid();

            const errorsEl = fixture.debugElement.query(By.css('.errors'));

            expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
            expect(errorsEl.styles['opacity']).toEqual('0');
            expect(fixture.nativeElement.querySelector('.error-message').textContent).toEqual(CommonConstants.EMPTY_STRING);

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();
            fixture.detectChanges();

            expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
            expect(errorsEl.styles['opacity']).toEqual('1');
            expect(fixture.nativeElement.querySelector('.error-message').textContent).toEqual('msg');
        }));

        fit('Should not do after creation flow if error occurred', fakeAsync(() => {
            spyOn(routerMock, 'navigate');
            spyOn(sharePlayerServiceStub as any, 'update').and.callThrough();
            spyOn(playerServiceStub, 'create' as any).and.returnValue(throwError(() => new Error()));
            spyOn(notificationServiceStub as any, 'notify').and.callThrough();
            const statsService = TestBed.inject(StatsService),
                statsServiceSpy = spyOn(statsService as any, 'init').and.callThrough();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            expect(routerMock.navigate).not.toHaveBeenCalled();
            expect(sharePlayerServiceStub.update).not.toHaveBeenCalled();
            expect(notificationServiceStub.notify).not.toHaveBeenCalled();
            expect(statsServiceSpy).not.toHaveBeenCalled();
        }));

        fit('Should clear previous error if create success', fakeAsync(() => {
            const createSpy = spyCreate(false);

            makeFormValid();

            const errorsEl = fixture.debugElement.query(By.css('.errors')),
                submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();
            fixture.detectChanges();

            expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
            expect(errorsEl.styles['opacity']).toEqual('1');

            createSpy.and.returnValue(of({
                Player: {},
                Errors: null,
                Success: true,
                Message: 'msg'
            } as ICreatePlayerResponse));

            submitBtnEl.nativeElement.click();

            tick();
            fixture.detectChanges();

            expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
            expect(errorsEl.styles['opacity']).toEqual('0');
        }));

        fit('Should navigate to player profile page on success create', fakeAsync(() => {
            spyCreate();
            spyOn(routerMock, 'navigate');

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            expect(routerMock.navigate).toHaveBeenCalledWith([`${RoutKey.Profiles}/100/${RoutKey.Edit}`]);
        }));

        fit('Should refresh guard changes on success create', fakeAsync(() => {
            spyCreate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            component.guardChanges$.subscribe((model: IChangesCheckGuardModel) =>
                expect(model).toEqual({ dirty: false, discardChanges: false }));
        }));

        fit('Should update title on success create', fakeAsync(() => {
            spyCreate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button')),
                titleService = TestBed.inject(Title);
            submitBtnEl.nativeElement.click();

            tick();

            expect(titleService.getTitle()).toBe(buildTitle('First name Last name'));
        }));

        fit('Should update shared player data on success create', fakeAsync(() => {
            spyOn(sharePlayerServiceStub as any, 'update').and.callThrough();
            spyCreate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            expect(sharePlayerServiceStub.update).toHaveBeenCalledOnceWith({
                Id: 100,
                Profile: {
                    General: { FirstName: 'First name', LastName: 'Last name', Photo: null },
                    Football: { Position: undefined }
                }
            });
        }));

        fit('Should send notification on success create', fakeAsync(() => {
            spyOn(notificationServiceStub as any, 'notify').and.callThrough();
            spyCreate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            expect(notificationServiceStub.notify).toHaveBeenCalledOnceWith({
                severity: MessageSeverity.INFO,
                value: EditPageLocalization.NOTIFICATIONS.CREATE.VALUE,
                title: EditPageLocalization.NOTIFICATIONS.CREATE.TITLE
            });
        }));

        fit('Should re-init stats on success create', fakeAsync(() => {
            const statsService = TestBed.inject(StatsService),
                statsServiceSpy = spyOn(statsService as any, 'init').and.callThrough();
            spyCreate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            expect(statsServiceSpy).toHaveBeenCalledOnceWith({ available: 3, used: 0 });
        }));
    });

    describe('Update process', () => {
        fit('Should not call update profile if form invalid', () => {
            spyOn(playerServiceStub, 'update' as any);
            (sharePlayerServiceStub as any).playerCreated = true;

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();
            fixture.detectChanges();

            expect(playerServiceStub.update).not.toHaveBeenCalled();
        });

        fit('Should call update profile if form valid', fakeAsync(() => {
            (sharePlayerServiceStub as any).playerCreated = true;
            spyUpdate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            expect(playerServiceStub.update).toHaveBeenCalledOnceWith(100, {
                Player: {
                    Profile: {
                        General: {
                            Availability: {
                                Days: undefined,
                                From: undefined,
                                To: undefined
                            },
                            Biography: null,
                            Birthday: null,
                            City: 'City',
                            FirstName: 'First name',
                            FreePlay: false,
                            LastName: 'Last name',
                            Photo: null,
                            Tags: null
                        },
                        Football: {
                            Position: undefined,
                            AdditionalPosition: undefined,
                            GameStyle: undefined,
                            Height: null,
                            Weight: null,
                            Number: null,
                            PhysicalCondition: null,
                            Skill: null,
                            WeakFoot: null,
                            WorkingFoot: undefined
                        }
                    },
                    Stats: {
                        Points: {
                            Available: 3,
                            Used: 0
                        },
                        Values: [
                            { Category: 0, Type: 0, Value: 50 },
                            { Category: 0, Type: 1, Value: 50 },
                            { Category: 1, Type: 3, Value: 50 },
                            { Category: 1, Type: 2, Value: 50 },
                            { Category: 1, Type: 4, Value: 50 },
                            { Category: 1, Type: 5, Value: 50 },
                            { Category: 1, Type: 6, Value: 50 },
                            { Category: 1, Type: 7, Value: 50 },
                            { Category: 2, Type: 8, Value: 50 },
                            { Category: 2, Type: 9, Value: 50 },
                            { Category: 2, Type: 10, Value: 50 },
                            { Category: 2, Type: 11, Value: 50 },
                            { Category: 2, Type: 12, Value: 50 },
                            { Category: 2, Type: 13, Value: 50 },
                            { Category: 3, Type: 14, Value: 50 },
                            { Category: 3, Type: 15, Value: 50 },
                            { Category: 3, Type: 16, Value: 50 },
                            { Category: 3, Type: 17, Value: 50 },
                            { Category: 3, Type: 18, Value: 50 },
                            { Category: 3, Type: 19, Value: 50 },
                            { Category: 4, Type: 20, Value: 50 },
                            { Category: 4, Type: 21, Value: 50 },
                            { Category: 4, Type: 22, Value: 50 },
                            { Category: 4, Type: 23, Value: 50 },
                            { Category: 4, Type: 24, Value: 50 },
                            { Category: 5, Type: 25, Value: 50 },
                            { Category: 5, Type: 26, Value: 50 },
                            { Category: 5, Type: 27, Value: 50 },
                            { Category: 5, Type: 28, Value: 50 }
                        ]
                    }
                }
            });
        }));

        fit('Should show error if update failed', fakeAsync(() => {
            (sharePlayerServiceStub as any).playerCreated = true;
            spyUpdate(false);

            makeFormValid();

            const errorsEl = fixture.debugElement.query(By.css('.errors'));

            expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
            expect(errorsEl.styles['opacity']).toEqual('0');
            expect(fixture.nativeElement.querySelector('.error-message').innerText).toEqual('');

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();
            fixture.detectChanges();

            expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
            expect(errorsEl.styles['opacity']).toEqual('1');
        }));

        fit('Should clear previous error if update success', fakeAsync(() => {
            (sharePlayerServiceStub as any).playerCreated = true;
            const updateSpy = spyUpdate(false);

            makeFormValid();

            const errorsEl = fixture.debugElement.query(By.css('.errors')),
                submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();
            fixture.detectChanges();

            expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_VISIBLE);
            expect(errorsEl.styles['opacity']).toEqual('1');

            updateSpy.and.returnValue(of({
                Errors: null,
                Success: true,
                Message: 'msg'
            } as IUpdatePlayerResponse));

            submitBtnEl.nativeElement.click();

            tick();
            fixture.detectChanges();

            expect(errorsEl.styles['visibility']).toEqual(UIConstants.CSS_VISIBILITY_HIDDEN);
            expect(errorsEl.styles['opacity']).toEqual('0');
        }));

        fit('Should not do after update flow if error occurred', fakeAsync(() => {
            spyOn(routerMock, 'navigate');
            spyOn(sharePlayerServiceStub as any, 'update').and.callThrough();
            spyOn(playerServiceStub, 'update' as any).and.returnValue(throwError(() => new Error()));
            spyOn(notificationServiceStub as any, 'notify').and.callThrough();
            const statsService = TestBed.inject(StatsService),
                statsServiceSpy = spyOn(statsService as any, 'init').and.callThrough();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            expect(routerMock.navigate).not.toHaveBeenCalled();
            expect(sharePlayerServiceStub.update).not.toHaveBeenCalled();
            expect(notificationServiceStub.notify).not.toHaveBeenCalled();
            expect(statsServiceSpy).not.toHaveBeenCalled();
        }));

        fit('Should refresh guard changes on success update', fakeAsync(() => {
            (sharePlayerServiceStub as any).playerCreated = true;
            spyUpdate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            component.guardChanges$.subscribe((model: IChangesCheckGuardModel) =>
                expect(model).toEqual({ dirty: false, discardChanges: false }));
        }));

        fit('Should update title on success update', fakeAsync(() => {
            (sharePlayerServiceStub as any).playerCreated = true;
            spyUpdate();

            makeFormValid('New first name');

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button')),
                titleService = TestBed.inject(Title);
            submitBtnEl.nativeElement.click();

            tick();

            expect(titleService.getTitle()).toBe(buildTitle('New first name Last name'));
        }));

        fit('Should send notification on success update', fakeAsync(() => {
            (sharePlayerServiceStub as any).playerCreated = true;
            spyOn(notificationServiceStub as any, 'notify').and.callThrough();
            spyUpdate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            expect(notificationServiceStub.notify).toHaveBeenCalledOnceWith({
                severity: MessageSeverity.INFO,
                value: EditPageLocalization.NOTIFICATIONS.UPDATE.VALUE,
                title: EditPageLocalization.NOTIFICATIONS.UPDATE.TITLE
            });
        }));

        fit('Should re init stats on success update', fakeAsync(() => {
            const statsService = TestBed.inject(StatsService),
                statsServiceSpy = spyOn(statsService as any, 'init').and.callThrough();
            (sharePlayerServiceStub as any).playerCreated = true;
            spyUpdate();

            makeFormValid();

            const submitBtnEl = fixture.debugElement.query(By.css('sfc-button'));
            submitBtnEl.nativeElement.click();

            tick();

            expect(statsServiceSpy).toHaveBeenCalledOnceWith({ available: 3, used: 0 });
        }));
    });

    function buildProfileModel(): IProfileModel {
        return {
            general: {
                firstName: 'First name',
                lastName: 'Last name',
                photo: null,
                biography: null,
                birthday: null,
                city: 'City',
                tags: null,
                freePlay: false,
                availability: {
                    from: null,
                    to: null,
                    days: null
                }
            },
            football: {
                height: null,
                weight: null,
                position: { key: 0, value: 'Goalkeeper' },
                additionalPosition: null,
                workingFoot: null,
                number: null,
                gameStyle: null,
                skill: null,
                weakFoot: null,
                physicalCondition: null,
            },
            stats: {
                points: {
                    available: 0,
                    used: 3
                },
                value: {
                    pace: {
                        acceleration: 50,
                        sprintSpeed: 50
                    },
                    shooting: {
                        positioning: 50,
                        finishing: 50,
                        shotPower: 50,
                        longShots: 50,
                        volleys: 50,
                        penalties: 50
                    },
                    passing: {
                        vision: 50,
                        crossing: 50,
                        fkAccuracy: 50,
                        shortPassing: 50,
                        longPassing: 50,
                        curve: 50
                    },
                    dribbling: {
                        agility: 50,
                        balance: 50,
                        reactions: 50,
                        ballControl: 50,
                        dribbling: 50,
                        composure: 50
                    },
                    defending: {
                        interceptions: 50,
                        headingAccuracy: 50,
                        defAwarenence: 50,
                        standingTackle: 50,
                        slidingTackle: 50
                    },
                    physicality: {
                        jumping: 50,
                        stamina: 50,
                        strength: 50,
                        aggresion: 50
                    }
                }
            }
        };
    }

    function buildProfileFormValue(firstName: string, lastName: string, city: string,
        position: IValueModel<number> | null = null)
        : IEditPageFormModel {
        return {
            photo: null,
            general: {
                firstName: firstName,
                lastName: lastName,
                biography: null,
                birthday: null,
                city: city,
                tags: null,
                freePlay: false,
                availability: {
                    from: null,
                    to: null,
                    days: null
                }
            },
            football: {
                height: null,
                weight: null,
                position: position,
                additionalPosition: null,
                workingFoot: null,
                number: null,
                gameStyle: null,
                skill: null,
                weakFoot: null,
                physicalCondition: null,
            },
            stats: {
                pace: {
                    acceleration: 50,
                    sprintSpeed: 50
                },
                shooting: {
                    positioning: 50,
                    finishing: 50,
                    shotPower: 50,
                    longShots: 50,
                    volleys: 50,
                    penalties: 50
                },
                passing: {
                    vision: 50,
                    crossing: 50,
                    fkAccuracy: 50,
                    shortPassing: 50,
                    longPassing: 50,
                    curve: 50
                },
                dribbling: {
                    agility: 50,
                    balance: 50,
                    reactions: 50,
                    ballControl: 50,
                    dribbling: 50,
                    composure: 50
                },
                defending: {
                    interceptions: 50,
                    headingAccuracy: 50,
                    defAwarenence: 50,
                    standingTackle: 50,
                    slidingTackle: 50
                },
                physicality: {
                    jumping: 50,
                    stamina: 50,
                    strength: 50,
                    aggresion: 50
                }
            }
        };
    }

    function getHugeFile(name: string, size: number): File {
        const file = new File([''], name);
        Object.defineProperty(
            file, 'size', { value: size, writable: false });
        return file;
    }

    function spyCreate(success: boolean = true): jasmine.Spy<any> {
        return spyOn(playerServiceStub, 'create' as any).and.returnValue(of({
            Player: { Id: 100 },
            Errors: null,
            Success: success,
            Message: 'msg'
        } as ICreatePlayerResponse));
    }

    function spyUpdate(success: boolean = true): jasmine.Spy<any> {
        return spyOn(playerServiceStub, 'update' as any).and.returnValue(of({
            Errors: null,
            Success: success,
            Message: 'msg'
        } as IUpdatePlayerResponse));
    }

    function makeFormValid(firstname: string = 'First name', setPhoto: boolean = false): void {
        const firstNameInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-first-name'),
            lastNameInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-last-name'),
            cityInputEl = fixture.nativeElement.querySelector('sfc-text-input .sfc-input#sfc-city');

        firstNameInputEl.value = firstname;
        firstNameInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        lastNameInputEl.value = 'Last name';
        lastNameInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        cityInputEl.value = 'City';
        cityInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        if (setPhoto) {
            const photoInputEl = fixture.debugElement.query(By.css('sfc-image-input#photo')),
                invalidPhoto = getHugeFile('test.jpg', 100);

            photoInputEl.componentInstance.onChange(invalidPhoto);
            fixture.detectChanges();
        }
    }

    function selectTab(index: number): void {
        const tabEls: DebugElement[] = fixture.debugElement.queryAll(By.css('div.tab'));
        tabEls[index].nativeElement.dispatchEvent(new KeyboardEvent('click'));
        fixture.detectChanges();
    }
});
