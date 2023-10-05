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
    expect(fixture.nativeElement.querySelector('.label p')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.label span')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('sfc-icon-tooltip')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('sfc-delimeter')).toBeTruthy();
  });

  fit('Should have default icon', () => {
    expect(component.icon).toEqual(faCircleQuestion);
  });

  fit('Should have defined label', () => {
    component.label = 'Test label';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.label p').innerText).toEqual(component.label);
  });

  fit('Should have defined description', () => {
    component.description = 'Test description';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.label span').innerText).toEqual(component.description);
  });

  fit('Should icon tooltip has appropriate attributes', () => {
    component.icon = faStar;
    component.tooltip = 'Test tooltip';
    fixture.detectChanges();

    const tooltipIconEl: DebugElement = fixture.debugElement.query(By.css('sfc-icon-tooltip'));

    expect(tooltipIconEl.componentInstance.tooltip).toEqual(component.tooltip);
    expect(tooltipIconEl.componentInstance.icon).toEqual(component.icon);
  });
});
