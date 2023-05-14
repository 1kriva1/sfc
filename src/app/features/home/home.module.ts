import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home.page.component';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule,
    ShareModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomeModule { }
