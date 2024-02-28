import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersSearchPageComponent } from './pages/search/search.page.component';
import { SearchPageLocalization } from './pages/search/search.page.localization';
import { buildTitle } from '@core/utils';
import { RouteConstants } from '@core/constants';

const routes: Routes = [
    {
        path: RouteConstants.DEFAULT_ROUTE_PATH,
        component: PlayersSearchPageComponent,
        title: buildTitle(SearchPageLocalization.ROUTER.TITLE.SEARCH)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayerRoutingModule { }
