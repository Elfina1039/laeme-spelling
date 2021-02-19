import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, Output, EventEmitter } from '@angular/core';
import {showHide} from "./../animations";
import { QueryData, Filter, SearchFnc } from '../classes/general';
import { SetListComponent } from '../set-list/set-list.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { ProfileSideComponent } from '../profile-side/profile-side.component';
import { LitInventoryComponent } from '../lit-inventory/lit-inventory.component';

@Component({
  selector: 'app-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.css'],
    animations:[showHide]
})
export class SearchWrapperComponent implements OnInit {
      @ViewChild("container", {read: ViewContainerRef}) container;
    @ViewChild("results") results;
    searchFncs : SearchFnc[][] = [[{label:"Sets", fnc:"getFilteredSets"},
                                  {label:"Items", fnc:"getFilteredSlots"}
                                  ],
                               [{label:"Sets", fnc:"getSetsByLits"},
                               {label:"Items", fnc:"getSlotsByLits"},
                               {label:"Lit. alternatives", fnc:"getAlternatives"},
                               {label:"Polygraphs", fnc:"getDigraphInventory"}]];
    
    searchMode : string = "simple";
     setLists : SetListComponent[]=[];
     itemLists : SetListComponent[]=[];
    
    frameCount : number = 0;
    view : string = "gridBigger"
    grid : [number, number] = [47,47];
    
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
    this.frameCount++;
    
    switch(e.fnc){
        case "getFilteredSets" : ref.setSearch(e); break;
         case "getSetsByLits" : ref.setSearch(e); break;
        case "getSlotsByLits" : ref.slotSearch(e); break;
        case "getFilteredSlots" : ref.slotSearch(e); break;
        case "getAlternatives" : ref.litSearch(e); break;
        case "getAdjacent" : ref.litSearch(e); break;
        case "getDigraphInventory" : if(e.search.main.indexOf("%")==-1){e.search.main="%"+e.search.main+"%"};ref.litSearch(e); break;
    }
    
   let nFrame = this.results.nativeElement.children[this.frameCount];
    this.resizeFrame(nFrame, ref.grid[0], ref.grid[1]);

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
    
    
    setGrid(rows, columns){
        let w = 94/columns;
        let h = 94/rows;
        
        this.grid=[w,h];
        
        console.log(this.results.nativeElement.children);
        
        let frames = this.results.nativeElement.children;
        
        for(let i=1; i<frames.length;i++){
            console.log(frames[i]);
           // frames[i].style.padding="0.2em";
            this.resizeFrame(frames[i], w, h);
           // this.results.nativeElement.append(frames[i]);
        }   
       
    }
    
    resizeFrame(frame, w, h){
        console.log("resizing");
        console.log(frame);
        console.log(h);
        frame.style.width=w+"%";
        frame.style.height=h+"%";
    }

}
