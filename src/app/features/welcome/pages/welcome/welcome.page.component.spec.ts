import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent, ComponentSizeDirective } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { HeaderService } from 'src/app/core/components';
import { ImageSliderComponent, ImageSliderItemComponent } from '../../components';
import { WelcomePageComponent } from './welcome.page.component';
import { of } from 'rxjs';
import { RoutKey } from 'src/app/core/enums';
import { By } from '@angular/platform-browser';

describe('Features.Welcome.Page:Welcome', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;
  let headerServiceMock: HeaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, NgxSfcComponentsModule],
      declarations: [ComponentSizeDirective, ButtonComponent, ImageSliderItemComponent, ImageSliderComponent, WelcomePageComponent],
      providers: [
        { provide: HeaderService, useValue: jasmine.createSpyObj('HeaderService', ['height$']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    headerServiceMock = TestBed.inject(HeaderService);
    headerServiceMock.height$ = of(100);
    fixture.detectChanges();
  });

  describe('General', () => {
    fit("Should create page", () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('main')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section.hero')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section#about.about')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section.categories')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section#locations.locations')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section#process.process')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('section#contact.contact')).toBeTruthy();
    });
  });

  describe('Sections', () => {
    describe('Hero', () => {
      fit("Should have defined padding top value", () => {
        expect(fixture.nativeElement.querySelector('section.hero > div.title').style.paddingTop).toEqual('100px');
      });

      fit("Should navigate to sign in", () => {
        expect(fixture.debugElement.query(By.css('section.hero > div.title > sfc-button')).attributes['routerLink'])
          .toEqual(`/${RoutKey.Identity}/${RoutKey.Login}`);
      });
    });

    describe('Locations', () => {
      fit('Should exist image slider', () => {
        expect(fixture.nativeElement.querySelector('section#locations.locations sfc-image-slider')).toBeTruthy();
      });
    });

    describe('Process', () => {
      fit('Should exist image slider', () => {
        expect(fixture.nativeElement.querySelectorAll('section#process.process sfc-timeline').length).toEqual(2);
      });
    });
  });
});
