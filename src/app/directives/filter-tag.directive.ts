import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Filter } from "../classes/general"


@Directive({
  selector: '[appFilterTag]'
})
export class FilterTagDirective implements OnInit {
 @Input("appFilterTag") filter : Filter;
        
tagKey : any = {
    l:{wI : {label : "word-initial", optionSet : "posTags"},
    mI : {label : "morpheme-initial", optionSet : "posTags"},
    wF : {label : "word-final", optionSet : "posTags"},
    mF : {label : "morpheme-final", optionSet : "posTags"},
    C : {label : "consonant", optionSet : "soundTags"},
     V : {label : "vowel", optionSet : "soundTags"},
     T : {label : "transitional", optionSet : "soundTags"},
    l : {label : "labial", optionSet : "conPlace"},
    ld : {label : "labio-dental", optionSet : "conPlace"},
    d : {label : "dental", optionSet : "conPlace"},
    a : {label : "alveolar", optionSet : "conPlace"},
    p : {label : "palatal", optionSet : "conPlace"},
    v : {label : "velar", optionSet : "conPlace"},
    g : {label : "glottal", optionSet : "conPlace"},
    P : {label : "plosive", optionSet : "conMode"},
    F : {label : "fricative", optionSet : "conMode"},
    Af : {label : "affricate", optionSet : "conMode"},
    Xc : {label : "central approximant", optionSet : "conMode"},
    Xl : {label : "lateral approximant", optionSet : "conMode"},
    N : {label : "nasal", optionSet : "conMode"},
    L : {label : "liquid", optionSet : "conMode"},
    S : {label : "spirant", optionSet : "conMode"},
    ST : {label : "short", optionSet : "vowelTags"},
    LN : {label : "long", optionSet : "vowelTags"},
    DP : {label : "diphthong", optionSet : "vowelTags"},
    1 : {label : "low", optionSet : "vowHeight"},
    2 : {label : "low-mid", optionSet : "vowHeight"},
    3 : {label : "mid", optionSet : "vowHeight"},
    4 : {label : "high-mid", optionSet : "vowHeight"},
    5 : {label : "high", optionSet : "vowHeight"}},
    m:{
      
     1:{label : "C12b2", optionSet : "msDate"},
     2:{label : "C13a1", optionSet : "msDate"},
     3:{label : "C13a2", optionSet : "msDate"},
     4:{label : "C13b1", optionSet : "msDate"},
     5:{label : "C13b2", optionSet : "msDate"},
     6:{label : "C14a1", optionSet : "msDate"},
     7:{label : "C14a2", optionSet : "msDate"},
     8:{label : "C14b1", optionSet : "msDate"}}
    };
    colorKey : any = {m : "navy", l : "#b30e11"};



    
    
  constructor(private el : ElementRef) {
el.nativeElement.style.borderRadius="0.2em";
el.nativeElement.style.padding="0.2em";
      el.nativeElement.style.margin="0.3em";
      el.nativeElement.style.color="white";
el.nativeElement.style.border="1px dashed white";
   
  }
    
    ngOnInit(){
        let lvl = this.filter.level;
        this.el.nativeElement.style.backgroundColor=this.colorKey[lvl];
        
        if(this.filter.operator=="equals"){
             this.el.nativeElement.innerHTML = this.filter.field+" : "+this.filter.values.join(", ");
        }else{
             this.el.nativeElement.innerHTML = this.filter.values.map((v)=>{if(this.tagKey[lvl][v]){return this.tagKey[lvl][v].label}
            else
                {return v}
            });
        }
        
       
    }
    
    

}
