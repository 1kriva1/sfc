import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ShareModule } from "@share/share.module";
import { NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { StatsFilterComponent } from "./stats-filter.component";
import { StatsFilterConstants } from "./stats-filter.contants";
import { StatsFilterLocalization } from "./stats-filter.localization";

describe('Features.Player.Page:PlayersSearch.Part: StatsFilter', () => {
    let component: StatsFilterComponent;
    let fixture: ComponentFixture<StatsFilterComponent>;
    let formGroupDirective: FormGroupDirective;

    beforeEach(async () => {
        const formBuilder = new FormBuilder();
        formGroupDirective = new FormGroupDirective([], []);
        formGroupDirective.form = formBuilder.group({});

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcInputsModule, ShareModule],
            declarations: [StatsFilterComponent],
            providers: [
                { provide: FormGroupDirective, useValue: formGroupDirective }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StatsFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.row').length).toEqual(5);
            expect(fixture.nativeElement.querySelectorAll('.column').length).toEqual(5);
        });
    });

    describe('Form', () => {
        fit('Should have valid inputs count', () => {
            const inputs = fixture.nativeElement.querySelectorAll('input');

            expect(inputs.length).toEqual(14);
        });

        fit('Should have initial value', () => {
            expect((component as any).form.value)
                .toEqual({
                    stats: {
                        total: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                        physical: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                        mental: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                        skill: { from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT },
                        raiting: null
                    }
                });
        });

        fit('Should be valid', () => {
            expect(formGroupDirective.form.valid).toBeTrue();
        });

        describe('Inputs', () => {
            describe('Total', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-range-input#total'));

                    expect(input.componentInstance.label).toEqual(StatsFilterLocalization.INPUT.TOTAL.LABEL);
                    expect(input.componentInstance.multiple).toBeTrue();
                    expect(input.componentInstance.showValue).toBeTrue();
                    expect(input.componentInstance.helperText).toEqual(StatsFilterLocalization.INPUT.TOTAL.HELPER_TEXT);
                    expect(input.componentInstance.generateMultipleLabel).toBeTruthy();
                });

                fit('Should generate label', () => {
                    expect(fixture.nativeElement.querySelector('sfc-range-input#total span.value').innerText)
                        .toEqual(component.generateRangeLabel(StatsFilterConstants.FROM_STATS_DEFAULT, StatsFilterConstants.TO_STATS_DEFAULT));
                });
            });

            describe('Raiting', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-stars-input#raiting'));

                    expect(input.componentInstance.label).toEqual(StatsFilterLocalization.INPUT.RAITING.LABEL);
                    expect(input.componentInstance.helperText).toEqual(StatsFilterLocalization.INPUT.RAITING.HELPER_TEXT);
                    expect(input.componentInstance.resetLabel).toEqual(StatsFilterLocalization.RESET_LABEL);
                    expect(input.componentInstance.reset).toBeTrue();
                });
            });

            describe('Physical', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-range-input#physical'));

                    expect(input.componentInstance.label).toEqual(StatsFilterLocalization.INPUT.PHYSICAL.LABEL);
                    expect(input.componentInstance.multiple).toBeTrue();
                    expect(input.componentInstance.showValue).toBeTrue();
                    expect(input.componentInstance.helperText).toEqual(StatsFilterLocalization.INPUT.PHYSICAL.HELPER_TEXT);
                    expect(input.componentInstance.generateMultipleLabel).toBeTruthy();
                });

                fit('Should generate label', () => {
                    expect(fixture.nativeElement.querySelector('sfc-range-input#physical span.value').innerText)
                        .toEqual(component.generateRangeLabel(StatsFilterConstants.FROM_STATS_DEFAULT, StatsFilterConstants.TO_STATS_DEFAULT));
                });
            });

            describe('Mental', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-range-input#mental'));

                    expect(input.componentInstance.label).toEqual(StatsFilterLocalization.INPUT.MENTAL.LABEL);
                    expect(input.componentInstance.multiple).toBeTrue();
                    expect(input.componentInstance.showValue).toBeTrue();
                    expect(input.componentInstance.helperText).toEqual(StatsFilterLocalization.INPUT.MENTAL.HELPER_TEXT);
                    expect(input.componentInstance.generateMultipleLabel).toBeTruthy();
                });

                fit('Should generate label', () => {
                    expect(fixture.nativeElement.querySelector('sfc-range-input#mental span.value').innerText)
                        .toEqual(component.generateRangeLabel(StatsFilterConstants.FROM_STATS_DEFAULT, StatsFilterConstants.TO_STATS_DEFAULT));
                });
            });

            describe('Skill', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-range-input#skill'));

                    expect(input.componentInstance.label).toEqual(StatsFilterLocalization.INPUT.SKILL.LABEL);
                    expect(input.componentInstance.multiple).toBeTrue();
                    expect(input.componentInstance.showValue).toBeTrue();
                    expect(input.componentInstance.helperText).toEqual(StatsFilterLocalization.INPUT.SKILL.HELPER_TEXT);
                    expect(input.componentInstance.generateMultipleLabel).toBeTruthy();
                });

                fit('Should generate label', () => {
                    expect(fixture.nativeElement.querySelector('sfc-range-input#skill span.value').innerText)
                        .toEqual(component.generateRangeLabel(StatsFilterConstants.FROM_STATS_DEFAULT, StatsFilterConstants.TO_STATS_DEFAULT));
                });
            });
        });
    });
});