# Starlight Learner & Teacher OS - Automation Contract

This contract implements the version 0.1 three-ledger slice: Capability, Evidence & Contribution, and Stewardship & Promise. The normalized graph in the [Profile Specification](./PROFILE-SPEC.md) is a target architecture, not a requirement for the first useful workflow.

## Authority and safety invariants

- Every automation-created record starts as `claim_state: proposed` and is unverified.
- Human approval is required for every evidence verification, capability promotion, identity activation, credential, or publication.
- An automation may recompute a deterministic `current_readiness_state` or review queue, but it never changes historical `attained_level` or its `confidence_tier` merely because evidence is old.
- Sensitive material requires active permission before access, capture, storage, summarization, or agent processing. If permission is absent, the automation omits the material and may emit only a generic permission-needed notice.
- Promises come only from the explicit Stewardship & Promise Ledger. The automation never infers a promise from conversation, sentiment, or relationship activity.
- Every proposal declares source references, generator and rubric versions, and `contribution_attributions` for humans, agents, systems, and organizations. Agent-created candidates remain `agent_generated_unreviewed` until a human reviews them.
- Repeated runs use stable idempotency keys and deduplicate the same source event.
- GitHub owns schemas, rubrics, validators, and code; Notion owns claims, consent, reviews, and evidence metadata; Drive owns source files and signed records. The Drive workbook is a read-only derived analysis/export, not a write plane.

## Daily capture

The daily automation inspects only consented sources among the day's available conversations and connected work. It creates a short candidate list for the private Evidence & Contribution Ledger. Each candidate records an `event_type` and a nullable `contribution_dimension` of learned, built, taught, refined, or guided. It must attach a source, remain proposed and unverified, avoid whole-life scoring, and never commit personal material to public GitHub. Human review should take five to ten minutes.

Output:

1. up to three evidence candidates;
2. one correction or counterevidence item;
3. one already-recorded Promise Ledger item requiring action or renegotiation, or `none`;
4. one highest-leverage next practice;
5. a concise human review request to accept, correct, contest, or reject each candidate.

## Weekly synthesis

The weekly automation reads the private Notion ledgers, read-only Drive projections and source references, and relevant GitHub changes within their permission scopes. It produces a capability and stewardship review, recomputes review queues and current-readiness labels, and drafts share-safe curriculum changes. It may create a public GitHub branch, issue, credential, or release only after explicit human publication approval. Personal projections use a mutable release channel, never public Git history. Revocation can remove the official projection but cannot erase third-party copies of material that was already published. Human review should take thirty to forty-five minutes.

Output:

1. proposed capability promotions, holds, readiness transitions, contests, corrections, or retractions;
2. shipped artifacts and verified outcomes;
3. learner/agent transfer and teaching evidence;
4. promise integrity and coordination risks;
5. one active capability bottleneck;
6. one contribution candidate worth considering for deliberate publication;
7. one continue/change/park/stop decision;
8. the next week's small set of practices and artifacts.

## Promotion rule

Automations may capture consented material, summarize it, create proposed records, and recompute deterministic readiness labels. They may not verify evidence, approve any promotion, activate an identity, confer a credential, or publish any material. Each of those actions requires explicit human approval under the applicable rubric, attribution, privacy, and consent policy; contested or high-stakes claims also require the designated independent review.
