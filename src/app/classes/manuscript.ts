import { Token } from './token';


export interface MsMeta {
    id : number;
    version : string;
    date : string;
    manuscript : string;
    description : string;
    laemeLink : string;
    links : any[];
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
    meta : MsMeta;
    //tokens : Token[];
    lines : MsLine[];
    
    constructor(ms){
        console.log(ms);
        this.meta = ms.meta;
        
        let lineCount = 0;
        let lines = []
        lines[0] = <MsLine>{tokens:[]};
        
        ms.tokens.forEach((t)=>{if(t.lexel=="BR"){lineCount++; lines[lineCount] = <MsLine>{tokens:[]};}
                               else{
                                   lines[lineCount].tokens.push(t)}});
        this.lines = lines;
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
