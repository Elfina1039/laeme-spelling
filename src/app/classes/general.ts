export interface QueryData{
    fnc : string;
    args : string[];
    filters : Filter[]
}

export interface Filter{
    level: string;
    field: string;
    value: any;
}

export interface SearchFnc{
    label : string;
    fnc : string;
}

export interface MapSearch extends SearchFnc{
    args : string[];
    layer : any;
}


export class Search{
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


export class ListSearch extends Search{
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

