import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ManuscriptService } from '../services/manuscript.service';
import { SetService } from '../services/set.service';
import { Manuscript, MsSize } from '../classes/manuscript';
import { MsSearch, SingleListSearch, ListSearch } from '../classes/general';
import { Profile } from '../classes/profile';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileSideComponent } from '../profile-side/profile-side.component';
import { SetListComponent } from '../set-list/set-list.component';
import { FormListComponent } from '../form-list/form-list.component';
import { MsToolsComponent } from '../ms-tools/ms-tools.component';

@Component({
  selector: 'app-text-profile',
  templateUrl: './text-profile.component.html',
  styleUrls: ['./text-profile.component.css']
})
export class TextProfileComponent implements OnInit {
textId : number;
@ViewChild("profileCmp") profileCmp : ProfileSideComponent;  
@ViewChild("setListCmp") setListCmp : SetListComponent;
@ViewChild("formListCmp") formListCmp : FormListComponent; 
@ViewChild("msTools") msTools : MsToolsComponent; 
@Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
profile : Profile;
    
  constructor(private msService : ManuscriptService, private setService : SetService, protected route: ActivatedRoute) { }

  ngOnInit() {
        let ref = this;
       this.route.paramMap.subscribe(function(p){
        ref.textId=eval(p.get('id'));
           
        ref.loadProfile(ref.textId);   
      });
      
      
      
  }
    
loadProfile(id){
   // this.preloaded.push(id);
    let ref = this;
this.setListCmp.loadSets("getSetsByText",id);
this.profileCmp.fetchProfile(id);
this.profileCmp.toggle();
    
this.setListCmp.cmpLoaded.subscribe((e)=>ref.cmpLoaded.emit());    
    
}  
    
filterSets(e){
    console.log(e[0]);
    this.setListCmp.filterSets(e[0].littera);
    
    let args = [this.textId.toString(), e[0].littera]
    this.formListCmp.loadForms("getFormsByMsLit",args.join(";"));
}
    
searchLexel(e){
     let search :SingleListSearch = new SingleListSearch({fields:[["morphids",e.morphid]], color: ""});
    
    console.log(search);
    
    this.msTools.searchMss(search);
}
    
    searchLittera(e){
        console.log(e);
        this.msTools.searchMss(e[0]);
        this.profileCmp.profile.getAlternatives(e[1]);
    }
    
searchMorphids(e){
    let selection = e.map((s)=>eval(s.split("-")[0]));
     let search :ListSearch = new ListSearch({fields:[["morphids",selection]],list:selection, color: "",});
    
    console.log(search);
    
    this.msTools.searchMss(search);
}
   

}
