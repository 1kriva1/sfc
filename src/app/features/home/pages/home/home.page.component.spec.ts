import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { buildTitle } from '@core/utils';
import { ShareModule } from '@share/share.module';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { HomePageComponent } from './home.page.component';

describe('Features.Home.Page:Home', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, NgxSfcCommonModule, NgxSfcComponentsModule, ShareModule],
      declarations: [HomePageComponent],
      providers: [Title]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create page', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have page title', () => {
      const titleService = TestBed.inject(Title);

      expect(titleService.getTitle()).toBe(buildTitle('Home'));
    });
  });
});
