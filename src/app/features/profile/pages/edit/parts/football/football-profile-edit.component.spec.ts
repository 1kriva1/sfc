import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EnumService } from '@share/services';
import { ShareModule } from '@share/share.module';
import { ENUM_SERVICE } from '@test/stubs';
import { hasItemBy, NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { FootballProfileEditComponent } from './football-profile-edit.component';
import { FootballProfileEditConstants } from './football-profile-edit.constants';
import { FootballProfileEditLocalization } from './football-profile-edit.localization';

describe('Features.Profile.Page:ProfileEdit.Part:FootballProfileEdit', () => {
    let component: FootballProfileEditComponent;
    let fixture: ComponentFixture<FootballProfileEditComponent>;
    let formGroupDirective: FormGroupDirective;

    beforeEach(async () => {
        const formBuilder = new FormBuilder();
        formGroupDirective = new FormGroupDirective([], []);
        formGroupDirective.form = formBuilder.group({});

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, NgxSfcCommonModule, NgxSfcInputsModule, ShareModule],
            declarations: [FootballProfileEditComponent],
            providers: [
                { provide: FormGroupDirective, useValue: formGroupDirective },
                { provide: EnumService, useValue: ENUM_SERVICE }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FootballProfileEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('sfc-title').length).toEqual(2);
            expect(fixture.nativeElement.querySelectorAll('.row').length).toEqual(4);
            expect(fixture.nativeElement.querySelectorAll('.column').length).toEqual(10);
            expect(fixture.nativeElement.querySelector('.row.physical')).toBeTruthy();
        });
    });

    describe('Titles', () => {
        fit('Should game title have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-title'))[0];

            expect(titleEl.componentInstance.label).toEqual(FootballProfileEditLocalization.TITLE.GAME.LABEL);
            expect(titleEl.componentInstance.description).toEqual(FootballProfileEditLocalization.TITLE.GAME.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(FootballProfileEditLocalization.TITLE.GAME.TOOLTIP);
        });

        fit('Should physical title have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.queryAll(By.css('sfc-title'))[1];

            expect(titleEl.componentInstance.label).toEqual(FootballProfileEditLocalization.TITLE.PHYSICAL.LABEL);
            expect(titleEl.componentInstance.description).toEqual(FootballProfileEditLocalization.TITLE.PHYSICAL.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(FootballProfileEditLocalization.TITLE.PHYSICAL.TOOLTIP);
        });
    });

    describe('Form', () => {
        fit('Should have valid inputs count', () => {
            const inputs = fixture.nativeElement.querySelectorAll('input');

            expect(inputs.length).toEqual(25);
        });

        fit('Should have initial value', () => {
            expect((component as any).form.value)
                .toEqual({
                    football: {
                        height: null,
                        weight: null,
                        number: null,
                        position: null,
                        additionalPosition: null,
                        workingFoot: null,
                        gameStyle: null,
                        physicalCondition: null,
                        skill: null,
                        weakFoot: null
                    }
                });
        });

        fit('Should be invalid', () => {
            expect(formGroupDirective.form.valid).toBeTrue();
        });

        describe('Position input', () => {
            fit('Should have appropriate attributes', () => {
                const positionInput: DebugElement = fixture.debugElement.query(By.css('sfc-select-input#position'));

                expect(positionInput.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.POSITION.LABEL_PLACEHOLDER);
                expect(positionInput.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.POSITION.HELPER_TEXT);
                expect(positionInput.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.POSITION.LABEL_PLACEHOLDER);
                expect(positionInput.componentInstance.multiple).toBeFalse();
                expect(positionInput.componentInstance.showDefaultItem).toBeFalse();
                expect(positionInput.componentInstance.bordered).toBeTrue();
                expect(positionInput.componentInstance.data).toEqual(component.enumService.enums.footballPositions);
            });

            fit('Should remove position from additional positions list', () => {
                const positionInput: DebugElement = fixture.debugElement.query(By.css('sfc-select-input#position')),
                    midfielderItemEl = positionInput.queryAll(By.css('sfc-select-item'))[2],
                    additionalPositionInput = fixture.debugElement.query(By.css('sfc-select-input#additional-position'));

                expect(hasItemBy(additionalPositionInput.queryAll(By.css('sfc-select-item')),
                    (p: any) => p.componentInstance.item.key === 2)).toBeTrue();

                midfielderItemEl.query(By.css('div')).triggerEventHandler('mousedown', new MouseEvent('mousedown'));
                fixture.detectChanges();

                expect(hasItemBy(additionalPositionInput.queryAll(By.css('sfc-select-item')),
                    (p: any) => p.componentInstance.item.key === 2)).toBeFalse();
            });

            fit('Should clear selected value for additional position when fit match position value', () => {
                const positionInput: DebugElement = fixture.debugElement.query(By.css('sfc-select-input#position')),
                    additionalPositionInput = fixture.debugElement.query(By.css('sfc-select-input#additional-position')),
                    midfielderPositionItemEl = positionInput.queryAll(By.css('sfc-select-item'))[2],
                    midfielderAdditionalPositionItemEl = additionalPositionInput.queryAll(By.css('sfc-select-item'))[2];

                midfielderAdditionalPositionItemEl.query(By.css('div')).triggerEventHandler('mousedown', new MouseEvent('mousedown'));
                fixture.detectChanges();

                expect((component as any).form.value.football.additionalPosition).toEqual({ key: 2, value: 'Midfielder' });

                midfielderPositionItemEl.query(By.css('div')).triggerEventHandler('mousedown', new MouseEvent('mousedown'));
                fixture.detectChanges();

                expect((component as any).form.value.football.additionalPosition).toBeNull();
            });
        });

        describe('Additional position input', () => {
            fit('Should have appropriate attributes', () => {
                const additionalPositionInput: DebugElement = fixture.debugElement.query(By.css('sfc-select-input#additional-position'));

                expect(additionalPositionInput.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.ADDITIONAL_POSITION.LABEL_PLACEHOLDER);
                expect(additionalPositionInput.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.ADDITIONAL_POSITION.HELPER_TEXT);
                expect(additionalPositionInput.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.ADDITIONAL_POSITION.LABEL_PLACEHOLDER);
                expect(additionalPositionInput.componentInstance.multiple).toBeFalse();
                expect(additionalPositionInput.componentInstance.showDefaultItem).toBeFalse();
                expect(additionalPositionInput.componentInstance.bordered).toBeTrue();
                expect(additionalPositionInput.queryAll(By.css('sfc-select-item')).length).toEqual(4);
            });
        });

        describe('Game style input', () => {
            fit('Should have appropriate attributes', () => {
                const input: DebugElement = fixture.debugElement.query(By.css('sfc-select-input#game-style'));

                expect(input.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.GAME_STYLE.LABEL_PLACEHOLDER);
                expect(input.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.GAME_STYLE.HELPER_TEXT);
                expect(input.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.GAME_STYLE.LABEL_PLACEHOLDER);
                expect(input.componentInstance.multiple).toBeFalse();
                expect(input.componentInstance.showDefaultItem).toBeFalse();
                expect(input.componentInstance.bordered).toBeTrue();
                expect(input.componentInstance.data).toEqual(component.enumService.enums.gameStyles);
            });
        });

        describe('Skill input', () => {
            fit('Should have appropriate attributes', () => {
                const input: DebugElement = fixture.debugElement.query(By.css('sfc-stars-input#skill'));

                expect(input.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.SKILL.LABEL_PLACEHOLDER);
                expect(input.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.SKILL.HELPER_TEXT);
                expect(input.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.SKILL.LABEL_PLACEHOLDER);
            });
        });

        describe('Week foot input', () => {
            fit('Should have appropriate attributes', () => {
                const input: DebugElement = fixture.debugElement.query(By.css('sfc-stars-input#weak-foot'));

                expect(input.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.WEAK_FOOT.LABEL_PLACEHOLDER);
                expect(input.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.WEAK_FOOT.HELPER_TEXT);
                expect(input.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.WEAK_FOOT.LABEL_PLACEHOLDER);
            });
        });

        describe('Number input', () => {
            fit('Should have appropriate attributes', () => {
                const input: DebugElement = fixture.debugElement.query(By.css('sfc-number-input#number'));

                expect(input.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.NUMBER.LABEL_PLACEHOLDER);
                expect(input.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.NUMBER.HELPER_TEXT);
                expect(input.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.NUMBER.LABEL_PLACEHOLDER);
                expect(input.componentInstance.edit).toBeTrue();
                expect(input.componentInstance.fixedActions).toBeTrue();
                expect(input.componentInstance.fixedWidth).toBeTrue();
                expect(input.componentInstance.min).toEqual(FootballProfileEditConstants.MIN_NUMBER_VALUE);
                expect(input.componentInstance.max).toEqual(FootballProfileEditConstants.MAX_NUMBER_VALUE);
                expect(input.componentInstance.sign).toBeFalse();
            });
        });

        describe('Height input', () => {
            fit('Should have appropriate attributes', () => {
                const input: DebugElement = fixture.debugElement.query(By.css('sfc-number-input#height'));

                expect(input.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.HEIGHT.LABEL_PLACEHOLDER);
                expect(input.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.HEIGHT.HELPER_TEXT);
                expect(input.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.HEIGHT.LABEL_PLACEHOLDER);
                expect(input.componentInstance.edit).toBeTrue();
                expect(input.componentInstance.fixedActions).toBeTrue();
                expect(input.componentInstance.fixedWidth).toBeTrue();
                expect(input.componentInstance.min).toEqual(FootballProfileEditConstants.MIN_SIZE_VALUE);
                expect(input.componentInstance.max).toEqual(FootballProfileEditConstants.MAX_SIZE_VALUE);
                expect(input.componentInstance.sign).toBeFalse();
                expect(input.componentInstance.validations).toEqual({
                    'max': component.MAX_HEIGHT_VALUE_VALIDATION
                });
            });
        });

        describe('Weight input', () => {
            fit('Should have appropriate attributes', () => {
                const input: DebugElement = fixture.debugElement.query(By.css('sfc-number-input#weight'));

                expect(input.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.WEIGHT.LABEL_PLACEHOLDER);
                expect(input.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.WEIGHT.HELPER_TEXT);
                expect(input.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.WEIGHT.LABEL_PLACEHOLDER);
                expect(input.componentInstance.edit).toBeTrue();
                expect(input.componentInstance.fixedActions).toBeTrue();
                expect(input.componentInstance.fixedWidth).toBeTrue();
                expect(input.componentInstance.min).toEqual(FootballProfileEditConstants.MIN_SIZE_VALUE);
                expect(input.componentInstance.max).toEqual(FootballProfileEditConstants.MAX_SIZE_VALUE);
                expect(input.componentInstance.sign).toBeFalse();
                expect(input.componentInstance.validations).toEqual({
                    'max': component.MAX_WEIGHT_VALUE_VALIDATION
                });
            });
        });

        describe('Physical condition input', () => {
            fit('Should have appropriate attributes', () => {
                const input: DebugElement = fixture.debugElement.query(By.css('sfc-stars-input#physical-condition'));

                expect(input.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.PHYSICAL_CONDITION.LABEL_PLACEHOLDER);
                expect(input.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.PHYSICAL_CONDITION.HELPER_TEXT);
                expect(input.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.PHYSICAL_CONDITION.LABEL_PLACEHOLDER);
            });
        });

        describe('Working foot input', () => {
            fit('Should have appropriate attributes', () => {
                const input: DebugElement = fixture.debugElement.query(By.css('sfc-select-input#working-foot'));

                expect(input.componentInstance.label).toEqual(FootballProfileEditLocalization.INPUT.WORKING_FOOT.LABEL_PLACEHOLDER);
                expect(input.componentInstance.helperText).toEqual(FootballProfileEditLocalization.INPUT.WORKING_FOOT.HELPER_TEXT);
                expect(input.componentInstance.placeholder).toEqual(FootballProfileEditLocalization.INPUT.WORKING_FOOT.LABEL_PLACEHOLDER);
                expect(input.componentInstance.multiple).toBeFalse();
                expect(input.componentInstance.showDefaultItem).toBeFalse();
                expect(input.componentInstance.bordered).toBeTrue();
                expect(input.componentInstance.data).toEqual(component.enumService.enums.workingFoots);
            });
        });
    });
});
