# Starlight Learner–Teacher Capability Graph v0.1

> **Status:** Draft normative contract for the v0.1 operational slice and target normalized architecture. Sections marked **Experimental** are non-normative. In normative sections, **MUST**, **MUST NOT**, **SHOULD**, and **MAY** carry their RFC-style meanings.

## Contents

1. [Architectural decision](#architectural-decision)
2. [v0.1 operational slice](#v01-operational-slice)
3. [Core invariants](#core-invariants)
4. [Evidence-first progression](#1-evidence-first-progression)
5. [Contribution ledgers](#2-the-five-contribution-ledgers)
6. [Independent capability levels](#3-independent-capability-levels)
7. [Evidence, confidence, and readiness](#4-capability-state-evidence-quality-confidence-and-readiness)
8. [Progression decisions](#5-progression-decisions)
9. [Attribution](#6-human-agent-team-system-and-organization-attribution)
10. [Profile projections](#7-learner-and-teacher-projections)
11. [Privacy and consent](#8-privacy-consent-and-audience-projections)
12. [Normative record contracts](#9-normative-record-contracts)
13. [Write-plane contract](#10-github-notion-and-google-drive-write-plane-contract)
14. [Review and automation](#11-review-and-automation-cadence)
15. [Anti-gaming and governance](#12-anti-gaming-and-governance)
16. [Completion criteria](#completion-criteria)

## Architectural decision

Use one evidence graph with two derived projections:

- **Learner Profile:** what the subject understands, practices, can independently perform, has built, and should prove next.
- **Teacher Profile:** what the subject can reliably transfer, evaluate, refine, and steward through measurable outcomes in others.

They are not separate identities or databases. They are audience-specific views over the same contribution and evidence graph.

The model has six orthogonal axes:

| Axis | Question |
|---|---|
| Evidence stage | What kind of proof exists? |
| Capability level | How mature is performance within a defined scope? |
| Contribution mode | Was knowledge learned, built, taught, refined, or used to guide? |
| Subject type | Is this capability attributable to a human, agent, team, or system? |
| Temporal state | Is it current, due for review, stale, contested, or historical? |
| Projection policy | Who may see which claim, evidence, relationship, or outcome? |

No global XP score should collapse these axes.

## v0.1 operational slice

The normalized graph below is the target architecture. v0.1 MUST prove the operating contract without creating a giant application. Its write model is three private Notion ledgers:

1. **Capability Ledger** — scoped learner and teacher claims, attained levels, current readiness, and next proof.
2. **Evidence Ledger** — events, artifact references, evaluations, provenance, attribution, and reviews.
3. **Stewardship Ledger** — consent, guidance, explicit promises, privacy, and review obligations.

GitHub supplies schemas, rubrics, validators, scoring code, and synthetic examples. Drive supplies source files and signed records. The measurement workbook is a read-only derived projection. Later versions MAY normalize the three ledgers into the complete record graph once the manual workflow is demonstrably useful.

## Core invariants

1. A claim is not evidence.
2. Activity is not capability.
3. An artifact is not proof that every contributor understands how to reproduce it.
4. Teaching volume is not teaching effectiveness.
5. Agent production is not automatically human learning.
6. Human orchestration capability, agent execution capability, and team capability remain distinct.
7. Capability levels are scoped to a skill and context, never assigned globally.
8. Historical achievement remains recorded; current readiness may become stale.
9. Public identity is a derived, consented projection—not a self-declared permanent label.
10. Every rubric, score, assessment, projection, and automation is versioned.
11. Unknown is not zero.
12. Sensitive source evidence never needs to become public for a claim to be verified.

---

## 1. Evidence-first progression

The progression chain is:

**Concept → Skill → Practice → Artifact → Evidence → Contribution → Identity**

| Stage | Meaning | Minimum valid proof |
|---|---|---|
| Concept | A bounded mental model, distinction, vocabulary, or principle | Explanation, concept map, comparison, retrieval, or application question |
| Skill | An observable capability in a defined context | Capability statement plus rubric |
| Practice | An intentional attempt with feedback | Timestamped attempt, context, result, reflection, feedback |
| Artifact | A durable, inspectable product of performance | Code, design, decision, lesson, media, system, assessment, method, or documented outcome |
| Evidence | A claim-relevant observation about quality or capability | Assessment, inspected artifact, direct observation, external outcome, peer review, or adoption |
| Contribution | Verified value created beyond the subject | Something built, taught, refined, or used to guide another actor |
| Identity | A sustained, current pattern recognized under explicit criteria | Repeated evidence clusters, contribution, recency, confidence, and appropriate review |

The stages are not completion badges. They describe the strongest proof available for a claim.

An artifact may support several stages, but does not silently prove all of them. For example, an agent-assisted application can prove that a human directed and shipped a system, while separate defense or transfer evidence is required to prove that the human can independently explain its internals.

### Evidence strength classes

| Tier | Evidence | Allowed use |
|---|---|---|
| E0 | Self-report, reflection, declared confidence | Diagnosis and planning only |
| E1 | Completion trace, practice log, attendance, commit history | Explorer support |
| E2 | Inspected artifact, direct observation, structured assessment | Apprentice gate |
| E3 | Independent assessment, external outcome, successful novel transfer | Practitioner or Architect gate |
| E4 | Replicated outcome, external adoption, cross-context validation, peer panel | Guardian gate |

---

## 2. The five contribution ledgers

Every recordable occurrence has an `event_type`. An event MAY also carry one primary `contribution_dimension`: `learned`, `built`, `taught`, `refined`, or `guided`. Supporting events such as observation, practice, review, publication, retirement, or retraction leave `contribution_dimension` null. Secondary interpretations MAY be linked as claims, but correlated evidence MUST NOT be counted repeatedly.

| Dimension | Creditable event | Required evidence | Invalid proxy |
|---|---|---|---|
| Learned | A concept or capability was acquired, retained, or transferred | Assessment, explanation, novel application, or spaced confirmation | Course completion or time spent |
| Built | A durable artifact or operating system was produced | Inspected artifact, provenance, quality rubric, outcome | Commits, files, or output volume |
| Taught | Another actor gained retained, transferable capability | Baseline, intervention, delayed outcome | Views, lesson count, ratings alone |
| Refined | An existing artifact, method, rubric, or standard measurably improved | Before/after comparison, accepted change, quality or efficiency delta | Editing activity |
| Guided | A human or agent moved toward an agreed outcome with increased autonomy | Baseline, intervention record, outcome, attribution confidence, consent | Meetings or messages |

Each ledger exposes:

- verified event count;
- independent evidence-cluster count;
- contexts covered;
- median evidence quality;
- current versus historical contribution;
- impact and durability;
- confidence interval;
- unresolved contradictory evidence.

The five ledgers remain a vector. They are not summed into a universal “Starlight score.”

---

## 3. Independent capability levels

Levels apply separately to each `role × skill × context`. `Unrated` is represented as `null`; absence of evidence is not Explorer. Learner and Teacher progression are independent state machines.

### Learner capability

| Level | Observable state | Default gate |
|---|---|---|
| Explorer | Can orient, recognize boundaries, explain core distinctions, and attempt the capability | Concept proof and one E1 practice |
| Apprentice | Can perform a bounded task with references, supervision, or review and apply feedback | Multiple spaced practices, one E2 artifact, one feedback cycle |
| Practitioner | Produces repeatable independent results and transfers the skill to a novel context | Several artifacts across at least two contexts and E3 evidence |
| Architect | Integrates skills into coherent systems, explains trade-offs, handles edge cases, and can redesign under changing constraints | System-level artifact, decision record, adversarial evaluation, E3/E4 evidence |
| Guardian | Demonstrates sustained exceptional judgment across difficult contexts, advances the domain through original work, and protects quality under consequential conditions | Replicated cross-context E4 evidence, sustained independent performance, adversarial peer panel |

### Teacher capability

Teaching capability is assessed independently of subject mastery.

| Level | Observable state | Default gate |
|---|---|---|
| Explorer | Shares bounded learning notes with limitations made explicit | Reviewed explanatory artifact |
| Apprentice | Delivers a bounded lesson or guided exercise that produces an immediate comprehension signal | Reviewed material and at least one measured learner outcome |
| Practitioner | Repeatedly produces retained learning and independent transfer across learners or contexts | Delayed outcomes, multiple independent episodes, scoped instructional-accuracy review |
| Architect | Designs curricula, assessments, teacher agents, and feedback systems associated with predictable retained outcomes | Validated curriculum, calibrated assessments, repeated favorable delayed-outcome associations |
| Guardian | Stewards standards, trains teachers, audits quality, and evolves the canon | Cross-context teacher outcomes, successors, peer governance |

Rules:

- A teacher claim includes an `authorized_scope`; nobody is simply “a teacher” without domain and level boundaries.
- Subject-matter capability and teaching capability remain separately visible.
- Teaching a concept can provide limited secondary learner evidence, but cannot validate both profiles recursively.
- Learner gates MUST NOT require teaching, guidance, learner outcomes, or succession. Those requirements belong only to Teacher progression.
- Teacher Guardian requires stewardship and succession; Learner Guardian does not.
- Freshness changes only current readiness. It MUST NOT erase or lower a valid historical attainment.
- A historical attainment changes only when its source evidence or review is invalidated, retracted, or superseded under an explicit decision with appeal.
- Promotion and exit thresholds use hysteresis to prevent oscillation.

---

## 4. Capability state, evidence quality, confidence, and readiness

### Normative v0.1 authority

For v0.1, promotion authority is the versioned observable rubric plus explicit human review. The statistical layer below is **Experimental**: it MAY prioritize review and expose uncertainty, but MUST NOT independently award, promote, invalidate, or publish a capability or identity.

Every scoring run MUST name a versioned `scoring_policy_ref` containing its priors, thresholds, confidence bands, minimum effective samples, source-diversity requirements, cluster caps, and calibration method. A change to those values creates a new scoring-policy version.

### Historical attainment versus current readiness

- `attained_level` is the highest level formally awarded under a versioned role-specific rubric. It is `null` when no level has been awarded.
- Each award is preserved as an immutable `attainment` record. Invalidation creates a linked decision record; it does not rewrite or erase the original award.
- `current_readiness_level` is the highest attained level whose maintenance requirements are currently supported. It MAY be lower than `attained_level` or `null`.
- `current_readiness_state` is `unrated | fresh | review_due | stale | contested | invalidated`.
- No evidence means `attained_level: null`, `current_readiness_level: null`, and `current_readiness_state: unrated`; it never defaults to Explorer or numeric zero.
- Contradictory evidence can change current readiness or contest a claim. It does not alter historical attainment unless a separate evidence-invalidation review is approved.

### Evidence quality — Experimental

For evidence event \(e\):

\[
w_e =
q_{\text{assessment}}
q_{\text{source}}
q_{\text{novelty}}
q_{\text{completion}}
q_{\text{integrity}},
\qquad 0 \le w_e \le 1
\]

The multiplicative form prevents large quantities of weak evidence from compensating for missing integrity or provenance.

Correlated attempts share an `independence_cluster`. Their total influence is capped:

\[
W_c =
W_{\max}\left(
1-e^{-\sum_{e\in c}w_e/W_{\max}}
\right)
\]

A multi-skill artifact splits its available evidence weight across skills. It does not reproduce the full weight for each tag.

### Learner capability model — Experimental

Maintain a separate latent ability state for every `actor × skill × context`:

\[
\theta_s \sim N(\mu_s,\sigma_s^2)
\]

For an observation with difficulty \(b_e\), discrimination \(a_e\), and outcome \(y_e\):

\[
p_e=\operatorname{sigmoid}(a_e(\theta_s-b_e))
\]

\[
\log L_e=w_e
\left[
y_e\log p_e+(1-y_e)\log(1-p_e)
\right]
\]

Use a Bayesian update with hierarchical domain priors. Cold-start item difficulty and discrimination come from the rubric; calibrate them from observed data once volume is sufficient.

At the skill’s reference difficulty:

\[
S_L=100\,\operatorname{sigmoid}(\mu_s-b_s^\*)
\]

An experimental recommendation MAY use the conservative lower 90% bound. v0.1 credentials and progression still require the versioned rubric and human decision.

### Teacher outcome association — Experimental

Estimate delayed learner-outcome association adjusted for baseline ability, difficulty, expected unaided trajectory, and intervention dosage:

\[
g_j =
\text{observed delayed outcome}_j -
\widehat{\text{baseline outcome}}_j
\]

The profile reports adjusted percentage-point association in a fixed reference context, with uncertainty, retention, transfer, learner autonomy, outcome completion rate, and sample size. It MUST be called an association unless a pre-registered randomized or validated quasi-experimental design supports causal attribution and a qualified review explicitly permits causal language.

A causal claim additionally requires an approved `causal_design_ref` defining the estimand, assignment or identification strategy, comparison condition, pre-registered analysis, minimum-sample policy, balance/overlap and sensitivity diagnostics, and independent accountable review.

Immediate gain is diagnostic. Delayed retention and independent application are primary.

Ratings, engagement, audience size, and completion remain secondary signals.

### Confidence — Experimental

After cluster caps:

\[
n_{\text{eff}}=
\frac{(\sum_cW_c)^2}{\sum_cW_c^2}
\]

For evidence-source shares \(r_k\):

\[
N_{\text{src}}=\frac{1}{\sum_kr_k^2}
\]

A conservative confidence signal combines interval contraction, independent sample size, and source diversity:

\[
C=100\,\operatorname{clamp}_{[0,1]}\left(
\min\left(
1-\frac{W_{90}}{W_{90,\text{prior}}},
\frac{n_{\text{eff}}}{n_0},
\frac{N_{\text{src}}}{m_0}
\right)
\right)
\]

`n_0`, `m_0`, the prior interval, confidence thresholds, and minimum sample requirements MUST come from the versioned scoring policy; no unversioned default is normative.

If a denominator, prior interval, source-diversity measure, or minimum required input is unavailable, `confidence_score` MUST be `null` and `confidence_tier` MUST be `unrated`; unknown MUST NOT be encoded as zero.

Suggested tiers:

- `provisional`: below the versioned lower threshold or insufficient source diversity;
- `supported`: 40–69;
- `strong`: at or above the versioned upper threshold with adequate evidence diversity.

The numeric examples `40` and `70` are initial experimental policy values, not universal truths. Freshness MUST NOT alter `confidence_tier`; it is reported through `current_readiness_state`. Mastery, confidence, calibration, and readiness remain separate.

### Freshness and current readiness

Historical verified attainment never decays merely with time. Current readiness changes relative to the **last qualifying independent confirmation** for the same role, skill, context, and rubric—not from the most recent activity, edit, self-report, or correlated retry.

A qualifying confirmation MUST pass the role-specific maintenance rubric, belong to an independent evidence cluster, match the same role/skill/context, and satisfy the configured evidence-class and integrity gates. Evidence from the other role MUST NOT reset the clock. For Teacher readiness, the clock starts when the qualifying delayed outcome is observed, not when instruction is delivered.

For elapsed time \(\Delta t\) and skill half-life \(h_s\):

\[
f_s=2^{-\Delta t/h_s}
\]

\[
\mu_t=\mu_{\text{base}}+
f_s(\mu_{\text{last}}-\mu_{\text{base}})
\]

\[
\sigma_t^2=
f_s^2\sigma_{\text{last}}^2+
(1-f_s^2)\sigma_{\text{prior}}^2
\]

The equations are an experimental method for estimating current readiness only. They MUST NOT mutate `attained_level` or historical attainment records. Do not also age-weight historical evidence; readiness decay is applied once through state propagation.

Default states:

- `fresh`: age \(\le 0.5h_s\);
- `review_due`: \(0.5h_s <\) age \(\le h_s\);
- `stale`: age \(>h_s\).

Half-lives belong to skill definitions:

- volatile tools or models: 30–90 days;
- operational methods: approximately 180 days;
- stable professional skills: approximately 365 days;
- enduring principles: 1,095 days or no decay.

Successful qualifying independent confirmations spaced over time may lengthen the half-life under the versioned scoring policy. A stale readiness state queues reverification; it does not “decay a claim.”

### Calibration

Predictions are locked before outcomes:

- learner predicts success or rubric score;
- teacher predicts learner outcome and retention;
- reviewer predicts later panel or real-world outcome;
- agent emits a confidence estimate where supported.

Track:

- weighted Brier score for probability predictions;
- mean absolute rubric error;
- credible-interval coverage;
- overconfidence and underconfidence bands;
- 90-day and lifetime calibration;
- model, rubric, and calibration version.

Calibration affects confidence, not the underlying evidence record.

---

## 5. Progression decisions

Promotion requires all of the following:

1. the role-specific observable rubric passes; an experimental conservative lower bound MAY support but never replace that judgment;
2. required skill coverage passes;
3. all critical prerequisites pass;
4. evidence-type and source-diversity gates pass;
5. required contexts are covered;
6. at least two confirmations are separated in time;
7. no unresolved contradiction, integrity flag, or consent block exists;
8. an authorized human reviewer explicitly approves the role-specific promotion.

Learner and Teacher gates MUST be evaluated separately. Evidence may be reused only for the distinct claim it genuinely supports; a Teacher outcome does not manufacture a Learner promotion, and a Learner artifact does not establish teaching effectiveness.

Domain-level rollups are allowed only when the domain definition explicitly declares skill weights, critical prerequisites, coverage requirements, and thresholds. There is no global averaged rank.

Identity becomes `active` only when:

- core skills are at least Practitioner or the identity-specific threshold;
- evidence remains fresh;
- the pattern spans multiple independent evidence clusters;
- required contribution modes are present;
- the identity criteria version is recorded;
- internal processing consent exists and an authorized human activates it.

Private identity activation does not require publication consent. `identity_claim.lifecycle_state` and `profile_release.release_status` are separate. Publication consent and a separate release approval are required only when an identity is included in a community or public projection.

Identity states are:

`emerging | active | review_due | dormant | contested | historical | withdrawn`

---

## 6. Human, agent, team, system, and organization attribution

Every artifact and outcome distinguishes:

1. **authorship or execution;**
2. **capability demonstrated;**
3. **accountability;**
4. **credit;**
5. **review authority.**

Contribution roles include:

`originator | director | author | coauthor | executor | operator | editor | reviewer | approver | teacher | learner | guide | curator | maintainer`

Execution modes:

`human_direct | human_agent_assisted | agent_generated_human_reviewed | agent_generated_unreviewed`

Rules:

- A human does not receive learning credit merely because an agent produced a successful artifact.
- Human mastery requires explanation, defense, novel application, troubleshooting, or independent execution evidence.
- Human orchestration can be credited as its own skill.
- Agent capability is evaluated through versioned, held-out tasks and traceable runs.
- An agent has “learned” only when a persistent configuration, memory, policy, toolchain, or model change produces repeatable improvement on held-out evaluations. Context-window adaptation alone is not durable learning.
- Team capability is a separate state; it is not distributed automatically to members.
- `contribution_attributions[]` is the only contribution-credit structure. It accepts `human`, `agent`, `team`, `system`, and `organization` actors under the same contract; legacy `human_contribution`, `agent_contribution`, and top-level `agent_attribution` fields are non-conforming.
- Actor percentage shares are optional and allowed only when supported by a documented allocation method. Otherwise use categorical roles and a bounded credit statement.
- Agent review may be decisive for internal automated gates only under a pre-registered policy. A public human credential, Guardian promotion, or public identity release requires accountable human approval.
- Humans and agents must not be ranked together unless the evaluation protocol establishes valid equivalence.

---

## 7. Learner and Teacher projections

### Learner Profile

The learner view contains:

- current domains and active learning contracts;
- skill map with historical attainment, current readiness, confidence, calibration, and evidence stage;
- concepts being integrated;
- active practices;
- portfolio artifacts;
- calibration trajectory;
- current blockers and prerequisite gaps;
- next-best evidence to produce;
- historical progression;
- learned and built contribution ledgers.

### Teacher Profile

The teacher view contains:

- authorized teaching scope by skill and level;
- teaching methods and curricula;
- assessed learner or agent outcomes;
- delayed retention and transfer;
- teaching confidence and calibration;
- methods and rubrics refined;
- guidance capacity and active commitments;
- teacher artifacts;
- stewardship and succession evidence;
- taught, refined, and guided contribution ledgers.

Public projections should expose proof capsules rather than private source material:

```jsonc
{
  "attestation_ref": "att_<uuid>",
  "role": "learner",
  "scope": {
    "scope_id": "sco_<uuid>",
    "skill_id": "skl_<uuid>",
    "context": {
      "domain_id": "dom_<uuid>",
      "context_code": "bounded-context"
    }
  },
  "attained": {
    "level": "practitioner | null",
    "as_of": "RFC3339 | null",
    "rubric_version": "1.2.0"
  },
  "readiness": {
    "level": "practitioner | null",
    "state": "unrated | fresh | review_due | stale | contested | invalidated",
    "as_of": "RFC3339",
    "last_qualifying_independent_confirmation_at": "RFC3339 | null",
    "review_due_at": "RFC3339 | null",
    "confidence_score": "0..100 | null",
    "confidence_tier": "unrated | provisional | supported | strong",
    "calibration_state": "unrated | insufficient_data | overconfident | calibrated | underconfident"
  },
  "evidence_classes": ["artifact", "independent_assessment"],
  "provenance": {
    "resolver_refs": ["rsr_<uuid>"]
  },
  "consent": {
    "consent_grant_refs": ["cns_<uuid>"],
    "effective_audiences": ["public"],
    "identifiability": "pseudonymous"
  },
  "review": {
    "review_id": "rev_<uuid>",
    "decision": "approved",
    "reviewed_at": "RFC3339",
    "reviewer_kind": "human"
  },
  "contribution_attributions": [
    {
      "contribution_id": "ctr_<uuid>",
      "actor_ref": "act_<uuid>",
      "actor_kind": "human",
      "roles": ["learner"],
      "execution_mode": "human_agent_assisted",
      "accountable": true,
      "disclosure": "agent_assisted"
    }
  ]
}
```

Learner and Teacher capsules MUST be emitted into separate arrays and MUST use their corresponding `role`. A Teacher capsule additionally carries `authorized_scope_ref`. Public teaching evidence MUST contain aggregate outcome records only; it MUST NOT contain learner identifiers, episode-level rows, or re-identifiable small groups. The executable release schema is authoritative over this illustrative shape.

---

## 8. Privacy, consent, and audience projections

### Classifications

`public | community | collaborators | private | restricted`

Classification labels are routing defaults, not a total ordering: `community` and `collaborators` may describe different, non-overlapping groups. Every policy therefore carries an explicit `allowed_audiences` set. Effective visibility is the intersection of all linked audience sets, subject to compatible purpose and action grants. An empty intersection means no disclosure.

Identifiability is independent of audience:

`aggregate | pseudonymous | named`

A named record can still be private; an aggregate record can still be restricted. Guidance and teaching-outcome records MUST store `identifiability` and `allowed_audiences` separately.

### Consent purposes

Consent is granular across:

- collection;
- storage;
- internal processing;
- agent processing;
- aggregation;
- sharing;
- publication;
- testimonial use;
- research use;
- model training.

Agent processing and model training are separate permissions. Training defaults to `false`.

### Projection rules

1. Effective visibility is the intersection of allowed-audience sets across the subject, artifact, relationship, evidence, consent, license, and requested projection; classification labels do not resolve conflicts by themselves.
2. New downstream use requires compatible purpose consent.
3. Guidance relationships require bilateral consent before either party is named.
4. Public Teacher outcomes are aggregate only. Named learner or episode-level outcomes are prohibited in a public profile release regardless of testimonial consent; permissioned named records may exist only in an appropriate non-public projection.
5. Public profiles may publish an attestation while keeping evidence private.
6. Agents cannot expand visibility or purpose.
7. Revocation removes records from future processing and regenerates every affected projection.
8. Public aggregates MUST meet the versioned minimum group-size and disclosure-control policy; otherwise they remain private.
9. Native Notion IDs, Drive IDs, connector identities, private repository coordinates, and raw hashes never appear in public releases.
10. Public Git history is immutable in practice: clones, forks, caches, and third-party copies cannot be reliably revoked. Public Git MUST contain only schemas, synthetic examples, and deliberately irreversible public artifacts whose publisher has acknowledged that withdrawal affects future official projections, not prior third-party copies. Mutable personal public profiles MUST be served from a deletion-capable release channel outside public Git history.
11. Immutable logs contain only opaque, minimal audit tombstones; private source content remains deletable.
12. Corrections supersede records. They do not silently rewrite history.

---

## 9. Normative record contracts

The executable Draft 2020-12 schema for a release is [`PROFILE-RELEASE-SCHEMA.json`](./PROFILE-RELEASE-SCHEMA.json). [`PROFILE-TEMPLATE.json`](./PROFILE-TEMPLATE.json) is a conforming synthetic instance. Both files are normative for v0.1 public release interchange.

The normalized target records below are precise normative contracts. Each record MUST compose the complete common envelope with its type-specific payload. Except for the common-envelope block and executable release schema, the snippets show the type-specific payload and are not standalone instances. Implementations MAY add fields only after a schema-version change or within an explicitly declared extension object. References MUST resolve through typed opaque IDs.

### Common envelope

```jsonc
{
  "id": "<typed-opaque-uuid>",
  "record_type": "<type>",
  "schema_version": "1.0.0",
  "revision": 1,
  "record_status": "active | superseded | withdrawn | tombstoned",
  "created_at": "RFC3339",
  "updated_at": "RFC3339",
  "created_by_actor_id": "act_<uuid>",

  "provenance": {
    "canonical_authority": "github | notion | gdrive",
    "resolver_refs": ["rsr_<uuid>"],
    "source_revision": "<opaque-revision>",
    "content_sha256": "<private-or-null>",
    "derived_from_ids": [],
    "generator": {
      "name": "<required-for-derived-records>",
      "version": "<semver>",
      "code_revision": "<opaque-revision>"
    }
  },

  "privacy": {
    "classification": "private",
    "data_classes": [],
    "consent_grant_ids": [],
    "publishable": false
  }
}
```

### Actor

```jsonc
{
  "id": "act_<uuid>",
  "record_type": "actor",
  "kind": "human | agent | team | system | organization",
  "public_alias": "<optional>",
  "agent_spec": {
    "provider_code": "<optional>",
    "model_family": "<optional>",
    "model_version": "<optional>",
    "agent_config_sha256": "<optional>",
    "memory_version": "<optional>",
    "tool_policy_sha256": "<optional>"
  }
}
```

### Skill definition

```jsonc
{
  "id": "skl_<uuid>",
  "record_type": "skill_definition",
  "slug": "<stable-slug>",
  "domain_id": "dom_<uuid>",
  "capability_statement": "<observable-capability>",
  "prerequisite_concept_ids": [],
  "critical_prerequisite_skill_ids": [],
  "volatility_class": "volatile | operational | stable | enduring",
  "reference_difficulty": 0.0,

  "learner_rubric": {
    "version": "1.0.0",
    "levels": {
      "explorer": {},
      "apprentice": {},
      "practitioner": {},
      "architect": {},
      "guardian": {}
    }
  },

  "teacher_rubric": {
    "version": "1.0.0",
    "levels": {
      "explorer": {},
      "apprentice": {},
      "practitioner": {},
      "architect": {},
      "guardian": {}
    }
  },

  "progression_policies": {
    "learner": {
      "rubric_version": "1.0.0",
      "gate_policy_version": "1.0.0"
    },
    "teacher": {
      "rubric_version": "1.0.0",
      "gate_policy_version": "1.0.0"
    }
  },
  "freshness_policies": {
    "learner": {
      "version": "1.0.0",
      "half_life_days": 180,
      "qualifying_confirmation_policy_version": "1.0.0"
    },
    "teacher": {
      "version": "1.0.0",
      "half_life_days": 180,
      "qualifying_confirmation_policy_version": "1.0.0"
    }
  },
  "experimental_scoring_policy": {
    "status": "experimental",
    "version": "0.1.0",
    "prior_version": "1.0.0",
    "threshold_version": "1.0.0",
    "minimum_sample_policy_version": "1.0.0"
  },
  "lifecycle_state": "draft | active | deprecated"
}
```

### Progress event

```jsonc
{
  "id": "evt_<uuid>",
  "record_type": "progress_event",
  "subject_actor_id": "act_<uuid>",
  "event_type": "observed | practiced | assessed | artifact_created | artifact_published | transferred | reviewed | contributed | retired | retracted",
  "contribution_dimension": "learned | built | taught | refined | guided | null",
  "evidence_stage": "concept | skill | practice | artifact | evidence | contribution | identity",
  "occurred_at": "RFC3339",

  "skill_allocations": [
    {"skill_id": "skl_<uuid>", "evidence_fraction": 0.6},
    {"skill_id": "skl_<uuid>", "evidence_fraction": 0.4}
  ],

  "context": {
    "project_id": "<optional-opaque-id>",
    "difficulty": 0.0,
    "independence": "guided | assisted | independent",
    "audience_class": "private | bounded | public"
  },

  "artifact_ids": [],
  "evidence_ids": [],
  "contribution_attributions": [
    {
      "actor_ref": "act_<uuid>",
      "actor_kind": "human | agent | team | system | organization",
      "role": "originator | director | author | coauthor | executor | operator | editor | reviewer | approver | teacher | learner | guide | curator | maintainer",
      "execution_mode": "human_direct | human_agent_assisted | agent_generated_human_reviewed | agent_generated_unreviewed"
    }
  ],

  "precommitted_prediction": {
    "probability_success": 0.75,
    "predicted_rubric_score": 0.7,
    "locked_at": "RFC3339"
  },

  "claim_state": "proposed | verified | rejected | contested | superseded"
}
```

### Artifact

```jsonc
{
  "id": "art_<uuid>",
  "record_type": "artifact",
  "kind": "code | note | guide | lesson | assessment | media | dataset | system | method | reflection | other",
  "title": "<redactable-title>",
  "content_resolver_ref": "rsr_<opaque-id>",
  "media_type": "<IANA-media-type>",
  "content_sha256": "<private-hash>",
  "rights_state": "owned | licensed | permission_required | restricted | unknown",
  "contribution_ids": [],
  "review_ids": [],
  "supersedes_artifact_id": null
}
```

### Evidence

```jsonc
{
  "id": "evd_<uuid>",
  "record_type": "evidence",
  "subject_ref": {
    "type": "capability_claim | capability_state | progress_event | artifact | guidance_episode | identity_claim",
    "id": "<opaque-id>"
  },

  "kind": "practice_trace | artifact | observation | assessment | peer_review | external_outcome | adoption | credential",
  "observed_at": "RFC3339",
  "outcome": {
    "value": 0.0,
    "outcome_scale_ref": "osc_<uuid>"
  },
  "item_calibration": {
    "difficulty": 0.0,
    "discrimination": 1.0,
    "assessment_model_ref": "asm_<uuid>",
    "calibration_version": "1.0.0"
  },
  "assessment_type": "<bounded-code>",
  "source_class": "<bounded-code>",
  "independence_cluster_id": "inc_<uuid>",

  "quality": {
    "assessment": 0.0,
    "source": 0.0,
    "novelty": 0.0,
    "completion": 0.0,
    "integrity": 0.0
  },

  "limitations": [],
  "supports_claim_ids": [],
  "review_ids": []
}
```

### Contribution attribution

```jsonc
{
  "id": "ctr_<uuid>",
  "record_type": "contribution",
  "target_ref": {
    "type": "artifact | evidence | capability_claim | rubric | method | standard | outcome | progress_event | guidance_episode | review",
    "id": "<typed-opaque-id>"
  },
  "actor_id": "act_<uuid>",
  "actor_kind_snapshot": "human | agent | team | system | organization",
  "role": "originator | director | author | coauthor | executor | operator | editor | reviewer | approver | teacher | learner | guide | curator | maintainer",
  "execution_mode": "human_direct | human_agent_assisted | agent_generated_human_reviewed | agent_generated_unreviewed",
  "occurred_at": "RFC3339",

  "attribution": {
    "fraction": null,
    "method": "role_only | declared | trace_derived | reviewed",
    "confidence": 0.0,
    "credit_statement": "<bounded-statement>"
  },

  "agent_trace": {
    "agent_actor_ids": [],
    "accountable_human_actor_id": null,
    "session_resolver_ref": null,
    "input_artifact_ids": [],
    "output_artifact_ids": [],
    "prompt_or_template_sha256": null
  }
}
```

### Guidance episode

```jsonc
{
  "id": "gde_<uuid>",
  "record_type": "guidance_episode",
  "guide_actor_id": "act_<uuid>",
  "recipient_actor_id": "act_<uuid>",
  "target_skill_ids": [],
  "started_at": "RFC3339",
  "ended_at": null,

  "baseline_evidence_ids": [],
  "intervention_artifact_ids": [],
  "immediate_outcome_evidence_ids": [],
  "delayed_outcome_evidence_ids": [],

  "attribution_confidence": 0.0,
  "recipient_autonomy_before": 0.0,
  "recipient_autonomy_after": 0.0,
  "bilateral_consent_grant_ids": [],
  "identifiability": "aggregate | pseudonymous | named",
  "allowed_audiences": ["subject", "named_collaborators"]
}
```

### Derived capability state

```jsonc
{
  "id": "cst_<uuid>",
  "record_type": "capability_state",
  "profile_id": "prf_<uuid>",
  "actor_id": "act_<uuid>",
  "skill_id": "skl_<uuid>",
  "role": "learner | teacher",
  "context_ref": "<opaque-context>",

  "attained_level": "explorer | apprentice | practitioner | architect | guardian | null",
  "attainment_history_ids": ["atn_<uuid>"],
  "current_readiness_level": "explorer | apprentice | practitioner | architect | guardian | null",
  "current_readiness_state": "unrated | fresh | review_due | stale | contested | invalidated",
  "last_qualifying_independent_confirmation_at": "RFC3339 | null",
  "freshness_policy_version": "1.0.0",

  "evidence_cluster_ids": [],
  "critical_gate_results": {},
  "next_required_evidence": [],
  "calculated_at": "RFC3339",

  "experimental_metrics": {
    "status": "experimental",
    "posterior_mean": null,
    "lower_90": null,
    "upper_90": null,
    "confidence_score": null,
    "confidence_tier": "unrated | provisional | supported | strong",
    "adjusted_delayed_outcome_association_pp": null,
    "causal_design_status": "none | proposed | approved",
    "causal_design_ref": null,
    "scoring_policy_ref": "spc_<uuid>"
  },

  "versions": {
    "skill": "1.0.0",
    "rubric": "1.0.0",
    "scoring_model": "1.0.0",
    "calibration_model": "1.0.0"
  }
}
```

### Identity claim

```jsonc
{
  "id": "idc_<uuid>",
  "record_type": "identity_claim",
  "profile_id": "prf_<uuid>",
  "identity_slug": "<bounded-identity>",
  "role_projection": "learner | teacher | hybrid",
  "scope_skill_ids": [],
  "criteria_ref": {"id": "<opaque-id>", "version": "1.0.0"},
  "capability_state_ids": [],
  "contribution_ids": [],
  "lifecycle_state": "emerging | active | review_due | dormant | contested | historical | withdrawn",
  "release_status": "not_released | proposed | approved | withdrawn",
  "valid_as_of": "RFC3339",
  "review_due_at": "RFC3339",
  "approval_review_id": "rev_<uuid>"
}
```

### Consent grant

```jsonc
{
  "id": "cns_<uuid>",
  "record_type": "consent_grant",
  "subject_actor_id": "act_<uuid>",
  "granted_by_actor_id": "act_<uuid>",

  "scope": {
    "record_ids": [],
    "record_types": [],
    "data_classes": [],
    "purpose_codes": [],
    "allowed_actions": [
      "collect", "store", "process", "agent_process",
      "aggregate", "share", "publish"
    ],
    "allowed_systems": ["github", "notion", "gdrive"],
    "allowed_audiences": ["subject", "named_collaborators", "community", "public"]
  },

  "agent_processing": {
    "allowed": false,
    "content_access": "none | metadata_only | full",
    "model_training_allowed": false
  },

  "retention": {
    "until": null,
    "on_revocation": "delete_content | restrict_and_tombstone | retain_minimal_audit"
  },

  "lifecycle_state": "active | revoked | expired | superseded",
  "valid_from": "RFC3339",
  "expires_at": null,
  "revoked_at": null
}
```

### Typed identifier registry

| Prefix | Record type |
|---|---|
| `act_` | actor |
| `prf_` | profile |
| `rel_` | profile release |
| `evt_` | progress event |
| `clm_` | capability claim |
| `cst_` | capability state |
| `atn_` | historical attainment |
| `art_` | artifact |
| `evd_` | evidence |
| `ctr_` | contribution attribution |
| `gde_` | guidance episode |
| `rev_` | review |
| `att_` | attestation / proof capsule |
| `rsr_` | resolver |
| `inc_` | independence cluster |
| `idc_` | identity claim |
| `cns_` | consent grant |
| `sco_` | context or authorized scope |
| `agg_` | aggregate teaching outcome |
| `osc_` | outcome scale |
| `asm_` | assessment model/calibration |
| `spc_` | experimental scoring policy |

Prefixes MUST NOT be reused for another type.

### Profile

```jsonc
{
  "id": "prf_<uuid>",
  "record_type": "profile",
  "record_status": "active | superseded | withdrawn | tombstoned",
  "subject_actor_id": "act_<uuid>",
  "learner_capability_state_ids": ["cst_<uuid>"],
  "teacher_capability_state_ids": ["cst_<uuid>"],
  "identity_claim_ids": ["idc_<uuid>"],
  "release_ids": ["rel_<uuid>"]
}
```

### Capability claim

```jsonc
{
  "id": "clm_<uuid>",
  "record_type": "capability_claim",
  "record_status": "active | superseded | withdrawn | tombstoned",
  "profile_id": "prf_<uuid>",
  "subject_actor_id": "act_<uuid>",
  "role": "learner | teacher",
  "skill_id": "skl_<uuid>",
  "scope_id": "sco_<uuid>",
  "claim_state": "proposed | verified | contested | rejected | withdrawn",
  "evidence_ids": ["evd_<uuid>"],
  "review_ids": ["rev_<uuid>"]
}
```

### Historical attainment

```jsonc
{
  "id": "atn_<uuid>",
  "record_type": "attainment",
  "record_status": "active | superseded | withdrawn | tombstoned",
  "profile_id": "prf_<uuid>",
  "role": "learner | teacher",
  "skill_id": "skl_<uuid>",
  "scope_id": "sco_<uuid>",
  "attained_level": "explorer | apprentice | practitioner | architect | guardian",
  "attained_at": "RFC3339",
  "rubric_version": "1.0.0",
  "approval_review_id": "rev_<uuid>",
  "invalidation": null
}
```

If an attainment is invalidated, `invalidation` contains the decision review, reason code, and timestamp. The original record remains auditable and MUST NOT be silently deleted.

### Review

```jsonc
{
  "id": "rev_<uuid>",
  "record_type": "review",
  "record_status": "active | superseded | withdrawn | tombstoned",
  "subject_ref": {"type": "<defined-record-type>", "id": "<typed-id>"},
  "reviewer_actor_id": "act_<uuid>",
  "reviewer_kind": "human | agent | team | system | organization",
  "review_type": "formative | competency | editorial | provenance | privacy | consent | publication | invalidation",
  "rubric_ref": {"id": "rub_<uuid>", "version": "1.0.0"},
  "decision": "recommend_accept | needs_changes | approved | rejected | invalidated | withdrawn",
  "authority": "advisory | decisive",
  "reviewed_at": "RFC3339",
  "conflict_of_interest": "none_declared | disclosed"
}
```

Agent reviews are advisory for public human credentials, level promotions, Guardian decisions, identity activation, and publication. A decisive review for those actions MUST identify an accountable human reviewer.

### Resolver

```jsonc
{
  "id": "rsr_<uuid>",
  "record_type": "resolver",
  "record_status": "active | superseded | withdrawn | tombstoned",
  "system": "github | notion | gdrive | mutable_release_channel",
  "resource_kind": "record | file | revision | release",
  "native_locator_encrypted": "<restricted-value>",
  "current_revision": "<opaque-revision>",
  "privacy_classification": "public | community | collaborators | private | restricted"
}
```

Resolver records are restricted. Public releases expose opaque attestation references, never native private locators.

### Independence cluster

```jsonc
{
  "id": "inc_<uuid>",
  "record_type": "independence_cluster",
  "record_status": "active | superseded | withdrawn | tombstoned",
  "evidence_ids": ["evd_<uuid>"],
  "dependency_basis": "same_session | same_artifact | same_assessor | same_dataset | derived_source | other",
  "cluster_cap_policy_ref": "spc_<uuid>",
  "review_id": "rev_<uuid> | null"
}
```

### Attestation

```jsonc
{
  "id": "att_<uuid>",
  "record_type": "attestation",
  "record_status": "active | superseded | withdrawn | tombstoned",
  "profile_id": "prf_<uuid>",
  "role": "learner | teacher",
  "skill_id": "skl_<uuid>",
  "scope_id": "sco_<uuid>",
  "attainment_id": "atn_<uuid> | null",
  "capability_state_id": "cst_<uuid>",
  "review_id": "rev_<uuid>",
  "consent_grant_refs": ["cns_<uuid>"],
  "provenance_refs": ["rsr_<uuid>"]
}
```

### Outcome scale and assessment model

```jsonc
{
  "id": "osc_<uuid>",
  "record_type": "outcome_scale",
  "record_status": "active",
  "version": "1.0.0",
  "value_type": "binary | proportion | bounded_score | count | duration",
  "minimum": 0.0,
  "maximum": 1.0,
  "higher_is_better": true,
  "interpretation": "<bounded-definition>"
}
```

An `assessment_model` record (`asm_`) MUST define the model family, difficulty and discrimination scales, calibration dataset revision, calibration version, and fitness limitations. Numeric evidence without the applicable scale and calibration references is invalid for quantitative scoring.

### Profile release

`profile_release` is a derived, audience-specific snapshot—not a write authority. It MUST validate against `PROFILE-RELEASE-SCHEMA.json`. The release contains separate Learner and Teacher proof-capsule arrays, aggregate-only teaching outcomes, provenance and generator versions, consent snapshot, attribution summaries, omission counts, and accountable approval. Operational evidence rows and learner identities MUST NOT appear in a public release.

---

## 10. GitHub, Notion, and Google Drive write-plane contract

Canonicality is field-specific, and only one system may write each authoritative field class:

| Data | Canonical authority | Projection |
|---|---|---|
| Schemas, ontology, skill definitions, rubrics, scoring code | GitHub | Mirrored into Notion |
| Claims, attained levels, readiness decisions, consent, review decisions, evidence metadata, operational profile state | Notion | Filtered releases and read-only analyses |
| Binary evidence, recordings, assessments, media, signed review files | Google Drive | Registered through opaque references |
| Commits, PRs, reviews, releases | GitHub-native events | Normalized into Notion events |
| Derived profile release | Versioned release generator | Displayed in approved mutable channels |
| Measurement workbook | No write authority; read-only derived projection | Drive distribution only |

The Drive workbook MUST NOT write claims, consent, levels, readiness, or review decisions back into Notion. Every workbook and release export MUST include `generated_at`, generator name/version, source snapshot, and ontology/rubric versions. Derived outputs are regenerated, never independently edited. Never use generic last-write-wins synchronization.

### GitHub

```text
/schemas/v1/
/ontology/concepts/
/ontology/domains/
/ontology/skills/
/rubrics/
/scoring/
/validators/
/profiles/examples-synthetic/<profile_id>/
/attribution/
/automation/
```

Public repositories contain schemas, public knowledge, non-sensitive artifacts, and records with `synthetic: true` only. Personal profile manifests and revocable public projections MUST NOT be committed to public Git history. Real public profiles are served through the mutable release channel governed by the release schema.

### Notion databases

```text
Profiles
Actors
Role Assignments
Domains
Concept Claims
Skill Claims
Progress Events
Practices
Artifacts
Evidence
Contributions
Guidance Episodes
Reviews
Identity Claims
Consent Grants [restricted]
Consent Events [restricted]
Profile Releases
Sync Incidents
```

Primary views:

- Today Capture;
- Evidence Inbox;
- Learner Frontier;
- Teacher Scope;
- Next Proof;
- Review Due;
- Guidance Outcomes;
- Calibration;
- Consent Expiring;
- Quarterly Identity Review.

### Google Drive

```text
/Starlight/<profile_id>/
  artifacts/<artifact_id>/
  evidence/<evidence_id>/
  guidance/<guidance_id>/
  reviews/<review_id>/
  consent/<consent_id>/      [separately restricted]
  exports/<release_id>/
```

Folder and file names use opaque IDs. Store `starlight_id`, schema version, record type, and privacy class as application properties where possible.

### Sync sequence

1. Confirm capture and agent-processing permission before ingesting sensitive material; then capture an operational event in Notion or from a GitHub/Drive source.
2. Normalize it under a stable event ID and idempotency key.
3. Resolve Drive or GitHub evidence without copying sensitive contents.
4. Validate provenance, rights, attribution, and consent.
5. Deduplicate and assign independence clusters.
6. Create only a `proposed` and `unverified` claim or state update.
7. Run experimental scoring and deterministic freshness propagation; neither may promote a claim.
8. Queue human review for every verification, level promotion, identity activation, credential, or publication.
9. Generate privacy-filtered profile projections.
10. Record the model, rubric, consent, and source revisions used.
11. Publish only after explicit consent, privacy, and human-approval gates pass.
12. On withdrawal or revocation, regenerate all dependent projections.

---

## 11. Review and automation cadence

| Cadence | Automation | Human responsibility |
|---|---|---|
| Event-driven | With capture permission, ingest commits, releases, lessons, uploads, and assessments; validate and deduplicate into proposed records | Approve every verification or promotion; review anomalies |
| Daily | Propose event classification, skill links, and a short reflection or confidence prediction | Review for 5–10 minutes |
| Weekly | Recalculate review queue, reconcile evidence, find missing outcomes, and select next proof | Review for 30–45 minutes |
| Monthly | Review calibration, stale skills, source concentration, delayed teaching outcomes, consent expiry | Approve corrections and public projection |
| Quarterly | Level and identity review, taxonomy refinement, rubric drift, Guardian/Architect panels | Accept promotions, withdrawals, or scope changes |
| Model/rubric release | Recompute comparable history or explicitly break the series | Approve migration |
| High-stakes claim | Independent challenge assessment | Reviewer or panel decision |

The system proposes; it does not manufacture progression. Every automation-created claim remains proposed/unverified until explicit human approval. Private identity activation, credentials, promotions, and publication always require human action. Automation MAY update deterministic readiness timing and review queues without changing attained history.

Promises MUST originate in an explicit Promise Ledger entry created or confirmed by the accountable human. They MUST NOT be inferred from chats, relationship data, calendars, or messages.

---

## 12. Anti-gaming and governance

- Reward information gain, independence, transfer, and outcomes—not repetitions or volume.
- Deduplicate identical items, retries, copied artifacts, and correlated evidence.
- Cap contribution from one session, assessment, cohort, reviewer, or source.
- Require novel or rotating tasks for progression gates.
- Preserve failed and abandoned attempts; corrections create superseding records.
- Require pre-registered or externally scored outcomes for primary teacher evidence.
- Adjust teaching outcomes for baseline mastery, difficulty, dosage, and expected trajectory.
- Missing delayed outcomes reduce confidence; they are not silently counted as success or failure.
- Detect reciprocal review rings, concentrated endorsements, implausible score jumps, burst activity, and reused artifacts.
- Trigger challenge reassessment when anomaly rules fire.
- Keep ratings and endorsements secondary.
- Require conflict-of-interest declarations from reviewers.
- Agent assessments cannot be the sole basis of a public human credential.
- Use protected held-out item banks where integrity requires it.
- Avoid global leaderboards.
- Every decision retains evidence, rubric, scoring-model, calibration-model, and review versions.
- Every rejected claim, readiness reduction, or attainment-invalidation decision has an appeal and remediation path.

## Completion criteria

### Definition of done for v0.1

- The Capability, Evidence, and Stewardship ledgers operate in private Notion.
- The profile-release schema validates the synthetic template.
- Learner and Teacher claims, attainments, readiness, and proof capsules remain independent.
- Drive stores source evidence and a read-only generated workbook with generator/version metadata.
- GitHub stores this contract, validators, rubrics, and synthetic examples only.
- Daily 5–10 minute capture and weekly 30–45 minute review have completed at least one useful operating cycle.
- Every automation-created claim remains proposed until human approval.

### Definition of done for the full normalized protocol

The target graph is implemented when:

- every skill has a versioned capability statement, learner rubric, teacher rubric, freshness policy, and evidence gates;
- every profile state resolves to inspectable evidence or an explicit unknown;
- learner and teacher projections can be regenerated deterministically;
- learned, built, taught, refined, and guided events are separately queryable;
- human, agent, team, and system capability cannot be conflated;
- private evidence can support public attestation without being exposed;
- consent revocation propagates through all projections;
- stale capability is distinguished from disproven capability;
- calibration and confidence accompany every level;
- GitHub, Notion, and Drive conflicts resolve according to field authority;
- schema validation fails closed on privacy, provenance, attribution, and version errors.
