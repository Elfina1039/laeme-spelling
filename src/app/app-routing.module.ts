import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { SetListComponent } from './set-list/set-list.component';
import { MapWrapperComponent } from './map-wrapper/map-wrapper.component';
import { MapSequenceComponent } from './map-sequence/map-sequence.component';

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
import { KwicComponent } from './kwic/kwic.component';
import { LoginComponent } from './login/login.component';

import { SplitEditorComponent } from './split-editor/split-editor.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{path:'login', component: LoginComponent},
    {path:'mss/:id', component: MsToolsComponent},
                        {path:'profile/:id', component: TextProfileComponent, canActivate:[AuthGuard]},
                        {path:'comparison/:id', component: TextComparisonComponent, canActivate:[AuthGuard]},
                         {path:'guide', component: UserGuideComponent},
                         {path:'references', component: ReferencesComponent},
                        {path:'sets', component: SearchWrapperComponent, canActivate:[AuthGuard]},
                         {path:'mss-list', component: MssListComponent, canActivate:[AuthGuard]},
                        {path:'map/:fnc/:args/:filters', component: MapWrapperComponent, canActivate:[AuthGuard]},
                        {path:'map-seq/:extent/:fnc/:args/:filters', component: MapSequenceComponent, canActivate:[AuthGuard]},
                        {path:'map/:fnc/:args', component: MapWrapperComponent, canActivate:[AuthGuard]},
                         {path:'map-seq/:extent/:fnc/:args', component: MapSequenceComponent, canActivate:[AuthGuard]},
                         {path:'kwic/:fnc/:args/:range', component: KwicComponent, canActivate:[AuthGuard]},
                        {path:'network/:fnc/:ids', component: NetworkComponent, canActivate:[AuthGuard]},
                        {path:'edit/:morphid', component: SplitEditorComponent, canActivate:[AuthGuard]},
                        {path:'map', component: MapWrapperComponent, canActivate:[AuthGuard]},
                        {path:'searches', component: SearchMemoryComponent, canActivate:[AuthGuard]},
                         {path:'pm', component: TitlePagePmComponent},
                       {path:'', component: TitlePageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
     providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
