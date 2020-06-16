import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Littera, Item, Slot } from '../classes/profile';
import { SetService } from '../services/set.service';
import { QueryData, Filter } from '../classes/general';
import { InterfaceService } from '../services/interface.service';
import { MemoryService } from '../services/memory.service';

import { ManuscriptService } from '../services/manuscript.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
     items : Item[] = [];
    open : boolean = false;
    selected : boolean = false;
    queryData : QueryData = {fnc:"", args:"", filters:[], getJsonFilters:function(){return ""}};
    
    @Input("enableSelect") enableSelect: boolean = true;
    @Input("itemAction")  itemAction : string ;
    
    @ViewChild("wrapper") wrapper : any;
    @ViewChild("splits") splits : any;
    
    @Output() requestItem : EventEmitter<any> = new EventEmitter();
    @Output() requestSelection : EventEmitter<any> = new EventEmitter();
     @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
    
    
  constructor(private setSvc : SetService,
               private intfSvc : InterfaceService,
              private renderer: Renderer2,
              private msSvc : ManuscriptService,
              private memorySvc: MemoryService) { }

  ngOnInit() {

      
  }
    
    
loadSplits(morphid, pos){
    this.splits.pos=pos;
    let fnc = this.queryData.fnc;
    let args : string = this.queryData.args;
     let filters : Filter[] = this.queryData.filters.filter((f)=>f.level!="l");
    let strFilters = JSON.stringify(filters);
       // args.push(JSON.stringify(filters));
      this.splits.loadSplits(fnc,morphid,strFilters);
    
    
  let splitWrapper = this.splits.wrapper.nativeElement;
    let ref = this;
    this.intfSvc.moveComponent(splitWrapper,ref);
}
    
loadSplitsEdit(morphid, pos){
    this.splits.pos=pos;
    let fnc = "getSplitsEditByMorphid";
      this.splits.loadSplits(fnc,morphid,"");
    
    
  let splitWrapper = this.splits.wrapper.nativeElement;
    let ref = this;
    this.intfSvc.moveComponent(splitWrapper,ref);
}
  
    
    
loadItems(fnc,args, filters=""){
    this.items = [];
    this.show();
     let ref = this;
     this.setSvc.fetchUniversal(fnc,[args,filters]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((i)=>{
                           ref.items.push(<Item>i);
                           });
         ref.queryData = new QueryData(data.queryData);
         if(ref.msSvc.msProfiles){
             console.log("Profiles available: " + ref.msSvc.msProfiles.length);
             
             ref.items.forEach((i)=>{
                 i.comparable=[];
                 ref.msSvc.msProfiles.forEach((p)=>{
                     if(p.slotRef[i.morphid+"-"+i.pos]){
                         console.log(i.morphid+"-"+i.pos);
                         i.comparable.push(p.id);
                     }
                 });
             });
         }
         ref.cmpLoaded.emit();
      })
    
} 
    
submitItem(item){
    console.log("requesting map for " + item.morphid);
    this.requestItem.emit({morphid:item.morphid, pos:item.pos});
}
    
submitSelection(){
    let selection = this.items.filter((i)=>i.selected).map((s)=>s.morphid+"-"+s.pos);
    console.log(selection);
     this.requestSelection.emit(selection);
}
    
saveSelection(){
    let selection = this.items.filter((i)=>i.selected);
    console.log(selection);
     this.memorySvc.addItemList(selection);
}
    
show(){
    this.wrapper.nativeElement.style.height="20em";
    this.open = true;
}
    
hide(){
   this.splits.wrapper.nativeElement.style.display = "none";
   // this.wrapper.nativeElement.style.height="0px";
    let toRender=this.wrapper.nativeElement;
    this.renderer.setStyle(toRender, "height", "0px");
    this.open=false;
}
    
    selectAll(){
        let value = !this.selected
        this.selected = value;
        this.items.forEach((i)=>i.selected=value);
    }
    
    
  

}
