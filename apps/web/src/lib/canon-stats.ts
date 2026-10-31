import searchIndex from "@/data/search-index.json";

// Every number rendered by the web app derives from the generated search
// index (canon data), never from hand-written literals. The count guard
// (scripts/verify-canon-counts.mjs) fails when the index drifts from data/.
export interface CanonItem {
  id: string;
  type: string;
  label: string;
  description: string;
  domain?: string;
  tags?: string[];
  difficulty?: string;
  href: string;
}

export const canonItems = searchIndex as CanonItem[];
export const canonIds = new Set(canonItems.map((i) => i.id));
export const canonDomains = canonItems.filter((i) => i.type === "domain");
export const canonNodes = canonItems.filter((i) => i.type !== "domain" && i.type !== "benchmark");

export function countByType(type: string): number {
  return canonItems.filter((i) => i.type === type).length;
}

export function countByDomain(domainId: string): number {
  // Partition of canon nodes only: domain entries (4 carry a self domain)
  // and benchmarks (7, domain-tagged) are not nodes and must not inflate it.
  return canonNodes.filter((i) => i.domain === domainId).length;
}

export function domainSlug(domainId: string): string {
  return domainId.replace(/^domain-/, "");
}
