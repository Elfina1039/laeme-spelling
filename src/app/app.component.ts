import { Component, ViewChild } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd} from '@angular/router';
import { MemoryService } from './services/memory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'laeme-spelling';
    showLoadingIndicator : boolean = true;
    @ViewChild("menu") menu : any;
    
    constructor(private memorySvc : MemoryService,
                private router : Router,
                ){
        this.router.events.subscribe((e : Event) =>{
           console.log(e);
            if(e instanceof NavigationStart){
                console.log(e);
                this.showLoadingIndicator = true;
            };
            
        //    if(e instanceof NavigationEnd){
        //        this.showLoadingIndicator = false;
        //    }
         
        });
        
    }
    
    catchComponent(e){
        e.cmpLoading.subscribe((l)=>this.showLoadingIndicator=true);
    e.cmpLoaded.subscribe((l)=>this.showLoadingIndicator=false);
    };
    
}
