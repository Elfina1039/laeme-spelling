import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    nodeSource : any;
    nodes : any;
    edgeSource : any;
    edges : any;
    mss : number[];
    options : any = {
          groups: {
    0: {color:{background:'navy', border:"white"}, font:{color:"white", size:16, bold:true}, borderWidth:1},
    1: {color:{background:'#b30e11', border:"white"}, font:{color:"white", size:16, bold:true}, borderWidth:1}
  }
    };
    
  constructor(private setSvc : SetService,
              protected route: ActivatedRoute) {
    //  console.log(this.container);
      }
 

  ngOnInit() {
       this.container = this.containerRef.nativeElement;
      
        let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let fnc : string=p.get('fnc');
        let ids : string[]=p.get('ids').split(",");
   this.mss=ids;
    ref.loadComplete(fnc,ids);
           
         //  ref.params={fnc:fnc, args:args};
         
      });  
  }
    
loadComplete(fnc,ids){
    let ref = this;
    if(fnc!="getAllCorresp"){
        ids.forEach((id, idi)=> ref.loadLitterae("getInventory",id,idi));
    }else{
        ref.loadLitterae("getAllLitterae",0,0)
    }
    this.loadCorresp(fnc,ids);
}
    

loadCorresp(fnc, args){
         let ref = this;
    let a, b : number;
    switch(fnc){
        case "getCorresp" :  a = args[0]; b=args[1]; break;
        case "getMsCorresp" :  a = args[0]; b=args[0]; break;
      case "getAllCorresp" :  a = 0; b=0; break;
    }
    
    
    this.edges = [];
    this.edgeSource = [];
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
         // console.log(data);
          data.rows.forEach((lc)=>{
                           ref.edgeSource.push(new LitCorresp(lc).toEdge(a,b));
                           });
          console.log(ref.edgeSource);
           ref.drawNetwork();
         // ref.queryData = data.queryData;
      })
    
}
    
loadLitterae(fnc, id, group){
         let ref = this;
    this.nodes = [];
    this.nodeSource = [];
    let args : number[]=[];
    if(id==0){
        args = [];
    }else{
        args = [id];
    }
    
      this.setSvc.fetchUniversal(fnc,args).subscribe((data:any)=>{
        //  console.log(data);
          data.rows.forEach((ns, nsi)=>{
                           ref.nodeSource.push(new Littera(ns).toNode(id,group));
                           });
           console.log(ref.nodeSource);
         
         // ref.queryData = data.queryData;
      }) 
}  
    
drawNetwork() {
    
 //this.nodes = new DataSet(this.nodeSource);
//this.edges = new DataSet(this.edgeSource.filter((ns)=>ns.from.split("/")[0]!=ns.to.split("/")[0]));

// create a network

let data = {
  nodes: this.nodeSource,
  edges: this.edgeSource.filter((ns)=>ns.from.split("/")[0]!=ns.to.split("/")[0])
};
    

const network = new Network(this.container, data, this.options);
    
network.on("selectEdge", function(params) {
  console.log("selectEdge Event:", params);
});    
    
}   

}
