import { readFileSync } from 'node:fs';
const source=JSON.parse(readFileSync(new URL('./methods.seed.json',import.meta.url),'utf8'));
export function compileEdition(records,{title='Starlight Method Field Guide',sourceRevision}={}){
 if(!sourceRevision||!/^[a-f0-9]{7,40}$/.test(sourceRevision))throw Error('pinned source revision required');
 if(!Array.isArray(records))throw TypeError('records required');
 const approved=records.filter(r=>r.status==='reviewed'&&r.verified_at&&r.rights==='index_allowed'&&r.source_refs?.every(s=>s.evidence_state==='inspected'));
 const rejected=records.filter(r=>!approved.includes(r)).map(r=>({id:r.id,reason:'not reviewed, rights-cleared and source-inspected'}));
 const body=['# '+title,'','Edition source commit: '+sourceRevision,'','**Editorial notice:** Original commentary only; third-party methods remain attributed.',''];
 for(const r of approved.sort((a,b)=>a.id.localeCompare(b.id))){body.push('## '+r.name+' ('+r.namespace+')','',r.definition,'','Sources:');for(const s of r.source_refs)body.push('- '+s.url);body.push('');}
 return {markdown:body.join('\n'),included:approved.map(r=>r.id),rejected,source_revision:sourceRevision,publication_ready:approved.length>0};
}
export const draftEdition=()=>compileEdition(source.records,{sourceRevision:'9d80be26f342aa1f1e4f711090910851d89ffb97'});
