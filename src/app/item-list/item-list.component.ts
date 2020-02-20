import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Littera, Item, Slot } from '../classes/profile';
import { SetService } from '../services/set.service';
import { QueryData, Filter } from '../classes/general';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
     items : Item[] = [];
    open : boolean = false;
    queryData : QueryData;
    @Input("enableSelect") enableSelect: boolean = true;
    
    @ViewChild("wrapper") wrapper : any;
    @ViewChild("splits") splits : any;
    
    @Output() requestItem : EventEmitter<any> = new EventEmitter();
    @Output() requestSelection : EventEmitter<any> = new EventEmitter();
    
    
  constructor(private setSvc : SetService,
              private renderer: Renderer2) { }

  ngOnInit() {

      
  }
    
    
loadSplits(morphid, pos){
    this.splits.pos=pos;
    let fnc = this.queryData.fnc;
    let args : string[] = this.queryData.args.map((a)=>a);
        args.push(morphid);
    let filters = this.queryData.filters;
       // args.push(JSON.stringify(filters));
      this.splits.loadSplits(fnc,args);
}
    
    
loadItems(fnc,args){
    this.items = [];
    this.show();
     let ref = this;
     this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((i)=>{
                           ref.items.push(<Item>i);
                           });
         ref.queryData = data.queryData;
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
    
show(){
    this.wrapper.nativeElement.style.height="20em";
    this.open = true;
}
    
hide(){
    console.log("hiding items - "+this.wrapper.nativeElement.style.height);
   // this.wrapper.nativeElement.style.height="0px";
    let toRender=this.wrapper.nativeElement;
    this.renderer.setStyle(toRender, "height", "0px");
    this.open=false;
}
    
    
  

}
