import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { TextProfileComponent } from './text-profile/text-profile.component';
import { MapWrapperComponent } from './map-wrapper/map-wrapper.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { KwicComponent } from './kwic/kwic.component';
import { MenuComponent } from './menu/menu.component';
import { LitInventoryComponent } from './lit-inventory/lit-inventory.component';
import { FilterComponent } from './filter/filter.component';
import { SearchBoxAdvancedComponent } from './search-box-advanced/search-box-advanced.component';
import { ExpansionDirective } from './directives/expansion.directive';
import { TitlePagePmComponent } from './title-page-pm/title-page-pm.component';
import { MssListComponent } from './mss-list/mss-list.component';
import { SearchMemoryComponent } from './search-memory/search-memory.component';
import { OrderDirective } from './directives/order.directive';
import { NetworkComponent } from './network/network.component';
import { SearchListComponent } from './search-list/search-list.component';
import { MapGroupComponent } from './map-group/map-group.component';
import { FilterTagDirective } from './directives/filter-tag.directive';
import { RedirectDirective } from './directives/redirect.directive';
import { TextComparisonComponent } from './text-comparison/text-comparison.component';
import { SearchWrapperComponent } from './search-wrapper/search-wrapper.component';
import { SplitEditorComponent } from './split-editor/split-editor.component';
import { LoginComponent } from './login/login.component';
import { MapSequenceComponent } from './map-sequence/map-sequence.component';
import { TextsListComponent } from './texts-list/texts-list.component';
import { StoredListsComponent } from './stored-lists/stored-lists.component';
import { RunesComponent } from './runes/runes.component';
import { LitConstraintsComponent } from './lit-constraints/lit-constraints.component';
import { WikiOverviewComponent } from './wiki-overview/wiki-overview.component';
import { WikiGlossaryComponent } from './wiki-glossary/wiki-glossary.component';
import { IconDirective } from './directives/icon.directive';


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
    SplitsComponent,
    TextProfileComponent,
    MapWrapperComponent,
    SearchBoxComponent,
    KwicComponent,
    MenuComponent,
    LitInventoryComponent,
    FilterComponent,
    SearchBoxAdvancedComponent,
    ExpansionDirective,
    TitlePagePmComponent,
    MssListComponent,
    SearchMemoryComponent,
    OrderDirective,
    NetworkComponent,
    SearchListComponent,
    MapGroupComponent,
    FilterTagDirective,
    RedirectDirective,
    TextComparisonComponent,
    SearchWrapperComponent,
    SplitEditorComponent,
    LoginComponent,
    MapSequenceComponent,
    TextsListComponent,
    StoredListsComponent,
    RunesComponent,
    LitConstraintsComponent,
    WikiOverviewComponent,
    WikiGlossaryComponent,
    IconDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule
    
  ],
    entryComponents : [
        ProfileSideComponent,
        LitInventoryComponent,
        SetListComponent,
        ItemListComponent,
        MapComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
