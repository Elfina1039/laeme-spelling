import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ManuscriptService } from '../services/manuscript.service';
import { SetService } from '../services/set.service';
import { Manuscript, MsSize } from '../classes/manuscript';
import { Search } from '../classes/general';
import { Profile } from '../classes/profile';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileSideComponent } from '../profile-side/profile-side.component';
import { SetListComponent } from '../set-list/set-list.component';

@Component({
  selector: 'app-text-profile',
  templateUrl: './text-profile.component.html',
  styleUrls: ['./text-profile.component.css']
})
export class TextProfileComponent implements OnInit {
textId : number;
@ViewChild("profileCmp") profileCmp : ProfileSideComponent;  
@ViewChild("setListCmp") setListCmp : SetListComponent; 
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
 this.setListCmp.loadSets("getSetsByText",[id]);
this.profileCmp.fetchProfile(id);
this.profileCmp.toggle();
    
}  
    
filterSets(e){
    console.log(e[0]);
    this.setListCmp.filterSets(e[0].littera);
}

}
