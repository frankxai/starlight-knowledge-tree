import { z } from "zod";

const IsoDateTimeSchema = z.string().datetime({ offset: true });

export const WorldIdSchema = z
  .string()
  .regex(/^world-[a-z0-9]+(?:-[a-z0-9]+)*$/, "World references must use a complete world-* ID");
export const PatternIdSchema = z
  .string()
  .regex(/^pattern-[a-z0-9]+(?:-[a-z0-9]+)*$/, "Pattern references must use a complete pattern-* ID");
export const BenchmarkIdSchema = z
  .string()
  .regex(/^benchmark-[a-z0-9]+(?:-[a-z0-9]+)*$/, "Benchmark IDs must use a complete benchmark-* ID");
export const TranslationIdSchema = z
  .string()
  .regex(/^translation-[a-z0-9]+(?:-[a-z0-9]+)*$/, "Translation IDs must use a complete translation-* ID");
export const NamingCandidateIdSchema = z
  .string()
  .regex(/^name-[a-z0-9]+(?:-[a-z0-9]+)*$/, "Naming candidate IDs must use a complete name-* ID");

export const RightsTierSchema = z.enum([
  "arcanea_original",
  "public_domain",
  "cc0_metadata",
  "open_licensed",
  "editorial_reference",
  "partner_licensed",
  "restricted",
]);

export const SourceRecordSchema = z.object({
  url: z.string().url(),
  source_title: z.string().min(2).max(240),
  publisher: z.string().min(2).max(200),
  evidence_type: z.enum([
    "official_publisher",
    "official_creator",
    "library_catalog",
    "public_registry",
    "open_knowledge",
    "licensed_archive",
    "secondary_analysis",
  ]),
  accessed_at: IsoDateTimeSchema,
  verification_status: z.enum(["metadata_only", "url_resolved", "content_reviewed", "rights_reviewed"]),
  license_scope: z.string().min(2).max(300),
  rights_reviewed_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Rights review dates must use YYYY-MM-DD"),
  review_reference: z.string().min(3).max(240),
}).strict();

export const RightsRecordSchema = z.object({
  tier: RightsTierSchema,
  allowed_uses: z.array(z.string().min(3).max(200)).min(1),
  blocked_uses: z.array(z.string().min(3).max(200)).min(1),
  notes: z.string().min(10).max(500),
}).strict();

export const FictionWorldSchema = z.object({
  id: WorldIdSchema,
  label: z.string().min(2).max(200),
  work_title: z.string().min(2).max(200),
  creator: z.string().min(2).max(200),
  medium: z.enum(["novel", "manga", "comic", "film", "television", "game", "audio", "mixed"]),
  first_publication_year: z.number().int().min(1000).max(2100).optional(),
  original_summary: z.string().min(20).max(600),
  sources: z.array(SourceRecordSchema).min(1),
  rights: RightsRecordSchema,
}).strict();

export const NarrativePatternSchema = z.object({
  id: PatternIdSchema,
  label: z.string().min(2).max(120),
  kind: z.enum([
    "power_ecology",
    "institution",
    "character_engine",
    "bond",
    "progression",
    "social_role",
    "narrative_pressure",
  ]),
  definition: z.string().min(20).max(700),
  human_appeal: z.string().min(10).max(400),
  mechanics: z.array(z.string().min(3).max(200)).min(1).max(12),
  example_worlds: z.array(WorldIdSchema).min(1),
  expression_exclusions: z.array(z.string().min(3).max(240)).min(1),
}).strict();

export const BenchmarkDimensionSchema = z.object({
  id: BenchmarkIdSchema,
  label: z.string().min(2).max(120),
  layer: z.enum(["language", "character", "power", "institution", "narrative", "world", "transmedia"]),
  evaluation_question: z.string().min(20).max(400),
  failure_signals: z.array(z.string().min(3).max(200)).min(1),
  evidence_required: z.array(z.string().min(3).max(200)).min(1),
}).strict();

export const ArcaneaTranslationSchema = z.object({
  id: TranslationIdSchema,
  source_worlds: z.array(WorldIdSchema).min(1),
  source_patterns: z.array(PatternIdSchema).min(1),
  arcanea_anchors: z.array(z.string().min(2).max(120)).min(3),
  retained_intents: z.array(z.string().min(3).max(240)).min(1),
  rejected_expression: z.array(z.string().min(3).max(240)).min(1),
  original_inversion: z.string().min(20).max(600),
  canon_status: z.enum(["research_only", "staging", "locked"]),
}).strict();

export const PrestigeNameScoreSchema = z.object({
  mouthfeel: z.number().int().min(0).max(5),
  semantic_charge: z.number().int().min(0).max(5),
  role_clarity: z.number().int().min(0).max(5),
  distinctiveness: z.number().int().min(0).max(5),
  inflection_range: z.number().int().min(0).max(5),
  derivative_distance: z.number().int().min(0).max(5),
}).strict();

export const NamingCandidateSchema = z.object({
  id: NamingCandidateIdSchema,
  label: z.string().min(2).max(120),
  kind: z.enum(["phenomenon", "condition", "person", "discipline", "institution", "rank", "artifact", "place"]),
  register: z.enum(["formal", "spoken", "field", "scholarly", "interface"]),
  canon_status: z.enum(["research_only", "staging", "locked"]),
  decision: z.enum(["keep", "review", "reject"]),
  clearance: z.enum(["unsearched", "preliminary", "cleared", "rejected"]),
  score: PrestigeNameScoreSchema,
  flags: z.array(z.string().min(2).max(200)),
  notes: z.string().min(10).max(500),
}).strict();

export const FictionAtlasSchema = z.object({
  schema_version: z.literal("0.1.0"),
  generated_at: IsoDateTimeSchema,
  worlds: z.array(FictionWorldSchema),
  patterns: z.array(NarrativePatternSchema),
  benchmark_dimensions: z.array(BenchmarkDimensionSchema),
  translations: z.array(ArcaneaTranslationSchema),
  naming_candidates: z.array(NamingCandidateSchema),
}).strict();

export type RightsTier = z.infer<typeof RightsTierSchema>;
export type SourceRecord = z.infer<typeof SourceRecordSchema>;
export type RightsRecord = z.infer<typeof RightsRecordSchema>;
export type FictionWorld = z.infer<typeof FictionWorldSchema>;
export type NarrativePattern = z.infer<typeof NarrativePatternSchema>;
export type BenchmarkDimension = z.infer<typeof BenchmarkDimensionSchema>;
export type ArcaneaTranslation = z.infer<typeof ArcaneaTranslationSchema>;
export type NamingCandidate = z.infer<typeof NamingCandidateSchema>;
export type FictionAtlas = z.infer<typeof FictionAtlasSchema>;
