import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageSliderComponent, ImageSliderItemComponent } from './components';
import { WelcomePageComponent } from './pages';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        WelcomePageComponent,
        ImageSliderComponent,
        ImageSliderItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        NgxSfcCommonModule,
        NgxSfcComponentsModule
    ],
    exports: [
        WelcomePageComponent
    ]
})
export class WelcomeModule { }
