import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenComponent } from './token/token.component';
import { MapComponent } from './map/map.component';
import { MsComponent } from './ms/ms.component';
import { MsToolsComponent } from './ms-tools/ms-tools.component';

import { HttpClientModule } from '@angular/common/http';
import { MsInfoComponent } from './ms-info/ms-info.component';
import { ProfileSideComponent } from './profile-side/profile-side.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { TokenSearchComponent } from './token-search/token-search.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { ReferencesComponent } from './references/references.component';
import { SetComponent } from './set/set.component';
import { SetListComponent } from './set-list/set-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { FormListComponent } from './form-list/form-list.component';
import { SplitsComponent } from './splits/splits.component';

@NgModule({
  declarations: [
    AppComponent,
    TokenComponent,
    MapComponent,
    MsComponent,
    MsToolsComponent,
    MsInfoComponent,
    ProfileSideComponent,
    TitlePageComponent,
    TokenSearchComponent,
    UserGuideComponent,
    ReferencesComponent,
    SetComponent,
    SetListComponent,
    ItemListComponent,
    FormListComponent,
    SplitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
