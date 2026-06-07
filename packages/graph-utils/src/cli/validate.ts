#!/usr/bin/env node
/**
 * Graph validation CLI
 * Usage: node dist/cli/validate.js [data-dir]
 */

import * as path from "path";
import { validateGraph } from "../index";

const dataDir = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "../../../../data");

console.log(`\n🌟 Starlight Knowledge Tree — Graph Validator`);
console.log(`   Data directory: ${dataDir}\n`);

const result = validateGraph(dataDir);

console.log(`   Nodes loaded:  ${result.nodeCount}`);
console.log(`   Edges counted: ${result.edgeCount}`);

if (result.warnings.length > 0) {
  console.log(`\n⚠️  Warnings (${result.warnings.length}):`);
  for (const w of result.warnings) {
    console.log(`   [${w.nodeId}] ${w.field}: ${w.message}`);
  }
}

if (result.errors.length > 0) {
  console.log(`\n❌ Errors (${result.errors.length}):`);
  for (const e of result.errors) {
    console.log(`   [${e.nodeId}] ${e.field}: ${e.message}`);
  }
  console.log(`\n   Validation FAILED. Fix errors before committing.\n`);
  process.exit(1);
} else {
  console.log(`\n✅ Validation PASSED. Graph is structurally sound.\n`);
  process.exit(0);
}
