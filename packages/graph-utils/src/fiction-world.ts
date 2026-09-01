import * as fs from "fs";
import {
  FictionAtlas,
  FictionAtlasSchema,
  NamingCandidate,
} from "@starlight/graph-schema";

export interface FictionAtlasValidationError {
  field: string;
  message: string;
}

export interface FictionAtlasValidationResult {
  valid: boolean;
  errors: FictionAtlasValidationError[];
  atlas?: FictionAtlas;
}

export interface PrestigeNameAudit {
  label: string;
  score: number;
  flags: string[];
  passes: boolean;
}

const GENERIC_FANTASY_TOKENS = new Set([
  "ancient",
  "ascendant",
  "awakened",
  "corrupted",
  "cosmic",
  "echo",
  "ethereal",
  "harmonic",
  "nexus",
  "prism",
  "resonance",
  "shadow",
  "tapestry",
  "veil",
  "weave",
]);

export function validateFictionAtlas(filePath: string): FictionAtlasValidationResult {
  if (!fs.existsSync(filePath)) {
    return {
      valid: false,
      errors: [{ field: "file", message: `Atlas file does not exist: ${filePath}` }],
    };
  }

  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return {
      valid: false,
      errors: [{
        field: "json",
        message: error instanceof Error ? error.message : "Invalid JSON",
      }],
    };
  }

  const result = FictionAtlasSchema.safeParse(raw);
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  const ids = new Set<string>();
  const worldIds = new Set(result.data.worlds.map((world) => world.id));
  const patternIds = new Set(result.data.patterns.map((pattern) => pattern.id));
  const errors: FictionAtlasValidationError[] = [];
  const allRecords = [
    ...result.data.worlds,
    ...result.data.patterns,
    ...result.data.benchmark_dimensions,
    ...result.data.translations,
    ...result.data.naming_candidates,
  ];

  for (const record of allRecords) {
    if (ids.has(record.id)) {
      errors.push({ field: record.id, message: "Duplicate fiction-atlas ID" });
    }
    ids.add(record.id);
  }

  for (const pattern of result.data.patterns) {
    for (const worldId of pattern.example_worlds) {
      if (!worldIds.has(worldId)) {
        errors.push({ field: pattern.id, message: `Unknown example world: ${worldId}` });
      }
    }
  }

  for (const translation of result.data.translations) {
    for (const worldId of translation.source_worlds) {
      if (!worldIds.has(worldId)) {
        errors.push({ field: translation.id, message: `Unknown source world: ${worldId}` });
      }
    }
    for (const patternId of translation.source_patterns) {
      if (!patternIds.has(patternId)) {
        errors.push({ field: translation.id, message: `Unknown source pattern: ${patternId}` });
      }
    }
  }

  for (const candidate of result.data.naming_candidates) {
    const mechanicalAudit = auditPrestigeName(candidate.label);
    const declaredScore = scoreNamingCandidate(candidate);

    if (
      candidate.canon_status === "locked" &&
      (candidate.decision !== "keep" || candidate.clearance !== "cleared")
    ) {
      errors.push({
        field: candidate.id,
        message: "Locked names must be kept and cleared",
      });
    }
    if (candidate.decision === "keep" && !mechanicalAudit.passes) {
      errors.push({
        field: candidate.id,
        message: "Kept names must pass the mechanical prestige audit",
      });
    }
    if (candidate.decision === "keep" && declaredScore < 24) {
      errors.push({
        field: candidate.id,
        message: "Kept names must score at least 24/30 on the declared prestige rubric",
      });
    }
    if (candidate.clearance === "rejected" && candidate.decision !== "reject") {
      errors.push({
        field: candidate.id,
        message: "Rejected clearance requires a rejected naming decision",
      });
    }
    if (candidate.decision === "reject" && candidate.canon_status !== "research_only") {
      errors.push({
        field: candidate.id,
        message: "Rejected names must remain research-only",
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    atlas: result.data,
  };
}

export function auditPrestigeName(
  label: string,
  allowlist: string[] = []
): PrestigeNameAudit {
  const flags: string[] = [];
  const allowed = new Set(allowlist.map((token) => token.toLowerCase()));
  const words = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length >= 3) {
    flags.push("modifier-stack: identity labels should rarely need three or more words");
  }
  if (label.includes("-")) {
    flags.push("hyphen-compound: test whether the name is explaining instead of naming");
  }

  const genericHits = words.filter(
    (word) => GENERIC_FANTASY_TOKENS.has(word) && !allowed.has(word)
  );
  if (genericHits.length > 0) {
    flags.push(`generic-fantasy-register: ${Array.from(new Set(genericHits)).join(", ")}`);
  }

  if (/\b(of|the)\b.*\b(of|the)\b/i.test(label)) {
    flags.push("ceremonial-chain: repeated 'of/the' construction weakens spoken identity");
  }
  if (label.length > 24) {
    flags.push("length: public identity labels should usually fit one breath");
  }

  const score = Math.max(0, 100 - flags.length * 22);
  return { label, score, flags, passes: score >= 78 };
}

export function scoreNamingCandidate(candidate: NamingCandidate): number {
  const values = Object.values(candidate.score);
  return values.reduce((sum, value) => sum + value, 0);
}
