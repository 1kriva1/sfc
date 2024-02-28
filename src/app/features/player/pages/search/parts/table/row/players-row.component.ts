import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faRulerVertical, faWeightScale } from "@fortawesome/free-solid-svg-icons";
import { any, Position, UIClass } from "ngx-sfc-common";
import { AvatarBadgePosition, ITableColumnExtendedModel, ITagModel } from "ngx-sfc-components";
import { IPlayersRowViewModel } from "./players-row-view.model";
import { getRaiting, getStars } from "@share/utils";
import { BasePlayersTableComponent } from "../base-players.component";
import { PlayersRowConstants } from "./players-row.constants";
import { PlayersRowLocalization } from "./players-row.localization";

@Component({
    selector: 'sfc-players-row',
    templateUrl: './players-row.component.html',
    styleUrls: ['./players-row.component.scss']
})
export class PlayersRowComponent
    extends BasePlayersTableComponent
    implements OnInit {

    faClock = faClock;
    faWeightScale = faWeightScale;
    faRulerVertical = faRulerVertical;

    Constants = PlayersRowConstants;
    Position = Position;
    AvatarBadgePosition = AvatarBadgePosition;
    PlayersRowLocalization = PlayersRowLocalization;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    @Input()
    @HostBinding(`class.` + UIClass.Expanded)
    expanded: boolean = false;

    public vm!: IPlayersRowViewModel;

    ngOnInit(): void {
        const days: ITagModel[] = this.days,
            hasAvailableDays: boolean = any(days),
            raiting = getRaiting(this.model.stats);

        this.vm = {
            age: this.age,
            availableTime: this.availableTime,
            city: this.model.general.city,
            raiting: raiting,
            days: days,
            hasAvailableDays: hasAvailableDays,
            hasAvailableTime: this.hasAvailableTime,
            hasNoAvailableData: !hasAvailableDays && !this.hasAvailableTime,
            hasSize: this.hasSize,
            position: this.getPosition(this.enumService.enums.footballPositions),
            height: this.model.football.height,
            weight: this.model.football.weight,
            firstName: this.model.general.firstName,
            lastName: this.model.general.lastName,
            photo: this.photo,
            physicalCondition: this.model.football.physicalCondition || 0,
            stars: getStars(raiting)
        };
    }
}