import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.css']
})
export class UserGuideComponent implements OnInit {
@Output() cmpLoaded : EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
      this.cmpLoaded.emit();
  }

}
