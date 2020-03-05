import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { QueryData, Filter, SearchFnc } from '../classes/general';
import { SetListComponent } from '../set-list/set-list.component';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'app-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.css']
})
export class SearchWrapperComponent implements OnInit {
      @ViewChild("container", {read: ViewContainerRef}) container;
    searchFncs : SearchFnc[][] = [[{label:"Search sets", fnc:"getFilteredSets"},
                                  {label:"Search items", fnc:"getFilteredSlots"}],
                               [{label:"Search sets", fnc:"getSetsByLits"},
                               {label:"Search items", fnc:"getSlotsByLits"}]];
    
    searchMode : string = "simple";
     setLists : SetListComponent[]=[];
     itemLists : SetListComponent[]=[];
    
  constructor(private resolver : ComponentFactoryResolver) { }

  ngOnInit() {
  }
    
    
fireSearch(e){
    console.log(e.filters);
    let ref = this;
    
    switch(e.fnc){
        case "getFilteredSets" : ref.setSearch(e); break;
         case "getSetsByLits" : ref.setSearch(e); break;
        case "getSlotsByLits" : ref.slotSearch(e); break;
        case "getFilteredSlots" : ref.slotSearch(e); break;
    }
    
   

}
    

    
    setSearch(e){
        //add new set-list + loadSets
        
        let setFactory = this.resolver.resolveComponentFactory(SetListComponent);
         let newSetList = this.container.createComponent(setFactory)._component;
        newSetList.loadSets(e.fnc,e.search.main, e.filters); 
        this.setLists.push(newSetList);
    }
    
     slotSearch(e){
        //add new item-list + loadItems
         
        let factory = this.resolver.resolveComponentFactory(ItemListComponent);
         let newItemList = this.container.createComponent(factory)._component;
        newItemList.loadItems(e.fnc,e.search.main, e.filters); 
           this.itemLists.push(newItemList);
    }

}
