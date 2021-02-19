import { Component, OnInit, ViewChild, AfterContentInit, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { LitInventoryComponent } from '../lit-inventory/lit-inventory.component';

import { SetService } from '../services/set.service';
import { Manuscript, MsSize } from '../classes/manuscript';
import { MsSearch, SingleListSearch, ListSearch } from '../classes/general';
import { Profile } from '../classes/profile';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileSideComponent } from '../profile-side/profile-side.component';
import { SetListComponent } from '../set-list/set-list.component';
import { MsToolsComponent } from '../ms-tools/ms-tools.component';

@Component({
  selector: 'app-text-comparison',
  templateUrl: './text-comparison.component.html',
  styleUrls: ['./text-comparison.component.css']
})
export class TextComparisonComponent implements OnInit, AfterContentInit {
    
    preloaded : string[]= [];
    inventories : LitInventoryComponent[]=[];
    setLists : SetListComponent[]=[];

    invSize : MsSize = {width:0, height:100, unit: "px"};
    setSize : MsSize = {width:0, height:100, unit: "px"};
    @ViewChild("container", {read: ViewContainerRef}) container;
    @ViewChild("msTools") msTools : MsToolsComponent; 
     @ViewChild("profiles") profiles : any; 
     @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
    
  constructor(private resolver : ComponentFactoryResolver,
              protected route: ActivatedRoute) { }

  ngOnInit() {
           let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let texts : string[]=p.get('id').split(",");
        ref.preloaded = texts;
           console.log(screen.width);
    ref.invSize.width = (screen.width*0.6)/ref.preloaded.length;
    ref.setSize.width = (screen.width*0.7)/ref.preloaded.length;

      });
      
      
      
  }
    
ngAfterContentInit(){
   let ref = this;
    console.log("LOADING COMPONENTS: " + this.preloaded.join("+"));
    this.preloaded.forEach((id)=>ref.addMs(id));

}
    
addMs(id){
    let ref = this;
  
    let invFactory = ref.resolver.resolveComponentFactory(LitInventoryComponent);
    let setFactory = ref.resolver.resolveComponentFactory(SetListComponent);
    
    let newInventory = this.container.createComponent(invFactory)._component;
    let newSetList = this.container.createComponent(setFactory)._component;
      

  newInventory.fetchCompared(id, this.preloaded);
  newInventory.toggle(); 
    console.log(newInventory);
newInventory.wrapper.nativeElement.style.width = ref.invSize.width+ref.invSize.unit;
    
newInventory.requestHighlight.subscribe((e)=>{ref.filterSets(e);
                                             ref.searchLittera(e)});

newSetList.requestItem.subscribe((e)=>{ref.searchLexel(e);});
newSetList.requestSelection.subscribe((e)=>{ref.searchMorphids(e);});

   newSetList.loadSets("getSetsByText",id); 

    newSetList.wrapper.nativeElement.style.width = ref.setSize.width+ref.setSize.unit;
 
    ref.inventories.push(newInventory);
    ref.setLists.push(newSetList);
    
    this.cmpLoaded.emit();

}
    
searchMorphids(e){
    let selection = e.map((s)=>eval(s.split("-")[0]));
     let search :ListSearch = new ListSearch({fields:[["morphids",selection]],list:selection, color: "",});
    
    console.log(search);
    
    this.msTools.searchMss(search);
}
    
    searchLexel(e){
     let search :SingleListSearch = new SingleListSearch({fields:[["morphids",e.morphid]], color: ""});
    
    console.log(search);
    
    this.msTools.searchMss(search);
}
    
    filterSets(e){
    console.log(e[0]);
    this.setLists.forEach((sl)=>sl.filterSets(e[0].littera));
}
    
     searchLittera(e){
        console.log(e);
        this.msTools.searchMss(e[0]);
        this.inventories.forEach((i)=>i.profile.getAlternatives(e[1]));
      
    }
    
    

}
