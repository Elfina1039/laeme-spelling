import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Set, Littera, Item, Slot } from '../classes/profile';
import { QueryData, Filter } from '../classes/general';
import { SetService } from '../services/set.service';
import { GraphicService } from '../services/graphic.service';



@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
    @Input("set") set : Set;
    @Input("queryData") queryData : QueryData;
    @ViewChild("itemList") itemList : any;
    @ViewChild("chart") chart : any;
    items : Item[] = [];
    filters : any = [];
    @Input("colorKey")  colorKey ;
    @Input("itemAction")   itemAction : string ;
    @Output() mapSet : EventEmitter<any> = new EventEmitter();
  
    @Output() requestItem : EventEmitter<any> = new EventEmitter();
    @Output() requestSelection : EventEmitter<any> = new EventEmitter();
    
    
  constructor(private setSvc: SetService,
              private graphicSvc : GraphicService,
              private renderer : Renderer2) { }

  ngOnInit() {
      if(!this.colorKey){
        let litStats = this.set.members;
        this.colorKey = this.graphicSvc.makeColorKey(litStats);
   //set console.log(this.colorKey);
   //set console.log(this.colorKey);
      }
      
      let chart = this.getChart();
      let container = this.chart.nativeElement;
      this.renderer.appendChild(container,chart);
  }
    
calcBorder(tokens){
    let border : any = Math.round((tokens/this.set.tokens)* 15);
    //return <string>border+"px";
    return 6;
}
    
showItems(){
    let ref = this;
    if(this.itemList.items.length==0){
    let lits : string = this.set.membersStrings.join(",");
    //let args : string[] = this.queryData.args.map((a)=>a);
      //  args.push(lits);
    let filters = JSON.stringify(this.queryData.filters);
       // args.push(JSON.stringify(filters));
    this.itemList.loadItems(ref.queryData.fnc,lits, filters);
    }
    else{
        this.itemList.show();
    }
    
}

hideItems(){
        this.itemList.hide();
    }
    
requestMap(){
    let lits : string = this.set.membersStrings.join(",");
    console.log("requesting" + lits);
    this.mapSet.emit({fnc:"mapSetExact", args:[lits]});
}

submitItem(e){
    this.requestItem.emit(e);
}
    
submitSelection(e){
    this.requestSelection.emit(e);
}
  
    
getChart(){
    let litStats = this.set.members;
    let tokens = this.set.tokens;
    let colorKey = this.colorKey;
    let pie = this.graphicSvc.drawPie(litStats, tokens, 20, colorKey );
    return pie;
}
    
   

}
