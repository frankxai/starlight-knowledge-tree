#!/usr/bin/env node
/**
 * Graph validation CLI
 * Usage: node dist/cli/validate.js [data-dir]
 */

import * as path from "path";
import { validateGraph } from "../index";
import { validateFictionAtlas } from "../fiction-world";

const dataDir = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "../../../../data");

console.log(`\nStarlight Knowledge Tree — Graph Validator`);
console.log(`   Data directory: ${dataDir}\n`);

const result = validateGraph(dataDir);
const fictionAtlasPath = path.join(dataDir, "fiction-worlds", "atlas.seed.json");
const fictionResult = validateFictionAtlas(fictionAtlasPath);

console.log(`   Nodes loaded:   ${result.nodeCount}`);
console.log(`   Edges counted:  ${result.edgeCount}`);
console.log(`   Fiction worlds: ${fictionResult.atlas?.worlds.length ?? 0}`);
console.log(`   Story patterns: ${fictionResult.atlas?.patterns.length ?? 0}`);
console.log(`   Benchmarks:     ${fictionResult.atlas?.benchmark_dimensions.length ?? 0}`);
console.log(`   Translations:   ${fictionResult.atlas?.translations.length ?? 0}`);
console.log(`   Name candidates: ${fictionResult.atlas?.naming_candidates.length ?? 0}`);

if (result.warnings.length > 0) {
  console.log(`\nWarnings (${result.warnings.length}):`);
  for (const warning of result.warnings) {
    console.log(`   [${warning.nodeId}] ${warning.field}: ${warning.message}`);
  }
}

if (fictionResult.errors.length > 0) {
  console.log(`\nFiction Atlas Errors (${fictionResult.errors.length}):`);
  for (const error of fictionResult.errors) {
    console.log(`   [fiction-atlas] ${error.field}: ${error.message}`);
  }
}

if (result.errors.length > 0 || !fictionResult.valid) {
  if (result.errors.length > 0) {
    console.log(`\nGraph Errors (${result.errors.length}):`);
    for (const error of result.errors) {
      console.log(`   [${error.nodeId}] ${error.field}: ${error.message}`);
    }
  }
  console.log(`\n   Validation FAILED. Fix errors before committing.\n`);
  process.exit(1);
}

console.log(`\nValidation PASSED. Graph and Fiction Atlas are structurally sound.\n`);
process.exit(0);
