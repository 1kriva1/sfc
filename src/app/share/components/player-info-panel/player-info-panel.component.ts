import { Component, Input } from '@angular/core';
import { CommonConstants as ApplicationCommonConstants } from '@core/constants';
import { getStars } from '@share/utils';
import { CommonConstants, ComponentSize, isDefined } from 'ngx-sfc-common';
import {
  AvatarBadgePosition,
  getProgressColorDefaultFunc,
  IAvatarBadgeModel,
  IAvatarDataModel,
  IAvatarProgressModel
} from 'ngx-sfc-components';
import { PlayerInfoPanelConstants } from './player-info-panel.constants';
import { IPlayerInfoPanelModel } from './player-info-panel.model';

@Component({
  selector: 'sfc-player-info-panel',
  templateUrl: './player-info-panel.component.html',
  styleUrls: ['./player-info-panel.component.scss']
})
export class PlayerInfoPanelComponent {

  ComponentSize = ComponentSize;

  @Input()
  radius: number = PlayerInfoPanelConstants.DEFAULT_RADIUS;

  @Input()
  stroke: number = PlayerInfoPanelConstants.DEFAULT_STROKE;

  @Input()
  model: IPlayerInfoPanelModel = { raiting: 0 };

  @Input()
  avatar: boolean = true;

  @Input()
  info: boolean = true;

  public get avatarModel(): IAvatarDataModel {
    return {
      image: this.model.photo || ApplicationCommonConstants.DEFAULT_AVATAR_PATH
    }
  }

  public get avatarProgressModel(): IAvatarProgressModel {
    return {
      filledColor: getProgressColorDefaultFunc(this.model.raiting)
    }
  }

  public get badges(): IAvatarBadgeModel[] {
    return [
      {
        position: AvatarBadgePosition.RightBottom,
        label: `${this.model.raiting}`
      }
    ];
  }

  public get stars(): number {
    return getStars(this.model.raiting, CommonConstants.FULL_PERCENTAGE)
  }

  public get age(): string | null {
    return isDefined(this.model.age)
      ? `${this.model.age} ${$localize`:@@core.years:Years`}`
      : null;
  }
}
