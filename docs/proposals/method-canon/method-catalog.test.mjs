import test from "node:test";
import assert from "node:assert/strict";
import {resolve,search,compare,trace,safeCard} from "./method-catalog.mjs";
test("exact IDs disambiguate four STELLAR records",()=>{
  const hits=search("STELLAR");
  assert.equal(hits.length,4);
  assert.equal(new Set(hits.map(x=>x.record.id)).size,4);
  assert.equal(resolve("method:starlight-human:stellar-human").expansion.at(-1),"Reinforce");
});
test("search is deterministic, bounded, and discloses provisional status",()=>{
  assert.deepEqual(search("protocol"),search("protocol"));
  assert.ok(search("RAG").some(x=>x.record.name==="RAG"));
  assert.ok(search("RAG").every(x=>x.caveat));
  assert.deepEqual(search("unknownnomatch"),[]);
  assert.throws(()=>search("a",{limit:999}));
  assert.throws(()=>search("x".repeat(501)));
});
test("source trace never fabricates verification",()=>{
  const t=trace("method:agent-interop:mcp");
  assert.equal(t.verified_at,null);
  assert.equal(t.source_refs[0].evidence_state,"candidate_not_inspected");
  assert.equal(safeCard("method:agent-interop:mcp").verified,false);
});
test("comparisons preserve unresolved IDs",()=>{
  const x=compare(["method:ai-reasoning:react","method:missing:nope"]);
  assert.equal(x[0].found,true);assert.equal(x[1].found,false);
});
test("unknown record and empty queries are safe",()=>{
  assert.equal(resolve("bad"),null);
  assert.equal(safeCard("bad"),null);
  assert.deepEqual(search("  "),[]);
});
