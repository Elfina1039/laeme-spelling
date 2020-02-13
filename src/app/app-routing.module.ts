import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { SetListComponent } from './set-list/set-list.component';
import { MapWrapperComponent } from './map-wrapper/map-wrapper.component';

import { MsToolsComponent } from './ms-tools/ms-tools.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { ReferencesComponent } from './references/references.component';
import { TextProfileComponent } from './text-profile/text-profile.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [{path:'mss/:id', component: MsToolsComponent},
                        {path:'profile/:id', component: TextProfileComponent},
                         {path:'guide', component: UserGuideComponent},
                         {path:'references', component: ReferencesComponent},
                        {path:'sets', component: SetListComponent},
                        {path:'map/:fnc/:args', component: MapWrapperComponent},
                        {path:'map', component: MapWrapperComponent},
                       {path:'', component: TitlePageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
     providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
