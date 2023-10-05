import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home.page.component';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { NgxSfcCommonModule } from 'ngx-sfc-common';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomeModule { }
