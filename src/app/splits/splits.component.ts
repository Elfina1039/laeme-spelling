import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-splits',
  templateUrl: './splits.component.html',
  styleUrls: ['./splits.component.css']
})
export class SplitsComponent implements OnInit {
    patern : string[];
    splits :  string[][];   
  constructor() { }

  ngOnInit() {
  }

}
