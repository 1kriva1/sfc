import { Component, OnInit } from "@angular/core";
import { faCircleCheck, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { IPlayersRowContentViewModel } from "./players-row-content-view.model";
import { getRaiting } from "@share/utils";
import { BasePlayersTableComponent } from "../base-players.component";
import { PlayersRowContentLocalization } from "./players-row-content.localization";

@Component({
    selector: 'sfc-players-row-content',
    templateUrl: './players-row-content.component.html',
    styleUrls: ['./players-row-content.component.scss']
})
export class PlayersRowContentComponent
    extends BasePlayersTableComponent
    implements OnInit {

    PlayersRowContentLocalization = PlayersRowContentLocalization;

    public vm!: IPlayersRowContentViewModel;

    ngOnInit(): void {
        this.vm = {
            freePlayIcon: this.model.general.freePlay ? faCircleCheck : faXmarkCircle,
            gameStyle: this.getGameStyle(this.enumService.enums.gameStyles),
            raiting: getRaiting(this.model.stats),
            skill: this.model.football.skill || 0,
            tags: this.tags,
            workingFoot: this.getWorkingFoot(this.enumService.enums.workingFoots),
            types: this.getTypes(this.enumService.enums.statTypes, this.enumService.enums.statSkills)
        };
    }
}