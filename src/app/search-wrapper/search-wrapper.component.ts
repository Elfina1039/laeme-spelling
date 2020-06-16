import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, Output, EventEmitter } from '@angular/core';
import { QueryData, Filter, SearchFnc } from '../classes/general';
import { SetListComponent } from '../set-list/set-list.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { ProfileSideComponent } from '../profile-side/profile-side.component';
import { LitInventoryComponent } from '../lit-inventory/lit-inventory.component';

@Component({
  selector: 'app-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.css']
})
export class SearchWrapperComponent implements OnInit {
      @ViewChild("container", {read: ViewContainerRef}) container;
    searchFncs : SearchFnc[][] = [[{label:"Sets", fnc:"getFilteredSets"},
                                  {label:"Items", fnc:"getFilteredSlots"}
                                  ],
                               [{label:"Search sets", fnc:"getSetsByLits"},
                               {label:"Search items", fnc:"getSlotsByLits"},
                               {label:"Lit. alternatives", fnc:"getAlternatives"},
                               {label:"Digraphs", fnc:"getDigraphInventory"}]];
    
    searchMode : string = "simple";
     setLists : SetListComponent[]=[];
     itemLists : SetListComponent[]=[];
    
     @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
     @Output() cmpLoading : EventEmitter<any> = new EventEmitter();
    
  constructor(private resolver : ComponentFactoryResolver) { }

  ngOnInit() {
      this.cmpLoaded.emit();
  }
    
    
fireSearch(e){
    console.log(e.filters);
    let ref = this;
    this.cmpLoading.emit();
    
    switch(e.fnc){
        case "getFilteredSets" : ref.setSearch(e); break;
         case "getSetsByLits" : ref.setSearch(e); break;
        case "getSlotsByLits" : ref.slotSearch(e); break;
        case "getFilteredSlots" : ref.slotSearch(e); break;
        case "getAlternatives" : ref.litSearch(e); break;
        case "getAdjacent" : ref.litSearch(e); break;
        case "getDigraphInventory" : if(e.search.main.indexOf("%")==-1){e.search.main="%"+e.search.main+"%"};ref.litSearch(e); break;
    }
    
   

}
    

    
    setSearch(e){
        //add new set-list + loadSets
        let ref = this;
        let setFactory = this.resolver.resolveComponentFactory(SetListComponent);
         let newSetList = this.container.createComponent(setFactory)._component;
        newSetList.loadSets(e.fnc,e.search.main, e.filters); 
        newSetList.cmpLoaded.subscribe((e)=>ref.cmpLoaded.emit());
        this.setLists.push(newSetList);
        
    }
    
     slotSearch(e){
        //add new item-list + loadItems
          let ref = this;
         
        let factory = this.resolver.resolveComponentFactory(ItemListComponent);
         let newItemList = this.container.createComponent(factory)._component;
        newItemList.loadItems(e.fnc,e.search.main, e.filters); 
         newItemList.cmpLoaded.subscribe((e)=>ref.cmpLoaded.emit());
           this.itemLists.push(newItemList);
    }
    
        litSearch(e){
        //add new item-list + loadItems
             let ref = this;
         
        let factory = this.resolver.resolveComponentFactory(ProfileSideComponent);
         let newInventory = this.container.createComponent(factory)._component;
        newInventory.loadAlternatives(e.fnc,e.search.main); 
            newInventory.cmpLoaded.subscribe((e)=>ref.cmpLoaded.emit());
        newInventory.open();
         //  this.itemLists.push(newItemList);
    }

}
