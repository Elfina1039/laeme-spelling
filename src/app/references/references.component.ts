import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit {
@Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
      this.cmpLoaded.emit();
  }

}
