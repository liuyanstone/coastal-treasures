export const FAMILIES=['scallop','spiral','clam','starfish','fish','seaweed','coral','stone','crab','turtle','boat','bucket','shovel','ball','ring','castle'];
export const GARDEN_FAMILIES=['tulip','daisy','rose','sunflower','lavender','lily','cactus','clover','teddy','kite','pinwheel','train','blocks','yoyo','robot','balloon'];
const entries=families=>families.flatMap(f=>Array.from({length:4},(_,v)=>({id:`${f}-${v}`,family:f,variant:v})));
export const BEACH_CATALOG=entries(FAMILIES),GARDEN_CATALOG=entries(GARDEN_FAMILIES);
export const catalogFor=theme=>theme==='garden'?GARDEN_CATALOG:BEACH_CATALOG;
export const CATALOG=[...BEACH_CATALOG,...GARDEN_CATALOG];
export const BY_ID=Object.fromEntries(CATALOG.map(x=>[x.id,x]));
const clone=x=>structuredClone(x);
export function localDay(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function random(s){let t=s.rng+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);s.rng>>>=0;return((t^t>>>14)>>>0)/4294967296;}
const pick=(s,a)=>a[Math.floor(random(s)*a.length)];
function shuffle(s,a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(random(s)*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function score(n){return n*100;}
function position(s){const slots=shuffle(s,Array.from({length:20},(_,i)=>i));s.items=s.items.map((item,i)=>({id:item.id,x:10+(slots[i]%5)*20+(random(s)-.5)*3,y:12.5+Math.floor(slots[i]/5)*25+(random(s)-.5)*3,angle:Math.round((random(s)-.5)*26)}));}
function populate(s){const target=Math.min(18,12+3*Math.floor(s.seen.length/7));while(s.items.length<target){const occupied=new Set(s.items.map(x=>x.id)),recent=new Set(s.seen.slice(-2)),available=catalogFor(s.theme).map(x=>x.id).filter(id=>!occupied.has(id)&&!recent.has(id));const old=available.filter(id=>s.seen.includes(id)),fresh=available.filter(id=>!s.seen.includes(id));const pool=old.length&&random(s)<.5?old:fresh.length?fresh:old;s.items.push({id:pick(s,pool)});}
 if(!s.items.some(x=>!s.seen.includes(x.id))){const fresh=catalogFor(s.theme).map(x=>x.id).filter(id=>!s.seen.includes(id));if(fresh.length)s.items[Math.floor(random(s)*s.items.length)]={id:pick(s,fresh)};}
 position(s);
}
function beach(theme,seed){const s={theme,rng:seed>>>0,seen:[],items:[],status:'ready',repeated:null,score:0};populate(s);return s;}
export function createDay(date=localDay(),seed=Date.now()>>>0){const rng={rng:seed>>>0},themes=shuffle(rng,['sunny','garden']);return {version:3,date,seed:seed>>>0,index:0,phase:'intro',bests:{sunny:0,garden:0},beaches:themes.map(theme=>beach(theme,Math.floor(random(rng)*4294967296)))};}
export function begin(input,theme,seed=Date.now()>>>0){if(!['sunny','garden'].includes(theme))return input;const s=clone(input);s.index=s.beaches.findIndex(b=>b.theme===theme);s.beaches[s.index]=beach(theme,seed);s.beaches[s.index].status='playing';s.phase='playing';return s;}
export function menu(input){const s=clone(input);s.phase='intro';return s;}
export function resume(input){if(input.phase!=='intro'||input.beaches[input.index].status!=='playing')return input;const s=clone(input);s.phase='playing';return s;}
function record(s){const b=s.beaches[s.index];s.bests[b.theme]=Math.max(s.bests[b.theme],b.score);}
export function pickup(input,id){if(input.phase!=='playing')return {state:input,valid:false};const s=clone(input),b=s.beaches[s.index];if(!b.items.some(x=>x.id===id))return {state:input,valid:false};if(b.seen.includes(id)){b.status='ended';b.repeated=id;s.phase='result';record(s);return {state:s,valid:true,repeat:true};}b.seen.push(id);b.score=score(b.seen.length);if(b.seen.length===catalogFor(b.theme).length){b.status='perfect';b.items=b.items.filter(x=>x.id!==id);s.phase='result';record(s);return {state:s,valid:true,perfect:true};}b.items=b.items.filter(x=>x.id!==id);populate(b);return {state:s,valid:true,collected:id};}
export function total(s){return s.bests.sunny+s.bests.garden;}
export function restore(raw,date=localDay()){
 if(!raw||![1,2,3].includes(raw.version)||raw.date!==date||!Number.isInteger(raw.seed)||raw.seed<0||raw.seed>4294967295||![0,1].includes(raw.index)||!['intro','playing','result','complete'].includes(raw.phase)||!Array.isArray(raw.beaches)||raw.beaches.length!==2||new Set(raw.beaches.map(b=>b.theme)).size!==2)return null;
 const legacy=raw.version<3,themes=legacy?['sunny','dusk']:['sunny','garden'];
 for(const b of raw.beaches){const pool=new Set(catalogFor(legacy?'sunny':b.theme).map(x=>x.id));if(!themes.includes(b.theme)||!Number.isInteger(b.rng)||b.rng<0||b.rng>4294967295||!['ready','playing','ended','perfect'].includes(b.status)||!Array.isArray(b.seen)||b.seen.length>64||new Set(b.seen).size!==b.seen.length||b.seen.some(id=>!pool.has(id))||b.score!==score(b.seen.length)||!Array.isArray(b.items)||new Set(b.items.map(x=>x.id)).size!==b.items.length)return null;for(const item of b.items)if(!pool.has(item.id)||!Number.isFinite(item.x)||item.x<8||item.x>92||!Number.isFinite(item.y)||item.y<10||item.y>90||!Number.isInteger(item.angle)||Math.abs(item.angle)>13)return null;
 if(b.status==='ended'&&(!b.seen.includes(b.repeated)||!b.items.some(x=>x.id===b.repeated))||b.status==='perfect'&&b.seen.length!==64||b.status==='ready'&&b.seen.length||b.status==='playing'&&(!b.items.some(x=>!b.seen.includes(x.id))||b.items.length!==Math.min(18,12+3*Math.floor(b.seen.length/7))))return null;}
 const b=raw.beaches[raw.index];if(raw.phase==='playing'&&b.status!=='playing'||raw.phase==='result'&&!['ended','perfect'].includes(b.status))return null;
 const bests=raw.version===1?Object.fromEntries(raw.beaches.map(b=>[b.theme,b.score])):raw.bests;
 if(!bests||themes.some(theme=>!Number.isInteger(bests[theme])||bests[theme]<0||bests[theme]>6400||bests[theme]%100)||raw.version>1&&raw.beaches.some(b=>['ended','perfect'].includes(b.status)&&bests[b.theme]<b.score)||raw.version>1&&raw.phase==='complete')return null;
 if(legacy){const s=clone(raw);s.version=3;s.bests={sunny:bests.sunny,garden:bests.dusk};const index=s.beaches.findIndex(b=>b.theme==='dusk');s.beaches[index]=beach('garden',s.beaches[index].rng);if(s.index===index||s.phase==='complete')s.phase='intro';s.sceneUpdated=true;return s;}
 return clone(raw);
}
export function archive(history,s){if(!s||!total(s))return history;const old=history?.[s.date],result={score:total(s),counts:s.beaches.map(b=>s.bests[b.theme]/100),bests:{...s.bests}};const out={...history,[s.date]:old?.score>result.score?old:result};return Object.fromEntries(Object.entries(out).sort(([a],[b])=>b.localeCompare(a)).slice(0,90));}
