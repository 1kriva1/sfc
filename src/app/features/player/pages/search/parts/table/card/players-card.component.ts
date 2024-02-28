import { Component, HostBinding, HostListener, OnInit } from "@angular/core";
import { any, Position } from "ngx-sfc-common";
import { AvatarBadgePosition, getProgressColorDefaultFunc, ITagModel } from "ngx-sfc-components";
import { PlayersCardSide } from "./players-card-side.enum";
import { IPlayersCardViewModel } from "./players-card-view.model";
import { faCircleCheck, faClock, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faRulerVertical, faWeightScale } from "@fortawesome/free-solid-svg-icons";
import { getRaiting, getStars, getModel, getMetadata } from "@share/utils";
import { BasePlayersTableComponent } from "../base-players.component";
import { PlayersCardLocalization } from "./players-card.localization";

@Component({
    selector: 'sfc-players-card',
    templateUrl: './players-card.component.html',
    styleUrls: ['./players-card.component.scss']
})
export class PlayersCardComponent
    extends BasePlayersTableComponent
    implements OnInit {

    faClock = faClock;
    faWeightScale = faWeightScale;
    faRulerVertical = faRulerVertical;

    Position = Position;
    AvatarBadgePosition = AvatarBadgePosition;
    PlayersCardLocalization = PlayersCardLocalization;

    @HostBinding('class')
    private get _classes(): string {
        const classes: any = {};
        classes[this.side] = true;

        if (this.positionClass)
            classes[this.positionClass] = true;

        return classes;
    }

    private side: PlayersCardSide = PlayersCardSide.Front;

    @HostListener('click')
    private _click() {
        this.side = this.side == PlayersCardSide.Front
            ? PlayersCardSide.Back
            : PlayersCardSide.Front;
    }

    public vm!: IPlayersCardViewModel;

    ngOnInit(): void {
        const days: ITagModel[] = this.days,
            hasAvailableDays: boolean = any(days),
            raiting = this.model?.stats ? getRaiting(this.model.stats) : 0;

        this.vm = {
            age: this.age,
            availableTime: this.availableTime,
            city: this.model?.general.city,
            raiting: raiting,
            days: days,
            hasAvailableDays: hasAvailableDays,
            hasAvailableTime: this.hasAvailableTime,
            hasNoAvailableData: !hasAvailableDays && !this.hasAvailableTime,
            hasSize: this.hasSize,
            position: this.getPosition(this.enumService.enums.footballPositions),
            height: this.model?.football.height,
            weight: this.model?.football.weight,
            firstName: this.model?.general.firstName,
            lastName: this.model?.general.lastName,
            photo: this.photo,
            physicalCondition: this.model?.football.physicalCondition || 0,
            stars: getStars(raiting),
            freePlayIcon: this.model?.general.freePlay ? faCircleCheck : faXmarkCircle,
            gameStyle: this.getGameStyle(this.enumService.enums.gameStyles),
            skill: this.model?.football.skill || 0,
            tags: this.tags,
            workingFoot: this.getWorkingFoot(this.enumService.enums.workingFoots),
            types: this.getTypes(this.enumService.enums.statTypes, this.enumService.enums.statSkills),
            stats: getModel(this.enumService.enums.statTypes, this.enumService.enums.statCategories),
            metadata: this.model?.stats ? getMetadata(this.model?.stats) : {},
            progressColor: getProgressColorDefaultFunc(raiting)
        };
    }
}