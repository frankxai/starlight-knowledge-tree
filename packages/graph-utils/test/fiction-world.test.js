const assert = require("node:assert/strict");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { FictionAtlasSchema, NodeSchema } = require("@starlight/graph-schema");
const { getNodesByDomain } = require("../dist/index.js");
const { validateFictionAtlas } = require("../dist/fiction-world.js");

function makeAtlas() {
  return {
    schema_version: "0.1.0",
    generated_at: "2026-07-18T21:18:03Z",
    worlds: [
      {
        id: "world-example",
        label: "Example World",
        work_title: "Example Work",
        creator: "Example Creator",
        medium: "novel",
        original_summary: "An original summary long enough for the schema contract.",
        sources: [
          {
            url: "https://example.com/source",
            source_title: "Example official source",
            publisher: "Example Publisher",
            evidence_type: "official_publisher",
            accessed_at: "2026-07-18T21:18:03Z",
            verification_status: "metadata_only",
            license_scope: "Editorial reference metadata only.",
            rights_reviewed_at: "2026-07-18",
            review_reference: "docs/fiction-world-intelligence-architecture.md#rights-and-provenance",
          },
        ],
        rights: {
          tier: "editorial_reference",
          allowed_uses: ["Original internal analysis"],
          blocked_uses: ["Copied protected expression"],
          notes: "No expressive source content is stored in this fixture.",
        },
      },
    ],
    patterns: [
      {
        id: "pattern-example",
        label: "Example Pattern",
        kind: "institution",
        definition: "An abstract narrative pattern with enough detail for validation.",
        human_appeal: "It makes belonging and pressure visible.",
        mechanics: ["cohort identity"],
        example_worlds: ["world-example"],
        expression_exclusions: ["Do not copy source-specific expression."],
      },
    ],
    benchmark_dimensions: [],
    translations: [
      {
        id: "translation-example",
        source_worlds: ["world-example"],
        source_patterns: ["pattern-example"],
        arcanea_anchors: ["Ten Gates", "Five Elements", "Seven Houses"],
        retained_intents: ["belonging under pressure"],
        rejected_expression: ["source-specific names and mechanics"],
        original_inversion: "Arcanea rebuilds the function through its own locked cosmology and social logic.",
        canon_status: "research_only",
      },
    ],
    naming_candidates: [],
  };
}

function validateWithJsonSchema(atlas) {
  const schemaPath = path.resolve(__dirname, "../../../data/schemas/fiction-world.schema.json");
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const AjvConstructor = Ajv.default ?? Ajv;
  const ajv = new AjvConstructor({ allErrors: true, strict: false });
  addFormats(ajv, { mode: "full" });
  return ajv.compile(schema)(atlas);
}

function validateFixture(atlas) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "fiction-atlas-test-"));
  const fixturePath = path.join(directory, "atlas.json");
  try {
    fs.writeFileSync(fixturePath, JSON.stringify(atlas), "utf8");
    return validateFictionAtlas(fixturePath);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test("domain nodes validate without a recursive domain property", () => {
  const domainNode = {
    id: "domain-example",
    type: "domain",
    label: "Example Domain",
    description: "An example domain fixture with valid paths and seed nodes.",
    tags: ["example"],
    status: "stable",
    edges: [],
    created_at: "2026-07-18T21:18:03Z",
    updated_at: "2026-07-18T21:18:03Z",
    root_problems: ["problem-example"],
    paths: [
      {
        id: "path-example-foundation",
        label: "Foundation",
        description: "A valid domain-local path.",
        nodes: ["concept-example"],
      },
    ],
    seed_nodes: ["concept-example"],
  };
  const parsed = NodeSchema.safeParse(domainNode);
  assert.equal(parsed.success, true);
  assert.deepEqual(
    getNodesByDomain("domain-example", parsed.success ? [parsed.data] : []).map((node) => node.id),
    ["domain-example"]
  );
});

test("Zod and JSON Schema agree on the timestamp corpus", () => {
  const cases = [
    ["2026-07-18T21:18:03Z", true],
    ["2026-07-18T21:18:03.123Z", true],
    ["2026-07-18T21:18:03+01:00", true],
    ["2026-07-18T21:18:03", false],
    ["2026-99-99T99:99:99Z", false],
    ["2026-02-30T12:00:00Z", false],
    ["2026-07-18T24:00:00Z", false],
    ["18 July sometime", false],
  ];

  for (const [timestamp, expected] of cases) {
    const atlas = makeAtlas();
    atlas.generated_at = timestamp;
    atlas.worlds[0].sources[0].accessed_at = timestamp;
    assert.equal(validateWithJsonSchema(atlas), expected, `JSON Schema: ${timestamp}`);
    assert.equal(FictionAtlasSchema.safeParse(atlas).success, expected, `Zod: ${timestamp}`);
  }
});

test("Zod and JSON Schema both reject unknown properties", () => {
  const atlas = { ...makeAtlas(), unexpected: true };
  assert.equal(validateWithJsonSchema(atlas), false);
  assert.equal(FictionAtlasSchema.safeParse(atlas).success, false);
});

test("root validation builds both TypeScript packages before execution", () => {
  const packagePath = path.resolve(__dirname, "../../../package.json");
  const rootPackage = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  assert.match(rootPackage.scripts.validate, /build --workspace @starlight\/graph-schema/);
  assert.match(rootPackage.scripts.validate, /validate --workspace @starlight\/graph-utils/);
});

test("source records require structured evidence metadata", () => {
  const atlas = makeAtlas();
  delete atlas.worlds[0].sources[0].review_reference;
  assert.equal(FictionAtlasSchema.safeParse(atlas).success, false);
});

test("runtime schema rejects unknown top-level properties", () => {
  const atlas = { ...makeAtlas(), unexpected: true };
  assert.equal(FictionAtlasSchema.safeParse(atlas).success, false);
});

test("runtime schema rejects unknown nested properties", () => {
  const atlas = makeAtlas();
  atlas.worlds[0].sources[0].unexpected = true;
  assert.equal(FictionAtlasSchema.safeParse(atlas).success, false);
});

test("runtime schema rejects bare kind prefixes", () => {
  const atlas = makeAtlas();
  atlas.worlds[0].id = "world-";
  assert.equal(FictionAtlasSchema.safeParse(atlas).success, false);
});

test("runtime schema rejects malformed timestamps", () => {
  const atlas = makeAtlas();
  atlas.generated_at = "18 July sometime";
  assert.equal(FictionAtlasSchema.safeParse(atlas).success, false);
});

test("pattern example_worlds must resolve to a world", () => {
  const atlas = makeAtlas();
  atlas.patterns[0].example_worlds = ["pattern-example"];
  const result = validateFixture(atlas);
  assert.equal(result.valid, false);
  assert.match(result.errors[0].message, /complete world-/);
});

test("translation source_worlds must resolve to worlds", () => {
  const atlas = makeAtlas();
  atlas.translations[0].source_worlds = ["pattern-example"];
  const result = validateFixture(atlas);
  assert.equal(result.valid, false);
  assert.match(result.errors[0].message, /complete world-/);
});

test("translation source_patterns must resolve to patterns", () => {
  const atlas = makeAtlas();
  atlas.translations[0].source_patterns = ["world-example"];
  const result = validateFixture(atlas);
  assert.equal(result.valid, false);
  assert.match(result.errors[0].message, /complete pattern-/);
});

test("typed references must still resolve to an existing record", () => {
  const atlas = makeAtlas();
  atlas.translations[0].source_worlds = ["world-missing"];
  const result = validateFixture(atlas);
  assert.equal(result.valid, false);
  assert.match(result.errors[0].message, /Unknown source world/);
});

function makeNamingCandidate(overrides = {}) {
  return {
    id: "name-example",
    label: "Example Arcan",
    kind: "person",
    register: "field",
    canon_status: "research_only",
    decision: "review",
    clearance: "unsearched",
    score: {
      mouthfeel: 4,
      semantic_charge: 4,
      role_clarity: 4,
      distinctiveness: 4,
      inflection_range: 4,
      derivative_distance: 4,
    },
    flags: [],
    notes: "A fixture candidate used only to exercise naming policy validation.",
    ...overrides,
  };
}

test("locked names require a kept and cleared decision", () => {
  const atlas = makeAtlas();
  atlas.naming_candidates = [makeNamingCandidate({ canon_status: "locked" })];
  const result = validateFixture(atlas);
  assert.equal(result.valid, false);
  assert.match(result.errors[0].message, /Locked names must be kept and cleared/);
});

test("kept names must pass the mechanical prestige audit", () => {
  const atlas = makeAtlas();
  atlas.naming_candidates = [makeNamingCandidate({
    label: "shadow-corrupted resonance",
    decision: "keep",
    clearance: "preliminary",
  })];
  const result = validateFixture(atlas);
  assert.equal(result.valid, false);
  assert.match(result.errors[0].message, /Kept names must pass/);
});

test("rejected clearance requires a rejected decision", () => {
  const atlas = makeAtlas();
  atlas.naming_candidates = [makeNamingCandidate({ clearance: "rejected" })];
  const result = validateFixture(atlas);
  assert.equal(result.valid, false);
  assert.match(result.errors[0].message, /Rejected clearance requires/);
});
