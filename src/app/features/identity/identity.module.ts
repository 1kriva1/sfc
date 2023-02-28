import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityRoutingModule } from './identity-routing.module';
import { RegistrationPageComponent } from './pages/registration/registration.page.component';
import { LoginPageComponent } from './pages/login/login.page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSfcInputsModule } from 'ngx-sfc-inputs';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    RegistrationPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    NgxSfcCommonModule,
    NgxSfcInputsModule,
    NgxSfcComponentsModule,
    ShareModule,
    ReactiveFormsModule,
    IdentityRoutingModule
  ],
  exports: []
})
export class IdentityModule { }
