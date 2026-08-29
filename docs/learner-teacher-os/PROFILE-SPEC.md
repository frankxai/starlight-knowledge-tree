# Starlight Learner–Teacher Capability Graph v0.1

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

Every event has one primary dimension. Secondary dimensions may be recorded, but correlated evidence cannot be counted repeatedly toward a composite result.

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

## 3. Capability levels

Levels apply separately to each skill and context.

### Learner capability

| Level | Observable state | Default gate |
|---|---|---|
| Explorer | Can orient, recognize boundaries, explain core distinctions, and attempt the capability | Concept proof and one E1 practice |
| Apprentice | Can perform a bounded task with references, supervision, or review and apply feedback | Multiple spaced practices, one E2 artifact, one feedback cycle |
| Practitioner | Produces repeatable independent results and transfers the skill to a novel context | Several artifacts across at least two contexts and E3 evidence |
| Architect | Integrates skills into reusable systems, explains trade-offs, handles failure modes, and creates methods others can use | System-level artifact, reuse or adoption, E3/E4 evidence |
| Guardian | Advances and protects the field, evolves standards, guides successors, and sustains replicated outcomes | Cross-context E4 evidence, stewardship, succession, peer panel |

### Teacher capability

Teaching capability is assessed independently of subject mastery.

| Level | Observable state | Default gate |
|---|---|---|
| Explorer | Shares bounded learning notes with limitations made explicit | Reviewed explanatory artifact |
| Apprentice | Delivers a bounded lesson or guided exercise that produces an immediate comprehension signal | Reviewed material and at least one measured learner outcome |
| Practitioner | Repeatedly produces retained learning and independent transfer across learners or contexts | Delayed outcomes, multiple independent episodes, current subject mastery |
| Architect | Designs curricula, assessments, teacher agents, and feedback systems with predictable outcomes | Validated curriculum, calibrated assessments, repeated outcome lift |
| Guardian | Stewards standards, trains teachers, audits quality, and evolves the canon | Cross-context teacher outcomes, successors, peer governance |

Rules:

- A teacher claim includes an `authorized_scope`; nobody is simply “a teacher” without domain and level boundaries.
- Subject-matter capability and teaching capability remain separately visible.
- Teaching a concept can provide limited secondary learner evidence, but cannot validate both profiles recursively.
- Guardian status requires stewardship and succession, not merely elite personal execution.
- Staleness produces `review_due`, not automatic loss of historical level.
- Only contradictory current evidence can trigger downgrade, with review and appeal.
- Promotion and exit thresholds use hysteresis to prevent oscillation.

---

## 4. Capability state, evidence quality, and confidence

### Evidence quality

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

### Learner capability model

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

Credentials and progression use the conservative lower 90% bound, not the displayed mean.

### Teacher effectiveness

Teacher performance is delayed learning lift adjusted for baseline ability, difficulty, expected unaided trajectory, and intervention dosage:

\[
g_j =
\text{observed delayed outcome}_j -
\widehat{\text{baseline outcome}}_j
\]

The profile reports expected percentage-point lift in a fixed reference context, with uncertainty, retention, transfer, learner autonomy, and sample size.

Immediate gain is diagnostic. Delayed retention and independent application are primary.

Ratings, engagement, audience size, and completion remain secondary signals.

### Confidence

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
C=100\min\left(
1-\frac{W_{90}}{W_{90,\text{prior}}},
\frac{n_{\text{eff}}}{n_0},
\frac{N_{\text{src}}}{m_0}
\right)
\]

Suggested tiers:

- `provisional`: below 40, single-source, or stale;
- `supported`: 40–69;
- `strong`: 70 or above, fresh, with adequate evidence diversity.

Mastery, confidence, and freshness are displayed separately.

### Freshness and decay

Historical verified achievement never decays. Current readiness does.

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

Do not also age-weight historical evidence; decay is applied once through state propagation.

Default states:

- `fresh`: age \(\le 0.5h_s\);
- `review_due`: \(0.5h_s <\) age \(\le h_s\);
- `stale`: age \(>h_s\).

Half-lives belong to skill definitions:

- volatile tools or models: 30–90 days;
- operational methods: approximately 180 days;
- stable professional skills: approximately 365 days;
- enduring principles: 1,095 days or no decay.

Successful independent confirmations spaced over time may lengthen the half-life.

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

1. conservative lower-bound mastery passes the level threshold;
2. required skill coverage passes;
3. all critical prerequisites pass;
4. evidence-type and source-diversity gates pass;
5. required contexts are covered;
6. at least two confirmations are separated in time;
7. no unresolved contradiction, integrity flag, or consent block exists;
8. the appropriate review authority approves.

Domain-level rollups are allowed only when the domain definition explicitly declares skill weights, critical prerequisites, coverage requirements, and thresholds. There is no global averaged rank.

Identity becomes `active` only when:

- core skills are at least Practitioner or the identity-specific threshold;
- evidence remains fresh;
- the pattern spans multiple independent evidence clusters;
- required contribution modes are present;
- the identity criteria version is recorded;
- publication consent exists.

Identity states are:

`emerging | active | review_due | dormant | contested | historical | withdrawn`

---

## 6. Human, agent, team, and system attribution

Every artifact and outcome distinguishes:

1. **authorship or execution;**
2. **capability demonstrated;**
3. **accountability;**
4. **credit;**
5. **review authority.**

Contribution roles include:

`originator | director | author | coauthor | executor | operator | editor | reviewer | approver | teacher | learner | curator | maintainer`

Execution modes:

`human_direct | human_agent_assisted | agent_generated_human_reviewed | agent_generated_unreviewed`

Rules:

- A human does not receive learning credit merely because an agent produced a successful artifact.
- Human mastery requires explanation, defense, novel application, troubleshooting, or independent execution evidence.
- Human orchestration can be credited as its own skill.
- Agent capability is evaluated through versioned, held-out tasks and traceable runs.
- An agent has “learned” only when a persistent configuration, memory, policy, toolchain, or model change produces repeatable improvement on held-out evaluations. Context-window adaptation alone is not durable learning.
- Team capability is a separate state; it is not distributed automatically to members.
- Actor percentage shares are optional and allowed only when supported by a documented allocation method. Otherwise use categorical roles and a bounded credit statement.
- Agent review may be decisive for internal automated gates only under a pre-registered policy. A public human credential, Guardian promotion, or public identity release requires accountable human approval.
- Humans and agents must not be ranked together unless the evaluation protocol establishes valid equivalence.

---

## 7. Learner and Teacher projections

### Learner Profile

The learner view contains:

- current domains and active learning contracts;
- skill map with level, confidence, freshness, and evidence stage;
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
  "skill": "bounded-skill-name",
  "level": "practitioner",
  "role": "learner | teacher",
  "as_of": "RFC3339",
  "freshness": "fresh",
  "confidence_tier": "strong",
  "rubric_version": "1.2.0",
  "evidence_classes": ["artifact", "independent_assessment", "outcome"],
  "verification": "human-reviewed",
  "attestation_ref": "att_<opaque-id>"
}
```

---

## 8. Privacy, consent, and audience projections

### Classifications

`public | community | collaborators | private | restricted`

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

1. The strictest privacy classification in a reference chain wins.
2. New downstream use requires compatible purpose consent.
3. Guidance relationships require bilateral consent before either party is named.
4. Teacher outcomes are aggregated by default; named learner outcomes require separate testimonial consent.
5. Public profiles may publish an attestation while keeping evidence private.
6. Agents cannot expand visibility or purpose.
7. Revocation removes records from future processing and regenerates every affected projection.
8. Public aggregates suppress small cohorts by default.
9. Native Notion IDs, Drive IDs, connector identities, private repository coordinates, and raw hashes never appear in public releases.
10. Do not commit personal or deletion-sensitive records into public Git history.
11. Immutable logs contain only opaque, minimal audit tombstones; private source content remains deletable.
12. Corrections supersede records. They do not silently rewrite history.

---

## 9. Canonical JSON-like schemas

### Common envelope

```jsonc
{
  "id": "<typed-opaque-uuid>",
  "record_type": "<type>",
  "schema_version": "1.0.0",
  "revision": 1,
  "status": "active | superseded | withdrawn | tombstoned",
  "created_at": "RFC3339",
  "updated_at": "RFC3339",
  "created_by_actor_id": "act_<uuid>",

  "provenance": {
    "canonical_system": "github | notion | gdrive",
    "resolver_ref": "rsr_<opaque-id>",
    "source_revision": "<opaque-revision>",
    "content_sha256": "<private-or-null>",
    "derived_from_ids": []
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
  "kind": "human | agent | team | system",
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
  "half_life_days": 180,
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

  "promotion_gates": {},
  "status": "draft | active | deprecated"
}
```

### Progress event

```jsonc
{
  "id": "evt_<uuid>",
  "record_type": "progress_event",
  "subject_actor_id": "act_<uuid>",
  "primary_dimension": "learned | built | taught | refined | guided",
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
  "contribution_ids": [],

  "precommitted_prediction": {
    "probability_success": 0.75,
    "predicted_rubric_score": 0.7,
    "locked_at": "RFC3339"
  },

  "state": "proposed | verified | rejected | contested | superseded"
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
    "type": "skill_claim | concept_claim | artifact | teaching_episode | guidance_episode",
    "id": "<opaque-id>"
  },

  "kind": "practice_trace | artifact | observation | assessment | peer_review | external_outcome | adoption | credential",
  "observed_at": "RFC3339",
  "outcome": 0.0,
  "difficulty": 0.0,
  "discrimination": 1.0,
  "assessment_type": "<bounded-code>",
  "source_class": "<bounded-code>",
  "independence_cluster": "icl_<uuid>",

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
  "target_ref": {"type": "artifact", "id": "art_<uuid>"},
  "actor_id": "act_<uuid>",
  "actor_kind_snapshot": "human | agent | team | system",
  "role": "originator | director | author | coauthor | executor | operator | editor | reviewer | approver | teacher | curator | maintainer",
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
  "publication_mode": "private | aggregate | named"
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

  "level": "explorer | apprentice | practitioner | architect | guardian",
  "level_state": "emerging | current | review_due | stale | contested | historical",
  "posterior_mean": 0.0,
  "lower_90": 0.0,
  "upper_90": 0.0,
  "confidence_score": 0.0,
  "confidence_tier": "provisional | supported | strong",
  "freshness_state": "fresh | review_due | stale",

  "evidence_cluster_ids": [],
  "critical_gate_results": {},
  "next_required_evidence": [],
  "historical_peak_level": "practitioner",
  "calculated_at": "RFC3339",

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
  "id": "icl_<uuid>",
  "record_type": "identity_claim",
  "profile_id": "prf_<uuid>",
  "identity_slug": "<bounded-identity>",
  "role_projection": "learner | teacher | hybrid",
  "scope_skill_ids": [],
  "criteria_ref": {"id": "<opaque-id>", "version": "1.0.0"},
  "capability_state_ids": [],
  "contribution_ids": [],
  "status": "emerging | active | review_due | dormant | contested | historical | withdrawn",
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
    "allowed_audiences": ["subject", "collaborators", "community", "public"]
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

  "state": "active | revoked | expired | superseded",
  "valid_from": "RFC3339",
  "expires_at": null,
  "revoked_at": null
}
```

---

## 10. GitHub, Notion, and Google Drive contract

Canonicality is field-specific:

| Data | Canonical authority | Projection |
|---|---|---|
| Schemas, ontology, skill definitions, rubrics, scoring code | GitHub | Mirrored into Notion |
| Operational profile state, workflows, consent, claims, review queue | Notion | Filtered releases |
| Binary evidence, recordings, assessments, media, signed review files | Google Drive | Registered through opaque references |
| Commits, PRs, reviews, releases | GitHub-native events | Normalized into Notion events |
| Derived profile snapshot | Recomputed by versioned pipeline | Displayed in Notion and approved channels |

Never use generic last-write-wins synchronization.

### GitHub

```text
/schemas/v1/
/ontology/concepts/
/ontology/domains/
/ontology/skills/
/rubrics/
/scoring/
/validators/
/profiles/public/<profile_id>/
/attribution/
/automation/
```

Public repositories contain schemas, public knowledge, and non-sensitive artifacts. Personal profile manifests remain in a private store; only an explicitly approved, consent-filtered release belongs under `/profiles/public/`.

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

1. Capture an operational event in Notion or from a GitHub/Drive source.
2. Normalize it under a stable event ID and idempotency key.
3. Resolve Drive or GitHub evidence without copying sensitive contents.
4. Validate provenance, rights, attribution, and consent.
5. Deduplicate and assign independence clusters.
6. Create a proposed claim or state update.
7. Run scoring and freshness propagation.
8. Queue any required human or panel review.
9. Generate privacy-filtered profile projections.
10. Record the model, rubric, consent, and source revisions used.
11. Publish only after policy and approval gates pass.
12. On withdrawal or revocation, regenerate all dependent projections.

---

## 11. Review and automation cadence

| Cadence | Automation | Human responsibility |
|---|---|---|
| Event-driven | Ingest commits, releases, lessons, uploads, assessments; validate and deduplicate | None unless anomaly detected |
| Daily | Propose event classification, skill links, and a short reflection or confidence prediction | Accept, correct, or ignore in under five minutes |
| Weekly | Recalculate review queue, reconcile evidence, find missing outcomes, select next proof | Twenty-minute evidence review |
| Monthly | Review calibration, stale skills, source concentration, delayed teaching outcomes, consent expiry | Approve corrections and public projection |
| Quarterly | Level and identity review, taxonomy refinement, rubric drift, Guardian/Architect panels | Accept promotions, withdrawals, or scope changes |
| Model/rubric release | Recompute comparable history or explicitly break the series | Approve migration |
| High-stakes claim | Independent challenge assessment | Reviewer or panel decision |

The system should propose; it should not manufacture progression.

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
- Every rejected or downgraded claim has an appeal and remediation path.

## Definition of done

The protocol is implemented when:

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
