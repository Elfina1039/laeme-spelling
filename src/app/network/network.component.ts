import { Component, OnInit, ViewChild, Output, EventEmitter, AfterContentInit, ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemListComponent } from '../item-list/item-list.component';


import { DataSet, Network } from "vis-network/standalone/esm/vis-network";
import { Littera, LitCorresp } from "../classes/profile";
import { SetService } from "../services/set.service";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

    @ViewChild("container") containerRef : any;
    container : HTMLDivElement;
     @ViewChild("ilContainer", {read: ViewContainerRef}) ilContainer;
    nodeSource : any;
    nodes : any;
    edgeSource : any;
    edges : any;
    mss : number[] = [];
    lits : string[] = [];
    options : any = {
         interaction:{hover:true} ,
          groups: {
    0: {color:{background:'navy', border:"white", highlight:{background:"blue", border:"black"},hover:{background:"blue", border:"black"}}, font:{color:"white", size:16, bold:true}, borderWidth:1},
    1: {shape:"box",color:{background:'#b30e11', border:"white", highlight:{background:"red", border:"black"} ,hover:{background:"red", border:"black"}}, font:{color:"white", size:16, bold:true}, borderWidth:1}
  }
    };
    itemLists : ItemListComponent[] = [];
     @Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
     @Output() cmpLoading : EventEmitter<any> = new EventEmitter();
    
  constructor(private setSvc : SetService,
              protected route: ActivatedRoute,
              private resolver : ComponentFactoryResolver) {
    //  console.log(this.container);
      }
 

  ngOnInit() {
       this.container = this.containerRef.nativeElement;
      
        let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let fnc : string=p.get('fnc');
        let ids : string[]=p.get('ids').split(",");
        let litSource : string=p.get('lits');
        
           if(litSource){
               ref.lits= litSource.split(",")
           }
        ref.mss=ids.map((i)=>parseInt(i));
    
           console.log(ref.mss);
    ref.loadComplete(fnc);
           
         //  ref.params={fnc:fnc, args:args};
         
      });  
  }
    
loadComplete(fnc){
    let ref = this;
    let args : any[] = [];
    console.log(ref.lits);
     switch(fnc){
        case "getCorresp" :  ref.mss.forEach((id, idi)=> ref.loadLitterae("getInventory",[id],idi)); args=ref.mss; break;
        case "getMsCorresp" :  ref.mss.forEach((id, idi)=> ref.loadLitterae("getInventory",[id],idi)); args=ref.mss; break;
      case "getAllCorresp" :  ref.loadLitterae("getAllLitterae",[0],0); args=[]; break;
        case "getLitCorresp" :  ref.loadLitterae("getAlternatives",ref.lits,0);args=ref.lits; break;
    }
    
    this.loadCorresp(fnc,args);
}
    

loadCorresp(fnc, args){
         let ref = this;
    let a, b : number;
    switch(fnc){
        case "getCorresp" :  a = args[0]; b=args[1]; break;
        case "getMsCorresp" :  a = args[0]; b=args[0]; break;
      case "getAllCorresp" :  a = 0; b=0; break;
        case "getLitCorresp" :  a = args[0]; b=args[0]; break;
    }
    
  //  this.mss = [a,b];
    this.edges = [];
    this.edgeSource = [];
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
         // console.log(data);
          data.rows.forEach((lc)=>{
                           ref.edgeSource.push(new LitCorresp(lc).toEdge(a,b));
                           });
         // console.log(ref.edgeSource);
           ref.drawNetwork();
         // ref.queryData = data.queryData;
      })
    
}
    
loadLitterae(fnc, args, group){
    console.log(fnc +" : " + args.join(","));
         let ref = this;
    this.nodes = [];
    this.nodeSource = [];
  
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
        //  console.log(data);
          data.rows.forEach((ns, nsi)=>{
                           ref.nodeSource.push(new Littera(ns).toNode(args[0],group));
                           });
           //console.log(ref.nodeSource);
         
         // ref.queryData = data.queryData;
      }) 
}  
    
drawNetwork() {
    let ref = this;
 //this.nodes = new DataSet(this.nodeSource);
//this.edges = new DataSet(this.edgeSource.filter((ns)=>ns.from.split("/")[0]!=ns.to.split("/")[0]));

// create a network

let data = {
  nodes: this.nodeSource,
  edges: this.edgeSource.filter((ns)=>ns.from.split("/")[0]!=ns.to.split("/")[0])
};
    

const network = new Network(this.container, data, this.options);

network.on("afterDrawing", function(params) {
   ref.cmpLoaded.emit();
});      
    
network.on("selectNode", function(params) {
  console.log("selectNode Event:", params);
    let args = ref.getArgsFromNode(params);
    ref.displayItems(args);
    
}); 
    
network.on("selectEdge", function(params) {
  console.log("selectEdge Event:", params);
    
   // ref.displayItems(params);
    if(params.nodes.length==0){
        let args = ref.getArgsFromEdge(params, network);
    ref.displayItems(args);
    }
    
});    
    
    
    network.on("hoverNode", function(params) {
  console.log("hoverNode Event:", params);
    let alternatives = network.getConnectedNodes(params.node);
        console.log(alternatives);
        let other = ref.getOtherNode(params.node);
       
      //  network.selectNodes(alternatives);
    
});  
    
   
    
} 
    
displayItems(args){
      console.log("adding new item list");
    console.log(args);
    this.cmpLoading.emit();
    let ref = this;
   
  
    let itemListFactory = ref.resolver.resolveComponentFactory(ItemListComponent);

    let newItemList = this.ilContainer.createComponent(itemListFactory)._component;
   
    newItemList.cmpLoaded.subscribe((e)=>{ref.cmpLoaded.emit()});
     newItemList.loadItems("getSlotsCorresp",args); 

    //let newLayer = newMap.addLaemeData(data);   

 
   // ref.inventories.push(newInventory);

this.itemLists.push(newItemList);
    
}
    
getArgsFromNode(node){
     let a, b :string;
    let ref=this;
    
    let nodeData : string[] = node.nodes[0].split("/");
    
    console.log(nodeData);
      console.log(ref.mss);
    
    if(parseInt(nodeData[1])==ref.mss[0]){
        a=nodeData[0];
        b="%";
    }else{
        b=nodeData[0];
        a="%";
    }
  
    let args : string = [ref.mss[0], ref.mss[1], a, b].join(";");
    return args;
}  
    
getArgsFromEdge(params, network){
     let la, lb :string;
    let aid, bid : number;
    let nodes = network.getConnectedNodes(params.edges[0]);
    console.log(nodes);
    let a = nodes[0].split("/");
    la = a[0];
    aid = a[1];
    
      let b = nodes[1].split("/");
    lb = b[0];
    bid = b[1];
    
    let args : string = [aid, bid, la, lb].join(";");
    return args;

    
}
    
       getOtherNode(node){
         let nodeData : string[] = node.split("/");
        let otherMs = this.getOtherMs(node);
           let rsl : string = [nodeData[0], otherMs].join("/");;
           return rsl;
    }
    
    getOtherMs(node){
        let ref = this;
         let nodeData : string[] = node.split("/");
        if(parseInt(nodeData[1])==ref.mss[0]){
            return ref.mss[1];
        }else{
            return ref.mss[0];
        }
    }
    
    

}
