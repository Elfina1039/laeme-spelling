import { Component, OnInit , Input, ViewChild} from '@angular/core';
import { Form } from '../classes/profile';
import { SetService } from '../services/set.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

    forms : Form[] = [];
    @Input("textId") textId : number = 0;
     @ViewChild("content") content : any;
    
  constructor(protected setSvc : SetService) { }

  ngOnInit() {
  }
    
loadAll(){
    let args = this.textId.toString();
    this.loadForms("getFormsByMs",args);
}    
    
loadForms(fnc : string, args : string){
 
    this.forms=[];
     let ref = this;
  
      this.setSvc.fetchUniversal(fnc,[args]).subscribe((data:any)=>{
          console.log(data);
          data.rows.forEach((i)=>{
                           ref.forms.push(<Form>i);
              console.log(i);
                           });

      })
    
}

}
