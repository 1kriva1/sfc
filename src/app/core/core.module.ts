import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found/not-found.page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSfcCommonModule } from 'ngx-sfc-common';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSfcCommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent
  ]
})
export class CoreModule { }
