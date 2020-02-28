export class QueryData{
    fnc : string;
    args : string;
    filters : Filter[];
    
    constructor(source){
        this.fnc=source.fnc;
         this.args=source.args;
         this.filters=source.filters;
        console.log(this);
    }
    
    getJsonFilters(){
        let filters =this.filters;
        return JSON.stringify(filters);
    }
    
}

export interface Filter{
    level: string;
    label? : string;
    field: string;
    operator: string;
    values: any;
    optionSets? : string[]; 

}

export class FilterClass{
    level: string;
    label : string;
    field: string;
    operator: string;
    values: any;
    optionSets : string[]; 
    
    constructor(source){
        this.level = source.level;
        this.label = source.label;
        this.field = source.field;
        this.values = source.values;
        this.operator = source.operator;
        this.optionSets = source.optionSets;
        console.log(this);
    }
    
    clone(){
       return new FilterClass(this);
    }
}

export interface Option{
    tag : string;
    label: string;
    checked : boolean;
    count? : number;
}

export interface OptionSet{
    id : string;
    label : string;
    options : Option[];
}

// simple interfaces derived from search class (mainly used to display search buttons)
export interface SearchFnc{
    label : string;
    fnc : string;
}

export interface MapSearch extends SearchFnc{
    args : string[];
    layer : any;
    filters? : Filter[];
}

export interface LitGram{
    pre : string;
    main : string;
    post : string;
    msId : number;
}

export class SetSearch{
    fnc : SearchFnc;
    litGram : LitGram;
    
    mainFilters : Filter[];
    preFilters : Filter[];
    postFilters : Filter[];
    msFilters : Filter[];
    
    constructor(source = {fnc : {label:"", fnc : ""},
                         litGram : {pre:"", main:"", post:"", msId:null},
                         mainFilters : [],
                         preFilters : [],
                         postFilters: [],
                         msFilters: []}){
        this.fnc = source.fnc;
        this.litGram = source.litGram;
        this.mainFilters = source.mainFilters;
        this.preFilters = source.preFilters;
        this.postFilters = source.postFilters;
        this.msFilters = source.msFilters;
    }
    
   // toMemory(label : string, layer = {}, )
    
    toSubmit(fnc){
        this.fnc = fnc;
        let activeFilters = this.groupFilters();
        let filterJson : string = JSON.stringify(activeFilters);
        console.log(activeFilters);
        let result = {search : {main:this.litGram.main},
                     fnc : fnc.fnc,
                     filters : filterJson};
        return result;
    }
    
      groupFilters(){
        let all : Filter[] = [...this.mainFilters, ...this.preFilters, ...this.postFilters, ...this.msFilters];
            
        let result : Filter[] = all.filter((a)=>a.values.length>0);
        
        if(this.litGram.msId){
            let textId = this.litGram.msId;
            result.push({level:"m",
                        field:"text_id",
                        operator:"equals",
                        values:textId});
        }
        
          if(this.litGram.pre){
            let pre = this.litGram.pre;
            result.push({level:"l",
                        field:"pre",
                        operator:"equals",
                        values:pre});
        }
        
         if(this.litGram.post){
            let post = this.litGram.post;
            result.push({level:"l",
                        field:"post",
                        operator:"equals",
                        values:post});
        }
        
        return result;
    }
    
    
}


export class MsSearch{
    fields : [string, string][];
    color: string;
    rgx : boolean = false;
    
    constructor(data){   
        this.fields = data.fields;
        this.color = data.color;
    }
    
    
    perform(t){
        let match : boolean = true;
        
        this.fields.forEach((f)=>{
            let rgx = new RegExp(f[1]);
              if(rgx.exec(t[f[0]])!=t[f[0]]){
             match=false;
             }
            
        });
       
        return match;
        
    }
    
}

export class SingleListSearch extends MsSearch{ 
    constructor(data){
        super(data);
       
    }
    
   perform(t){
        let match : boolean = true;
        
        this.fields.forEach((f)=>{
              if(t[f[0]].indexOf(f[1])==-1){
             match=false;
             }
            
        });
       
        return match;
        
    }
    
    
}



export class ListSearch extends MsSearch{
    list : number[];
    littera : string;
    
    constructor(data){
        super(data);
        console.log(data.list);
        this.list = data.list;
        this.littera = data.littera;
    }
    
    perform(t){
        let list = this.list;
        let intersect = this.arr_intersect(t[this.fields[0][0]],list);

         if(intersect.length>0){
             return true
             }else{
              //    console.log(t[this.field]);
             //   console.log( this.list.indexOf(<string>t[this.field]));
                 return false;
             }
    }
    
arr_intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}
    
}

