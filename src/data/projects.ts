export type Project={slug:string;name:string;type:string;year:string;intro:string;description:string;count:number;palette:string};
export const projects:Project[]=[
 {slug:'module-4',name:'Module 4',type:'Mobile application · UI/UX',year:'2026',intro:'An accessible approach to modern learning.',description:'A learning-focused interface exploration covering information hierarchy, navigation, progress and everyday usability.',count:3,palette:'#d9ebe4'},
 {slug:'baby-nest',name:'Baby Nest',type:'Parenting & wellbeing · UI/UX',year:'2026',intro:'Making a caring experience feel effortless.',description:'A warm mobile experience designed around clear information, approachable visuals and simple journeys for parents.',count:3,palette:'#f4dde3'},
 {slug:'upgraded-one',name:'Upgraded One',type:'Responsive web · Interface design',year:'2026',intro:'A confident and considered digital presence.',description:'Web interface explorations across layouts, hierarchy and responsive touchpoints.',count:3,palette:'#e7d7c8'},
 {slug:'e-learning',name:'E-Learning Mobile',type:'Mobile learning · UI/UX',year:'2026',intro:'Learning spaces that invite participation.',description:'A concept for digital learning and community, with an emphasis on clarity and student experience.',count:2,palette:'#d9eaf2'},
 {slug:'final-project',name:'Final Project',type:'Interface systems · Exploration',year:'2026',intro:'Finding the right balance of form and function.',description:'Selected user interface concepts and visual explorations from the final project.',count:2,palette:'#e9e2f2'},
 {slug:'hci-group',name:'HCI Group Project',type:'Human-computer interaction',year:'2026',intro:'Human-centered interactions, thoughtfully mapped.',description:'A collaborative interface project focused on understandable digital interactions.',count:2,palette:'#d9e9ec'}
];
export const projectImage=(slug:string,index:number)=>`/projects/${slug}/${String(index).padStart(2,'0')}.webp`;
