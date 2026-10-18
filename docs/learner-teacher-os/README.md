# Starlight Learner & Teacher OS

> A living capability, contribution, and stewardship system for humans and agents.

## Start here

- [Master Curriculum Map](./CURRICULUM.md) - capability tracks, projects, source queues, and mastery tests.
- [Foundational Lexicon](./LEXICON.md) - operational vocabulary and examples of evidence.
- [Learner-Teacher Capability Graph](./PROFILE-SPEC.md) - target ontology, scoring research, privacy, and system contracts.
- [Profile Release JSON Schema](./PROFILE-RELEASE-SCHEMA.json) - executable contract for synthetic or explicitly approved public releases.
- [Automation Contract](./AUTOMATIONS.md) - daily capture and weekly synthesis boundaries.
- [Synthetic Profile Template](./PROFILE-TEMPLATE.json) - a non-personal example for schema development and validation.

## Decision

This is not a second LMS, a quantified-self game, or a public biography. It is the personal operating layer of the Starlight Academy Fabric. Each class of data has one write plane:

- **GitHub** is authoritative for share-safe schemas, ontology, curricula, rubrics, validators, and scoring or automation code. A public repository contains only schemas, synthetic examples, and artifacts deliberately approved for irreversible publication.
- **Notion** is authoritative for private operational claims, consent state, review decisions, current priorities, evidence metadata and links, and stewardship commitments.
- **Google Drive** is authoritative for source files, original evidence, signed or permissioned records, and human-readable field guides. Its workbook is a read-only derived analysis/export carrying its generator and source versions; it never becomes a competing writer for claims, consent, or reviews.
- **Public profile projections** are consented, selective releases delivered through a mutable release channel. Revocation removes or changes the official projection but cannot erase material already copied, cached, forked, or otherwise published by third parties.

The full normalized capability graph is the target architecture. Version 0.1 proves the workflow through three private operational ledgers - Capability, Evidence & Contribution, and Stewardship & Promise - before any larger application or database expansion.

The system advances one loop:

`state -> intent -> learning -> practice -> artifact -> evidence -> review -> transfer -> contribution -> identity`

Consumption does not count as capability. Activity does not count as impact. A claim becomes trustworthy only when its evidence, provenance, evaluator, context, and visibility rule are inspectable.

## The dual profile

Every person or agent can have two linked, non-identical projections.

### Learner profile

Answers:

- What can I explain accurately?
- What can I execute without supervision?
- In which contexts has the capability transferred?
- Which current-readiness claims are fresh, due for review, or stale?
- What should I practice or build next?

### Teacher profile

Answers:

- What can I teach from demonstrated capability?
- Which methods, examples, rubrics, and missions have I authored?
- Whom or which agents have I guided, with consent?
- Did learners become independently capable, or merely satisfied?
- What did I refine in the field, standard, curriculum, or community?

Teacher status is never inferred from audience size. It emerges from learner transfer, calibrated assessment, adopted teaching artifacts, and responsible stewardship.

## Role-scoped progression

Learner and Teacher use the same level names but separate rubrics, evidence, and decisions. A Teacher level never upgrades a Learner level recursively, and subject capability alone never confers teaching authority.

### Learner capability

| Level | Governing question | Minimum proof |
|---|---|---|
| Unrated | Is there enough evidence to make a bounded claim? | No level claim; unknown remains unknown |
| Explorer | Can I map the territory, explain core distinctions, and identify boundaries? | Accurate explanation, concept map, identified unknowns, and one practice trace |
| Apprentice | Can I perform a bounded task with guidance and apply feedback? | Spaced practice, one reviewed artifact, and one correction cycle |
| Practitioner | Can I produce a repeatable result independently in more than one context? | Multiple artifacts, at least two contexts, independent assessment, and correction history |
| Architect | Can I design a reusable system, defend trade-offs, and handle failure modes? | Working system, decision record, evaluation, reuse or adoption, and operational outcome |
| Guardian | Can I advance the practice, improve its standards, and sustain replicated outcomes across contexts? | Cross-context evidence, accepted refinements, stewardship, and accountable peer review |

### Teacher capability

| Level | Governing question | Minimum proof |
|---|---|---|
| Unrated | Is there enough teaching evidence to make a bounded claim? | No teaching-level claim; unknown remains unknown |
| Explorer | Can I share a bounded explanation with its limitations made explicit? | Reviewed explanatory artifact within an authorized scope |
| Apprentice | Can I deliver a bounded lesson or exercise that produces an immediate comprehension signal? | Reviewed material and at least one measured learner outcome |
| Practitioner | Can I repeatedly produce delayed retention and independent transfer? | Multiple independent episodes, delayed outcomes, and current subject capability |
| Architect | Can I design curricula, assessments, and feedback systems with repeatable outcomes? | Validated curriculum, calibrated assessments, and repeated outcome improvement |
| Guardian | Can I steward teaching standards, develop teachers, audit quality, and sustain succession? | Cross-context teacher outcomes, successors, stewardship, and peer governance |

Progress is a vector, not a single score. Each role, capability, and context records `attained_level` separately from `current_readiness_state`. Historical attainment stays attached to the rubric and evidence that established it. Passage of time may change current readiness to `review_due` or `stale`, but staleness alone never downgrades historical attainment or its confidence tier. A reviewed correction, invalidation, or retraction may change a historical claim while preserving its audit trail.

## Events and the five contribution dimensions

The operational ledger separates what happened from what kind of contribution it may support:

- `event_type` records the observable occurrence, such as `observation`, `practice`, `artifact_created`, `assessment`, `outcome`, `review`, `correction`, `transfer`, `publication`, `retirement`, or `retraction`.
- `contribution_dimension` is nullable. When supported, it is one of `learned`, `built`, `taught`, `refined`, or `guided`.

The five dimensions mean:

1. **Learned** - a concept or capability was acquired, retained, or transferred, supported by assessment, explanation, novel application, or spaced confirmation.
2. **Built** - a durable artifact, decision, system, experiment, performance, or experience was produced and inspected.
3. **Taught** - another actor gained retained, transferable capability; a lesson or audience signal alone is only a teaching artifact.
4. **Refined** - an existing artifact, method, standard, agent, relationship practice, or body of knowledge measurably improved.
5. **Guided** - a person or agent moved toward an agreed outcome with increased autonomy and appropriate consent.

An event may remain useful with `contribution_dimension: null`. Missing proof is not converted into contribution credit.

## Capability constellations

The Knowledge Tree should organize a subject's development into coherent constellations, not hundreds of disconnected goals.

1. **C01** - Founder sovereignty and state regulation
2. **C02** - Venture strategy, portfolio design, and economic systems
3. **C03** - Finance, accounting, capital allocation, and investing
4. **C04** - Product judgment, user value, and commercialization
5. **C05** - AI architecture, agent systems, software, data, and security
6. **C06** - Research, epistemology, invention, and experimentation
7. **C07** - Design, taste, worldbuilding, narrative, and experience direction
8. **C08** - Media, content, distribution, persuasion, and reputation
9. **C09** - Sales, negotiation, partnerships, and institutional adoption
10. **C10** - Leadership, delegation, culture, and multi-agent organizations
11. **C11** - Teaching, curriculum, assessment, mentorship, and institution building
12. **C12** - Love, partnership, sexuality, marriage, and family stewardship
13. **C13** - Friendship, hospitality, tribe, community, and civic contribution
14. **C14** - Health, strength, energy, recovery, and longevity
15. **C15** - Music, performance, artistic craft, and creative production
16. **C16** - Philosophy, ethics, spirituality, meaning, and civilization
17. **C17** - Lifestyle architecture, geography, mobility, and freedom
18. **C18** - Stewardship archetypes: Owner, Investor, Architect, Teacher, Partner, Kin, Friend, Host, Artist, Lover, King, and Magician

The archetypes are decision lenses, not titles or claims of superiority. **King** means sovereign responsibility for resources and consequences. **Magician** means ethical transformation through models, symbols, tools, and imagination.

## Evidence contract

Every evidence record should contain:

- `subject`: human, agent, system, or organization;
- `capability`: stable capability identifier;
- `event_type`: the observable occurrence;
- `contribution_dimension`: `null`, learned, built, taught, refined, or guided;
- `claim`: the smallest capability claim supported;
- `artifact_uri`: canonical evidence location;
- `artifact_digest`: content digest when feasible;
- `context`: constraints, tools, collaborators, and stakes;
- `contribution_attributions`: declared actor kind, role, execution mode, and bounded credit statement for each contributing human, agent, system, or organization; never a fake precision percentage;
- `evaluator`: self, peer, expert, user, learner, automated test, or institution;
- `rubric_version`: the standard applied;
- `outcome`: observable result and counterevidence;
- `observed_at`, `reviewed_at`, and `review_due_at`;
- `visibility`, `consent`, `license`, and `revocation` rules;
- `claim_state`: proposed, verified, rejected, contested, superseded, or retracted;
- `confidence_tier`: provisional, supported, or strong;
- `calibration`: separate prediction, error, and model-version fields when calibration exists;
- `attained_level` and `current_readiness_state`: separately derived, role-scoped values.

No evidence may become public merely because its URL exists. Visibility inherits the strictest rule among subject, artifact, relationship, mission, license, and consent.

## Scoreboard

Use scores only as navigation. Never optimize them as ends.

- **Capability coverage:** weighted share of priority capabilities with current evidence.
- **Build-to-learn ratio:** meaningful artifacts divided by learning inputs.
- **Transfer rate:** capabilities demonstrated in a second materially different context.
- **Teaching transfer rate:** guided learners who later perform independently under the same rubric.
- **Refinement yield:** accepted improvements divided by refinements attempted.
- **Contribution rate:** work adopted beyond the original context.
- **Evidence freshness:** share of priority claims within their review horizon.
- **Promise integrity:** commitments kept, renegotiated early, or repaired; never a surveillance score of other people.
- **Freedom yield:** recurring value, reusable assets, and delegated capacity created per founder-hour.
- **Vitality floor:** whether health, attention, and relationships remain above minimum operating constraints.

Revenue, reach, and output volume are context metrics. They do not substitute for quality, truth, consent, or independent capability.

## Operating cadence

### Daily - five to ten minutes

- Capture at most three meaningful events and assign a contribution dimension only when the evidence supports it.
- Attach evidence or mark the claim as unverified.
- Name one correction, surface one explicit Promise Ledger item or `none`, and choose one next practice.
- Do not convert routine activity into false evidence.

### Weekly - thirty to forty-five minutes

- Review what changed in capability, not what was merely consumed.
- Approve, hold, contest, correct, or retract proposed claims; mark current readiness `review_due` or `stale` without changing historical attainment or confidence.
- Select one capability bottleneck and one teaching opportunity.
- Check energy, relationship promises, cash, and coordination load as constraints.
- Publish only consented, share-safe artifacts.

### Monthly - ninety minutes

- Rebalance the portfolio of capabilities against the active venture and life season.
- Retire dead goals, duplicate projects, and vanity metrics.
- Test one capability in a new context.
- Review who or what became more capable because of the subject's work.

### Quarterly - half day

- Reassess role covenants, capability graph, evidence standards, and privacy projections.
- Audit the reading/research canon for outdated or low-transfer material.
- Decide which knowledge becomes public curriculum, which remains private, and which should be forgotten.
- Review the active revenue bet, adjacent validation bet, and explicit option backlog.

## Initial focus

The first release must not attempt to score a subject across all of life. It should prove the operating loop in three high-leverage constellations:

1. **AI Architect / Agent Systems** - working architecture, evaluation, governance, and teaching evidence.
2. **Founder / Creator Economic System** - one offer, one conversion event, one reusable delivery system, and truthful economics.
3. **Teacher / Guardian** - one open mission, one rubric, learner transfer, and a refined teaching artifact.

Relationships, health, finance, and private identity remain constraint and stewardship ledgers first. They become capability claims only when the measurement is ethical, consensual, and genuinely useful.

## Public/private boundary

| Surface | Allowed | Prohibited by default |
|---|---|---|
| Public GitHub | Schemas, ontology, curricula, rubrics, validators, synthetic examples, and deliberately public artifacts | Personal projections or any deletion-sensitive relationship, health, financial, identity, or reflection record |
| Private Notion | Claims, consent, reviews, current priorities, evidence metadata and links, role covenants | Raw secrets, credentials, unnecessary intimate detail, original binary evidence |
| Private Drive | Source files, original evidence, signed or permissioned records, rich field guide, read-only derived workbook | Editable claim, consent, or review authority; uncontrolled public sharing |
| Mutable public release | Selected capabilities and artifacts with explicit publication approval and attribution | Whole-life scoring, inferred traits, hidden agent authorship, non-consenting people |

## Canonical exclusions

- No giant app before the contracts and manual workflow prove useful.
- No points, streaks, or ranks without inspectable evidence.
- No public-by-default passport.
- No automatic claim promotion from chat summaries.
- No teacher authority based on fame, wealth, or credentials alone.
- No surveillance of partners, family, friends, learners, or collaborators.
- No automatic commits of personal material to a public repository.
- No promise inferred from conversation; only an explicit Promise Ledger entry is actionable.
- No reading list that becomes consumption theater; each source must unlock a question, practice, artifact, or teaching output.

## Definition of done for v0.1

- One share-safe public specification and synthetic profile template in GitHub.
- One private Notion hub with capability, evidence, and stewardship ledgers.
- One Drive field guide and one auditable, read-only derived tracking workbook with generator and source versions.
- Daily capture and weekly synthesis automations.
- Three priority capability tracks seeded with real but privacy-safe evidence candidates.
- One completed weekly review that changes a decision, practice, artifact, or teaching method.
