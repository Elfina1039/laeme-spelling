import { Component, ViewChild } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterOutlet} from '@angular/router';
import { MemoryService } from './services/memory.service';
import { SetService } from './services/set.service';

import { routeAnimation } from './animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    animations:[
        routeAnimation
    ]
})
export class AppComponent {
  title = 'laeme-spelling';
    shLoadingIndicator : boolean = true;
    currentUrl : string;
    @ViewChild("menu") menu : any;
    @ViewChild("loadingIndicator") loadingIndicator : any;
    
    constructor(private memorySvc : MemoryService,
                private router : Router,
                 private setSvc : SetService
                ){
        this.router.events.subscribe((e : Event) =>{
           console.log(e);
            if(e instanceof NavigationStart){
                console.log(e);
                this.showLoadingIndicator();
                this.currentUrl = e.url;
            };
            
        //    if(e instanceof NavigationEnd){
        //        this.showLoadingIndicator = false;
        //    }
         
        });
        
    }
    
    
    switchSearchMode(){
        if(this.setSvc.searchMode=="slot"){
            this.setSvc.searchMode="chunk";
        }else{
            this.setSvc.searchMode="slot";
        }
    }
    
    catchComponent(e){
        if(e.cmpLoading){
            e.cmpLoading.subscribe((l)=>this.showLoadingIndicator()); 
        }
       
    e.cmpLoaded.subscribe((l)=>this.hideLoadingIndicator());
    };
    
    showLoadingIndicator(){
        this.loadingIndicator.nativeElement.style.display="block";
    }
    
     hideLoadingIndicator(){
        this.loadingIndicator.nativeElement.style.display="none";
    }
    
}
