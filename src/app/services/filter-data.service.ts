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
 {"tag":"lv","label":"labio-velar","count":1,"checked":false},
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
  
   //M = multiple segments
  ];
    
   coneCodes :any  = {"AV":"Affricate Voicing","CA":"Cluster Assimilation","LL":"l-Loss","MTR":"Make/Take-Reduction","CS":"Cluster Simplification","CV":"Coda Vocalisation","DFE":"Diacritic Final é","DG":"Degemination","DHH":"Diphthong Height Harmony","DLM":"Dental-l Metathesis","DP":"Dental Palatalisation","PSH":"Pre-Sonorant Hardening","FVPD":"Front Vowel as Palatal Diacritic","DWV":"Devoicing Weak Verb","EDH":"Early Dental Hardening","EOCG":"Emergence of Caroline G","EOQ":"Emergence of Q","EOW":"Emergence of W","ERD":"Early r-Deletion","FCD":"Final Coronal Deletion","FCLD":"Fricative Cluster Dissimilation","FD1":"Final Devoicing 1","FD2":"Final devoicing 2","FND":"Final Nasal Deletion","FNN":"Final Nasal Neutralisation","FHD2":"Final h-Deletion 2","GV":"g-Vocalisation","IFV":"Initial Fricative Voicing","JD":"j-Deletion","LD":"Labiodentalisation.","LDH":"Later Dental Hardening","LDS":"Late Dental Spirantisation","LLWO":"Late Latin w-Occlusivisation","LTS":"Late t-Spirantisation","MFV":"Medial Fricative Voicing","NDCL":"Nasal Deletion and Compensatory Lengthening","NN":"Nunnation","OCR":"Onset Cluster Reduction","CXL":"Cluster x-Lenition","ODLV":"Orthographic Doubling of Long Vowel","OEG":"Old English Gemination","OGASV":"Orthographic Gemination After Short Vowel","OMIC":"Orthographic Metathesis Initial Cluster","ORC":"Orthographic Remapping of C","ORG":"Orthographic Remapping of G","ORLU":"Orthographic Remapping of Long Ú","ORPC":"Orthographic Remapping of Palatal c","HDC":"H as Diacritic for Continuancy","ORPSC":"Orthographic Remapping of Palatal sc","ORSU":"Orthographic Remapping of Short u","ORT":"Orthographic Remapping of þ, ð, TH","ORW":"Orthographic Remapping of ƿ/wynn","ORY":"Orthographic Remapping of Y","ORZ":"Orthographic Remapping of Z","OR%z":"Orthographic Remapping of ȝ","PH":"Palatal Hardening","PNSE":"Post-Nasal Stop Epenthesis","PSVD":"Post-Sonorant Velar Deletion","PVLD":"Palatal Vicinity l-Deletion","IYD":"Initial Yod Deletion","RH":"Rhotacism","PRL":"Proto-Romance Lenition","RM":"r-Metathesis","SCSE":"s-Cluster Stop Epenthesis","SD":"Sibilant Depalatalisation","SKM":"sk-Metathesis","SCH":"Sonorant Cluster Hardening","PRSA":"Proto-Romance Stop Assibilation","TH":"Theta Hardening","VFH":"Voiced Fricative Hardening","VL":"Verner's Law","PRS":"Proto-Romance Spirantisation","VP":"Velar Palatalisation","VV":"v-Vocalisation","WFSD":"Weak Final Syllable Deletion","WFSR":"Weak Final Syllable Reduction","WGG":"West Germanic Gemination","WSND":"Weak Syllable Nasal Deletion","ES":"External Sandhi","XW1":"x-Weakening 1","IHI":"Initial h-insertion","ILD":"Í as Length Diacritic","KSS":"ks-Simplification","SOK":"Spread of K","LSTV":"Low Stress t-Voicing","ORVN":"Orthographic Remapping of Velar Nasal","SMFE":"Syllabicity-Marking Final e","TL":"Theta Lenition","IS":"Internal Sandhi","FCE":"Final Consonant Excrescence","MHDCL":"Medial h-Deletion and Compensatory Lengthening","OREA":"Orthographic Remapping of EA","WD":"w-Deletion","CHD":"Coda h-Deletion","XW2":"x-Weakening 2","MM":"Merton Merger","THV":"Theta Hardening and Voicing","CHFX":"CH for [x]","WA":"w-Absorption","HDF":"H as Diacritic for Fricativeness","OVF":"Obstruent Voicing Filter","PTKD":"Pre-t k-Dissimilation","ORXT":"Orthographic Remapping of xt","FHD1":"Final h-Deletion 1","SOG":"Sporadic Older Gemination","ESLA":"External Sandhi Leading to Allomorphy","FZD":"Final z Deletion","AAD":"Accent as Diacritic","FKW":"Final k-Weakening","FKPW":"Final k-Palatalisation and Weakening","IWI":"Initial w-Insertion","CCFG":"Combinative C for G","WSFCD":"Weak Syllable Final Consonant Deletion","UVSM":"U as Velar Stop Marker","FGD":"Final g-Deletion","DCDO":"Dorsal Continuant Deoralisation","LM":"l-Metathesis","OCJV":"Onset Cluster j-Vocalisation","PF":"Palatal Fronting","FA":"Fusional Assimilation","IAHD":"I as Height Diacritic","AALD":"A as Lowness Diacritic","OARHD":"O as Roundness and Height Diacritic","GLVS":"Grimmâ€™s Law Velar Spirantisation","DA":"Deaspiration","XWF":"xw-Fortition","CLHD":"Cluster h-Deletion","CWD":"Cluster w-Deletion","KWL":"kw-Lenition","ICA":"Initial Cluster Assimilation","GW":"Gamma Weakening","XD":"x-Dissimilation","AE":"Analogical Extension","Ã†M":"%q-Merger","U%QR":"Unspecified %q-Raising","AF":"@a-Fronting","AFR":"Anglo-Frisian Rounding","AIM":"@ai-Monophthongisation","AL":"Analogical Levelling","ARR":"@a-Rounding and Raising","ART":"Anglian Retraction","AS":"Affixal Syncope","AUF":"@au-Fronting","BU":"Back Umlaut","RBA3":"Reformation by Analogy 3","GED":"ge-Deletion","BVL":"Back Vowel Lowering","CD":"Compound Demotivation","CWRI":"Combinative w/r-Influence","DN":"Diphthong Neutralisation","EL%QR":"Eastern Long %q-Retraction","EAM":"ea-Merger","EOM":"eo-Monophthongisation/Merger","EOR":"eo-Raising","LER":"Long e-Raising","ERL":"er-Lowering","EYU":"ey-Unrounding","FF":"First Fronting","HL":"Homorganic Lengthening","HVD":"High Vowel Deletion","LID":"Long i-Diphthongisation","IES":"ie-Split","IU":"i-Umlaut","KC":"Kentish Collapse","KD":"Kentish Diphthongisation","KNE":"Knight'-Epenthesis","KNM":"Knight'-Metathesis","L%QR":"Long %q-Raising","LAF":"Long @a-Fronting","LNI":"Labial Neighbourhood Influence","LSS":"Low Stress Shortening","MA":"Metanalysis","MEB":"Middle English Breaking","MEOSL":"Middle English Open Syllable Lengthening","MS":"Medial Syncope","N%QR":"Northern %q-Raising","NC":"Negative Cliticisation","NEYU":"Northern and Eastern y-Unrounding","NF":"Northern Fronting","OEU":"%o-Unrounding","WMLOF":"West Midlands Long o-Fronting","LOR":"Long o-Raising","OU":"o-Unrounding","PCR":"Pre-Coronal Raising","PD":"Palatal Diphthongisation","PHCE":"Post-High Consonant Epenthesis","PVR":"Pre-Velar Raising","PNCD":"Pre-NC Diphthongisation","GEW":"ge-Weakening","PNL":"Pre-Nasal Lowering","PNRO":"Pre-Nasal Rounding","PNRA":"Pre-Nasal Raising","PPLT":"Present Plural Transfer","P@SD":"Pre-@S Diphthongisation","PTPL":"Past Tense Plural Lowering","RA":"Restoration of @a","RBA1":"Reformation by Analogy 1","RBA2":"Reformation by Analogy 2","RI":"r-Influence","SCVE":"Sonorant Cluster Vowel Epenthesis","SECM":"seC-modification","SEYL":"Southeastern y-Lowering","SF":"Second Fronting","SKP":"sk-Palatalisation","SM":"Smoothing","SSE":"Syllabic Sonorant Expansion","SSN":"Subjunctive Singular -n","TXT":"Transposition x to Theta","VH":"Vowel Harmony","VS1":"Verbal Syncope 1","WFVD":"Weak Final Vowel Deletion","WI":"w-Influence","WVN":"Weak Vowel Neutralisation","WYR":"Western y-Respelling","XH":"x-Hardening","NDI":"-nd Infinitive","EOV":"Emergence of V","PCS":"Pre-Cluster Shortening","BRK":"Breaking","IHD":"Initial h-Dropping","A%Q1R":"Anglian %_q^^1 Raising","PJR":"Pre-j Raising","CLA":"Class Assignment","WSOR":"Weak Short o-Raising","PLR":"Pre-l Raising","K2ID":"Class 2 i-Deletion","EYM":"ey-Monophthongisation","GII":"Generic i Infinitive","EIM":"ei-Monophthongisation","OIR":"Onomastic *-isk-Reduction","RLA":"Restoration of Long @a","NHVU":"Non-high Vowel Umlaut","TSS":"Trisyllabic Shortening","VS2":"Verbal Syncope 2","VS3":"Verbal Syncope 3","VS4":"Verbal Syncope 4","REA":"Reanalysis","UAR":"Unaccented a-Raising","TF":"Triphthong Filter","IOM":"io-Merger","TVR":"Trimoric Vowel Resolution","NSE":"Northern s-Extension","SPCS":"Sporadic Pre-Consonantal Shortening","NPTR":"Northern Present Tense Rule","PPAR":"Post-Pronoun Adjacency Rule","PPM":"Personal Pronoun Merger","PZL":"Pre-z Lowering","2PTA":"Second Person t-Addition","VSK3":"Verbal Syncope Class 3","MEPRB":"Middle English Pre-r Breaking","SL":"Sievers\' Law","PPPA":"Plural Personal Pronouns in -a-","WRVD":"Weak Root Vowel Deletion","PPR":"Post-Palatal Raising","SBSS":"Syncope between Stressed Syllables","OIU":"Older i-Umlaut","FTE":"ft-Epenthesis","DPPM":"Demonstrative and Personal Pronoun Merger","CF":"Clitic Formation","DPM":"Demonstrative Pronoun Merger","PHVS":"Postvocalic High Vowel Syllabification","NLAF":"Northern Long @a-Fronting","MWC":"Monosyllabic Word Constraint","SEYM":"Sporadic Early y-Merger","YE":"Yod Epenthesis","WE":"w-Epenthesis","IOF":"io-Formation"}; 

    
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
