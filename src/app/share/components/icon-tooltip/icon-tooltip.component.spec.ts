import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Position } from 'ngx-sfc-common';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { IconTooltipComponent } from './icon-tooltip.component';

describe('Share.Component:IconTooltip', () => {
  let component: IconTooltipComponent;
  let fixture: ComponentFixture<IconTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, NgxSfcCommonModule],
      declarations: [IconTooltipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IconTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Should create component', () => {
    expect(component).toBeTruthy();
  });

  fit('Should have main element', () => {
    expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a')).toBeTruthy();
  });

  fit('Should have default value for position', () => {
    expect(component.position).toEqual(Position.Bottom);
  });

  fit('Should tooltip has appropriate attributes', () => {
    expect(fixture.debugElement.query(By.css('a')).attributes['position'])
      .toEqual(Position.Bottom);
  });

  fit('Should hide icon', () => {
    expect(fixture.nativeElement.querySelector('fa-icon')).toBeNull();
  });

  fit('Should show icon', () => {
    component.icon = faStar;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('fa-icon')).toBeTruthy();
  });

  fit('Should have defined icon value', () => {
    component.icon = faStar;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-star');
  });
});
