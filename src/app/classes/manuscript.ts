import { Token } from './token';


export interface MsMeta {
    id : number;
    version? : string;
    date : string;
    script : string;
    localisation : string;
    manuscript : string;
    description? : string;
    laemeLink? : string;
    links? : any[];
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
        
        tokens.forEach((t)=>{if(t.nl.join(";").search("\{\\\}")!=-1){lines[lineCount].tokens.push(t);lineCount++; lines[lineCount] = <MsLine>{tokens:[]};}
                               else 

                               {
                                   lines[lineCount].tokens.push(t);
                               if(t.nl.join(";")[0]=="\\" || t.nl.join(";")[0]==";"){
                                  lines[lineCount].tokens.push({lexel:"", grammel:"PN", form:t.nl.join(";").match("[A-Z]+"), morphids:[]});; 
                               }
                               
                               }});
        
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
