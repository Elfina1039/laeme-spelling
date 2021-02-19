import { Component, OnInit } from '@angular/core';
import { SetService } from '../services/set.service';
import { Constraint, ConstraintVal } from '../classes/general';

@Component({
  selector: 'app-lit-constraints',
  templateUrl: './lit-constraints.component.html',
  styleUrls: ['./lit-constraints.component.css']
})
export class LitConstraintsComponent implements OnInit {

    constraints : Constraint[] = [];
    
  constructor(private setSvc : SetService) { }

  ngOnInit() {
    //  this.loadConstraints("getConstraintsForText","c;9");
  }

    
loadConstraints(fnc, args,  filters=""){
     this.constraints = [];
     let ref = this;
     this.setSvc.fetchUniversal(fnc,[args,filters]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((i)=>{
                           ref.constraints.push(<Constraint>i);
                           });
        // ref.queryData = new QueryData(data.queryData);
    
      })
    
}
    
calcGradient(ratio){
    let percent : number = ratio*100;
    let rsl : string = "linear-gradient(to right, navy "+percent+"%, transparent "+percent+"%)";
    console.log(rsl);
    return rsl;
}
    
    
    
}
