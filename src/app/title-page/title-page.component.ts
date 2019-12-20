import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})
export class TitlePageComponent implements OnInit {

    versions: [number, boolean, string][] = [[4, true, "T"],[5, true, "L"],[6, true, "e"],[7, true, "E"],[8, true, "D"],[9, true, "J"],[10, true, "M"]];
    
  constructor(private router : Router) { }

  ngOnInit() {
  }
    
    redirect(){
        let selection = this.versions.filter((v)=>v[1]==true).map((v)=>v[0]);
        
        console.log(selection);
        this.router.navigate(["/mss/"+selection.join(",")]);
    }

}
