import assert from "node:assert/strict";
import { NodeSchema } from "../packages/graph-schema/dist/index.js";

const base = {
  id: "paper-test",
  type: "paper",
  label: "Test paper",
  description: "A deliberately incomplete paper node.",
  domain: "domain-ai-architect",
  tags: ["test"],
  status: "draft",
  edges: [],
  created_at: "2026-09-04T00:00:00Z",
  updated_at: "2026-09-04T00:00:00Z",
};

assert.equal(NodeSchema.safeParse(base).success, false, "paper fields must not bypass the specialist schema");

const historical = {
  ...base,
  authors: ["A. Researcher"],
  year: 2026,
  url: "https://example.org/paper",
  claim_class: "historical-source-claim",
};
assert.equal(NodeSchema.safeParse(historical).success, false, "historical claims require sources");

const sourced = {
  ...historical,
  sources: [{ id: "source-1", url: "https://example.org/paper", title: "Test paper" }],
};
assert.equal(NodeSchema.safeParse(sourced).success, true, "sourced historical claim should pass");

const fiction = {
  ...base,
  id: "artifact-fiction",
  type: "artifact",
  claim_class: "arcanea-fiction",
};
assert.equal(NodeSchema.safeParse(fiction).success, false, "Arcanea fiction requires a fiction boundary");

console.log("provenance schema boundary: passed");
