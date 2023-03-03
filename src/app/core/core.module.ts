import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found/not-found.page.component';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { CanvasBallDirective } from './pages/not-found/directives/ball/canvas-ball.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    CanvasBallDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule,
    ShareModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent
  ]
})
export class CoreModule { }
