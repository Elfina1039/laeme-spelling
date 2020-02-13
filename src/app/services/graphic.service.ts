import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {
    grid;
    dataSample;
    colors : string[]=["#fc1703","#2003fc","#ede60c","#22f007","#ff9305","#ffffff","#000000","#aef50a","#0be6c8","#ed0edb","#145415"]; 
    
    
  constructor() {
  this.grid = {"163":{"lat":51.3296629658,"long":-2.3171440659},
"264":{"lat":51.9322000254,"long":-1.7250585911},
"286":{"lat":51.6530508126,"long":-1.5821988226},
"272":{"lat":52.3709441412,"long":-2.7064423312},
"155":{"lat":52.6751561015,"long":0.6905545411},
"140":{"lat":51.069180069,"long":-1.8158313316},
"10":{"lat":51.8156028103,"long":-2.0884360298},
"265":{"lat":49.7668065515,"long":-7.5572420349},
"276":{"lat":52.3726110747,"long":-2.3245651984},
"17":{"lat":49.7668065515,"long":-7.5572420349},
"233":{"lat":49.7668065515,"long":-7.5572420349},
"139":{"lat":49.7668065515,"long":-7.5572420349},
"127":{"lat":49.7668065515,"long":-7.5572420349},
"1701":{"lat":52.8035093909,"long":0.5797721138},
"274":{"lat":49.7668065515,"long":-7.5572420349},
"246":{"lat":52.1921952317,"long":-2.4987971913},
"247":{"lat":52.0306543996,"long":-2.424116538},
"248":{"lat":52.0569384526,"long":-2.5847992286},
"249":{"lat":51.9853541312,"long":-2.5110581919},
"4":{"lat":51.8744826952,"long":0.2792686115},
"1200":{"lat":52.0196142763,"long":0.2137631885},
"1300":{"lat":52.2745713202,"long":0.504970662},
"63":{"lat":51.5632368552,"long":-1.6118749855},
"185":{"lat":52.6187086333,"long":-0.11069316},
"186":{"lat":52.6187086333,"long":-0.11069316},
"1400":{"lat":52.6461619501,"long":0.3635323234},
"129":{"lat":53.3711332958,"long":0.0577136263},
"266":{"lat":52.4477571916,"long":-0.1032963548},
"132":{"lat":54.8951205696,"long":-2.937040847},
"267":{"lat":49.7668065515,"long":-7.5572420349},
"13":{"lat":49.7668065515,"long":-7.5572420349},
"297":{"lat":53.91204285,"long":-0.692272177},
"298":{"lat":54.1768616732,"long":-1.1588876545},
"296":{"lat":53.960632022,"long":-1.0870369876},
"290":{"lat":49.7668065515,"long":-7.5572420349},
"259":{"lat":49.7668065515,"long":-7.5572420349},
"125":{"lat":52.0472232673,"long":-2.715909692},
"292":{"lat":49.7668065515,"long":-7.5572420349},
"293":{"lat":49.7668065515,"long":-7.5572420349},
"294":{"lat":49.7668065515,"long":-7.5572420349},
"19":{"lat":49.7668065515,"long":-7.5572420349},
"143":{"lat":51.0583356612,"long":-1.3164649958},
"159":{"lat":53.5083234137,"long":-0.7650431371},
"268":{"lat":49.7668065515,"long":-7.5572420349},
"232":{"lat":51.9495299753,"long":-1.5212512423},
"279":{"lat":50.9512306712,"long":-2.5281008904},
"291":{"lat":51.2805565602,"long":1.0815098123},
"137":{"lat":52.2428104128,"long":0.2980999723},
"300":{"lat":52.6312531797,"long":0.6435236964},
"150":{"lat":52.6312531797,"long":0.6435236964},
"277":{"lat":52.3367638317,"long":-2.2802729042},
"278":{"lat":52.3367638317,"long":-2.2802729042},
"2":{"lat":52.256092208,"long":-2.1479111972},
"3":{"lat":52.3007299224,"long":-2.3093743746},
"238":{"lat":49.7668065515,"long":-7.5572420349},
"239":{"lat":49.7668065515,"long":-7.5572420349},
"240":{"lat":49.7668065515,"long":-7.5572420349},
"241":{"lat":49.7668065515,"long":-7.5572420349},
"242":{"lat":49.7668065515,"long":-7.5572420349},
"243":{"lat":49.7668065515,"long":-7.5572420349},
"244":{"lat":49.7668065515,"long":-7.5572420349},
"230":{"lat":53.8368724678,"long":-0.4210638526},
"304":{"lat":51.2888023658,"long":-0.8828345968},
"231":{"lat":54.0448631403,"long":-2.1694827642},
"273":{"lat":52.2178494162,"long":-2.747924041},
"275":{"lat":52.3709441412,"long":-2.7064423312},
"1702":{"lat":52.8035093909,"long":0.5797721138},
"256":{"lat":54.0981536855,"long":-1.5733462889},
"257":{"lat":54.0981536855,"long":-1.5733462889},
"131":{"lat":52.6804061885,"long":1.5195220275},
"188":{"lat":54.8265617787,"long":-1.7369286388},
"245":{"lat":52.1748266486,"long":-2.3231234801},
"1800":{"lat":52.1748266486,"long":-2.3231234801},
"135":{"lat":52.4300215693,"long":-0.1187673699},
"280":{"lat":51.4469714267,"long":-2.0589418655},
"147":{"lat":50.7877188297,"long":-3.6612084053},
"148":{"lat":50.7877188297,"long":-3.6612084053},
"118":{"lat":53.0374435943,"long":-2.448850626},
"119":{"lat":49.7668065515,"long":-7.5572420349},
"120":{"lat":49.7668065515,"long":-7.5572420349},
"121":{"lat":49.7668065515,"long":-7.5572420349},
"122":{"lat":53.3977663209,"long":-2.1368142952},
"123":{"lat":49.7668065515,"long":-7.5572420349},
"295":{"lat":53.919014239,"long":-2.1841966458},
"184":{"lat":51.3835285927,"long":-0.5068981451},
"271":{"lat":51.995454934,"long":-2.0159669603},
"234":{"lat":51.9863728843,"long":-2.147019897},
"235":{"lat":49.7668065515,"long":-7.5572420349},
"236":{"lat":49.7668065515,"long":-7.5572420349},
"237":{"lat":49.7668065515,"long":-7.5572420349},
"7":{"lat":52.1118926737,"long":-2.322666252},
"6":{"lat":52.0491942615,"long":-2.2201373403},
"144":{"lat":51.4424268668,"long":-0.965418812},
"263":{"lat":51.2760844261,"long":-2.1160664516},
"269":{"lat":52.7623336652,"long":0.3994625645},
"270":{"lat":52.7623336652,"long":0.3994625645},
"260":{"lat":52.3810463576,"long":-2.4862320004},
"261":{"lat":52.3810463576,"long":-2.4862320004},
"262":{"lat":52.3810463576,"long":-2.4862320004},
"64":{"lat":51.7424321988,"long":0.1277587687},
"65":{"lat":51.7424321988,"long":0.1277587687},
"302":{"lat":51.7424321988,"long":0.1277587687},
"303":{"lat":51.7424321988,"long":0.1277587687},
"138":{"lat":51.5200695011,"long":-0.0123528632},
"182":{"lat":52.7813678897,"long":-0.1629707318},
"2000":{"lat":52.2554653113,"long":-2.4116081277},
"2001":{"lat":52.2554653113,"long":-2.4116081277},
"5":{"lat":52.2554653113,"long":-2.4116081277},
"189":{"lat":52.3160389939,"long":-2.8522681883},
"136":{"lat":53.2870101185,"long":-2.8414713644},
"128":{"lat":53.4409448984,"long":-0.3906089922},
"11":{"lat":51.5273023822,"long":0.0888795755},
"133":{"lat":52.4477571916,"long":-0.1032963548},
"134":{"lat":52.4477571916,"long":-0.1032963548},
"174":{"lat":49.7668065515,"long":-7.5572420349},
"66":{"lat":52.0832052229,"long":-1.286328468},
"67":{"lat":51.1039399211,"long":0.1268740091},
"68":{"lat":49.7668065515,"long":-7.5572420349},
"160":{"lat":51.906300838,"long":0.4844222766},
"161":{"lat":51.9593373573,"long":-2.1905908899},
"162":{"lat":52.0032291432,"long":0.5772133768},
"175":{"lat":52.6895745873,"long":0.4398665724},
"176":{"lat":49.7668065515,"long":-7.5572420349},
"151":{"lat":53.7931065181,"long":-2.229182214},
"1000":{"lat":52.3709441412,"long":-2.7064423312},
"18":{"lat":49.7668065515,"long":-7.5572420349},
"177":{"lat":52.6124888015,"long":-1.1153066032},
"158":{"lat":52.0131509144,"long":-1.7391332497},
"178":{"lat":49.7668065515,"long":-7.5572420349},
"179":{"lat":49.7668065515,"long":-7.5572420349},
"180":{"lat":49.7668065515,"long":-7.5572420349},
"181":{"lat":49.7668065515,"long":-7.5572420349},
"8":{"lat":51.2873577017,"long":0.4078380696},
"14":{"lat":49.7668065515,"long":-7.5572420349},
"15":{"lat":53.161026154,"long":0.2421189167},
"2002":{"lat":51.9858965132,"long":-2.3654465442},
"214":{"lat":49.7668065515,"long":-7.5572420349},
"218":{"lat":49.7668065515,"long":-7.5572420349},
"220":{"lat":49.7668065515,"long":-7.5572420349},
"222":{"lat":49.7668065515,"long":-7.5572420349},
"146":{"lat":52.579767591,"long":-2.1194861192},
"301":{"lat":52.7664270926,"long":-0.3711141421},
"171":{"lat":52.1840249026,"long":-2.2354320749},
"1600":{"lat":51.8868168396,"long":-1.5800363378},
"282":{"lat":52.396653339,"long":0.2472846191},
"285":{"lat":52.5760337526,"long":0.2712019288},
"141":{"lat":49.7668065515,"long":-7.5572420349},
"142":{"lat":51.2468109351,"long":0.6206691048},
"149":{"lat":52.5668397183,"long":-0.2457207159},
"16":{"lat":53.9610493267,"long":-2.8549866642},
"130":{"lat":53.2063026144,"long":-0.3245409865},
"228":{"lat":49.7668065515,"long":-7.5572420349},
"299":{"lat":49.7668065515,"long":-7.5572420349},
"124":{"lat":53.1878188285,"long":-2.8844270507},
"12":{"lat":49.7668065515,"long":-7.5572420349},
"229":{"lat":51.869349843,"long":-2.2337840252},
"1100":{"lat":52.0936396132,"long":-2.4101156017},
"9":{"lat":52.0928995346,"long":-2.5852689472},
"169":{"lat":53.3913446408,"long":-0.7533925163},
"227":{"lat":49.7668065515,"long":-7.5572420349},
"183":{"lat":51.7934671888,"long":1.0728601213},
"258":{"lat":51.069180069,"long":-1.8158313316},
"126":{"lat":52.4168987866,"long":-1.4868085551},
"156":{"lat":51.2114156485,"long":-2.6456044795},
"157":{"lat":51.2114156485,"long":-2.6456044795},
"173":{"lat":52.1840249026,"long":-2.2354320749},
"172":{"lat":52.1840249026,"long":-2.2354320749},
"170":{"lat":52.1840249026,"long":-2.2354320749},
"187":{"lat":52.1840249026,"long":-2.2354320749},
"1700":{"lat":52.8035093909,"long":0.5797721138}};
  
this.dataSample=[{"id" : 129, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 285, "litterae" : [{"str" : "f", "tokens" : 393}], "tokens" : 393},{"id" : 120, "litterae" : [{"str" : "f", "tokens" : 85}], "tokens" : 85},{"id" : 171, "litterae" : [{"str" : "f", "tokens" : 7}], "tokens" : 7},{"id" : 227, "litterae" : [{"str" : "f", "tokens" : 6}, {"str" : "u", "tokens" : 1}], "tokens" : 7},{"id" : 8, "litterae" : [{"str" : "v", "tokens" : 54}, {"str" : "u", "tokens" : 28}, {"str" : "f", "tokens" : 23}], "tokens" : 105},{"id" : 247, "litterae" : [{"str" : "f", "tokens" : 113}], "tokens" : 113},{"id" : 280, "litterae" : [{"str" : "f", "tokens" : 413}, {"str" : "v", "tokens" : 19}, {"str" : "u", "tokens" : 4}], "tokens" : 436},{"id" : 264, "litterae" : [{"str" : "f", "tokens" : 6}], "tokens" : 6},{"id" : 242, "litterae" : [{"str" : "f", "tokens" : 30}, {"str" : "u", "tokens" : 2}], "tokens" : 32},{"id" : 138, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 297, "litterae" : [{"str" : "f", "tokens" : 378}], "tokens" : 378},{"id" : 179, "litterae" : [{"str" : "f", "tokens" : 5}], "tokens" : 5},{"id" : 1702, "litterae" : [{"str" : "f", "tokens" : 39}], "tokens" : 39},{"id" : 274, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 1000, "litterae" : [{"str" : "f", "tokens" : 265}, {"str" : "u", "tokens" : 16}], "tokens" : 281},{"id" : 276, "litterae" : [{"str" : "f", "tokens" : 179}, {"str" : "u", "tokens" : 18}, {"str" : "v", "tokens" : 2}, {"str" : "ƿ", "tokens" : 1}], "tokens" : 200},{"id" : 236, "litterae" : [{"str" : "f", "tokens" : 12}], "tokens" : 12},{"id" : 148, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 175, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 294, "litterae" : [{"str" : "f", "tokens" : 3}], "tokens" : 3},{"id" : 262, "litterae" : [{"str" : "f", "tokens" : 96}, {"str" : "u", "tokens" : 10}], "tokens" : 106},{"id" : 15, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 304, "litterae" : [{"str" : "f", "tokens" : 26}], "tokens" : 26},{"id" : 174, "litterae" : [{"str" : "f", "tokens" : 4}], "tokens" : 4},{"id" : 1800, "litterae" : [{"str" : "f", "tokens" : 65}, {"str" : "u", "tokens" : 42}, {"str" : "v", "tokens" : 3}], "tokens" : 110},{"id" : 151, "litterae" : [{"str" : "f", "tokens" : 4}], "tokens" : 4},{"id" : 125, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 140, "litterae" : [{"str" : "f", "tokens" : 27}], "tokens" : 27},{"id" : 162, "litterae" : [{"str" : "f", "tokens" : 8}], "tokens" : 8},{"id" : 4, "litterae" : [{"str" : "f", "tokens" : 100}], "tokens" : 100},{"id" : 119, "litterae" : [{"str" : "f", "tokens" : 200}, {"str" : "u", "tokens" : 1}], "tokens" : 201},{"id" : 270, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 182, "litterae" : [{"str" : "f", "tokens" : 85}, {"str" : "_", "tokens" : 1}], "tokens" : 86},{"id" : 122, "litterae" : [{"str" : "f", "tokens" : 80}], "tokens" : 80},{"id" : 277, "litterae" : [{"str" : "f", "tokens" : 435}, {"str" : "u", "tokens" : 16}, {"str" : "v", "tokens" : 2}], "tokens" : 453},{"id" : 222, "litterae" : [{"str" : "f", "tokens" : 17}], "tokens" : 17},{"id" : 268, "litterae" : [{"str" : "v", "tokens" : 1}], "tokens" : 1},{"id" : 261, "litterae" : [{"str" : "f", "tokens" : 130}, {"str" : "u", "tokens" : 11}], "tokens" : 141},{"id" : 123, "litterae" : [{"str" : "f", "tokens" : 186}, {"str" : "u", "tokens" : 1}], "tokens" : 187},{"id" : 275, "litterae" : [{"str" : "f", "tokens" : 15}, {"str" : "u", "tokens" : 1}, {"str" : "v", "tokens" : 1}], "tokens" : 17},{"id" : 214, "litterae" : [{"str" : "f", "tokens" : 46}, {"str" : "w", "tokens" : 4}], "tokens" : 50},{"id" : 180, "litterae" : [{"str" : "f", "tokens" : 4}], "tokens" : 4},{"id" : 127, "litterae" : [{"str" : "f", "tokens" : 4}], "tokens" : 4},{"id" : 189, "litterae" : [{"str" : "f", "tokens" : 23}, {"str" : "u", "tokens" : 1}], "tokens" : 24},{"id" : 137, "litterae" : [{"str" : "f", "tokens" : 28}], "tokens" : 28},{"id" : 290, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 265, "litterae" : [{"str" : "f", "tokens" : 9}], "tokens" : 9},{"id" : 185, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 233, "litterae" : [{"str" : "f", "tokens" : 5}], "tokens" : 5},{"id" : 292, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 237, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 136, "litterae" : [{"str" : "f", "tokens" : 31}], "tokens" : 31},{"id" : 218, "litterae" : [{"str" : "f", "tokens" : 45}, {"str" : "w", "tokens" : 1}], "tokens" : 46},{"id" : 13, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 238, "litterae" : [{"str" : "f", "tokens" : 7}], "tokens" : 7},{"id" : 286, "litterae" : [{"str" : "f", "tokens" : 561}, {"str" : "u", "tokens" : 227}, {"str" : "v", "tokens" : 86}, {"str" : "w", "tokens" : 1}], "tokens" : 875},{"id" : 230, "litterae" : [{"str" : "f", "tokens" : 6}], "tokens" : 6},{"id" : 303, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 155, "litterae" : [{"str" : "f", "tokens" : 370}], "tokens" : 370},{"id" : 1600, "litterae" : [{"str" : "f", "tokens" : 795}, {"str" : "v", "tokens" : 2}, {"str" : "u", "tokens" : 1}], "tokens" : 798},{"id" : 149, "litterae" : [{"str" : "f", "tokens" : 46}], "tokens" : 46},{"id" : 124, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 5, "litterae" : [{"str" : "f", "tokens" : 70}, {"str" : "u", "tokens" : 2}], "tokens" : 72},{"id" : 301, "litterae" : [{"str" : "f", "tokens" : 318}], "tokens" : 318},{"id" : 229, "litterae" : [{"str" : "f", "tokens" : 24}], "tokens" : 24},{"id" : 245, "litterae" : [{"str" : "u", "tokens" : 179}, {"str" : "v", "tokens" : 86}, {"str" : "f", "tokens" : 84}], "tokens" : 349},{"id" : 2000, "litterae" : [{"str" : "f", "tokens" : 442}, {"str" : "u", "tokens" : 10}, {"str" : "_", "tokens" : 1}], "tokens" : 453},{"id" : 1100, "litterae" : [{"str" : "f", "tokens" : 222}, {"str" : "v", "tokens" : 83}, {"str" : "u", "tokens" : 18}], "tokens" : 323},{"id" : 220, "litterae" : [{"str" : "f", "tokens" : 36}], "tokens" : 36},{"id" : 156, "litterae" : [{"str" : "f", "tokens" : 8}, {"str" : "v", "tokens" : 2}, {"str" : "u", "tokens" : 1}], "tokens" : 11},{"id" : 1701, "litterae" : [{"str" : "f", "tokens" : 39}], "tokens" : 39},{"id" : 295, "litterae" : [{"str" : "f", "tokens" : 263}, {"str" : "_", "tokens" : 1}, {"str" : "v", "tokens" : 1}], "tokens" : 265},{"id" : 259, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 11, "litterae" : [{"str" : "f", "tokens" : 8}], "tokens" : 8},{"id" : 302, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 249, "litterae" : [{"str" : "f", "tokens" : 79}], "tokens" : 79},{"id" : 269, "litterae" : [{"str" : "f", "tokens" : 10}], "tokens" : 10},{"id" : 228, "litterae" : [{"str" : "f", "tokens" : 7}], "tokens" : 7},{"id" : 135, "litterae" : [{"str" : "f", "tokens" : 20}], "tokens" : 20},{"id" : 126, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 298, "litterae" : [{"str" : "f", "tokens" : 646}], "tokens" : 646},{"id" : 291, "litterae" : [{"str" : "u", "tokens" : 685}, {"str" : "v", "tokens" : 56}, {"str" : "f", "tokens" : 3}], "tokens" : 744},{"id" : 132, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 3, "litterae" : [{"str" : "f", "tokens" : 69}, {"str" : "u", "tokens" : 12}], "tokens" : 81},{"id" : 131, "litterae" : [{"str" : "f", "tokens" : 4}], "tokens" : 4},{"id" : 2002, "litterae" : [{"str" : "f", "tokens" : 345}, {"str" : "v", "tokens" : 28}, {"str" : "w", "tokens" : 11}], "tokens" : 384},{"id" : 176, "litterae" : [{"str" : "f", "tokens" : 3}], "tokens" : 3},{"id" : 67, "litterae" : [{"str" : "f", "tokens" : 3}, {"str" : "v", "tokens" : 2}, {"str" : "u", "tokens" : 1}], "tokens" : 6},{"id" : 178, "litterae" : [{"str" : "f", "tokens" : 5}], "tokens" : 5},{"id" : 169, "litterae" : [{"str" : "f", "tokens" : 52}], "tokens" : 52},{"id" : 241, "litterae" : [{"str" : "f", "tokens" : 11}], "tokens" : 11},{"id" : 17, "litterae" : [{"str" : "f", "tokens" : 3}, {"str" : "v", "tokens" : 1}], "tokens" : 4},{"id" : 66, "litterae" : [{"str" : "f", "tokens" : 36}], "tokens" : 36},{"id" : 142, "litterae" : [{"str" : "f", "tokens" : 54}, {"str" : "u", "tokens" : 3}, {"str" : "v", "tokens" : 2}, {"str" : "w", "tokens" : 1}], "tokens" : 60},{"id" : 1400, "litterae" : [{"str" : "f", "tokens" : 152}], "tokens" : 152},{"id" : 147, "litterae" : [{"str" : "f", "tokens" : 3}, {"str" : "w", "tokens" : 1}, {"str" : "v", "tokens" : 1}], "tokens" : 5},{"id" : 160, "litterae" : [{"str" : "f", "tokens" : 32}], "tokens" : 32},{"id" : 121, "litterae" : [{"str" : "f", "tokens" : 208}, {"str" : "u", "tokens" : 2}], "tokens" : 210},{"id" : 1300, "litterae" : [{"str" : "f", "tokens" : 703}, {"str" : "u", "tokens" : 2}], "tokens" : 705},{"id" : 258, "litterae" : [{"str" : "w", "tokens" : 2}, {"str" : "v", "tokens" : 1}], "tokens" : 3},{"id" : 161, "litterae" : [{"str" : "f", "tokens" : 45}, {"str" : "w", "tokens" : 1}], "tokens" : 46},{"id" : 19, "litterae" : [{"str" : "f", "tokens" : 7}], "tokens" : 7},{"id" : 157, "litterae" : [{"str" : "f", "tokens" : 14}], "tokens" : 14},{"id" : 239, "litterae" : [{"str" : "f", "tokens" : 4}], "tokens" : 4},{"id" : 2001, "litterae" : [{"str" : "f", "tokens" : 215}, {"str" : "u", "tokens" : 11}, {"str" : "v", "tokens" : 1}], "tokens" : 227},{"id" : 65, "litterae" : [{"str" : "f", "tokens" : 123}], "tokens" : 123},{"id" : 173, "litterae" : [{"str" : "f", "tokens" : 370}, {"str" : "u", "tokens" : 44}, {"str" : "v", "tokens" : 5}], "tokens" : 419},{"id" : 273, "litterae" : [{"str" : "f", "tokens" : 298}, {"str" : "u", "tokens" : 6}, {"str" : "v", "tokens" : 2}], "tokens" : 306},{"id" : 188, "litterae" : [{"str" : "f", "tokens" : 50}], "tokens" : 50},{"id" : 296, "litterae" : [{"str" : "f", "tokens" : 349}, {"str" : "v", "tokens" : 1}], "tokens" : 350},{"id" : 12, "litterae" : [{"str" : "f", "tokens" : 7}], "tokens" : 7},{"id" : 282, "litterae" : [{"str" : "f", "tokens" : 79}, {"str" : "v", "tokens" : 1}], "tokens" : 80},{"id" : 10, "litterae" : [{"str" : "f", "tokens" : 51}, {"str" : "u", "tokens" : 34}, {"str" : "v", "tokens" : 3}], "tokens" : 88},{"id" : 18, "litterae" : [{"str" : "u", "tokens" : 1}, {"str" : "f", "tokens" : 1}], "tokens" : 2},{"id" : 139, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 146, "litterae" : [{"str" : "f", "tokens" : 5}, {"str" : "u", "tokens" : 1}], "tokens" : 6},{"id" : 278, "litterae" : [{"str" : "f", "tokens" : 404}, {"str" : "u", "tokens" : 12}, {"str" : "w", "tokens" : 2}], "tokens" : 418},{"id" : 143, "litterae" : [{"str" : "f", "tokens" : 7}], "tokens" : 7},{"id" : 1700, "litterae" : [{"str" : "f", "tokens" : 39}], "tokens" : 39},{"id" : 133, "litterae" : [{"str" : "f", "tokens" : 37}], "tokens" : 37},{"id" : 271, "litterae" : [{"str" : "f", "tokens" : 30}, {"str" : "v", "tokens" : 5}], "tokens" : 35},{"id" : 279, "litterae" : [{"str" : "u", "tokens" : 1}], "tokens" : 1},{"id" : 150, "litterae" : [{"str" : "f", "tokens" : 138}], "tokens" : 138},{"id" : 232, "litterae" : [{"str" : "f", "tokens" : 9}], "tokens" : 9},{"id" : 158, "litterae" : [{"str" : "f", "tokens" : 153}, {"str" : "v", "tokens" : 3}], "tokens" : 156},{"id" : 172, "litterae" : [{"str" : "f", "tokens" : 65}, {"str" : "u", "tokens" : 2}], "tokens" : 67},{"id" : 63, "litterae" : [{"str" : "f", "tokens" : 8}], "tokens" : 8},{"id" : 9, "litterae" : [{"str" : "f", "tokens" : 67}, {"str" : "v", "tokens" : 20}, {"str" : "u", "tokens" : 7}], "tokens" : 94},{"id" : 183, "litterae" : [{"str" : "f", "tokens" : 5}], "tokens" : 5},{"id" : 260, "litterae" : [{"str" : "f", "tokens" : 234}, {"str" : "u", "tokens" : 27}], "tokens" : 261},{"id" : 184, "litterae" : [{"str" : "f", "tokens" : 15}], "tokens" : 15},{"id" : 64, "litterae" : [{"str" : "f", "tokens" : 478}], "tokens" : 478},{"id" : 170, "litterae" : [{"str" : "f", "tokens" : 36}], "tokens" : 36},{"id" : 1200, "litterae" : [{"str" : "f", "tokens" : 259}, {"str" : "u", "tokens" : 3}], "tokens" : 262},{"id" : 235, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 68, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 248, "litterae" : [{"str" : "f", "tokens" : 26}], "tokens" : 26},{"id" : 118, "litterae" : [{"str" : "f", "tokens" : 345}, {"str" : "u", "tokens" : 2}], "tokens" : 347},{"id" : 244, "litterae" : [{"str" : "f", "tokens" : 9}, {"str" : "u", "tokens" : 1}, {"str" : "v", "tokens" : 1}], "tokens" : 11},{"id" : 272, "litterae" : [{"str" : "f", "tokens" : 267}, {"str" : "u", "tokens" : 40}, {"str" : "v", "tokens" : 3}], "tokens" : 310},{"id" : 240, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 128, "litterae" : [{"str" : "f", "tokens" : 2}], "tokens" : 2},{"id" : 300, "litterae" : [{"str" : "f", "tokens" : 14}], "tokens" : 14},{"id" : 231, "litterae" : [{"str" : "f", "tokens" : 18}], "tokens" : 18},{"id" : 163, "litterae" : [{"str" : "f", "tokens" : 5}, {"str" : "w", "tokens" : 1}], "tokens" : 6},{"id" : 6, "litterae" : [{"str" : "f", "tokens" : 92}, {"str" : "u", "tokens" : 3}], "tokens" : 95},{"id" : 246, "litterae" : [{"str" : "f", "tokens" : 126}, {"str" : "w", "tokens" : 20}, {"str" : "v", "tokens" : 10}, {"str" : "u", "tokens" : 1}], "tokens" : 157},{"id" : 2, "litterae" : [{"str" : "f", "tokens" : 113}, {"str" : "u", "tokens" : 43}, {"str" : "v", "tokens" : 17}, {"str" : "ƿ", "tokens" : 1}], "tokens" : 174},{"id" : 159, "litterae" : [{"str" : "f", "tokens" : 3}], "tokens" : 3},{"id" : 256, "litterae" : [{"str" : "f", "tokens" : 6}], "tokens" : 6},{"id" : 234, "litterae" : [{"str" : "f", "tokens" : 4}, {"str" : "u", "tokens" : 1}, {"str" : "w", "tokens" : 1}], "tokens" : 6},{"id" : 186, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 263, "litterae" : [{"str" : "f", "tokens" : 7}, {"str" : "v", "tokens" : 1}], "tokens" : 8},{"id" : 177, "litterae" : [{"str" : "f", "tokens" : 1}], "tokens" : 1},{"id" : 141, "litterae" : [{"str" : "f", "tokens" : 7}], "tokens" : 7},{"id" : 266, "litterae" : [{"str" : "f", "tokens" : 6}], "tokens" : 6},{"id" : 7, "litterae" : [{"str" : "f", "tokens" : 98}, {"str" : "v", "tokens" : 2}], "tokens" : 100}];
  
  }
    
   makeColorKey(litStats){
         let ref = this;
        let colorKey=[];
          litStats.forEach((ls,lsi)=>{
        colorKey[ls.str]=ref.colors[lsi]});  
    
      return colorKey;
    } 

    
    
 drawPie(lits:any, total, r, colorKey){
     let canvas : HTMLCanvasElement = document.createElement('canvas');
      let ctx = canvas.getContext('2d'); 
      canvas.width = r*2; 
      canvas.height = r*2; 
      
        let start = 0;
        
        lits.forEach((l,li)=>{
            let end = start + (2*Math.PI*(l.tokens/total));
            ctx.strokeStyle="black";
            ctx.beginPath();
            ctx.fillStyle=colorKey[l.str];
            ctx.arc(r,r,r,start,end);
            ctx.lineTo(r,r);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            start = end;
        
        })
       return canvas; 
    } 
    
    
    calcPieSize(min,max,tokens){
        let rng = max-min;
        let size = 15 + ((tokens/rng)*15);
        return size;
    }
    
   addFilter(toFilter){
    //this.renderer.setStyle(toFilter, "filter", "blur(5px)");
       console.log("addingTO");
       console.log(toFilter);
       toFilter.style.filter="blur(5px)";
    }
    
    removeFilter(toFilter){
   // this.renderer.setStyle(toFilter, "filter", "none"); 
        console.log("REMOVING");
       console.log(toFilter);
        toFilter.style.filter="none";
        
    }
    
    darken(toFilter){
    //this.renderer.setStyle(toFilter, "filter", "blur(5px)");
       toFilter.style.filter="contrast(5%)";
    }
    
 
    
    
}
