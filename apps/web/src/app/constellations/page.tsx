import type { Metadata } from "next";
import * as fs from "fs";
import * as path from "path";

export const metadata: Metadata = {
  title: "Estate Constellations & Repos — Starlight Knowledge Tree",
  description: "Comprehensive map of all 213 repositories across the 5 core constellations and sovereign verticals.",
};

interface RepoEntry {
  slug: string;
  name: string;
  constellation: string;
  path: string;
  description: string;
  has_git: boolean;
  has_agents_md: boolean;
  has_claude_md: boolean;
  has_readme: boolean;
  has_mcp_config: boolean;
  framework?: string;
  key_skills: string[];
  key_agents: string[];
  mcp_servers: string[];
  lore_canon?: boolean;
}

interface EstateIndex {
  generated_at: string;
  estate_root: string;
  total_repos: number;
  constellation_counts: Record<string, number>;
  framework_counts: Record<string, number>;
  repos: RepoEntry[];
}

function getEstateIndex(): EstateIndex | null {
  const filePath = path.resolve(process.cwd(), "../../data/estate-index.json");
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {}
  }
  return null;
}

export default function ConstellationsPage() {
  const estate = getEstateIndex();

  if (!estate) {
    return (
      <div className="min-h-screen pt-24 pb-16 text-center text-white">
        Estate index not generated. Run `npx tsx scripts/index-estate.ts`.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-4 border border-cyan-primary/20 bg-cyan-primary/5 text-xs text-cyan-primary font-medium tracking-wide">
          <span>🌌</span> Sovereign Estate Observability
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          The 5 Constellations & <span className="text-gradient-cyan">Repo Estate</span>
        </h1>
        <p className="text-white/60 text-lg max-w-3xl mx-auto">
          Canonical index of all {estate.total_repos} repositories across Arcanea Living Worlds, FrankX Creator OS, Agent OS, Media Labs, and Sovereign Verticals.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
        {Object.entries(estate.constellation_counts).map(([cName, count]) => (
          <div key={cName} className="glass-card p-4 rounded-xl bg-navy-900/60 text-center">
            <div className="text-2xl font-bold text-cyan-primary mb-1">{count}</div>
            <div className="text-[11px] text-white/50 line-clamp-2 leading-tight">
              {cName.replace(/^[0-9]\.\s*/, "")}
            </div>
          </div>
        ))}
      </div>

      {/* Repos by Constellation */}
      <div className="space-y-12">
        {Object.keys(estate.constellation_counts).map((constellationName) => {
          const repos = estate.repos.filter((r) => r.constellation === constellationName);
          return (
            <section key={constellationName} className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 bg-navy-900/40">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div>
                  <h2 className="text-2xl font-bold text-white">{constellationName}</h2>
                  <p className="text-xs text-white/40 font-mono mt-1">{repos.length} managed repositories</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((r) => (
                  <div
                    key={r.slug}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-primary/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-cyan-primary truncate max-w-[200px]">
                          {r.slug}
                        </span>
                        {r.lore_canon && (
                          <span className="text-[10px] bg-amber-authority/10 text-amber-authority border border-amber-authority/20 px-1.5 py-0.5 rounded font-mono">
                            👑 Canon
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-white/60 line-clamp-2 mb-3 leading-relaxed">
                        {r.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                      <span>{r.framework}</span>
                      <div className="flex items-center gap-2">
                        {r.has_agents_md && <span title="AGENTS.md present" className="text-green-400">🤖</span>}
                        {r.has_mcp_config && <span title="MCP configured" className="text-cyan-400">⚡</span>}
                        {r.has_git && <span title="Git repo active" className="text-white/60">📦</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
