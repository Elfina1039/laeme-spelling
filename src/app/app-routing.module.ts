import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { SetListComponent } from './set-list/set-list.component';
import { MapWrapperComponent } from './map-wrapper/map-wrapper.component';

import { MsToolsComponent } from './ms-tools/ms-tools.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { TitlePagePmComponent } from './title-page-pm/title-page-pm.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { ReferencesComponent } from './references/references.component';
import { TextProfileComponent } from './text-profile/text-profile.component';
import { MssListComponent } from './mss-list/mss-list.component';
import { NetworkComponent } from './network/network.component';
import { SearchMemoryComponent } from './search-memory/search-memory.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TextComparisonComponent } from './text-comparison/text-comparison.component';
import { SearchWrapperComponent } from './search-wrapper/search-wrapper.component';

const routes: Routes = [{path:'mss/:id', component: MsToolsComponent},
                        {path:'profile/:id', component: TextProfileComponent},
                        {path:'comparison/:id', component: TextComparisonComponent},
                         {path:'guide', component: UserGuideComponent},
                         {path:'references', component: ReferencesComponent},
                        {path:'sets', component: SearchWrapperComponent},
                         {path:'mss-list', component: MssListComponent},
                        {path:'map/:fnc/:args/:filters', component: MapWrapperComponent},
                        {path:'map/:fnc/:args', component: MapWrapperComponent},
                        {path:'network/:fnc/:ids', component: NetworkComponent},
                        {path:'map', component: MapWrapperComponent},
                        {path:'searches', component: SearchMemoryComponent},
                         {path:'pm', component: TitlePagePmComponent},
                       {path:'', component: TitlePageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
     providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
