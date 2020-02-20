import { Component, ViewChild } from '@angular/core';
import { MemoryService } from './services/memory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'laeme-spelling';
    
    @ViewChild("menu") menu : any;
    
    constructor(private memorySvc : MemoryService){
        
    }
    
}
