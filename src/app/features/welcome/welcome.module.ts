import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome/welcome.page.component';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageSliderComponent, ImageSliderItemComponent } from './components';
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
