import { Injectable } from '@angular/core';
import {  Filter,  OptionSet } from '../classes/general';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {
    
 filters : Filter[] = [
     {label:"Position", 
      level : "l", 
      field : "main_pos_tags", 
      operator : "@>",
      optionSets : ["posTags"],
      values : []},
    {label:"Sound", 
      level : "l", 
      field : "main_tags", 
     operator : "@>",
     optionSets : ["soundTags"],
      values : []},
     {label:"Sound", 
      level : "l", 
      field : "pre_tags",
      operator : "@>",
      optionSets : ["soundTags"],
      values : []},
     {label:"Sound", 
      level : "l", 
      field : "post_tags",
      operator : "@>",
      optionSets : ["soundTags"],
      values : []},
     {label:"Manuscript", 
      level : "m", 
      field : "text_tags", 
      operator : "@>",
      optionSets : ["msDate", "msLocalisation"],
      values : []}
     
     
 ];    
        
    
  optionSets : OptionSet[] = [
      {id : "msDate",
       label :"MS Date",
      options : [["C13a1", false],
                ["C13a2", false]]},
        {id : "msLocalisation",
       label :"MS Localisation",
      options : [["Kent", false],
                ["Worcestershire", false]]},
      {id : "posTags",
       label :"Position",
      options : [["wI", false],
                ["wF", false]]},
      {id : "soundTags",
       label :"Type",
      options : [["C", false],
                ["V", false]]},
       {id : "vowelTags",
       label :"Consonants",
      options : [["V", false],
                ["DP", false]]}
  ];
  constructor() { 
      
  
  }
    
getFilters(field){
    let result = [];
      this.filters.forEach((f)=>{
        if(f.field.match(field)){
            result.push(JSON.parse(JSON.stringify(f)));
        }
    });
    
    return result;
}
    
getOptionSets(setsIds){
    
    let result =[];
    
    this.optionSets.forEach((os)=>{
        if(setsIds.indexOf(os.id)!=-1){
            result.push(JSON.parse(JSON.stringify(os)));
        }
    });
      console.log(this.optionSets);
    
    return result;
}
}
