import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutKey } from 'src/app/core/enums';
import { ProfileEditPageComponent } from './pages/edit/edit.page.component';

const routes: Routes = [
  {
    path: RoutKey.Edit,
    component: ProfileEditPageComponent,
  },
  {
    path: '',
    redirectTo: RoutKey.Edit,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
