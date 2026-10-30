import assert from 'node:assert/strict';
import {CATALOG,BY_ID,createDay,begin,pickup,restore,score,total,localDay,archive} from './engine.mjs';
import {itemArt} from './art.mjs';import {zh,en} from './i18n.mjs';
const date='2026-10-30';assert.equal(CATALOG.length,64);assert.equal(new Set(CATALOG.map(x=>x.id)).size,64);assert.deepEqual(Object.keys(zh).sort(),Object.keys(en).sort());
for(const theme of ['sunny','dusk'])for(const item of CATALOG){const svg=itemArt(item.id,theme);assert.ok(svg.startsWith('<svg'));assert.ok(!svg.includes('undefined'));assert.ok(zh[item.family]&&en[item.family]);assert.notEqual(svg,itemArt(item.id,theme==='sunny'?'dusk':'sunny'));}
let checks=0;
for(let seed=1;seed<=240;seed++){
 let s=createDay(date,seed);assert.deepEqual(s,createDay(date,seed));assert.ok(restore(s,date));assert.equal(new Set(s.beaches.map(x=>x.theme)).size,2);assert.equal(s.beaches[0].items.length,12);assert.notDeepEqual(createDay(date,seed+1),s);assert.equal(pickup(s,s.beaches[0].items[0].id).valid,false);s=begin(s);
 for(let beach=0;beach<2;beach++){
  assert.equal(s.index,beach);assert.equal(s.beaches[beach].seen.length,0);for(let count=1;count<=64;count++){
   const b=s.beaches[beach],fresh=b.items.find(x=>!b.seen.includes(x.id));assert.ok(fresh,'Must always offer an unseen design');const before=JSON.stringify(s),r=pickup(s,fresh.id);assert.equal(JSON.stringify(s),before,'No input mutation');assert.ok(r.valid);s=r.state;assert.equal(s.beaches[beach].score,score(count));assert.equal(new Set(s.beaches[beach].items.map(x=>x.id)).size,s.beaches[beach].items.length);assert.ok(restore(s,date));if(count<64)assert.equal(s.beaches[beach].items.length,Math.min(18,12+3*Math.floor(count/7)));checks++;
   // Whenever a repeated choice appears, it must end only this beach, with no new points.
   if(count<64){const duplicate=s.beaches[beach].items.find(x=>s.beaches[beach].seen.includes(x.id));if(duplicate){const wrong=pickup(s,duplicate.id);assert.equal(wrong.state.phase,'result');assert.equal(wrong.state.beaches[beach].score,score(count));assert.equal(wrong.state.beaches[beach].seen.length,count);assert.ok(restore(wrong.state,date));assert.deepEqual(pickup(wrong.state,duplicate.id).state,wrong.state);}}
  }
  assert.equal(s.phase,'result');assert.equal(s.beaches[beach].status,'perfect');s=begin(s);assert.ok(restore(s,date));
 }
 assert.equal(s.phase,'complete');assert.equal(total(s),12800);assert.deepEqual(begin(s),s);assert.equal(restore(s,'2026-10-31'),null);assert.equal(archive({},s)[date].score,12800);
}
let s=begin(createDay(date,19)),ended=0;while(s.phase==='playing'){const b=s.beaches[0],dupe=b.items.find(x=>b.seen.includes(x.id));s=pickup(s,(dupe||b.items[0]).id).state;if(s.phase==='result')ended++;}assert.equal(ended,1);const firstScore=s.beaches[0].score;s=begin(s);assert.equal(s.index,1);assert.equal(s.beaches[1].seen.length,0);assert.equal(total(s),firstScore);assert.ok(pickup(s,'not-an-item').valid===false);
const bad=structuredClone(s);bad.beaches[1].score=999;assert.equal(restore(bad,date),null);const bad2=structuredClone(s);bad2.beaches[1].items[0].x=-100;assert.equal(restore(bad2,date),null);
assert.equal(localDay(new Date(2026,9,30,23,59)),'2026-10-30');assert.equal(localDay(new Date(2026,9,31,0,1)),'2026-10-31');
console.log(`Verified ${checks} unique pickups over 480 complete beaches, repeat failures, daily transitions, reload safety, scoring, 128 original SVG designs and bilingual coverage.`);
