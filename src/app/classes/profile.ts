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
    
    compareFreq(refLit){
        let result : number = parseFloat((this.tokens/refLit.tokens).toFixed(2));
        return result;
    }
    
    
}

export class Slot{
    strid : number;
    pos : number;
    litterae : Littera[];
}

export class Item extends Slot{
    lexel : string;
    wordClass : string;
    
}


export class Set{
    members : Littera[];
    membersStrings : string[];
    type : string;
    types : number;
    tokens : number;
    
    constructor(s){
        this.type = s.type;
        this.types = s.types;
        this.tokens = s.tokens;
        let members : Littera[] = [];
        
         s.members.forEach((li)=>{
          members.push(new Littera({str : li.str, tokens: li.tokens, types : 1, normTokens: li.tokens}));  
        });
        
        
       this.members = members; 
    this.membersStrings = this.members.map((m)=>m.str);
    }
    
    checkForLittera(l){
         console.log(this.membersStrings);
        console.log(this.membersStrings.indexOf(l));
        if(this.membersStrings.indexOf(l)==-1){
            return false;
        }
        else{
            return true;
        }
    }
    
    
}

export class Profile {
    litterae : Littera[];
    slots : Slot[];
    slotRef : any;
                      
    constructor(list, slotsData){
     //   console.log(list);
        
    let litterae : Littera[] = [];
    let slots : Slot[] = [];
    let slotRef : any = {};
    let ref = this;
        
        list.forEach((li)=>{
          litterae.push(new Littera({str : li.lit, tokens: li.total, types : li.poss, normTokens: li.normFreq}));  
        });
           this.litterae = litterae;
        
         slotsData.forEach((s)=>{
            let def = s.slot.split("-");
             let members = s.lst.map((l)=>l[0]);
           
            let nSlot=<Slot>{strid : eval(def[0]), pos: eval(def[1]), litterae : ref.linkLitterae(members)};
          slots.push(nSlot); 
             slotRef[s.slot] = nSlot;
        
        });
        
 
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
           
            let ratio = l.compareFreq(refLit);
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

getSlotList(littera){
    
    let result : string[] = [];
    
    this.slots.forEach((s)=>{
        if(s.litterae.map((l)=>l.str).indexOf(littera.str)!=-1){
            result.push(s.strid+"-"+s.pos);
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
