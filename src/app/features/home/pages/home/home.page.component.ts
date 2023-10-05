import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import {
  faFootball, faMagnifyingGlass, faCirclePlus, faMountain, faBasketball, faTableTennisPaddleBall, faVolleyball,
  faStrikethrough, faFootballBall, faPeopleCarryBox, faBaseball, faBowlingBall, faHockeyPuck, faPersonBiking,
} from '@fortawesome/free-solid-svg-icons';
import { ComponentSize, getCssLikeValue } from 'ngx-sfc-common';
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from 'ngx-sfc-components';
import { map, Observable } from 'rxjs';
import { HeaderService } from '@core/components';
import { buildTitle } from '@core/utils';
import { IdentityService } from '@share/services/identity/identity.service';
import { HomePageLocalization } from './home.page.localization';

@Component({
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  faMoon = faMoon;
  faSun = faSun;

  ComponentSize = ComponentSize;
  Localization = HomePageLocalization;

  public userId!: string;

  public MENU_MODEL: ISideMenuModel = {
    items: [
      {
        label: 'Football',
        icon: faFootball,
        type: SideMenuItemType.Item,
        active: false,
        items: [
          {
            label: 'Find',
            icon: faMagnifyingGlass,
            type: SideMenuItemType.Item,
            active: false
          },
          {
            label: 'Create',
            icon: faCirclePlus,
            type: SideMenuItemType.Item,
            active: false,
          },
          {
            label: 'View',
            icon: faMountain,
            type: SideMenuItemType.Item,
            active: false,
          }
        ]
      },
      {
        label: 'Basketball',
        icon: faBasketball,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        label: 'Tennis',
        icon: faTableTennisPaddleBall,
        type: SideMenuItemType.Item,
        active: false,
        items: [
          {
            label: 'Find',
            icon: faMagnifyingGlass,
            type: SideMenuItemType.Item,
            active: false
          },
          {
            label: 'Create',
            icon: faCirclePlus,
            type: SideMenuItemType.Item,
            active: false,
          },
          {
            label: 'View',
            icon: faMountain,
            type: SideMenuItemType.Item,
            active: false,
          }
        ]
      },
      {
        label: 'Volleyball',
        icon: faVolleyball,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        label: 'Cricket',
        icon: faStrikethrough,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        label: 'Rugby',
        icon: faFootballBall,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        label: 'Boxing',
        icon: faPeopleCarryBox,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        label: 'Categories',
        type: SideMenuItemType.Title,
        icon: undefined,
        active: false
      },
      {
        label: 'Baseball',
        icon: faBaseball,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        label: 'Bowling',
        icon: faBowlingBall,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        label: 'Hockey',
        icon: faHockeyPuck,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        label: 'Biking',
        icon: faPersonBiking
        ,
        type: SideMenuItemType.Item,
        active: false
      }
    ],
    open: false
  }

  public headerTop$!: Observable<string>;

  constructor(
    private identityService: IdentityService,
    private changeDetectorRef: ChangeDetectorRef,
    private titleService: Title,
    public headerService: HeaderService) { }

  ngOnInit(): void {
    this.userId = this.identityService.userId as string;
    this.titleService.setTitle(buildTitle(this.Localization.PAGE_TITLE));
  }

  ngAfterViewInit(): void {
    this.headerTop$ = this.headerService.height$?.pipe(map(height => `calc(100vh - ${getCssLikeValue(height)})`));
    this.changeDetectorRef.detectChanges();
  }

  selectedItem: string = '';

  onSelect(item: ISideMenuItemModel): void {
    this.selectedItem = item.label;
  }
}
