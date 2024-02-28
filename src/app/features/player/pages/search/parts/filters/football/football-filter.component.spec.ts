import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { EnumService } from "@share/services";
import { ShareModule } from "@share/share.module";
import { ENUM_SERVICE } from "@test/stubs";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { FootballFilterComponent } from "./football-filter.component";
import { FootballFilterConstants } from "./football-filter.constants";
import { FootballFilterLocalization } from "./football-filter.localization";

describe('Features.Player.Page:PlayersSearch.Part: FootballFilter', () => {
    let component: FootballFilterComponent;
    let fixture: ComponentFixture<FootballFilterComponent>;
    let formGroupDirective: FormGroupDirective;

    beforeEach(async () => {
        const formBuilder = new FormBuilder();
        formGroupDirective = new FormGroupDirective([], []);
        formGroupDirective.form = formBuilder.group({});

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcInputsModule, ShareModule],
            declarations: [FootballFilterComponent],
            providers: [
                { provide: FormGroupDirective, useValue: formGroupDirective },
                { provide: EnumService, useValue: ENUM_SERVICE }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FootballFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.row').length).toEqual(7);
            expect(fixture.nativeElement.querySelectorAll('.column').length).toEqual(7);
        });
    });

    describe('Form', () => {
        fit('Should have valid inputs count', () => {
            const inputs = fixture.nativeElement.querySelectorAll('input');

            expect(inputs.length).toEqual(19);
        });

        fit('Should have initial value', () => {
            expect((component as any).form.value)
                .toEqual({
                    football: {
                        height: { from: FootballFilterConstants.FROM_HEIGHT_DEFAULT, to: FootballFilterConstants.TO_HEIGHT_DEFAULT },
                        weight: { from: FootballFilterConstants.FROM_WEIGHT_DEFAULT, to: FootballFilterConstants.TO_WEIGHT_DEFAULT },
                        positions: null,
                        workingFoot: null,
                        gameStyles: null,
                        physicalCondition: null,
                        skill: null
                    }
                });
        });

        fit('Should be valid', () => {
            expect(formGroupDirective.form.valid).toBeTrue();
        });

        describe('Inputs', () => {
            describe('Positions', () => {
                fit('Should have appropriate attributes', () => {
                    const additionalPositionInput: DebugElement = fixture.debugElement.query(By.css('sfc-bubbles-input#positions'));

                    expect(additionalPositionInput.componentInstance.label).toEqual(FootballFilterLocalization.INPUT.POSITIONS.LABEL);
                    expect(additionalPositionInput.componentInstance.helperText).toEqual(FootballFilterLocalization.INPUT.POSITIONS.HELPER_TEXT);
                    expect(additionalPositionInput.componentInstance.items).toEqual(component.POSITIONS);
                });
            });

            describe('Physical condition', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-stars-input#physical-condition'));

                    expect(input.componentInstance.label).toEqual(FootballFilterLocalization.INPUT.PHYSICAL_CONDITION.LABEL);
                    expect(input.componentInstance.helperText).toEqual(FootballFilterLocalization.INPUT.PHYSICAL_CONDITION.HELPER_TEXT);
                    expect(input.componentInstance.resetLabel).toEqual(FootballFilterLocalization.RESET_LABEL);
                    expect(input.componentInstance.reset).toBeTrue();
                });
            });

            describe('Game styles', () => {
                fit('Should have appropriate attributes', () => {
                    const additionalPositionInput: DebugElement = fixture.debugElement.query(By.css('sfc-bubbles-input#game-styles'));

                    expect(additionalPositionInput.componentInstance.label).toEqual(FootballFilterLocalization.INPUT.GAME_STYLES.LABEL);
                    expect(additionalPositionInput.componentInstance.helperText).toEqual(FootballFilterLocalization.INPUT.GAME_STYLES.HELPER_TEXT);
                    expect(additionalPositionInput.componentInstance.items).toEqual(component.GAME_STYLES);
                });
            });

            describe('Working foot', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-select-input#working-foot'));

                    expect(input.componentInstance.label).toEqual(FootballFilterLocalization.INPUT.WORKING_FOOT.LABEL);
                    expect(input.componentInstance.helperText).toEqual(FootballFilterLocalization.INPUT.WORKING_FOOT.HELPER_TEXT);
                    expect(input.componentInstance.placeholder).toEqual(FootballFilterLocalization.INPUT.WORKING_FOOT.PLACEHOLDER);
                    expect(input.componentInstance.defaultItemLabel).toEqual(FootballFilterLocalization.INPUT.WORKING_FOOT.DEFAULT_ITEM_LABEL);
                    expect(input.componentInstance.multiple).toBeFalse();
                    expect(input.componentInstance.showDefaultItem).toBeTrue();
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.data).toEqual(component.enumService.enums.workingFoots);
                });
            });

            describe('Height', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-range-input#height'));

                    expect(input.componentInstance.label).toEqual(FootballFilterLocalization.INPUT.HEIGHT.LABEL);
                    expect(input.componentInstance.multiple).toBeTrue();
                    expect(input.componentInstance.showValue).toBeTrue();
                    expect(input.componentInstance.max).toEqual(FootballFilterConstants.MAX_HEIGHT);
                    expect(input.componentInstance.helperText).toEqual(FootballFilterLocalization.INPUT.HEIGHT.HELPER_TEXT);
                    expect(input.componentInstance.generateMultipleLabel).toBeTruthy();
                });

                fit('Should generate label', () => {
                    expect(fixture.nativeElement.querySelector('sfc-range-input#height span.value').innerText)
                        .toEqual(component.generateHeightRangeLabel(FootballFilterConstants.FROM_HEIGHT_DEFAULT, FootballFilterConstants.TO_HEIGHT_DEFAULT));
                });
            });

            describe('Weight', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-range-input#weight'));

                    expect(input.componentInstance.label).toEqual(FootballFilterLocalization.INPUT.WEIGHT.LABEL);
                    expect(input.componentInstance.multiple).toBeTrue();
                    expect(input.componentInstance.showValue).toBeTrue();
                    expect(input.componentInstance.max).toEqual(FootballFilterConstants.MAX_WEIGHT);
                    expect(input.componentInstance.helperText).toEqual(FootballFilterLocalization.INPUT.WEIGHT.HELPER_TEXT);
                    expect(input.componentInstance.generateMultipleLabel).toBeTruthy();
                });

                fit('Should generate label', () => {
                    expect(fixture.nativeElement.querySelector('sfc-range-input#weight span.value').innerText)
                        .toEqual(component.generateWeightRangeLabel(FootballFilterConstants.FROM_WEIGHT_DEFAULT, FootballFilterConstants.TO_WEIGHT_DEFAULT));
                });
            });

            describe('Skill', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-stars-input#skill'));

                    expect(input.componentInstance.label).toEqual(FootballFilterLocalization.INPUT.SKILL.LABEL);
                    expect(input.componentInstance.helperText).toEqual(FootballFilterLocalization.INPUT.SKILL.HELPER_TEXT);
                    expect(input.componentInstance.resetLabel).toEqual(FootballFilterLocalization.RESET_LABEL);
                    expect(input.componentInstance.reset).toBeTrue();
                });
            });
        });
    });
});