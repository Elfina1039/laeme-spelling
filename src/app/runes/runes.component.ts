import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-runes',
  templateUrl: './runes.component.html',
  styleUrls: ['./runes.component.css']
})
export class RunesComponent implements OnInit {
 @Input("target") target : any;
     @Input("field") field : string;
    runes : string[] = ["ð","ᵹ","þ","ƿ","ȝ"];
  constructor() { }

  ngOnInit() {
  }
    
    writeRune(r){

        this.target[this.field] = this.target[this.field]+r;
    }

}
