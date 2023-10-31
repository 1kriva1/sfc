import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NgxSfcCommonModule, Position } from 'ngx-sfc-common';
import { IDropdownMenuItemModel, NgxSfcComponentsModule } from 'ngx-sfc-components';
import { of } from 'rxjs';
import { HeaderService, LanguageTogglerComponent } from '@core/components';
import { RoutKey } from '@core/enums';
import { LogoComponent } from '@share/components/logo/logo.component';
import { IdentityService } from '@share/services/identity/identity.service';
import { BaseHeaderComponent } from '../base/base-header.component';
import { IHeaderNavigationModel } from '../base/header-navigation.model';
import { AuthenticatedHeaderComponent } from './authenticated-header.component';
import { HttpClientModule } from '@angular/common/http';
import { EnumService, IPlayerByUserProfileModel, PlayerService } from '@share/services';
import { ObservableModel } from '@core/models/observable.model';
import { CommonConstants } from '@core/constants';

describe('Core.Component:AuthenticatedHeader', () => {
  let component: AuthenticatedHeaderComponent;
  let fixture: ComponentFixture<AuthenticatedHeaderComponent>;
  let routerMock = { navigate: jasmine.createSpy('navigate') };
  let identityServiceStub: Partial<IdentityService> = { logout: () => of() };
  let headerServiceStub: Partial<HeaderService> = { toggleByValue: () => { } };
  let playerServiceStub: Partial<PlayerService> = { player: new ObservableModel<IPlayerByUserProfileModel>(null) };
  let enumServiceStub: Partial<EnumService> = {
    enums: {
      footballPositions: [
        { key: 0, value: 'Goalkeeper' },
        { key: 1, value: 'Defender' },
        { key: 2, value: 'Midfielder' },
        { key: 3, value: 'Forward' }
      ],
      gameStyles: [],
      statCategories: [],
      statSkills: [],
      statTypes: [],
      workingFoots: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FontAwesomeModule, NoopAnimationsModule, NgxSfcCommonModule, NgxSfcComponentsModule],
      declarations: [LogoComponent, LanguageTogglerComponent, BaseHeaderComponent,
        AuthenticatedHeaderComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: IdentityService, useValue: identityServiceStub },
        { provide: HeaderService, useValue: headerServiceStub },
        { provide: PlayerService, useValue: playerServiceStub },
        { provide: EnumService, useValue: enumServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit("Should have main elements", () => {
      expect(fixture.nativeElement.querySelector('sfc-base-header')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('div.notifications')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('div.notification').length).toEqual(2);
      expect(fixture.nativeElement.querySelectorAll('div.notification fa-icon').length).toEqual(2);
      expect(fixture.nativeElement.querySelector('div.profile')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('sfc-dropdown-menu')).toBeTruthy();
    });

    fit("Should make header not openned", () => {
      spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

      component.ngOnInit();

      expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
    });

    fit("Should call unsubscribe for subscriptions, when component destroyed", () => {
      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.profile sfc-dropdown-menu')),
        logoutItem: IDropdownMenuItemModel = dropdownMenuEl.componentInstance.items[0];

      (logoutItem.click as any)();

      const logoutUnsubscribeSpy = spyOn(
        (component as any)._logoutSubscription,
        'unsubscribe'
      ).and.callThrough(),
        playerUnsubscribeSpy = spyOn(
          (component as any)._playerSubscription,
          'unsubscribe'
        ).and.callThrough();

      component?.ngOnDestroy();

      expect(logoutUnsubscribeSpy).toHaveBeenCalled();
      expect(playerUnsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('Notifications', () => {
    fit("Should message notification have defined tooltip", () => {
      const tooltipEl = fixture.debugElement.queryAll(By.css('div.notification'))[0],
        tooltipComponent = tooltipEl.componentInstance;

      expect(tooltipComponent.tooltipPosition).toEqual(Position.Bottom);
      expect(tooltipComponent.value).toEqual('Messages');
    });

    fit("Should message notification have defined icon", () => {
      const notificationEl = fixture.debugElement.queryAll(By.css('div.notification'))[0];

      expect(notificationEl.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-envelope');
    });

    fit("Should notifications notification have defined tooltip", () => {
      const tooltipEl = fixture.debugElement.queryAll(By.css('div.notification'))[1],
        tooltipComponent = tooltipEl.componentInstance;

      expect(tooltipComponent.tooltipPosition).toEqual(Position.Bottom);
      expect(tooltipComponent.value).toEqual('Notifications');
    });

    fit("Should notifications notification have defined icon", () => {
      const notificationEl = fixture.debugElement.queryAll(By.css('div.notification'))[1];

      expect(notificationEl.nativeElement.querySelector('fa-icon svg').classList).toContain('fa-bell');
    });
  });

  describe('Create profile link', () => {
    fit("Should not exist create profile link", () => {
      (playerServiceStub as any).playerCreated = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.create-profile')).toBeNull();
    });

    fit("Should exist create profile link", () => {
      (playerServiceStub as any).playerCreated = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.create-profile')).toBeDefined();
    });

    fit("Should create profile link has defined icon", () => {
      (identityServiceStub as any).playerCreated = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.create-profile fa-icon svg').classList)
        .toContain('fa-plus');
    });

    fit("Should create profile link has defined text", () => {
      (identityServiceStub as any).playerCreated = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.create-profile').innerText)
        .toEqual('Create profile');
    });
  });

  describe('Navigations', () => {
    fit("Should base header has defined navigations count", () => {
      expect(fixture.debugElement.query(By.css('sfc-base-header'))
        .componentInstance.navigations.length).toEqual(4);
    });

    fit("Should have players navigation", () => {
      spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

      const playersNavigation: IHeaderNavigationModel = fixture.debugElement.query(By.css('sfc-base-header'))
        .componentInstance.navigations[0];

      expect(playersNavigation.label).toEqual('Players');

      playersNavigation.click();

      expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Profiles}`]);
      expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
    });

    fit("Should have games navigation", () => {
      spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

      const playersNavigation: IHeaderNavigationModel = fixture.debugElement.query(By.css('sfc-base-header'))
        .componentInstance.navigations[1];

      expect(playersNavigation.label).toEqual('Games');

      playersNavigation.click();

      expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Profiles}`]);
      expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
    });

    fit("Should have teams navigation", () => {
      spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

      const playersNavigation: IHeaderNavigationModel = fixture.debugElement.query(By.css('sfc-base-header'))
        .componentInstance.navigations[2];

      expect(playersNavigation.label).toEqual('Teams');

      playersNavigation.click();

      expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Profiles}`]);
      expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
    });

    fit("Should have locations navigation", () => {
      spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();

      const playersNavigation: IHeaderNavigationModel = fixture.debugElement.query(By.css('sfc-base-header'))
        .componentInstance.navigations[3];

      expect(playersNavigation.label).toEqual('Locations');

      playersNavigation.click();

      expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Profiles}`]);
      expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
    });
  });

  describe('Dropdown', () => {
    fit('Should have appropriate attributes', () => {
      (identityServiceStub as any).playerCreated = false;
      component.ngOnInit();
      fixture.detectChanges();

      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.profile sfc-dropdown-menu'));

      expect(dropdownMenuEl.componentInstance.hideOnClickOutside).toBeTrue();
      expect(dropdownMenuEl.componentInstance.items.length).toEqual(1);
      expect(dropdownMenuEl.componentInstance.position).toEqual([Position.Bottom]);
    });

    fit('Should have only logout action', () => {
      (identityServiceStub as any).playerCreated = false;
      component.ngOnInit();
      fixture.detectChanges();

      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.profile sfc-dropdown-menu')),
        logoutItem = dropdownMenuEl.componentInstance.items[0];

      expect(logoutItem.label).toEqual('Logout');
      expect(logoutItem.icon).toEqual(faRightFromBracket);
    });

    fit('Should call logout', () => {
      spyOn(identityServiceStub as any, 'logout').and.returnValue(of({ Success: true }));
      (identityServiceStub as any).playerCreated = false;

      component.ngOnInit();
      fixture.detectChanges();

      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.profile sfc-dropdown-menu')),
        logoutItem: IDropdownMenuItemModel = dropdownMenuEl.componentInstance.items[0];

      (logoutItem.click as any)();

      expect(identityServiceStub.logout).toHaveBeenCalledTimes(1);
    });

    fit('Should navigate to welcome page after logout', () => {
      spyOn(identityServiceStub as any, 'logout').and.returnValue(of({ Success: true }));
      (identityServiceStub as any).playerCreated = false;

      component.ngOnInit();
      fixture.detectChanges();

      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.profile sfc-dropdown-menu')),
        logoutItem: IDropdownMenuItemModel = dropdownMenuEl.componentInstance.items[0];

      (logoutItem.click as any)();

      expect(routerMock.navigate).toHaveBeenCalledWith([`/${RoutKey.Welcome}`]);
    });

    fit('Should have profile and logout action', () => {
      (playerServiceStub as any).playerCreated = true;
      (playerServiceStub as any).player.value$ = of({
        data: {
          General: {
            FirstName: 'FirstName',
            LastName: '',
            Photo: null
          },
          Football: {
            Position: 2
          }
        }
      });
      component.ngOnInit();
      fixture.detectChanges();

      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.profile sfc-dropdown-menu')),
        profilefitem = dropdownMenuEl.componentInstance.items[0],
        logoutItem = dropdownMenuEl.componentInstance.items[1];

      expect(logoutItem.label).toEqual('Logout');
      expect(logoutItem.icon).toEqual(faRightFromBracket);
      expect(profilefitem.label).toEqual('Profile');
      expect(profilefitem.icon).toEqual(faUser);
    });

    fit('Should navigate to profile page for profile action', () => {
      (identityServiceStub as any).playerCreated = true;
      (playerServiceStub as any).playerId = { value: 1 };
      component.ngOnInit();
      fixture.detectChanges();

      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.profile sfc-dropdown-menu')),
        profilefitem: IDropdownMenuItemModel = dropdownMenuEl.componentInstance.items[0];

      (profilefitem.click as any)();

      expect(routerMock.navigate)
        .toHaveBeenCalledWith([`${RoutKey.Profiles}/${playerServiceStub.playerId!.value}/${RoutKey.Edit}`]);
    });

    fit('Should toggle header for profile action, if header is oppened', () => {
      spyOn(headerServiceStub as any, 'toggleByValue').and.callThrough();
      (identityServiceStub as any).playerCreated = true;
      (headerServiceStub as any).open = true;
      (playerServiceStub as any).playerId = { value: 1 };
      fixture.detectChanges();

      const dropdownMenuEl: DebugElement = fixture.debugElement.query(By.css('.profile sfc-dropdown-menu')),
        profilefitem: IDropdownMenuItemModel = dropdownMenuEl.componentInstance.items[0];

      (profilefitem.click as any)();

      expect(headerServiceStub.toggleByValue).toHaveBeenCalledOnceWith(false);
    });
  });

  describe('Avatar', () => {
    fit('Should have defined values for model', () => {
      component.avatarModel = { image: CommonConstants.DEFAULT_AVATAR_PATH };
      (playerServiceStub as any).player.value$ = of({
        data: {
          General: {
            FirstName: 'FirstName',
            LastName: 'LastName',
            Photo: null
          },
          Football: {
            Position: 2
          }
        }
      });
      component.ngOnInit();

      expect(component.avatarModel).toEqual({
        firstName: 'FirstName',
        lastName: 'LastName',
        title: 'Midfielder',
        image: 'app/core/assets/images/default_avatar.png'
      });
    });

    fit('Should have default values for model', () => {
      component.avatarModel = { image: CommonConstants.DEFAULT_AVATAR_PATH };
      (playerServiceStub as any).player.value$ = of({ data: null });
      component.ngOnInit();

      expect(component.avatarModel).toEqual({
        image: 'app/core/assets/images/default_avatar.png'
      });
    });
  });
});