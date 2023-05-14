import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { Theme } from 'ngx-sfc-common';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { ThemeService } from './services/theme/theme.service';
import { ThemeTogglerComponent } from './theme-toggler.component';

describe('Share.Component:ThemeToggler', () => {
  let component: ThemeTogglerComponent;
  let fixture: ComponentFixture<ThemeTogglerComponent>;
  let themeServiceMock: Partial<ThemeService> = { toggle: () => { } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSfcCommonModule],
      declarations: [ThemeTogglerComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit("Should create component", () => {
    expect(component).toBeTruthy();
  });

  fit("Should have main element", () => {
    expect(fixture.nativeElement.querySelector('div.container')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('sfc-toggle-switcher')).toBeTruthy();
  });

  fit('Should have appropriate attributes', () => {
    (themeServiceMock as any).theme = Theme.Default;
    fixture.detectChanges();

    const toggleSwitcherEl: DebugElement = fixture.debugElement.query(By.css('sfc-toggle-switcher'));

    expect(toggleSwitcherEl.componentInstance.active).toBeFalse();
    expect(toggleSwitcherEl.componentInstance.leftModel).toEqual({ label: '', icon: faSun });
    expect(toggleSwitcherEl.componentInstance.rightModel).toEqual({ label: '', icon: faMoon });
  });

  fit('Should call toggle theme', () => {
    spyOn((themeServiceMock as any), 'toggle').and.callThrough();

    const toggleSwitcherEl: DebugElement = fixture.debugElement.query(By.css('sfc-toggle-switcher'));
    toggleSwitcherEl.nativeElement.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();

    expect(themeServiceMock.toggle).toHaveBeenCalledTimes(1);
  });
});
