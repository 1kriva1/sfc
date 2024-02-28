import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { IconTooltipComponent } from '../icon-tooltip/icon-tooltip.component';
import { TitleComponent } from './title.component';

describe('Share.Component:Title', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, NgxSfcCommonModule],
      declarations: [IconTooltipComponent, TitleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Should create component', () => {
    expect(component).toBeTruthy();
  });

  fit('Should have main element', () => {
    expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.title')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.label')).toBeTruthy();
  });

  fit('Should not have icon by default', () => {
    expect(component.icon).toBeNull();
  });

  fit('Should label not exist', () => {
    expect(fixture.nativeElement.querySelector('.label p')).toBeNull();
  });

  fit('Should label exist', () => {
    component.label = 'Test label';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.label p')).toBeTruthy();
  });

  fit('Should have defined label', () => {
    component.label = 'Test label';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.label p').innerText).toEqual(component.label);
  });

  fit('Should description not exist', () => {
    expect(fixture.nativeElement.querySelector('.label span')).toBeNull();
  });

  fit('Should description exist', () => {
    component.description = 'Test description';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.label span')).toBeTruthy();
  });

  fit('Should have defined description', () => {
    component.description = 'Test description';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.label span').innerText).toEqual(component.description);
  });

  fit('Should icon tooltip not exist', () => {
    expect(fixture.nativeElement.querySelector('sfc-icon-tooltip')).toBeNull();
  });

  fit('Should icon tooltip exist', () => {
    component.icon = faStar;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('sfc-icon-tooltip')).toBeTruthy();
  });

  fit('Should icon tooltip has appropriate attributes', () => {
    component.icon = faStar;
    component.tooltip = 'Test tooltip';
    fixture.detectChanges();

    const tooltipIconEl: DebugElement = fixture.debugElement.query(By.css('sfc-icon-tooltip'));

    expect(tooltipIconEl.componentInstance.tooltip).toEqual(component.tooltip);
    expect(tooltipIconEl.componentInstance.icon).toEqual(component.icon);
  });

  fit('Should delimeter not exist', () => {
    component.delimeter = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeNull();
  });

  fit('Should delimeter exist', () => {
    expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
  });
});
