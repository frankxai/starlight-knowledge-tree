#!/usr/bin/env node

import * as path from "path";
import { auditPrestigeName, scoreNamingCandidate, validateFictionAtlas } from "../fiction-world";

const atlasPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "../../../../data/fiction-worlds/atlas.seed.json");

const result = validateFictionAtlas(atlasPath);
if (!result.valid || !result.atlas) {
  console.error(`Fiction Atlas validation failed: ${atlasPath}`);
  for (const error of result.errors) {
    console.error(`- ${error.field}: ${error.message}`);
  }
  process.exit(1);
}

console.log(`Fiction Atlas validation passed: ${atlasPath}`);
console.log(`- worlds: ${result.atlas.worlds.length}`);
console.log(`- patterns: ${result.atlas.patterns.length}`);
console.log(`- benchmarks: ${result.atlas.benchmark_dimensions.length}`);
console.log(`- translations: ${result.atlas.translations.length}`);
console.log(`- naming candidates: ${result.atlas.naming_candidates.length}`);

const rejectedPhraseAudit = auditPrestigeName("shadow-corrupted resonance");
console.log(`- prestige audit: ${rejectedPhraseAudit.label} = ${rejectedPhraseAudit.score}/100`);
for (const flag of rejectedPhraseAudit.flags) {
  console.log(`  - ${flag}`);
}

for (const candidate of result.atlas.naming_candidates) {
  const mechanicalAudit = auditPrestigeName(candidate.label);
  const declaredScore = scoreNamingCandidate(candidate);
  console.log(
    `- candidate audit: ${candidate.label} = mechanical ${mechanicalAudit.score}/100; declared ${declaredScore}/30; ${candidate.decision}/${candidate.clearance}/${candidate.canon_status}`
  );
  for (const flag of mechanicalAudit.flags) {
    console.log(`  - ${flag}`);
  }
}
