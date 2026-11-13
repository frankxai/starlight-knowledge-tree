import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateIndustry, filterLayers, dossier } from "../../packages/atlas-contract/industry-preview.mjs";
const data = JSON.parse(readFileSync(new URL("../../data/atlas/industry.preview.json", import.meta.url)));
test("source-backed starter data satisfies the preview boundary", () => assert.equal(validateIndustry(data), data));
test("search resolves companies into their layer and handles empty results", () => {
  assert.deepEqual(filterLayers(data, "MISTRAL").map(l => l.id), ["models"]);
  assert.equal(filterLayers(data, "not-a-company").length, 0);
  assert.equal(filterLayers(data, "  ").length, 7);
});
test("export includes only selected context and keeps causal uncertainty", () => {
  const result = dossier(data, "inference-economics");
  assert.equal(result.scenario.standing, "analyst_hypothesis");
  assert.deepEqual(result.entities.map(e => e.id), ["cloudflare", "mistral"]);
  assert.equal(result.sources.length, 2);
  assert.equal(dossier(data, "absent"), null);
});
test("reject dangling, unsafe or unsupported evidence", () => {
  const bad = change => { const d = structuredClone(data); change(d); assert.throws(() => validateIndustry(d)); };
  bad(d => d.entities[0].source_id = "missing");
  bad(d => d.sources[0].url = "javascript:alert(1)");
  bad(d => d.scenarios[0].standing = "proven");
  bad(d => d.scenarios[0].countercase = "");
  bad(d => d.relationships[0].to = "invented-customer");
  bad(d => d.entities.push(d.entities[0]));
  bad(d => d.sources[0].accessed_on = "2099-01-01");
});
