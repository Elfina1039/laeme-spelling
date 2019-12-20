import { Component, OnInit, Input } from '@angular/core';
import { Set, Littera, Item, Slot } from '../classes/profile';
import { SetService } from '../services/set.service';


@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
    @Input("set") set : Set;
    items : Item[] = [];
    
    
  constructor(private setSvc: SetService) { }

  ngOnInit() {
      
  }
    
calcBorder(tokens){
    let border : number = Math.round((tokens/this.set.tokens)* 15);
    return <string>border+"px";
}
    
    
loadItems(){
     let ref = this;
      this.setSvc.fetchItems().subscribe((data:any)=>{
          console.log(data);
          data.items.forEach((i)=>{
                           ref.items.push(<Item>i);
                           });
      })
    
}    

}
