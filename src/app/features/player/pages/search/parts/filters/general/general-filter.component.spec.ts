import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { ShareModule } from "@share/share.module";
import { Direction, nameof, NgxSfcCommonModule } from "ngx-sfc-common";
import { NgxSfcInputsModule } from "ngx-sfc-inputs";
import { SearchPageFilterPart } from "../filter-part.enum";
import { GeneralFilterComponent } from "./general-filter.component";
import { GeneralFilterConstants } from "./general-filter.constants";
import { GeneralFilterLocalization } from "./general-filter.localization";
import { ISearchPageGeneralFilterAvailabilityModel, ISearchPageGeneralFilterModel } from "./general-filter.model";

describe('Features.Player.Page:PlayersSearch.Part: GeneralFilter', () => {
    let component: GeneralFilterComponent;
    let fixture: ComponentFixture<GeneralFilterComponent>;
    let storageServiceStub: Partial<StorageService> = {
        set: () => { },
        get: () => Locale.Ukraine as any
    };
    let formGroupDirective: FormGroupDirective;

    beforeEach(async () => {
        const formBuilder = new FormBuilder();
        formGroupDirective = new FormGroupDirective([], []);
        formGroupDirective.form = formBuilder.group({});

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcInputsModule, ShareModule],
            declarations: [GeneralFilterComponent],
            providers: [
                { provide: FormGroupDirective, useValue: formGroupDirective },
                { provide: StorageService, useValue: storageServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(GeneralFilterComponent);
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
            expect(fixture.nativeElement.querySelector('.row.photo-and-free')).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('.column').length).toEqual(7);
        });
    });

    describe('Form', () => {
        fit('Should have valid inputs count', () => {
            const inputs = fixture.nativeElement.querySelectorAll('input');

            expect(inputs.length).toEqual(11);
        });

        fit('Should have initial value', () => {
            expect((component as any).form.value)
                .toEqual({
                    general: {
                        city: null,
                        tags: null,
                        freePlay: null,
                        hasPhoto: null,
                        years: { from: GeneralFilterConstants.FROM_YEARS_DEFAULT, to: GeneralFilterConstants.TO_YEARS_DEFAULT },
                        availability: { days: null, from: null, to: null }
                    }
                });
        });

        fit('Should be valid', () => {
            expect(formGroupDirective.form.valid).toBeTrue();
        });

        fit('Should be invalid', () => {
            changeCity(new Array(GeneralFilterConstants.MAX_CITY_LENGTH + 2).join('c'));

            expect(formGroupDirective.form.valid).toBeFalse();
        });

        describe('Inputs', () => {
            describe('City', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-text-input#city'));

                    expect(input.componentInstance.label).toEqual(GeneralFilterLocalization.INPUT.CITY.LABEL);
                    expect(input.componentInstance.placeholder).toEqual(GeneralFilterLocalization.INPUT.CITY.PLACEHOLDER);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.helperText).toEqual(GeneralFilterLocalization.INPUT.CITY.HELPER_TEXT);
                    expect(input.componentInstance.validations).toEqual({
                        maxlength: GeneralFilterLocalization.INPUT.CITY.VALIDATIONS.MAX_LENGTH
                    });
                });

                fit('Should be invalid if size is exceed limit', () => {
                    const inputControl = formGroupDirective.form
                        .get(SearchPageFilterPart.General)
                        ?.get(nameof<ISearchPageGeneralFilterModel>('city'))!;

                    changeCity(new Array(GeneralFilterConstants.MAX_CITY_LENGTH + 2).join('c'));

                    expect(inputControl?.errors).not.toBeNull();
                    expect((inputControl?.errors as any)['maxlength']).toEqual({
                        actualLength: 101,
                        requiredLength: GeneralFilterConstants.MAX_CITY_LENGTH
                    });
                });
            });

            describe('Tags', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-tags-input#tags'));

                    expect(input.componentInstance.label).toEqual(GeneralFilterLocalization.INPUT.TAGS.LABEL);
                    expect(input.componentInstance.placeholder).toEqual(GeneralFilterLocalization.INPUT.TAGS.PLACEHOLDER);
                    expect(input.componentInstance.helperText).toEqual(GeneralFilterLocalization.INPUT.TAGS.HELPER_TEXT);
                    expect(input.componentInstance.newTagPlaceholder).toEqual('+ ' + GeneralFilterLocalization.INPUT.TAGS.NEW_TAG_PLACEHOLDER);
                    expect(input.componentInstance.maxTagLength).toEqual(GeneralFilterConstants.MAX_TAG_VALUE_LENGTH);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.validations).toEqual({
                        'sfc-empty': GeneralFilterLocalization.INPUT.TAGS.VALIDATIONS.EMPTY,
                        'sfc-duplicate': GeneralFilterLocalization.INPUT.TAGS.VALIDATIONS.DUPLICATE,
                        'sfc-tags-length': GeneralFilterConstants.MAX_TAG_VALUE_VALIDATION,
                        'sfc-max-array-length': GeneralFilterLocalization.INPUT.TAGS.VALIDATIONS.TAGS_LENGTH
                    });
                });

                fit('Should be invalid, when try add empty value', () => {
                    const input = fixture.debugElement.query(By.css('sfc-tags-input'));

                    addTag('');

                    expect(input.componentInstance.innerErrors['sfc-empty']).toBeTrue();
                });

                fit('Should be invalid, when try add duplicate value', () => {
                    const input = fixture.debugElement.query(By.css('sfc-tags-input'));

                    addTag('test');

                    addTag('test');

                    expect(input.componentInstance.innerErrors['sfc-duplicate']).toBeTrue();
                });

                fit('Should be invalid, when try add value which exceed limit', () => {
                    const input = fixture.debugElement.query(By.css('sfc-tags-input'));

                    addTag(new Array(GeneralFilterConstants.MAX_TAG_VALUE_LENGTH + 2).join('a'));

                    expect(input.componentInstance.innerErrors['sfc-tags-length']).toBeTrue();
                });

                fit('Should be invalid, when try add too many tags', () => {
                    const inputControl = formGroupDirective.form
                        .get(SearchPageFilterPart.General)
                        ?.get(nameof<ISearchPageGeneralFilterModel>('tags'))!;

                    for (let index = 0; index < GeneralFilterConstants.MAX_TAGS_LENGTH + 1; index++) {
                        addTag('test' + index);
                    }

                    expect(inputControl?.errors).not.toBeNull();

                    const lengthError = (inputControl?.errors as any)['sfc-max-array-length'];
                    expect(lengthError.actualLength).toEqual(GeneralFilterConstants.MAX_TAGS_LENGTH + 1);
                    expect(lengthError.requiredLength).toEqual(GeneralFilterConstants.MAX_TAGS_LENGTH);
                });
            });

            describe('Years', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-range-input#years'));

                    expect(input.componentInstance.label).toEqual(GeneralFilterLocalization.INPUT.YEARS.LABEL);
                    expect(input.componentInstance.multiple).toBeTrue();
                    expect(input.componentInstance.showValue).toBeTrue();
                    expect(input.componentInstance.helperText).toEqual(GeneralFilterLocalization.INPUT.YEARS.HELPER_TEXT);
                    expect(input.componentInstance.generateMultipleLabel).toBeTruthy();
                });

                fit('Should generate label', () => {
                    expect(fixture.nativeElement.querySelector('sfc-range-input#years span.value').innerText)
                        .toEqual(component.generateYearsLabel(GeneralFilterConstants.FROM_YEARS_DEFAULT, GeneralFilterConstants.TO_YEARS_DEFAULT));
                });
            });

            describe('From time', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#from-time'));

                    expect(input.componentInstance.label).toEqual(GeneralFilterLocalization.INPUT.AVAILABLE_FROM.LABEL);
                    expect(input.componentInstance.placeholder).toEqual(GeneralFilterLocalization.INPUT.AVAILABLE_FROM.PLACEHOLDER);
                    expect(input.componentInstance.helperText).toEqual(GeneralFilterLocalization.INPUT.AVAILABLE_FROM.HELPER_TEXT);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.time).toBeTrue();
                    expect(input.componentInstance.date).toBeFalse();
                    expect(input.componentInstance.switchOnClick).toBeTrue();
                    expect(input.componentInstance.clearButton).toBeTrue();
                    expect(input.componentInstance.fullSize).toBeTrue();
                    expect(input.componentInstance.hideOnClickOutside).toBeTrue();
                    expect(input.componentInstance.locale).toEqual(component.locale);
                    expect(input.componentInstance.modalButtonsModel).toEqual(GeneralFilterConstants.DATE_INPUT_MODAL_BUTTONS_MODEL);
                    expect(input.componentInstance.validations).toEqual({
                        'sfc-compare-than': GeneralFilterLocalization.INPUT.AVAILABLE_FROM.VALIDATIONS.COMPARE
                    });
                });

                fit('Should be invalid, when to time input is less', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#from-time')),
                        toTimeinput: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#to-time')),
                        inputControl = formGroupDirective.form
                            .get(SearchPageFilterPart.General)
                            ?.get(nameof<ISearchPageGeneralFilterModel>('availability'))
                            ?.get(nameof<ISearchPageGeneralFilterAvailabilityModel>('from'))!;
                    component.locale = Locale.English;

                    input.componentInstance.update(new Date(2033, 8, 29, 11, 16));
                    fixture.detectChanges();

                    toTimeinput.componentInstance.update(new Date(2033, 8, 29, 11, 15));
                    fixture.detectChanges();

                    expect(inputControl.errors!['sfc-compare-than']).toBeTrue();
                });
            });

            describe('To time', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#to-time'));

                    expect(input.componentInstance.label).toEqual(GeneralFilterLocalization.INPUT.AVAILABLE_TO.LABEL);
                    expect(input.componentInstance.placeholder).toEqual(GeneralFilterLocalization.INPUT.AVAILABLE_TO.PLACEHOLDER);
                    expect(input.componentInstance.helperText).toEqual(GeneralFilterLocalization.INPUT.AVAILABLE_TO.HELPER_TEXT);
                    expect(input.componentInstance.bordered).toBeTrue();
                    expect(input.componentInstance.time).toBeTrue();
                    expect(input.componentInstance.date).toBeFalse();
                    expect(input.componentInstance.switchOnClick).toBeTrue();
                    expect(input.componentInstance.fullSize).toBeTrue();
                    expect(input.componentInstance.clearButton).toBeTrue();
                    expect(input.componentInstance.hideOnClickOutside).toBeTrue();
                    expect(input.componentInstance.locale).toEqual(component.locale);
                    expect(input.componentInstance.modalButtonsModel).toEqual(GeneralFilterConstants.DATE_INPUT_MODAL_BUTTONS_MODEL);
                    expect(input.componentInstance.validations).toEqual({
                        'sfc-compare-than': GeneralFilterLocalization.INPUT.AVAILABLE_TO.VALIDATIONS.COMPARE
                    });
                });

                fit('Should be invalid, when to time input is less', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#to-time')),
                        fromTimeinput: DebugElement = fixture.debugElement.query(By.css('sfc-datetime-input#from-time')),
                        inputControl = formGroupDirective.form
                            .get(SearchPageFilterPart.General)
                            ?.get(nameof<ISearchPageGeneralFilterModel>('availability'))
                            ?.get(nameof<ISearchPageGeneralFilterAvailabilityModel>('from'))!;
                    component.locale = Locale.English;

                    fromTimeinput.componentInstance.update(new Date(2033, 8, 29, 11, 17));
                    fixture.detectChanges();

                    input.componentInstance.update(new Date(2033, 8, 29, 11, 16));
                    fixture.detectChanges();

                    expect(inputControl.errors!['sfc-compare-than']).toBeTrue();
                });
            });

            describe('Available days', () => {
                fit('Should have appropriate attributes', () => {
                    const additionalPositionInput: DebugElement = fixture.debugElement.query(By.css('sfc-bubbles-input#available-days'));

                    expect(additionalPositionInput.componentInstance.label).toEqual(GeneralFilterLocalization.INPUT.AVAILABLE_DAYS.LABEL);
                    expect(additionalPositionInput.componentInstance.helperText).toEqual(GeneralFilterLocalization.INPUT.AVAILABLE_DAYS.HELPER_TEXT);
                    expect(additionalPositionInput.componentInstance.items).toEqual(component.weekDays);
                });
            });

            describe('Has photo', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('.row.photo-and-free > .column > sfc-radio-input#has-photo'));

                    expect(input.componentInstance.label).toEqual(GeneralFilterLocalization.INPUT.HAS_PHOTO.LABEL);
                    expect(input.componentInstance.helperText).toEqual(GeneralFilterLocalization.INPUT.HAS_PHOTO.HELPER_TEXT);
                    expect(input.componentInstance.items).toEqual(GeneralFilterConstants.HAS_PHOTO_RADIO_ITEMS);
                    expect(input.componentInstance.direction).toEqual(Direction.Vertical);
                });
            });

            describe('Free play', () => {
                fit('Should have appropriate attributes', () => {
                    const input: DebugElement = fixture.debugElement.query(By.css('.row.photo-and-free > .column > sfc-radio-input#free-play'));

                    expect(input.componentInstance.label).toEqual(GeneralFilterLocalization.INPUT.FREE_PLAY.LABEL);
                    expect(input.componentInstance.helperText).toEqual(GeneralFilterLocalization.INPUT.FREE_PLAY.HELPER_TEXT);
                    expect(input.componentInstance.items).toEqual(GeneralFilterConstants.FREE_PLAY_RADIO_ITEMS);
                    expect(input.componentInstance.direction).toEqual(Direction.Vertical);
                });
            });
        });
    });

    function changeCity(value: string = 'Test city'): void {
        const cityInputEl = fixture.nativeElement.querySelector('sfc-text-input#city .sfc-input#sfc-city');
        cityInputEl.value = value;
        cityInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }

    function addTag(value: string): void {
        const inputEl = fixture.debugElement
            .query(By.css('sfc-tags-input'))
            .query(By.css('input'));

        inputEl.triggerEventHandler('input', { target: { value: value } });
        fixture.detectChanges();

        inputEl.triggerEventHandler('keyup.enter', { target: inputEl.nativeElement });
        fixture.detectChanges();
    }
});