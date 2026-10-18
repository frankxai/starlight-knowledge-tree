import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { ATLAS_SOURCE_UPDATE_STATUSES, AtlasValidationError, articleMarkdown, citations, compileAtlas, hashAtlasContent, normalizeAtlas, parseAtlasQuery, safeSourceURL, searchAtlas, stableJSON, validateAtlas, validateClaimHistory } from "../../packages/atlas-contract/atlas-core.mjs";

const original = JSON.parse(readFileSync(new URL("../../data/atlas/corpus.json", import.meta.url), "utf8"));
const originalHistory = JSON.parse(readFileSync(new URL("../../data/atlas/revisions/seed-review-2026-10-13.json", import.meta.url), "utf8"));
const seed = () => structuredClone(original);
const history = () => structuredClone(originalHistory);
const projection = { source_repository: "frankxai/starlight-knowledge-tree", source_path: "data/atlas/corpus.json", source_commit: "a".repeat(40), compiled_on: "2026-10-13" };
function rejects(change, pattern) { const value = seed(); change(value); assert.throws(() => normalizeAtlas(value), pattern); }
function rejectsHistory(change, pattern) { const value = history(); change(value); assert.throws(() => validateClaimHistory(original, [value]), pattern); }

test("canonical seed retains five drafts, ten claims and ten validated prior revisions", () => {
  const canonical = normalizeAtlas(original); assert.equal(stableJSON(canonical), stableJSON(original));
  assert.equal(canonical.articles.length, 5); assert.equal(canonical.claims.length, 10); assert.equal(canonical.sources.length, 11);
  assert(canonical.articles.every(a => a.publication_status === "editorial_draft")); assert(canonical.claims.every(c => !c.review.independent_review && c.revision === 2));
  assert.deepEqual(validateClaimHistory(original, [originalHistory]), { documents: 1, previous_claim_revisions: 10 });
});
test("unknown update states, case variants, aliases and injected status text are rejected", () => {
  for (const status of ["Retracted", "RETRACTED", " retracted", "retracted_with_notice", "withdrawn_with_notice", "not_checked\n\n# VERIFIED", "not-a-canonical-state"]) rejects(v => v.sources[0].update_status = status, /unknown source update status/);
  assert(ATLAS_SOURCE_UPDATE_STATUSES.includes("retracted")); assert(ATLAS_SOURCE_UPDATE_STATUSES.includes("withdrawn"));
});
test("exact retracted and withdrawn support fails until every dependent claim is reassessed", () => {
  for (const status of ["retracted", "withdrawn"]) {
    rejects(v => v.sources[0].update_status = status, /without reassessment/);
    const value = seed(); value.sources[0].update_status = status;
    value.claims.filter(c => c.evidence.some(e => e.source_id === value.sources[0].id && e.relation === "supports")).forEach(c => c.standing = "unresolved");
    assert.doesNotThrow(() => normalizeAtlas(value));
  }
});
test("even plausible filenames, reviewers and dates cannot fabricate independent scientific review", () => {
  for (const receipt of ["does-not-exist", "docs/atlas/source-review-2026-10-13.md", "https://research.example.org/review"]) rejects(v => v.claims[0].review = { status: "reviewed", method: "independent_review", independent_review: true, receipt_ref: receipt, reviewer: "reviewer-independent", reviewed_on: "2026-10-13" }, /promotion is unsupported/);
  const value = seed(); value.claims[0].review.status = "reviewed"; assert.equal(normalizeAtlas(value).status, "editorial_draft");
});
test("unsafe source and reviewer-context URLs cannot reach public records", () => {
  for (const url of ["javascript:alert(1)", "https://user:secret@example.org/", "http://127.0.0.1/", "https://[::1]/", "https://service.internal/", "https://example.org/%0aevil", "https://example.org/<script>"]) assert.throws(() => safeSourceURL(url), AtlasValidationError);
  for (const key of ["update_check_url", "preprint_url", "published_version_metadata_url"]) rejects(v => v.sources[0][key] = "javascript:evil", /unsafe URL/);
});
test("duplicate records, dangling references and metadata-only support are rejected", () => {
  rejects(v => v.sources.push(structuredClone(v.sources[0])), /duplicate id/);
  rejects(v => v.claims[0].evidence[0].source_id = "source-missing", /missing source/);
  rejects(v => v.sources[0].inspection = "metadata_only", /metadata-only support/);
  rejects(v => v.articles[0].claim_ids.pop(), /orphaned claim/);
});
test("public compiler strips private payloads and runtime reader refuses unknown published fields", () => {
  const value = seed(); value.private_registry = { secret: "never-publish" }; value.sources[0].full_text = "copyrighted full text"; value.claims[0].review.private_notes = "private";
  const compiled = compileAtlas(value, projection); assert(!JSON.stringify(compiled).includes("never-publish")); assert(!JSON.stringify(compiled).includes("copyrighted full text")); assert(!JSON.stringify(compiled).includes("private_notes")); assert.doesNotThrow(() => validateAtlas(compiled));
  compiled.hidden = true; assert.throws(() => validateAtlas(compiled), /unknown or noncanonical/);
});
test("content digest binds published facts; upstream revision must be exact", () => {
  const value = compileAtlas(original, projection); assert.equal(hashAtlasContent(value), value.projection.content_sha256);
  value.claims[0].text = "A substituted claim."; assert.throws(() => validateAtlas(value), /digest mismatch/);
  assert.throws(() => compileAtlas(original, { ...projection, source_commit: "main" }), /exact upstream commit/);
});
test("all exported dynamic Markdown metadata is escaped and line-normalized", () => {
  const value = seed(); const injected = "item\n\n# VERIFIED\n[approval](javascript:evil) <script>bad</script> **trusted**";
  for (const field of ["kind", "publication_stage", "retrieval_mode", "published_date_precision", "issue_date_precision", "retrieval_note", "date_note", "source_license_reported"]) value.sources[0][field] = injected;
  value.sources[0].issue_on = "2026-01-01"; value.sources[0].rights.full_text_redistribution = injected; value.claims[0].review.method = injected; value.claims[0].review.scope = injected;
  const canonical = normalizeAtlas(value); const markdown = articleMarkdown(canonical, canonical.articles[0]);
  assert(!/^# VERIFIED$/m.test(markdown)); assert(!markdown.includes("[approval](javascript:evil)")); assert(!markdown.includes("<script>")); assert(!markdown.includes("**trusted**")); assert(markdown.includes("\\# VERIFIED"));
  assert(markdown.includes("method: item")); assert(markdown.includes("Kind: item")); assert(markdown.includes("Source rights: full-text redistribution item"));
});
test("Markdown carries rights for every cited and related source and the collection license", () => {
  for (const article of original.articles) {
    const text = articleMarkdown(original, article); const ids = new Set([...article.related_source_ids, ...original.claims.filter(c => article.claim_ids.includes(c.id)).flatMap(c => c.evidence.map(e => e.source_id))]);
    assert.equal(text.match(/Source rights: full-text redistribution/g)?.length, ids.size);
    assert(text.includes("not\\_granted")); assert(text.includes("bibliographic\\_metadata\\_and\\_original\\_paraphrase")); assert(text.includes("media included no")); assert(text.includes("Collection license:"));
  }
});
test("CSL retains source-specific rights without granting publisher-text redistribution", () => {
  const refs = citations(original); assert(refs.length > 0); assert(refs.every(ref => ref.note.includes("full-text redistribution not_granted") && ref.note.includes("media included no")));
});
test("unknown and prototype-property source kinds cannot change CSL output shape", () => {
  for (const kind of ["__proto__", "constructor", "toString", "unknown_kind"]) { const value = seed(); value.sources[0].kind = kind; const ref = citations(value).find(ref => ref.id === value.sources[0].id); assert.equal(ref.type, "webpage"); assert.equal(typeof ref.type, "string"); }
});
test("CSL identifies inspected DESI and Saguaro preprints without attaching later journal DOI/date", () => {
  const refs = new Map(citations(original).map(ref => [ref.id, ref]));
  for (const [id, expected] of [["source-desi-analysis-paper", [2025, 3, 18]], ["source-lrd-paper", [2025, 7, 23]]]) {
    const ref = refs.get(id); assert.equal(ref.type, "article"); assert(!("DOI" in ref)); assert(!("container-title" in ref)); assert.deepEqual(ref.issued["date-parts"], [expected]); assert(ref.URL.startsWith("https://arxiv.org/")); assert(ref.note.includes("separate version"));
  }
  assert.equal(refs.get("source-bennu-sugars").type, "article-journal"); assert.equal(refs.get("source-bennu-sugars").DOI, "10.1038/s41561-025-01838-6"); assert.deepEqual(refs.get("source-bennu-sugars").issued["date-parts"], [[2025, 12, 2]]);
});
test("journal citations use explicit journal date while inspected-preprint dates retain their precision", () => {
  const value = seed(); const source = value.sources.find(s => s.id === "source-lrd-paper"); source.published_date_precision = "month";
  assert.deepEqual(citations(value).find(ref => ref.id === source.id).issued["date-parts"], [[2025, 7]]);
  source.url = "https://doi.org/10.3847/1538-4357/ae80cd"; source.publication_stage = "peer_reviewed_version_of_record";
  const journal = citations(value).find(ref => ref.id === source.id); assert.equal(journal.type, "article-journal"); assert.equal(journal.DOI, source.doi); assert.deepEqual(journal.issued["date-parts"], [[2026, 7, 29]]);
});
test("publication, revision and issue dates cannot masquerade as retrieval dates", () => {
  const source = original.sources.find(s => s.id === "source-bennu-sugars"); assert.equal(source.published_on, "2025-12-02"); assert.equal(source.issue_on, "2026-01-01"); assert.equal(source.issue_date_precision, "month"); assert.equal(source.accessed_on, "2026-10-13");
  rejects(v => v.sources[0].published_on = "2027-01-01", /after retrieval/); rejects(v => v.sources[0].published_on = "2026-02-30", /calendar date/);
});
test("history rejects missing prior revisions, unknown claims and article ownership changes", () => {
  rejectsHistory(v => v.history.previous_claim_revisions.pop(), /missing prior claim revision/);
  rejectsHistory(v => v.history.previous_claim_revisions[0].id = "claim-unrelated", /unknown claim/);
  rejectsHistory(v => v.history.previous_claim_revisions[0].article_id = "article-another", /ownership mismatch/);
  assert.throws(() => validateClaimHistory(original, []), /missing prior claim revision/);
});
test("history rejects duplicate, current and future claim revisions and missing retained evidence", () => {
  rejectsHistory(v => v.history.previous_claim_revisions.push(structuredClone(v.history.previous_claim_revisions[0])), /duplicate claim revision/);
  rejectsHistory(v => v.history.previous_claim_revisions[0].revision = 2, /not a prior revision/);
  rejectsHistory(v => v.history.previous_claim_revisions[0].revision = 3, /not a prior revision/);
  rejectsHistory(v => v.history.previous_claim_revisions[0].evidence[0].source_id = "source-missing", /missing retained source/);
});
test("history validates schema, predecessor digest, dates, canonical fields and scientific review boundary", () => {
  rejectsHistory(v => v.schema_version = "history-v0", /Unknown claim history schema/);
  rejectsHistory(v => v.history.predecessor_sha256 = "unknown", /64 lowercase hexadecimal/);
  rejectsHistory(v => v.history.reviewed_on = "2027-01-01", /after its record date/);
  rejectsHistory(v => v.history.previous_claim_revisions[0].private_notes = "hidden", /unknown or noncanonical/);
  rejectsHistory(v => v.history.previous_claim_revisions[0].review.independent_review = true, /promotion is unsupported/);
  rejectsHistory(v => v.private_credentials = { secret: "TEST-SENTINEL" }, /History document includes unknown public fields/);
  rejectsHistory(v => v.history.private_notes = "TEST-SENTINEL", /History metadata includes unknown public fields/);
  rejectsHistory(v => v.history.public_release_condition = "", /bounded, nonempty string/);
});
test("history cannot skip an intermediate revision or reintroduce the same version from another file", () => {
  const value = seed(); value.claims[0].revision = 3; assert.throws(() => validateClaimHistory(value, [originalHistory]), /claim-debris-sample@2/);
  assert.throws(() => validateClaimHistory(original, [originalHistory, originalHistory]), /duplicate claim revision/);
});
test("affirmative retained history cannot replace support with qualification or contradiction", () => {
  for (const standing of ["supported_within_scope", "tentative"]) for (const relation of ["qualifies", "contradicts"]) rejectsHistory(document => {
    const claim = document.history.previous_claim_revisions[0]; claim.standing = standing;
    claim.evidence.forEach(edge => edge.relation = relation);
  }, /History claim .* has no support edge/);
  const document = history(); document.history.previous_claim_revisions[0].standing = "unresolved";
  document.history.previous_claim_revisions[0].evidence.forEach(edge => edge.relation = "qualifies");
  assert.doesNotThrow(() => validateClaimHistory(original, [document]));
});
test("metadata-only retained sources cannot support even unresolved historical claims", () => {
  const value = seed(); const source = value.sources.find(source => source.id === "source-webb-paper"); source.inspection = "metadata_only";
  for (const standing of ["supported_within_scope", "tentative", "unresolved"]) {
    const document = history(); const claim = document.history.previous_claim_revisions[0]; claim.standing = standing;
    claim.evidence[0].source_id = source.id; claim.evidence[0].relation = "supports";
    assert.throws(() => validateClaimHistory(value, [document]), /History claim .* cannot use metadata-only support/);
  }
  const document = history(); const claim = document.history.previous_claim_revisions[0]; claim.standing = "unresolved";
  claim.evidence[0].source_id = source.id; claim.evidence[0].relation = "qualifies";
  assert.doesNotThrow(() => validateClaimHistory(value, [document]));
});
test("historical retraction checks require reassessment when the recorded notice check predates the claim check", () => {
  for (const status of ["retracted", "withdrawn"]) for (const checked of ["2026-10-12", "2026-10-13"]) {
    const value = seed(); const source = value.sources[0]; source.update_status = status; source.update_checked_on = checked;
    value.claims.filter(claim => claim.evidence.some(edge => edge.source_id === source.id && edge.relation === "supports")).forEach(claim => claim.standing = "unresolved");
    assert.throws(() => validateClaimHistory(value, [originalHistory]), /History claim .* already checked by that revision without reassessment/);
    const document = history(); document.history.previous_claim_revisions.filter(claim => claim.evidence.some(edge => edge.source_id === source.id && edge.relation === "supports")).forEach(claim => claim.standing = "unresolved");
    assert.doesNotThrow(() => validateClaimHistory(value, [document]));
  }
});
test("later retraction checks preserve earlier history but unknown chronology cannot approve it", () => {
  for (const status of ["retracted", "withdrawn"]) {
    const value = seed(); const source = value.sources[0]; source.update_status = status; source.accessed_on = "2026-10-14"; source.update_checked_on = "2026-10-14";
    value.claims.filter(claim => claim.evidence.some(edge => edge.source_id === source.id && edge.relation === "supports")).forEach(claim => claim.standing = "unresolved");
    assert.doesNotThrow(() => validateClaimHistory(value, [originalHistory]));
    assert.equal(originalHistory.history.previous_claim_revisions[0].standing, "supported_within_scope");
    delete source.update_checked_on;
    assert.throws(() => validateClaimHistory(value, [originalHistory]), /needs a recorded source update-check date/);
  }
});
test("keyword search and request parameters retain bounded read-only behavior", () => {
  assert.equal(searchAtlas(original, { query: "claim-bennu-detection" }).total, 1);
  for (const input of [{ query: "x".repeat(201) }, { query: "x\ny" }, { limit: 0 }, { limit: 51 }, { domain: `domain-${"x".repeat(201)}` }]) assert.throws(() => searchAtlas(original, input), AtlasValidationError);
  for (const query of ["q=x&q=y", "private=true", "limit=1e1", "limit=01"]) assert.throws(() => parseAtlasQuery(new URLSearchParams(query)), AtlasValidationError);
});
test("offset pagination visits every matching article once and stops at the final page", () => {
  const seen = []; let offset = 0;
  do {
    const page = searchAtlas(original, { limit: 2, offset });
    assert.equal(page.offset, offset); assert.equal(page.total, original.articles.length);
    assert.equal(page.truncated, offset + 2 < page.total);
    seen.push(...page.articles.map(article => article.id)); offset = page.next_offset;
  } while (offset !== null);
  assert.deepEqual(seen, original.articles.map(article => article.id)); assert.equal(new Set(seen).size, seen.length);
  for (const offset of [5, 10000]) { const page = searchAtlas(original, { offset, limit: 50 }); assert.deepEqual(page.articles, []); assert.equal(page.next_offset, null); assert.equal(page.truncated, false); }
  const filtered = searchAtlas(original, { query: "claim-bennu-detection", offset: 1 }); assert.equal(filtered.total, 1); assert.deepEqual(filtered.articles, []); assert.equal(filtered.next_offset, null);
});
test("offset inputs are canonical bounded integers in direct calls and request parameters", () => {
  assert.deepEqual(parseAtlasQuery(new URLSearchParams()), { query: "", domain: "", lens: "", limit: 20, offset: 0 });
  for (const offset of [0, 1, 9999, 10000]) { assert.equal(parseAtlasQuery(new URLSearchParams(`offset=${offset}`)).offset, offset); assert.doesNotThrow(() => searchAtlas(original, { offset })); }
  for (const offset of [-1, 10001, 1.5, NaN, Infinity, "1", null]) assert.throws(() => searchAtlas(original, { offset }), /offset must be an integer/);
  for (const query of ["offset=-1", "offset=10001", "offset=00", "offset=01", "offset=1e1", "offset=1.0", "offset=", "offset=1&offset=2"]) assert.throws(() => parseAtlasQuery(new URLSearchParams(query)), AtlasValidationError);
});
function largeSearchFixture(count) {
  const value = seed(); const source = value.sources[0], claim = value.claims[0], article = value.articles[0];
  value.sources = []; value.claims = []; value.articles = [];
  for (let index = 0; index < count; index++) {
    const sourceId = `source-fixture-${index}`, claimId = `claim-fixture-${index}`, articleId = `article-fixture-${index}`;
    value.sources.push({ ...source, id: sourceId, title: `Source ${index}`, doi: `10.1234/fixture-${index}` });
    value.claims.push({ ...claim, id: claimId, article_id: articleId, text: `needle claim ${index}`, evidence: [{ ...claim.evidence[0], source_id: sourceId }] });
    value.articles.push({ ...article, id: articleId, slug: `fixture-${index}`, claim_ids: [claimId], related_source_ids: [sourceId], lens: index % 2 ? "historical" : "frontier" });
  }
  return normalizeAtlas(value);
}
test("keyword search scans each inventory once at the 10000-record bound and keeps article-local references", () => {
  const value = largeSearchFixture(10000); let claimIdsRead = 0, sourceIdsRead = 0, sourceTitlesRead = 0;
  for (const claim of value.claims) { const id = claim.id; Object.defineProperty(claim, "id", { get() { assert(++claimIdsRead <= 20000, "claim inventory was rebuilt per article"); return id; } }); }
  for (const source of value.sources) {
    const id = source.id, title = source.title;
    Object.defineProperty(source, "id", { get() { assert(++sourceIdsRead <= 20000, "source inventory was rescanned per article"); return id; } });
    Object.defineProperty(source, "title", { get() { sourceTitlesRead++; return title; } });
  }
  const page = searchAtlas(value, { query: "needle", limit: 50, offset: 9950 });
  assert.equal(page.total, 10000); assert.equal(page.articles.length, 50); assert.equal(page.articles[0].id, "article-fixture-9950"); assert.equal(page.next_offset, null);
  assert.equal(claimIdsRead, 20000); assert.equal(sourceIdsRead, 20000); assert.equal(sourceTitlesRead, 10000, "evidence/related duplicates are indexed once per article");
});
test("empty, whitespace and excluded-domain search avoid all claim/source inventory work", () => {
  const value = largeSearchFixture(101);
  Object.defineProperty(value, "claims", { get() { throw Error("unnecessary claim indexing"); } });
  Object.defineProperty(value, "sources", { get() { throw Error("unnecessary source indexing"); } });
  for (const query of ["", "   "]) { const page = searchAtlas(value, { query, lens: "historical", limit: 50, offset: 50 }); assert.equal(page.total, 50); assert.deepEqual(page.articles, []); assert.equal(page.next_offset, null); }
  assert.equal(searchAtlas(value, { query: "needle", domain: "domain-no-match" }).total, 0);
});
test("indexed search preserves claim, source, DOI, related-reference and filtered pagination semantics", () => {
  const value = largeSearchFixture(101);
  for (const query of ["claim-fixture-99", "source-fixture-99", "10.1234/fixture-99", "needle claim 99"]) { const page = searchAtlas(value, { query }); assert.deepEqual(page.articles.map(article => article.id), ["article-fixture-99"]); }
  const page = searchAtlas(value, { query: "needle", lens: "historical", offset: 49, limit: 1 });
  assert.equal(page.total, 50); assert.equal(page.articles[0].id, "article-fixture-99"); assert.equal(page.next_offset, null);
  value.articles[0].related_source_ids.push("source-fixture-99");
  assert.deepEqual(searchAtlas(value, { query: "source-fixture-99" }).articles.map(article => article.id), ["article-fixture-0", "article-fixture-99"]);
});
test("compile and reader reject completed historical events after the projection cutoff", () => {
  const future = "2026-10-14";
  const changes = [v => v.created_on = future, v => v.coverage.search_completed_on = future, v => v.articles[0].created_on = future,
    ...["issue_on", "event_on", "accessed_on"].map(field => v => v.sources[0][field] = future),
    ...["published_on", "updated_on", "update_checked_on", "first_preprint_on", "journal_published_on"].map(field => v => { v.sources[0].accessed_on = future; v.sources[0][field] = future; }),
    v => { v.claims[0].first_recorded_on = future; v.claims[0].last_source_checked_on = future; }, v => v.claims[0].last_source_checked_on = future, v => v.claims[0].review.reviewed_on = future];
  for (const change of changes) {
    const value = seed(); change(value); assert.throws(() => compileAtlas(value, projection), /after projection.compiled_on/);
    const injected = normalizeAtlas(value); injected.projection = { ...projection, content_sha256: hashAtlasContent(injected) };
    assert.throws(() => validateAtlas(injected), /after projection.compiled_on/);
  }
  const value = seed(); value.claims[0].next_review_on = "2027-01-01"; assert.doesNotThrow(() => validateAtlas(compileAtlas(value, projection)));
});
test("Markdown numbers unique source footnotes in claim first-mention order, regardless of corpus order", () => {
  const value = seed(); value.sources.reverse(); const article = value.articles.find(article => article.slug === "roman-concrete-hot-mixing");
  const claim = value.claims.find(claim => claim.id === article.claim_ids[0]);
  claim.evidence.push({ ...claim.evidence[0], locator: "Another inspected locator." });
  const ids = [...new Set(article.claim_ids.flatMap(id => value.claims.find(claim => claim.id === id).evidence.map(edge => edge.source_id)))];
  const markdown = articleMarkdown(value, article); const definitions = [...markdown.matchAll(/^\[\^(\d+)\]:.*Source record: ([a-z0-9-]+);/gm)];
  assert.deepEqual(definitions.map(match => match[2]), ids); assert.deepEqual(definitions.map(match => Number(match[1])), ids.map((_, index) => index + 1));
  assert.equal(markdown.match(/^\[\^1\]:/gm).length, 1); assert(markdown.includes("Another inspected locator"));
});
test("canonical public metadata cannot imply ratified content licensing or Registry admission", () => {
  assert.equal(original.license, "not_assigned_pending_owner_review"); assert(!Object.hasOwn(original, "admission_receipt"));
  assert.equal(createHash("sha256").update(stableJSON(original.claims)).digest("hex"), "fdb3e96ac62a9a19221d7facf54fce0937779613fe5a5e9e7a3be9d74ab2ce07");
  const retained = readFileSync(new URL("../../data/atlas/revisions/seed-review-2026-10-13.json", import.meta.url));
  assert.equal(createHash("sha256").update(retained).digest("hex"), "64311a5602177048dfbc7a158e96106433a1f639565bfb794a5c14d85c8a7396");
});
test("CSL preserves verified paper authors and report bylines as literal names", () => {
  const refs = new Map(citations(original).map(ref => [ref.id, ref]));
  for (const [id, count, first, last] of [["source-bennu-sugars", 14, "Yoshihiro Furukawa", "Dante S. Lauretta"], ["source-pompeii-paper", 11, "Ellie Vaserman", "Admir Masic"], ["source-lrd-paper", 26, "Pierluigi Rinaldi", "Yongda Zhu"]]) {
    const ref = refs.get(id); assert.equal(ref.author.length, count); assert.equal(ref.author[0].literal, first); assert.equal(ref.author.at(-1).literal, last);
    assert(ref.author.every(author => Object.keys(author).join() === "literal"));
  }
  assert.deepEqual(refs.get("source-desi-analysis-paper").author, [{ literal: "DESI Collaboration" }]);
  assert.deepEqual(refs.get("source-pompeii-mit").author, [{ literal: "Zach Winn" }]);
  assert.deepEqual(refs.get("source-lrd-nasa").author, [{ literal: "NASA Webb Mission Team" }]);
});
test("source workflow invokes both Atlas gates and triggers on validator, tests, npm command and workflow changes", () => {
  const workflow = readFileSync(new URL("../../.github/workflows/validate-graph.yml", import.meta.url), "utf8");
  const sections = workflow.split(/\n  (?:push|pull_request|workflow_dispatch):/);
  for (const section of [sections[1], sections[2]]) for (const path of ["scripts/validate-atlas.mjs", "scripts/tests/atlas-contract.test.mjs", "package.json", ".github/workflows/validate-graph.yml"]) assert(section.includes(`"${path}"`));
  assert(workflow.includes("run: npm run validate:atlas")); assert(workflow.includes("run: npm run test:atlas"));
});
