import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { SetListComponent } from './set-list/set-list.component';

import { MsToolsComponent } from './ms-tools/ms-tools.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { ReferencesComponent } from './references/references.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [{path:'mss/:texts', component: MsToolsComponent},
                         {path:'guide', component: UserGuideComponent},
                         {path:'references', component: ReferencesComponent},
                        {path:'test-set', component: SetListComponent},
                       {path:'', component: TitlePageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
     providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
