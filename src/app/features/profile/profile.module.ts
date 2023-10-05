import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FootballProfileEditComponent,
    GeneralProfileEditComponent,
    ProfileEditPageComponent,
    StatsProfileEditComponent
} from './pages';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { ShareModule } from '@share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        ProfileEditPageComponent,
        GeneralProfileEditComponent,
        FootballProfileEditComponent,
        StatsProfileEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule,
        NgxSfcInputsModule,
        ShareModule,
        ProfileRoutingModule
    ],
    exports: []
})
export class ProfileModule { }
