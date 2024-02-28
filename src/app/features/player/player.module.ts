import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayerRoutingModule } from './player-routing.module';
import { ShareModule } from '@share/share.module';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import {
    FootballFilterComponent,
    GeneralFilterComponent,
    PlayersSearchPageComponent,
    StatsFilterComponent,
    PlayersRecommendationComponent,
    PlayerRecommendationComponent,
    PlayersRowComponent,
    PlayersRowContentComponent,
    PlayersCardComponent
} from './pages';

@NgModule({
    declarations: [
        PlayersSearchPageComponent,
        GeneralFilterComponent,
        FootballFilterComponent,
        StatsFilterComponent,
        PlayersRecommendationComponent,
        PlayerRecommendationComponent,
        PlayersRowComponent,
        PlayersRowContentComponent,
        PlayersCardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule,
        NgxSfcInputsModule,
        ShareModule,
        PlayerRoutingModule
    ],
    exports: []
})
export class PlayerModule { }
