import type { Metadata } from "next";
import * as fs from "fs";
import * as path from "path";

export const metadata: Metadata = {
  title: "MCP Servers & Swarm Patterns — Starlight Knowledge Tree",
  description: "Verified Model Context Protocol tools, safety gates, and swarm coordination workflows.",
};

interface MCPNode {
  id: string;
  label: string;
  description: string;
  server_name: string;
  transport: string;
  auth_model: string;
  install_command?: string;
  verified_in_repos?: string[];
  latency_tier: string;
  tools: Array<{ name: string; description: string; safety_level: string }>;
}

interface SwarmPattern {
  id: string;
  label: string;
  description: string;
  pattern_name?: string;
  maker_roles?: string[];
  checker_roles?: string[];
  maker_role?: string;
  checker_role?: string;
  convergence_rule: string;
  failure_modes?: string[];
  failure_modes_mitigated?: string[];
  token_budget_profile?: string;
  code_example?: string;
  live_reference_file?: string;
  cross_repo_applications?: Array<{ repo: string; context: string }>;
}

function getMCPs(): MCPNode[] {
  const filePath = path.resolve(process.cwd(), "../../data/nodes/mcp.json");
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {}
  }
  return [];
}

function getSwarmPatterns(): SwarmPattern[] {
  const filePath = path.resolve(process.cwd(), "../../data/nodes/swarm-patterns.json");
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {}
  }
  return [];
}

export default function MCPToolsPage() {
  const mcps = getMCPs();
  const patterns = getSwarmPatterns();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-4 border border-cyan-primary/20 bg-cyan-primary/5 text-xs text-cyan-primary font-medium tracking-wide">
          <span>⚡</span> Protocols, Tooling & Swarm Patterns
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          MCP Servers & <span className="text-gradient-cyan">Agent Swarms</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          The verified tools, safety tiers, and adversarial Maker ≠ Checker loops coordinating Starlight agents across local and cloud surfaces.
        </p>
      </div>

      {/* Swarm Patterns Section */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🔄</span> Swarm Coordination Patterns ({patterns.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patterns.map((p) => {
            const maker = p.maker_role || (p.maker_roles && p.maker_roles[0]) || "Maker Agent";
            const checker = p.checker_role || (p.checker_roles && p.checker_roles[0]) || "Checker Agent";
            const failureModes = p.failure_modes || p.failure_modes_mitigated || [];

            return (
              <div
                key={p.id}
                className="glass-card p-6 border border-white/10 rounded-xl bg-navy-900/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-cyan-primary uppercase bg-cyan-primary/10 px-2 py-0.5 rounded border border-cyan-primary/20">
                      {p.token_budget_profile || "adaptive"} tokens
                    </span>
                    <span className="text-xs text-amber-authority font-mono">
                      {maker} ⚔️ {checker}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{p.label}</h3>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">{p.description}</p>
                  
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 text-xs mb-3">
                    <div className="font-semibold text-white/90 mb-1">Convergence Rule:</div>
                    <div className="text-white/60">{p.convergence_rule}</div>
                  </div>

                  {failureModes.length > 0 && (
                    <div className="mb-3">
                      <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                        Mitigated Failure Modes:
                      </div>
                      <ul className="text-xs text-white/60 space-y-1">
                        {failureModes.map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-red-400">×</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {p.live_reference_file && (
                    <div className="text-[10px] font-mono text-cyan-primary/70 bg-black/40 px-2.5 py-1 rounded border border-white/5 break-all mb-2">
                      Reference: {p.live_reference_file}
                    </div>
                  )}
                </div>

                {p.code_example && (
                  <pre className="text-[11px] font-mono text-white/60 bg-black/40 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap mt-2">
                    {p.code_example}
                  </pre>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* MCP Servers Section */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🛠️</span> Verified MCP Servers & Tools ({mcps.length})
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {mcps.map((mcp) => (
            <div
              key={mcp.id}
              className="glass-card p-6 border border-white/10 rounded-xl bg-navy-900/60"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{mcp.label}</h3>
                  <div className="text-xs font-mono text-cyan-primary/80 mt-1">
                    Server: <code className="text-white">{mcp.server_name}</code> • Transport: {mcp.transport} • Latency: {mcp.latency_tier}
                  </div>
                </div>
                {mcp.install_command && (
                  <code className="text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/10 self-start">
                    {mcp.install_command}
                  </code>
                )}
              </div>

              <p className="text-white/70 text-xs leading-relaxed mb-4">{mcp.description}</p>

              {/* Tools List */}
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-authority mb-3">
                  Exposed Tool Functions ({mcp.tools.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mcp.tools.map((t) => (
                    <div key={t.name} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <code className="text-xs font-mono text-cyan-primary font-bold">{t.name}</code>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          t.safety_level === "read_only"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : t.safety_level === "idempotent_write"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                          {t.safety_level}
                        </span>
                      </div>
                      <p className="text-xs text-white/50">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
