import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-wiki-glossary',
  templateUrl: './wiki-glossary.component.html',
  styleUrls: ['./wiki-glossary.component.css']
})
export class WikiGlossaryComponent implements OnInit {
@Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
      this.cmpLoaded.emit();
  }

}
