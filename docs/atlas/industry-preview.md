# Industry intelligence preview

This additive sidecar supplies the industry lens in the existing Starlight website. It does not replace the science corpus or create a second reader in this repository's scaffold.

Source: data/atlas/industry.preview.json. Contract: packages/atlas-contract/industry-preview.mjs. The sidecar remains an editorial preview pending schema integration and independent review; it is not accepted as a new canonical ontology.

Five original company paraphrases reference inspected primary sources, with access dates and specific locators. Vendor claims are not independent validation. One reported manufacturing relationship is supported by NVIDIA's description; no other supply/customer relationships are implied. Three impact scenarios are explicitly analytical hypotheses with assumptions, countercases and next decisions. No prices, performance benchmarks, funding, demand, supply bottlenecks or partnership claims are inferred.

The consuming website pins the exact source revision and content hashes. A future ingestion worker must propose records through the existing evidence/review pipeline; it cannot overwrite these drafts or publish automatically.

## Checks

- node --test scripts/tests/industry-preview.test.mjs
- npm run validate:atlas
- npm run build

Authored collection licensing remains pending owner review. Third-party full text and media are excluded. Exports preserve source references, review state, uncertainty and rights metadata.

## Naming

Recommendation: Starlight Industry Intelligence describes the capability; Industry map names the view. Existing Starlight Atlas remains the broader encyclopedia. No repository, route or Registry entity is renamed. Foresight would imply predictive scope this preview has not earned. A new standalone brand is unnecessary.
