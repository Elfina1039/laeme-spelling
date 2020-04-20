export interface LitStats{
    str : string;
    tokens : number;
    types? : number;
}


export class Littera{
    str : string;
    tokens : number;
    types : number;
    rawTokens : number;
    basicFreqs : number[];
    asAlternative : number = 0;
    
    constructor(source){
        this.str = source.str;
        this.tokens = source.normTokens;
        this.rawTokens = source.tokens;
        this.types = source.types;
        this.basicFreqs = [];

    }
    
    compareFreq(refTokens){
        let result : number = parseFloat((this.tokens/refTokens).toFixed(2));
        return result;
    }
    
    dspFreq(){
        let result : number = Math.round(this.tokens*1000);
       return result;
    }
    
    toNode(textId, group){
        let result = {id : this.str +"/"+textId, 
                      label : this.str,
                     // value : this.tokens,
                      group : group
                     };
        return result;
    }
 
}


export class LitteraExtended extends Littera{
    mssRatio : number;
    rareSlots : number;
    
    constructor(source){
        super(source);
        this.mssRatio = source.mssRatio;
        this.rareSlots = source.rareSlots;
      
        let globalCmp = this.compareFreq(source.litAvg);
        this.basicFreqs.push(globalCmp);
    }
}


export class LitCorresp{
    a : string;
    b : string;
    tokens : number;
    
    constructor(source){
        this.a = source.a;
        this.b=source.b;
        this.tokens = source.tokens;
    }
    
    toEdge(aId, bId){
        let result = {from : this.a+"/"+aId,
                     to : this.b+"/"+bId,
                     value : this.tokens,
                     label : this.tokens+"x",
                     font : {background: "black", color:"white", size:12, bold:false}};
        console.log(result);
        return result;
    }
}


export class Slot{
    morphid : number;
    pos : number;
    litterae : Littera[];
}

export class Item extends Slot{
    lexel : string;
    wordClass : string;
    selected : boolean = false;
    
}


export class Set{
    members : Littera[];
    membersStrings : string[];
    type : string;
    types : number;
    tokens : number;
    loaderFnc : string;
    args : string[];
    
    constructor(s){
        this.loaderFnc = s.loaderFnc;
        this.args = s.args;
        this.type = s.type;
        this.types = s.types;
        this.tokens = s.tokens;
        let members : Littera[] = [];
        
         s.members.forEach((li)=>{
          members.push(new Littera({str : li.str, tokens: li.tokens, types : li.types, normTokens: li.tokens}));  
        });
        
        
       this.members = members; 
    this.membersStrings = this.members.map((m)=>m.str);
    }
    
    checkForLittera(l){
       //  console.log(this.membersStrings);
    //    console.log(this.membersStrings.indexOf(l));
        if(this.membersStrings.indexOf(l)==-1){
            return false;
        }
        else{
            return true;
        }
    }
    
    
}


export interface Split{
    formid: number;
    split : string[];
    tokens : number;
    form? : string;
}

export class Profile {
    litterae : Littera[];
    slots : Slot[];
    slotRef : any;
                      
    constructor(litterae, slots, slotRef){
      
   
    let ref = this;
    this.litterae = litterae;
  this.slots = slots;
    this.slotRef = slotRef;
      //  console.log(this.slotRef);
            }
    
compare(reference : Littera[]){
    let litDict = this.toDictionary(reference);
    //console.log(litDict);
    this.litterae.forEach((l)=>{
        let refLit = litDict.get(l.str);
        if(refLit){
           
            let ratio = l.compareFreq(refLit.tokens);
            l.basicFreqs.push(ratio);
           
        }else{
            l.basicFreqs.push(2);
        }
        
       //  l.basicFreqs=l.basicFreqs.sort((a,b)=>{(Math.abs(1-b)-Math.abs(1-a))});
       //      console.log(l.basicFreqs);
       
    });
    
}    
    
    
linkLitterae(members : string[]){
    let result : Littera[] = [];
    
    this.litterae.forEach((l)=>{
        if(members.indexOf(l.str)!=-1){
            result.push(l);
        }
    });
    
    return result;
}
    
sortBy(crit){
      console.log("sorting profile by " + crit);
   let sorted = this.litterae.sort((a,b)=>{return a[crit]>b[crit] ? -1:1});
    this.litterae=sorted;
}

getSlotList(littera){
    
    let result : string[] = [];
    
    this.slots.forEach((s)=>{
        if(s.litterae.map((l)=>l.str).indexOf(littera.str)!=-1){
            result.push(s.morphid+"-"+s.pos);
        }
        
    });
    
    console.log(result);
    
    return result;
} 
    
    
getAlternatives(slotList : string[]){
    console.log("alternatives");
    
    this.litterae.forEach((l)=>{
        l.asAlternative=0;
        });
    
    let result : [string, number][] = [];
    let slotRef = this.slotRef;
    
    slotList.forEach((sl)=>{
        if(slotRef[sl]){
          slotRef[sl].litterae.forEach((l)=>{
        l.asAlternative++;
              console.log(l)
        });  
        }
        
        
    });
    
    
}    
    
toDictionary(litterae){
    let result = new Map();
    litterae.forEach((l)=>result.set(l.str, l));
    return result;
}

 reset(){
    this.litterae.forEach((l)=>l.basicFreqs=[]);
}
    
    
    
    
}
