import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  buildNodeIndex,
  getPrerequisites,
  getUnlocks,
  getNodesByDomain,
  getNodesByType,
} = require("../../packages/graph-utils/dist/index.js");

const mockNodes = [
  {
    id: "concept-a",
    type: "concept",
    domain: "domain-test",
    edges: [{ type: "unlocks", target: "concept-b" }],
  },
  {
    id: "concept-b",
    type: "concept",
    domain: "domain-test",
    edges: [{ type: "requires", target: "concept-a" }, { type: "unlocks", target: "skill-1" }],
  },
  {
    id: "skill-1",
    type: "skill",
    domain: "domain-test",
    edges: [{ type: "requires", target: "concept-b" }],
  },
  {
    id: "concept-c",
    type: "concept",
    domain: "domain-other",
    edges: [],
  },
];

test("buildNodeIndex creates a map of nodes keyed by id", () => {
  const index = buildNodeIndex(mockNodes);
  assert.equal(index.size, 4);
  assert.equal(index.get("concept-a").id, "concept-a");
  assert.equal(index.get("skill-1").type, "skill");
});

test("getPrerequisites returns targets of 'requires' edges", () => {
  const index = buildNodeIndex(mockNodes);
  const prereqsB = getPrerequisites("concept-b", index);
  assert.deepEqual(prereqsB, ["concept-a"]);

  const prereqsSkill = getPrerequisites("skill-1", index);
  assert.deepEqual(prereqsSkill, ["concept-b"]);

  const prereqsA = getPrerequisites("concept-a", index);
  assert.deepEqual(prereqsA, []);

  const prereqsUnknown = getPrerequisites("unknown-node", index);
  assert.deepEqual(prereqsUnknown, []);
});

test("getUnlocks returns targets of 'unlocks' edges", () => {
  const index = buildNodeIndex(mockNodes);
  const unlocksA = getUnlocks("concept-a", index);
  assert.deepEqual(unlocksA, ["concept-b"]);

  const unlocksB = getUnlocks("concept-b", index);
  assert.deepEqual(unlocksB, ["skill-1"]);

  const unlocksC = getUnlocks("concept-c", index);
  assert.deepEqual(unlocksC, []);

  const unlocksUnknown = getUnlocks("unknown-node", index);
  assert.deepEqual(unlocksUnknown, []);
});

test("getNodesByDomain filters nodes by domain", () => {
  const testDomainNodes = getNodesByDomain("domain-test", mockNodes);
  assert.equal(testDomainNodes.length, 3);
  assert.ok(testDomainNodes.every((n) => n.domain === "domain-test"));

  const otherDomainNodes = getNodesByDomain("domain-other", mockNodes);
  assert.equal(otherDomainNodes.length, 1);
  assert.equal(otherDomainNodes[0].id, "concept-c");

  const unknownDomainNodes = getNodesByDomain("domain-unknown", mockNodes);
  assert.equal(unknownDomainNodes.length, 0);
});

test("getNodesByType filters nodes by type", () => {
  const concepts = getNodesByType("concept", mockNodes);
  assert.equal(concepts.length, 3);
  assert.ok(concepts.every((n) => n.type === "concept"));

  const skills = getNodesByType("skill", mockNodes);
  assert.equal(skills.length, 1);
  assert.equal(skills[0].id, "skill-1");

  const papers = getNodesByType("paper", mockNodes);
  assert.equal(papers.length, 0);
});
