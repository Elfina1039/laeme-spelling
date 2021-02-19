import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations'

@Component({
  selector: 'app-wiki-overview',
  templateUrl: './wiki-overview.component.html',
  styleUrls: ['./wiki-overview.component.css'],
    animations:[
        trigger("appear", [
            transition("void => *", [
                style({opacity:0}),
                animate(1000)
            ])
        ])
    ]
})
export class WikiOverviewComponent implements OnInit {
@Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
      this.cmpLoaded.emit();
  }

}
