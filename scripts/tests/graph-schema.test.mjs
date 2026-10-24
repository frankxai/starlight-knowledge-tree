import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  EdgeSchema,
  NodeSchema,
  SkillNodeSchema,
  PathSchema,
} = require("../../packages/graph-schema/dist/index.js");

test("EdgeSchema accepts valid edge and rejects invalid ones", () => {
  const validEdge = {
    type: "requires",
    target: "concept-a",
    weight: 0.5,
    note: "This is a note",
  };

  assert.doesNotThrow(() => {
    EdgeSchema.parse(validEdge);
  });

  const invalidTypeEdge = { ...validEdge, type: "unknown-type" };
  assert.throws(() => {
    EdgeSchema.parse(invalidTypeEdge);
  });

  const invalidTargetEdge = { ...validEdge, target: "Invalid-Target!" };
  assert.throws(() => {
    EdgeSchema.parse(invalidTargetEdge);
  });

  const invalidWeightEdge = { ...validEdge, weight: 1.5 };
  assert.throws(() => {
    EdgeSchema.parse(invalidWeightEdge);
  });
});

test("SkillNodeSchema validates specific fields", () => {
  const validSkill = {
    id: "skill-test",
    type: "skill",
    label: "Test Skill",
    description: "This is a valid test skill description",
    domain: "domain-test",
    tags: ["test"],
    status: "draft",
    edges: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    prerequisites: ["concept-test"],
    evidence_types: ["implementation"],
    unlock_criteria: "Complete the implementation test",
  };

  assert.doesNotThrow(() => {
    SkillNodeSchema.parse(validSkill);
  });

  // Test inheritance via BaseNodeSchema
  const invalidIdSkill = { ...validSkill, id: "Invalid ID!" };
  assert.throws(() => {
    SkillNodeSchema.parse(invalidIdSkill);
  });

  // Test Skill specific constraints
  const invalidEvidenceSkill = { ...validSkill, evidence_types: [] };
  assert.throws(() => {
    SkillNodeSchema.parse(invalidEvidenceSkill);
  });
});

test("PathSchema validates branches and general path structure", () => {
  const validPath = {
    id: "path-test",
    label: "Test Path",
    description: "A path for testing",
    domain: "domain-test",
    nodes: ["node-a", "node-b"],
    branches: [
      {
        condition: "pass-test",
        nodes: ["node-c"],
      }
    ],
    status: "draft",
  };

  assert.doesNotThrow(() => {
    PathSchema.parse(validPath);
  });

  const invalidNodesPath = { ...validPath, nodes: ["node-a"] }; // min 2
  assert.throws(() => {
    PathSchema.parse(invalidNodesPath);
  });
});
