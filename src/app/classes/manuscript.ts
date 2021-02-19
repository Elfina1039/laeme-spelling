import { Token } from './token';


export interface TitleMs{
    textId : number;
    beg : string;
    note : string;
}


export interface Title{
    title: string;
    mss : TitleMs[];
}


export interface MsMeta {
    id : number;
    version? : string;
    date : string;
    script : string;
    localisation : string;
    manuscript : string;
    description? : string;
    laemeLink? : string;
    links? : MsLink[];
    texts? : string[]
    anchor : string;
    slotCount : number;
    slotTokens : number;
  
}

export interface MsSize {
    width : number;
    height : number;
    unit : string;
}

export interface MsLine {
    tokens : Token[];
    matchScore? : number;
    color? : string;
}

export interface MsLink {
    type : string;
    textId : number;
  
}

export class Manuscript {
    //meta : MsMeta;
    //tokens : Token[];
    lines : MsLine[];
    id : number;
    
    constructor(tokens, id){
        this.id=id;
      //  this.meta = {id:id, version:"??", date:"date", manuscript:"manuscript", description:"description", laemeLink:"link", links:[]};
        
        let lineCount = 0;
        let lines = []
        lines[0] = <MsLine>{tokens:[]};
        let ci=1;
       // if(t.nl.join(";").search("\{\.\}")!=-1)
        tokens.forEach((t)=>{
            lines[lineCount].tokens.push(t);
            
           t.nl.forEach((c)=>{
               switch(c.f2){
                   case "L" : lineCount++; lines[lineCount] = <MsLine>{tokens:[]}; break;
                   case "T" : lineCount++; lines[lineCount] = <MsLine>{tokens:[]};lines[lineCount].tokens.push({lexel:"", grammel:"", form:c.f1, morphids:[]});break;
                  case "D" : lines[lineCount].tokens.push({lexel:"", grammel:"", form: c.f1.match(/[\.,;]/g), morphids:[]});break;
                    case "C" : lines[lineCount].tokens.push({lexel:c.f1, grammel:"", form: "<strong>["+ci+"]</strong>", morphids:[]});ci++;break;
               }
               
           }); 
           
                             });
        
        this.lines = lines;
        
        console.log(this);
    }
 
    
compareLines(line){
    let lexels = line.tokens.map((t)=>t.lexel);
    let grammels = line.tokens.map((t)=>t.grammel);
    let max : number = 0;
    let topX : number[] = [];
    
    this.lines.forEach((line)=>{line.color = "transparent";
                                line.matchScore=0;
                                line.tokens.forEach((token)=>{
    if(token.lexel!=""){
        if(lexels.indexOf(token.lexel)!=-1){
           line.matchScore++;
        } 
    }else{
         if(grammels.indexOf(token.grammel)!=-1){
           line.matchScore++;
        }
    }
       
    })
        if(line.matchScore>max){
            max=line.matchScore;
        }
                               });
    return max;   
}    
    
 
}
