# Open Inventor Path — evidence before kit claims

Status: proposal for review · 2026-09-26 · public, location-free

## Promise and first user

A curious maker can turn one local problem into a sourced mechanism, an affordable prototype, a controlled experiment, and a reproducible kit. AI assists with the research and paperwork; the builder retains authorship and the right to stop. The first design partner is a maker or educator with access to a bench and basic hand tools. The first domain is urban water and living systems. Other domains can reuse the method after it works here.

This is a proposed **path** in the [Knowledge Tree ontology](../../ONTOLOGY.md), not a new agent substrate or an assertion of validated water treatment. Existing [Starlight Foundry](https://github.com/frankxai/Starlight-Intelligence-System/blob/main/docs/architecture/STARLIGHT-INTELLIGENCE-FOUNDRY.md) supplies capability governance; the [Blue Life Commons kit proposal](https://github.com/frankxai/blue-life-commons/pull/36) is the first domain pack and its review gates remain in force. Private site plans and raw field telemetry belong in the owner-controlled Ocean Intelligence system, never this public graph.

## The invention record

Every invention has a stable `invention_id` and revision. Keep eight linked records in Git, with raw data retained separately and immutable by convention. A future typed schema may map records to the existing graph's concept, skill, tool, paper, experiment, artifact, open_problem and contribution_task nodes; do not alter the graph schema for this proposal.

| Record | Minimum contents | Why it exists |
|---|---|---|
| Need | User, location class (never a home address), measurable outcome, constraints, baseline | Prevents inventing a solution in search of a problem |
| Claim ledger | Claim, primary source URL/DOI, date, applicable conditions, counterevidence, confidence, status | Separates a citation from proof for this design |
| Mechanism | Energy/mass/biological pathway, operating envelope, failure mode, predicted magnitude and uncertainty | Makes physical reasoning falsifiable |
| Variant | Native editable CAD, interchange export, dimensioned drawing, BOM with two possible suppliers or documented single-source risk, material-contact map | Makes design reproducible and substitutes explicit |
| Protocol | Preregistered question, control, replicate plan, calibration, sample schedule, acceptance threshold, stop rule, analysis | Prevents changing the success criterion after results |
| Observation | Raw values, units, timestamps and timezone, instrument/calibration, missing values, chain of custody, photos with consent | Keeps a result auditable |
| Release | Assembly, disassembly, maintenance, failure and disposal, age/skill supervision, license for hardware/software/docs, version and limitations | Lets a second person make it safely |
| Economics | Quoted parts, shipping/tax, labor, yield, repairs, fulfillment, price, margin, date and currency | Tests whether a kit or workshop can actually exist |

Each public claim resolves to a source or observation and has a state: `idea → sourced → bench-tested → independently replicated → field-reviewed`. A claim can regress if new evidence conflicts. A rendered image, simulation, generated design, passing JSON validation, and a functioning wet prototype each prove different things. No model can promote the latter from the former.

## Agent process and decision rights

One orchestrator owns the task envelope, budget, allowed tools, stop condition and release receipt. Use existing SIS agents/capabilities when available; spin up a temporary specialist for a bounded question rather than adding a permanent persona. Each handoff contains the source files, expected artifact, time/token budget, test and uncertainty. Work in short rounds:

1. **Scout** produces a two-sided evidence map from primary papers, official methods and manufacturer data. It must surface at least one plausible disconfirming result and verify links. Search results alone are discovery.
2. **Mechanism reviewer** writes mass/energy balance, hydraulic or ecological pathway, assumptions, dimensional checks and failure modes. An independent skeptic tries to falsify the predicted benefit.
3. **Builder** produces one simplest variant, native CAD, parts and substitutes, tolerances, assembly time, repair path and a photo plan. Avoid custom electronics when a manual measurement can answer the question.
4. **Experiment steward** freezes the comparison and stop criteria before observations; logs calibration and raw data. An independent reviewer can reproduce calculations from the raw values.
5. **Safety and ecology reviewer** controls any public-water, food, animal, electrical or structural escalation. Experts and local authorities determine field permission and appropriate test methods; an AI plan is never a permit.
6. **Kit editor** compiles a beginner-readable card and a technical appendix from reviewed evidence. Product steward checks quoted economics and independent builds before sales claims.

The orchestrator can ask for dissent and choose a cheaper experiment, but cannot rewrite raw observations or bypass a human gate. Log model, prompt version, source URLs, tool calls, decision, cost and correction as an evidence receipt. Redact private place, people and protected species before public contribution. Inference may be used for exploration; deterministic validation owns identifiers, file references, units, BOM arithmetic, licenses and claim maturity. SIS memory stores ratified lessons with time and provenance; a mutable chat summary is not the scientific record.

## First three learning experiences

| Stage | Builder action | Instrument and test | Gate |
|---|---|---|---|
| K0 — observe | Assemble a dry-side carry tray and repeatable water observation workflow; collect no public claims of safety | Temperature, pH/conductivity when calibrated, clarity/turbidity proxy with stated method, weather, repeated time and sample position; log blanks/duplicates where applicable | Ten complete, timestamped records, calibration evidence, units and an independent review of two entries. A handheld reading is not a bathing-water assessment |
| K1 — grow | Build a beautiful contained planter/greenhouse module with clean supplied water and removable trays | Compare two growing media or light treatments with equal water/input, growth and water-use log | Healthy plants and maintenance record; edible herbs only from a clean, known source and with appropriate food hygiene |
| K2 — test a mechanism | Build two contained vessels: reference and treatment, same inflow, geometry and light; choose one variable such as root-media contact or aeration | Record inflow/outflow volume, residence time, temperature and selected analytes with calibrated or laboratory methods; repeat and quantify uncertainty | Publish raw null results as readily as positive ones; no claim of canal cleaning or ecological benefit from a small bench test |

The current [Blue Life K0 manifest and validator](https://github.com/frankxai/blue-life-commons/pull/36) already specify the first machine-checkable kit candidate. It needs expert source/ethics review and physical checks before a public release. Existing Knowledge Tree graph entries remain unchanged until a single coherent path can pass its validator and editorial review.

### Modular physical grammar, by interface

Use a small number of reversible interfaces, then adapt skins and materials to site and budget. This is a design target, not a certified bill of materials.

| Interface | Candidate construction | Engineering reason and test |
|---|---|---|
| Dry rail and enclosure | Anodized aluminum extrusion or sealed birch for furniture; printed PETG/ASA only for dry brackets; stainless fasteners with isolation where corrosion matters | Standard dimensions make a tray or sensor pod replaceable; measure sag, sharp edges and water ingress |
| Wet cassette | Off-the-shelf glass/PP/HDPE vessel; removable inert media basket; avoid unidentified recycled plastic in food/water contact | Containment lets us measure inputs/outputs and replace a fouled medium; document actual material certificates and cleaning |
| Living insert | Locally appropriate, non-invasive plants in a removable nursery pot; clean-water culinary herbs in their own circuit | Plant roots need contact and maintenance; species choice depends on local expert review, shade, salinity and season |
| Measurement port | Labeled sample tap and accessible probe sleeve, with manual calibration and a removable electronics module | Repeat sampling position reduces variance; dry electronics are serviceable and never submerged by assumption |
| Power/data | USB-C power bank indoors for early trials; only later a fused solar/low-voltage, weather-rated module sized from measured duty cycle | Still water offers no dependable turbine power without measured flow/head; log Wh/day first |
| Outer shell | Folded powder-coated aluminum, timber or repairable composite around a common chassis; drainage and visible service seams | Premium appearance comes from proportions and serviceability; prototype a full-scale cardboard mockup before CNC/print |

Float, mooring, public water deployment, human-supporting deck, boat and water-cooled compute are separate engineering classes. Keep them concept-only until structural, fire/electrical, ecology, navigation and local permission review. Do not infer safe swimming from K0 readings. Native CAD, neutral exchange files, BOM mapping and distinct licenses follow [OSHWA sharing guidance](https://oshwa.org/resources/sharing-best-practices/). USGS field methods and EPA's sensor toolbox inform measurement selection, calibration and limitations: [USGS manual](https://www.usgs.gov/mission-areas/water-resources/science/national-field-manual-collection-water-quality-data-nfm), [EPA toolbox](https://www.epa.gov/water-research/water-sensors-toolbox).

## Build, cost and distribution gates

Planning allowances are deliberately provisional EUR envelopes, not vendor quotes. Before a purchase, obtain current local prices, shipping, VAT and replacement part availability.

| Slice | Prototype spend ceiling | Release evidence |
|---|---:|---|
| K0 printed/dry-side fixtures + manual logging | €80–250 | Repeat logs, fit and user instructions |
| K1 contained planter/greenhouse mockup | €120–400 | 4-week growth and maintenance comparison |
| K2 controlled twin-vessel experiment | €250–900, plus any external lab assay | Pre-registered controls, replicate/data review, disposal plan |
| Shared visual system and web path | €0–300 software/hosting allowance before custom build | Five observed users complete the flow |
| K3+ float/solar/compute | No purchase envelope yet | First obtain site constraints, measured loads, physical design review and permission path |

The public learning path and editable design files should remain free. A possible paid offer is a quality-controlled parts bundle, a hosted educator workshop or institutional support. Test with one maker educator and five independent makers before a storefront. Count fully loaded contribution margin after replacements and labor; do not equate social reach with cash flow. Defer inventory until at least two independent builders finish K0 with documented substitutions.

## Sequence and measurable expectations

| Window | Deliverable | Exit criterion |
|---|---|---|
| 72 hours | One public path spec, reviewed K0 evidence/claims inventory, accessible one-page kit card mockup | A newcomer can state the question, cost, required tools, risk and what remains unproved in 3 minutes |
| 14 days | One physically printed dry part and an observed K0 bench use, if owner obtains parts; 5 user walkthroughs of card | 2 independent readers correctly repeat the logging protocol; every claim links to evidence |
| 30 days | K1 contained grow module, K2 controlled protocol and first raw dataset if resources permit | No missing units or calibration fields; a skeptical reviewer reproduces analysis; negative result remains publishable |
| 90 days | Two independently replicated kits, first workshop with educator, costed fulfillment pilot | ≥80% assembly success without live agent rescue, ≤2 hours for entry kit, no unresolved critical safety issue, parts from ≥2 sources where feasible; recorded labor and actual margin |

Targets are gates, not outcomes already achieved. If K0 cannot be repeated, improve instructions and instruments before adding sensors, float hardware or a website. Success is a second person building and explaining a bounded result.

## Public experience and technology

The first interface is a responsive **Invention Card** with four views: *Understand* (mechanism and uncertainty), *Build* (steps, parts, substitutions, CAD), *Test* (precommitted protocol and offline-capable field log), *Share* (raw data, limitations, issue/PR). Show maturity and cost adjacent to the hero image. Editorial visuals can depict future concepts if labeled as concepts; photographs and measured charts must stay factual. Design with restrained typography, durable neutral materials, accent color keyed to water/plant/data, excellent contrast and keyboard/mobile operation. A printable card and CSV template can precede any account system.

Use the existing Next.js Knowledge Tree scaffold for the reading path; GitHub issues/PRs for contribution; Blue Life Commons for domain kit manifests/CAD; private Ocean Intelligence for consented field records; SIS Foundry and memory for agent routing/attested decisions. For an eventual sensor, choose a simple ESP32-class controller only after duty-cycle measurement, with local CSV export and optional network sync; compile firmware in CI using pinned board/core/tool versions. Do not require cloud services to collect a measurement. Research discovery can use official scholarly metadata APIs, but verify methods and claims against the actual paper. Reuse Fab Academy's documented practice of learning through fabrication and publishing the process rather than presenting a speculative invention as a finished product: [Fab Academy](https://fabacademy.org/about/course.html/).

## Questions for the owner and reviewers

Which makerspace or educator can observe the first build? What dry work area, tools and approved budget are available? Which measurements have an actual calibrated instrument and which need a lab? Who can review local ecology and material/water contact? What exact public claim would a skeptical reviewer reject? These answers determine K0 purchases and the later graph path. No exact household address or location should be entered in this public repository.

## Release boundary

This document is a proposed operational learning path. It changes no SIP protocol, credential or scientific maturity claim. Review the [handover](HANDOVER.md) for the next chat and inspect repo rules before edits. Any graph node contribution follows one coherent path per PR and `npm run validate`; public hardware release follows Blue Life ethics and independent review.

Built on SIP: proposed operational composition; no attestation or certification claimed.
