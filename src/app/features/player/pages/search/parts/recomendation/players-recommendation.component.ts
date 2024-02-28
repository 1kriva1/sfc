import { Component, Input } from "@angular/core";
import { IPlayerInfoPanelModel } from "@share/components";

@Component({
    selector: 'sfc-players-recommendation',
    templateUrl: './players-recommendation.component.html',
    styleUrls: ['./players-recommendation.component.scss']
})
export class PlayersRecommendationComponent {

    @Input()
    items: IPlayerInfoPanelModel[] = [];
}