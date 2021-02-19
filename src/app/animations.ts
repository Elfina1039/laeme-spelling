import {trigger, state, transition, style, animate, query, stagger, sequence} from '@angular/animations';

export let appear =   trigger("appear", [
            state("void",style({opacity:0})),
            transition("void <=> *", [
                animate(1000)
            ])
        ]);

export let expand =   trigger("expand", [
            state("collapsed",style({height:0, opacity:0})),
       // state("expanded",style({height:"inherit"})),
            transition("collapsed <=> expanded", [
                animate("1000ms ease-out")
            ])
        ]);

export let showHide =   trigger("showHide", [
          
            transition("*<=>*", [
                query("@appear", [
                      sequence([
                          style({ opacity:0, transform:"scaleY(0.75)" }),
                  //  animate("400ms ease-in", style({width:0, opacity:0, position:"absolute", left:0})),
                      animate("1000ms ease-out")
                ])
                    
                ])
              
                
            ])
        ]);

export let addItems = trigger('addItems', [
  transition('* => *', [ // each time the binding value changes
   
    query(':enter', [
      style({ opacity: 0 }),
      stagger(200, [
        animate('0.5s', style({ opacity: 1 }))
      ])
    ])
  ])
]);

export let fullScreen =   trigger("fullScreen", [
            state("full", style({position:"absolute", top:0, left:0, padding:"10%", background:"rgba(0,0,0,0.7)"})),
            transition("* <=> full", [
                animate(1000)
            ])
        ]);

export const routeAnimation =
  trigger('routeAnimation', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave', [
        style({
        
        transform:"translateX(-50%)",
          opacity: 0,
        
        }),
      ]),
      // Animate the new page in
      query(':enter', [
        animate('700ms ease-in', style({ opacity: 1 ,transform:"translateX(0)"})),
      ])
    ]),
]);
