import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faExclamation, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ComponentSize, firstOrDefault, hasItem, isDefined, Position } from 'ngx-sfc-common';
import { AvatarBadgePosition, IAvatarDataModel, IAvatarProgressModel, IDropdownMenuItemModel } from 'ngx-sfc-components';
import { filter, map, Subscription } from 'rxjs';
import { CommonConstants } from '@core/constants';
import { RoutKey } from '@core/enums';
import { BaseResponse } from '@core/models';
import { buildPath } from '@core/utils';
import { IPlayerByUserProfileModel } from '@share/services';
import { IdentityService } from '@share/services/identity/identity.service';
import { PlayerService } from '@share/services/player/player.service';
import { HeaderService } from '../../services/header.service';
import { IHeaderNavigationModel } from '../base/header-navigation.model';
import { EnumService } from '@share/services/enum/enum.service';
import { ObservableDataModel } from '@core/models/observable.model';

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
  ];

  public avatarModel: IAvatarDataModel = {
    image: CommonConstants.DEFAULT_AVATAR_PATH
  };

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

  private profileAction: IDropdownMenuItemModel = {
    label: $localize`:@@core.component.header-authenticated.action.profile:Profile`,
    icon: faUser,
    click: () => {
      this.router.navigate([`${RoutKey.Profiles}/${this.playerService.playerId.value}/${RoutKey.Edit}`]);

      if (this.headerService.open)
        this.headerService.toggleByValue(false);
    }
  };

  private _logoutSubscription?: Subscription;

  private _playerSubscription?: Subscription;

  constructor(
    public playerService: PlayerService,
    private router: Router,
    private headerService: HeaderService,
    private identityService: IdentityService,
    private enumService: EnumService) { }

  ngOnInit(): void {
    this.headerService.toggleByValue(false);

    this._playerSubscription = this.playerService.player.value$
      .pipe(
        filter((playerModel: ObservableDataModel<IPlayerByUserProfileModel>) => isDefined(playerModel.data)),
        map((playerModel: ObservableDataModel<IPlayerByUserProfileModel>) => playerModel.data)
      ).subscribe((playerModel: IPlayerByUserProfileModel | null) =>
        this.setAvatarModel(playerModel as IPlayerByUserProfileModel));
  }

  ngOnDestroy(): void {
    this._logoutSubscription?.unsubscribe();
    this._playerSubscription?.unsubscribe();
  }

  private navigate(): void {
    this.headerService.toggleByValue(false);
    this.router.navigate([buildPath(RoutKey.Profiles)]);
  }

  private logout(): void {
    this._logoutSubscription = this.identityService.logout()
      .subscribe((response: BaseResponse) => {
        if (response.Success)
          this.router.navigate([buildPath(RoutKey.Welcome)]);
      })
  }

  private setAvatarModel(model: IPlayerByUserProfileModel): void {
    const footballPosition = isDefined(model.Football.Position)
      ? firstOrDefault(this.enumService.enums.footballPositions,
        p => p.key == model.Football.Position)
      : null;

    this.avatarModel = {
      firstName: model.General.FirstName,
      lastName: model.General.LastName,
      title: footballPosition?.value,
      image: model.General.Photo ?? CommonConstants.DEFAULT_AVATAR_PATH
    };

    if (!hasItem(this.actions, this.profileAction)) {
      this.actions.unshift(this.profileAction);
    }
  }
}