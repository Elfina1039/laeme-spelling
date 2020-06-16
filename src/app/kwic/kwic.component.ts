import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetService } from '../services/set.service';
import { Token } from '../classes/token';

@Component({
  selector: 'app-kwic',
  templateUrl: './kwic.component.html',
  styleUrls: ['./kwic.component.css']
})
export class KwicComponent implements OnInit {
    lines : [number, Token[]][] = [];
@Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
    
  constructor(protected route: ActivatedRoute, protected router : Router , private setSvc : SetService) { }
    
  ngOnInit() {
      
     let ref = this;
      
       this.route.paramMap.subscribe(function(p){
        let fnc : string=p.get('fnc');
        let args : string=p.get('args');
           let range : string=p.get('range');
           
        
           console.log(args);

    ref.loadKwic(fnc,args, range);

      });  
      
      
  }
    
    
    loadKwic(fnc : string, args : string, range: string="5"){
     let ref = this;
    this.lines = [];
      this.setSvc.fetchUniversal(fnc,[args,range]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((l)=>{
                            let tokens = l.tokens.sort((a,b)=>{return a.id<b.id ? 1:-1});
                           ref.lines.push([l.morphid, tokens]);
                           
                           });
           //ref.queryData = new QueryData(data.queryData);
          console.log(ref.lines);
          ref.cmpLoaded.emit();
      })

}
    

}
