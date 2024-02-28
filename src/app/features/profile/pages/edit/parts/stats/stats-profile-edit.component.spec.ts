import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EnumService } from '@share/services';
import { ShareModule } from '@share/share.module';
import { StatsValue } from '@share/types';
import { ENUM_SERVICE } from '@test/stubs';
import { NgxSfcCommonModule, Sequence, where } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { StatsService } from './services/stats.service';
import { StatsProfileEditComponent } from './stats-profile-edit.component';
import { StatsProfileEditLocalization } from './stats-profile-edit.localization';

describe('Features.Profile.Page:ProfileEdit.Part:StatsProfileEdit', () => {
    let component: StatsProfileEditComponent;
    let fixture: ComponentFixture<StatsProfileEditComponent>;
    let formGroupDirective: FormGroupDirective;
    let statsServiceStub: Partial<StatsService> = {
        stats: { difference: 0, available: 0, percentage: 0, used: 0 },
        initial: { available: 0, used: 0 },
        toggle: () => { }
    };

    beforeEach(async () => {
        const formBuilder = new FormBuilder();
        formGroupDirective = new FormGroupDirective([], []);
        formGroupDirective.form = formBuilder.group({});

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, NgxSfcCommonModule, NgxSfcComponentsModule, NgxSfcInputsModule, ShareModule],
            declarations: [StatsProfileEditComponent],
            providers: [
                { provide: FormGroupDirective, useValue: formGroupDirective },
                { provide: StatsService, useValue: statsServiceStub },
                { provide: EnumService, useValue: ENUM_SERVICE }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(StatsProfileEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        statsServiceStub.stats!.difference = 0;
        statsServiceStub.stats!.used = 0;
    });

    describe('General', () => {
        fit('Should create component', () => {
            expect(component).toBeTruthy();
        });

        fit('Should have main elements', () => {
            expect(fixture.nativeElement.querySelector('.container')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-title')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.part').length).toEqual(9);
            expect(fixture.nativeElement.querySelectorAll('sfc-progress-semi-circle').length).toEqual(3);
            expect(fixture.nativeElement.querySelector('.header')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.title')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('sfc-progress-line')).toBeTruthy();
            expect(fixture.nativeElement.querySelector('.content')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.line').length).toEqual(29);
            expect(fixture.nativeElement.querySelectorAll('sfc-number-input').length).toEqual(29);
        });

        fit('Should call unsubscribe for all stat inputs', () => {
            const subscriptions: any[] = (component as any)._statsControlsSubscriptions,
                subscriptionsSpy: any[] = [];

            expect(subscriptions.length).toEqual(29);

            subscriptions.forEach(subscription =>
                subscriptionsSpy.push(spyOn(subscription, 'unsubscribe').and.callThrough()));

            component.ngOnDestroy();

            subscriptionsSpy.every(subscription => expect(subscription).toHaveBeenCalledTimes(1));
        });

        fit('Should have valid inputs count', () => {
            const inputs = fixture.nativeElement.querySelectorAll('input');

            expect(inputs.length).toEqual(29);
        });

        fit('Should have form initial value', () => {
            expect((component as any).form.value)
                .toEqual({ stats: getStats() });
        });
    });

    describe('Titles', () => {
        fit('Should have appropriate attributes', () => {
            const titleEl: DebugElement = fixture.debugElement.query(By.css('sfc-title'));

            expect(titleEl.componentInstance.label).toEqual(StatsProfileEditLocalization.TITLE.LABEL);
            expect(titleEl.componentInstance.description).toEqual(StatsProfileEditLocalization.TITLE.DESCRIPTION);
            expect(titleEl.componentInstance.tooltip).toEqual(StatsProfileEditLocalization.TITLE.TOOLTIP);
        });
    });

    describe('Avarage', () => {
        fit('Should physical avarage have appropriate attributes', () => {
            const avarageEl: DebugElement = fixture.debugElement.queryAll(By.css('.avarage .part'))[0],
                progressEl = avarageEl.query(By.css('sfc-progress-semi-circle'));

            expect(avarageEl.query(By.css('h3')).nativeElement.innerText).toEqual('Physical');
            expect(progressEl.componentInstance.progress).toEqual(400);
            expect(progressEl.componentInstance.max).toEqual(800);
            expect(progressEl.componentInstance.getColor).toBeDefined();
        });

        fit('Should mental avarage have appropriate attributes', () => {
            const avarageEl: DebugElement = fixture.debugElement.queryAll(By.css('.avarage .part'))[1],
                progressEl = avarageEl.query(By.css('sfc-progress-semi-circle'));

            expect(avarageEl.query(By.css('h3')).nativeElement.innerText).toEqual('Mental');
            expect(progressEl.componentInstance.progress).toEqual(100);
            expect(progressEl.componentInstance.max).toEqual(200);
            expect(progressEl.componentInstance.getColor).toBeDefined();
        });

        fit('Should skill avarage have appropriate attributes', () => {
            const avarageEl: DebugElement = fixture.debugElement.queryAll(By.css('.avarage .part'))[2],
                progressEl = avarageEl.query(By.css('sfc-progress-semi-circle'));

            expect(avarageEl.query(By.css('h3')).nativeElement.innerText).toEqual('Skill');
            expect(progressEl.componentInstance.progress).toEqual(950);
            expect(progressEl.componentInstance.max).toEqual(1900);
            expect(progressEl.componentInstance.getColor).toBeDefined();
        });
    });

    describe('Stats', () => {
        describe('Number inputs', () => {
            describe('Increase', () => {
                fit('Should next button be disabled for all inputs', () => {
                    statsServiceStub.stats!.difference = 0;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('sfc-number-input'))
                        .every(el => el.componentInstance.disableNext)).toBeTrue();
                });

                fit('Should next button be enabled for all inputs', () => {
                    statsServiceStub.stats!.difference = 1;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('sfc-number-input'))
                        .every(el => el.componentInstance.disableNext)).toBeFalse();
                });

                fit('Should toggle stat on next call', () => {
                    spyOn(statsServiceStub as any, 'toggle').and.callThrough();
                    statsServiceStub.stats!.difference = 1;
                    fixture.detectChanges();

                    fixture.nativeElement.querySelector('sfc-number-input sfc-number-spinner .lever.next')
                        .dispatchEvent(new MouseEvent('click', {}));
                    fixture.detectChanges();

                    expect(statsServiceStub.toggle).toHaveBeenCalledOnceWith(Sequence.Next);
                });
            });

            describe('Decrease', () => {
                fit('Should previous button be disabled for all inputs', () => {
                    statsServiceStub.stats!.difference = 0;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('sfc-number-input'))
                        .every(el => el.componentInstance.disablePrevious)).toBeTrue();
                });

                fit('Should previous button be enabled for all inputs', () => {
                    statsServiceStub.stats!.used = 1;
                    fixture.detectChanges();

                    expect(fixture.debugElement.queryAll(By.css('sfc-number-input'))
                        .every(el => el.componentInstance.disablePrevious)).toBeFalse();
                });

                fit('Should toggle stat on previous call', () => {
                    spyOn(statsServiceStub as any, 'toggle').and.callThrough();
                    statsServiceStub.stats!.used = 1;
                    fixture.detectChanges();

                    fixture.nativeElement.querySelector('sfc-number-input sfc-number-spinner .lever.previous')
                        .dispatchEvent(new MouseEvent('click', {}));
                    fixture.detectChanges();

                    expect(statsServiceStub.toggle).toHaveBeenCalledOnceWith(Sequence.Previous);
                });
            });
        });

        describe('Pace', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(0);
            });

            fit('Should have appropriate contents', () => {
                expectStat(0);
            });
        });

        describe('Shooting', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(1);
            });

            fit('Should have appropriate contents', () => {
                expectStat(1);
            });
        });

        describe('Passing', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(2);
            });

            fit('Should have appropriate contents', () => {
                expectStat(2);
            });
        });

        describe('Dribbling', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(3);
            });

            fit('Should have appropriate contents', () => {
                expectStat(3);
            });
        });

        describe('Defending', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(4);
            });

            fit('Should have appropriate contents', () => {
                expectStat(4);
            });
        });

        describe('Physicalfity', () => {
            fit('Should header have appropriate attributes', () => {
                expectStatHeader(5);
            });

            fit('Should have appropriate contents', () => {
                expectStat(5);
            });
        });

        function expectStatHeader(index: number): void {
            const partEl: DebugElement = fixture.debugElement.queryAll(By.css('.items .part'))[index],
                titleEl = partEl.query(By.css('.header .title span')),
                progressEl = partEl.query(By.css('.header sfc-progress-line'));

            expect(partEl.query(By.css('.header .title h3')).nativeElement.innerText)
                .toEqual(ENUM_SERVICE.enums?.statCategories[index].value);
            expect(titleEl.nativeElement.innerText).toEqual('50');
            expect(titleEl.nativeElement.style['color']).toEqual('rgb(255, 206, 84)');
            expect(progressEl.componentInstance.progress).toEqual(50);
            expect(progressEl.componentInstance.hideEnd).toBeTrue();
        }

        function expectStat(index: number): void {
            const partEl: DebugElement = fixture.debugElement.queryAll(By.css('.items .part'))[index],
                statsEls: DebugElement[] = partEl.queryAll(By.css('.content .line')),
                contentEl = partEl.query(By.css('.content')),
                categoryTypes = where(ENUM_SERVICE.enums?.statTypes!, type => type.category === index);

            expect(contentEl.attributes['ng-reflect-name'])
                .toEqual(`${ENUM_SERVICE.enums?.statCategories[index].key}`);
            expect(statsEls.length).toEqual(categoryTypes!.length);

            statsEls.forEach((el: DebugElement, statIndex: number) => {
                const stat = categoryTypes![statIndex],
                    input: DebugElement = el.query(By.css('sfc-number-input'));

                expect(el.query(By.css('.label')).nativeElement.innerText)
                    .toEqual(stat.value);
                expect(input.componentInstance.edit).toBeFalse();
                expect(input.componentInstance.disableNext).toBeTrue();
                expect(input.componentInstance.disablePrevious).toBeTrue();
                expect(input.componentInstance.min).toEqual(0);
                expect(input.componentInstance.max).toEqual(100);
            });
        }
    });

    function getStats(): StatsValue {
        return {
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
        };
    }
});
