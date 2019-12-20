import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-token-search',
  templateUrl: './token-search.component.html',
  styleUrls: ['./token-search.component.css']
})
export class TokenSearchComponent implements OnInit {

    
    @Input("fields") fields : [string, string][];
    
  constructor() { }

  ngOnInit() {
  }

}
