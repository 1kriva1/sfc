import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutConstants } from './core/constants/layout.constants';
import { NotFoundPageComponent } from './core/pages/not-found/not-found.page.component';
import { HomePageComponent } from './features/home/pages/home/home.page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent, data: LayoutConstants.FULL_LAYOUT_MODEL },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent, data: LayoutConstants.ONLY_CONTENT_LAYOUT_MODEL }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
