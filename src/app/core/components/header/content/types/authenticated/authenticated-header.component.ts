import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faExclamation, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ComponentSize, Position } from 'ngx-sfc-common';
import { AvatarBadgePosition, IAvatarDataModel, IAvatarProgressModel, IDropdownMenuItemModel } from 'ngx-sfc-components';
import { Subscription } from 'rxjs';
import { RoutKey } from 'src/app/core/enums';
import { buildPath } from 'src/app/core/utils';
import { BaseResponse } from 'src/app/share/models/base.response';
import { IdentityService } from 'src/app/share/services/identity/identity.service';
import { HeaderService } from '../../../services/header.service';
import { IHeaderNavigationModel } from '../../base/header-navigation.model';

@Component({
  selector: 'sfc-authenticated-header',
  templateUrl: './authenticated-header.component.html',
  styleUrls: ['./authenticated-header.component.scss']
})
export class AuthenticatedHeaderComponent implements OnInit, OnDestroy {

  faBell = faBell;
  faEnvelope = faEnvelope;
  faPlus = faPlus;
  faExclamation = faExclamation;

  ComponentSize = ComponentSize;
  Position = Position;
  AvatarBadgePosition = AvatarBadgePosition;

  MESSAGES_TOOLTIP_TEXT = $localize`:@@core.component.header-authenticated.tooltip.messages:Messages`;
  NOTIFICATIONS_TOOLTIP_TEXT = $localize`:@@core.component.header-authenticated.tooltip.notifications:Notifications`;
  AVATAR_BADGE_CREATE_PROFILE_TOOLTIP_TEXT = $localize`:@@core.component.header-authenticated.tooltip.avatar-badge-create-profile:Please create profile!`;

  public navigations: IHeaderNavigationModel[] = [
    {
      label: $localize`:@@core.component.header-authenticated.navigation.players:Players`,
      click: () => this.navigate()
    },
    {
      label: $localize`:@@core.component.header-authenticated.navigation.games:Games`,
      click: () => this.navigate()
    },
    {
      label: $localize`:@@core.component.header-authenticated.navigation.teams:Teams`,
      click: () => this.navigate()
    },
    {
      label: $localize`:@@core.component.header-authenticated.navigation.locations:Locations`,
      click: () => this.navigate()
    }
  ]

  public avatarModel: IAvatarDataModel = {};

  public avatarProgressModel: IAvatarProgressModel = {
    filledColor: 'red'
  }

  public actions: IDropdownMenuItemModel[] = [
    {
      label: $localize`:@@core.component.header-authenticated.action.logout:Logout`,
      icon: faRightFromBracket,
      click: () => this.logout()
    }
  ];

  private _logoutSubscription?: Subscription;

  constructor(public identityService: IdentityService,
    private router: Router,
    private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.toggleByValue(false);

    if (this.identityService.hasProfile) {
      this.avatarModel = {
        firstName: 'Andrii',
        lastName: 'Kryvoruk',
        title: 'Goalkeeper'
      };

      this.actions.unshift({
        label: $localize`:@@core.component.header-authenticated.action.profile:Profile`,
        icon: faUser,
        click: () => this.router.navigate([buildPath(RoutKey.Profile)])
      })
    }
  }

  ngOnDestroy(): void {
    this._logoutSubscription?.unsubscribe();
  }

  private navigate(): void {
    this.headerService.toggleByValue(false);
    this.router.navigate([buildPath(RoutKey.Profile)]);
  }

  private logout(): void {
    this._logoutSubscription = this.identityService.logout()
      .subscribe((response: BaseResponse) => {
        if (response.Success)
          this.router.navigate([buildPath(RoutKey.Welcome)]);
      })
  }
}