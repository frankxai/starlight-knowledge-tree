import { readFileSync } from "node:fs";
const { records } = JSON.parse(readFileSync(new URL("./methods.seed.json", import.meta.url), "utf8"));

const tokenize = s => (s.toLowerCase().match(/[a-z0-9]+/g) || []);
const index = records.map(r => ({
  ...r, tokens: new Set(tokenize([r.name,r.definition,r.namespace,r.kind,...(r.expansion||[])].join(" ")))
}));
const idMap = new Map(index.map(r=>[r.id,r]));

export function resolve(id) {
  if (typeof id !== "string") return null;
  const r=idMap.get(id);
  return r ? publicRecord(r) : null;
}
function publicRecord(r) {
  const {tokens,...out}=r;
  return out;
}
export function search(query,{limit=8,includeDraft=true}={}) {
  if(typeof query!=="string"||query.length>500) throw Error("query must be a string <= 500 characters");
  if(!Number.isInteger(limit)||limit<1||limit>50) throw Error("limit must be integer 1..50");
  const q=tokenize(query);
  if(!q.length) return [];
  return index.filter(r=>includeDraft||r.status==="reviewed")
    .map(r=>{
      const nameTokens=new Set(tokenize(r.name));
      const score=q.reduce((sum,t)=>sum+(nameTokens.has(t)?5:0)+(r.tokens.has(t)?1:0),0);
      return {r,score};
    }).filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score||a.r.id.localeCompare(b.r.id))
    .slice(0,limit).map(({r,score})=>({record:publicRecord(r),score,
      caveat:r.status==="externally_documented"?"Source URL candidate; bibliographic inspection pending":"Not approved canon",
      source_refs:r.source_refs}));
}
export function compare(ids) {
  if(!Array.isArray(ids)||ids.length>10||ids.length<2)throw Error("2..10 ids required");
  return ids.map(id=>{const record=resolve(id);return {id,record,found:!!record};});
}
export function trace(id) {
  const r=resolve(id);
  if(!r)return null;
  return {id,origin:r.origin,status:r.status,rights:r.rights,verified_at:r.verified_at,source_refs:r.source_refs,supersedes:r.supersedes};
}
export function safeCard(id) {
  const r=resolve(id);if(!r)return null;
  return {id:r.id,title:r.name,subtitle:r.definition,kind:r.kind,status:r.status,
    disclosure:r.rights==="third_party_attribution_required"?"Third-party method; no affiliation or endorsement implied":"Starlight editorial proposal",
    source_urls:r.source_refs.map(s=>s.url),verified:r.verified_at!==null};
}
