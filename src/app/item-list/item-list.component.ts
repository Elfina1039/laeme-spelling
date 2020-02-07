import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Littera, Item, Slot } from '../classes/profile';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
     items : Item[] = [];
    open : boolean = false;
    filters : any = [];
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
      this.splits.loadSplits("getSplitsByMorphid",[morphid]);
}
    
    
loadItems(fnc,args){
    this.items = [];
    this.show();
     let ref = this;
     this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
          console.log(data);
          data.forEach((i)=>{
                           ref.items.push(<Item>i);
                           });
      })
    
} 
    
submitItem(item){
    console.log("requesting map for " + item.strid);
    this.requestItem.emit({strid:item.strid, pos:item.pos});
}
    
submitSelection(){
    let selection = this.items.filter((i)=>i.selected).map((s)=>s.strid+"-"+s.pos);
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
