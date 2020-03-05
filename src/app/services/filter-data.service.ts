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
      operator : "contains",
      optionSets : ["posTags"],
      values : []},
    {label:"Sound", 
      level : "l", 
      field : "main_tags", 
     operator : "contains",
     optionSets : ["soundTags", "vowelTags", "vowelHeight", "conPlace", "conMode"],
      values : []},
     {label:"Sound", 
      level : "l", 
      field : "pre_tags",
      operator : "contains",
      optionSets :  ["soundTags", "vowelTags", "vowelHeight", "conPlace", "conMode"],
      values : []},
     {label:"Sound", 
      level : "l", 
      field : "post_tags",
      operator : "contains",
      optionSets :  ["soundTags", "vowelTags", "vowelHeight", "conPlace", "conMode"],
      values : []},
     {label:"Date", 
      level : "m", 
      field : "text_tags", 
      operator : "overlap",
      optionSets : ["msDate"],
      values : []},
      {label:"Localisation", 
      level : "m", 
      field : "text_tags", 
      operator : "overlap",
      optionSets : [ "msLocalisation"],
      values : []}
     
     
 ];    
        
    
  optionSets : OptionSet[] = [
      {id : "msDate",
       label :"MS Date",
      options : [{"tag":"1","label":"C12b2","count":9,"checked":false},
                 {"tag":"2","label":"C13a1","count":31,"checked":false},
                 {"tag":"3","label":"C13a2","count":42,"checked":false},
                 {"tag":"4","label":"C13b1","count":40,"checked":false},{"tag":"5","label":"C13b2","count":70,"checked":false},
                 {"tag":"6","label":"C14a1","count":42,"checked":false},

                 {"tag":"7","label":"C14a2","count":13,"checked":false}
]},
      
        {id : "msLocalisation",
       label :"MS Localisation",
      options : [{"tag":"Not placed","label":"Not placed","count":47,"checked":false},
{"tag":"Worcs","label":"Worcs","count":17,"checked":false},
{"tag":"Norfolk","label":"Norfolk","count":12,"checked":false},
{"tag":"Essex","label":"Essex","count":10,"checked":false},
{"tag":"Herefords","label":"Herefords","count":9,"checked":false},
{"tag":"Gloucs","label":"Gloucs","count":8,"checked":false},
{"tag":"Lincs","label":"Lincs","count":8,"checked":false},
{"tag":"Yorks","label":"Yorks","count":7,"checked":false},
{"tag":"Salop","label":"Salop","count":6,"checked":false},
{"tag":"Cambs","label":"Cambs","count":4,"checked":false},
{"tag":"Wilts","label":"Wilts","count":4,"checked":false},
{"tag":"Hunts","label":"Hunts","count":4,"checked":false},
{"tag":"Cheshire","label":"Cheshire","count":3,"checked":false},
{"tag":"Berks","label":"Berks","count":3,"checked":false},
{"tag":"Somerset","label":"Somerset","count":3,"checked":false},
{"tag":"Kent","label":"Kent","count":3,"checked":false},
{"tag":"Lancs","label":"Lancs","count":2,"checked":false},
{"tag":"Oxon","label":"Oxon","count":2,"checked":false},
{"tag":"Hants","label":"Hants","count":2,"checked":false},
{"tag":"Devon","label":"Devon","count":2,"checked":false},
{"tag":"Northants","label":"Northants","count":2,"checked":false},
{"tag":"Sussex","label":"Sussex","count":1,"checked":false},
{"tag":"Wawicks","label":"Wawicks","count":1,"checked":false},
{"tag":"Leics","label":"Leics","count":1,"checked":false},
{"tag":"Chester","label":"Chester","count":1,"checked":false},
{"tag":"Suffolk","label":"Suffolk","count":1,"checked":false},
{"tag":"Durham","label":"Durham","count":1,"checked":false},
{"tag":"Surrey","label":"Surrey","count":1,"checked":false},
{"tag":"Cumberland","label":"Cumberland","count":1,"checked":false},
{"tag":"London","label":"London","count":1,"checked":false},
{"tag":"Staffs","label":"Staffs","count":1,"checked":false},
{"tag":"Dorset","label":"Dorset","count":1,"checked":false},
{"tag":"NRY","label":"NRY","count":1,"checked":false}]},
      
      {id : "posTags",
       label :"Position",
      options : [{"tag":"mF","label":"Morpheme-final","count":38753,"checked":false},
{"tag":"mI","label":"Morpheme-init","count":38753,"checked":false},
{"tag":"wI","label":"Word-init","count":29826,"checked":false},
{"tag":"wF","label":"Word-final","count":21512,"checked":false}]},
      
      {id : "soundTags",
       label :"Type",
      options : [{"tag":"C","label":"Consonant","count":1,"checked":false},
{"tag":"V","label":"Vowel","count":1,"checked":false},
{"tag":"T","label":"Transitional","count":1,"checked":false},
{"tag":"DP","label":"Diphthong","count":1,"checked":false}]},
      
       {id : "vowelTags",
       label :"Vowels",
      options : [{"tag":"ST","label":"Short","count":1,"checked":false},
{"tag":"LN","label":"Long","count":1,"checked":false}]},
      
       {id : "vowelHeight",
       label :"Vowel height",
      options : 
[{"tag":"1","label":"low","count":1,"checked":false},
{"tag":"2","label":"low-mid","count":1,"checked":false},
{"tag":"3","label":"mid","count":1,"checked":false},
{"tag":"4","label":"high mid","count":1,"checked":false},
{"tag":"5","label":"high","count":1,"checked":false}]},
      
       {id : "conPlace",
       label :"Consonant - pl.",
      options : 
[{"tag":"l","label":"labial","count":1,"checked":false},
{"tag":"ld","label":"labio-dental","count":1,"checked":false},
{"tag":"d","label":"dental","count":1,"checked":false},
{"tag":"a","label":"alveolar","count":1,"checked":false},
{"tag":"p","label":"palatal","count":1,"checked":false},
{"tag":"v","label":"velar","count":1,"checked":false},
{"tag":"g","label":"glottal","count":1,"checked":false}]},
      
       {id : "conMode",
       label :"Consonant - md.",
      options : 
[{"tag":"P","label":"Plosive","count":1,"checked":false},
{"tag":"F","label":"Fricative","count":1,"checked":false},
{"tag":"A","label":"Affricate","count":1,"checked":false},
{"tag":"Xc","label":"Approximant - c.","count":1,"checked":false},
{"tag":"Xl","label":"Approximant - l.","count":1,"checked":false},
{"tag":"N","label":"Nasal","count":1,"checked":false},
{"tag":"L","label":"Liquid","count":1,"checked":false},
{"tag":"S","label":"Spirant","count":1,"checked":false}]}
  
  
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
