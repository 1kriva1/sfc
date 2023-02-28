import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutKey } from 'src/app/core/enums';
import { LoginPageComponent } from './pages/login/login.page.component';
import { RegistrationPageComponent } from './pages/registration/registration.page.component';

const routes: Routes = [
  {
    path: RoutKey.Registration,
    component: RegistrationPageComponent,
  },
  {
    path: RoutKey.Login,
    component: LoginPageComponent,
  },
  {
    path: '',
    redirectTo: RoutKey.Registration,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }
