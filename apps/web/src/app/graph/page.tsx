"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import searchIndexData from "../../data/search-index.json";

interface NodeData {
  id: string;
  type: string;
  label: string;
  description: string;
  domain?: string;
  tags?: string[];
  href: string;
}

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  domain: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", badge: "bg-amber-500/20 text-amber-300" },
  book: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30", badge: "bg-orange-500/20 text-orange-300" },
  paper: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/30", badge: "bg-indigo-500/20 text-indigo-300" },
  concept: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", badge: "bg-emerald-500/20 text-emerald-300" },
  swarm_pattern: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", badge: "bg-purple-500/20 text-purple-300" },
  mcp_server: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30", badge: "bg-cyan-500/20 text-cyan-300" },
  tool: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", badge: "bg-blue-500/20 text-blue-300" }
};

export default function GraphExplorerPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);

  const nodes = searchIndexData as NodeData[];

  const filteredNodes = useMemo(() => {
    return nodes.filter((n) => {
      const matchType = selectedType === "all" || n.type === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        n.label.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.tags?.some((t) => t.toLowerCase().includes(q));
      return matchType && matchQuery;
    });
  }, [nodes, selectedType, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: nodes.length,
      books: nodes.filter((n) => n.type === "book").length,
      papers: nodes.filter((n) => n.type === "paper").length,
      concepts: nodes.filter((n) => n.type === "concept").length,
      swarms: nodes.filter((n) => n.type === "swarm_pattern").length,
      mcp: nodes.filter((n) => n.type === "mcp_server").length
    };
  }, [nodes]);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-2 border border-cyan-primary/20 bg-cyan-primary/5 text-xs text-cyan-primary font-medium">
            <span>🌐</span> Interactive Knowledge Graph Explorer
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Starlight <span className="text-gradient-cyan">Graph Visualizer</span>
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1">
            Explore 260+ interconnected cognitive models, books, papers, and multi-agent swarm patterns.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-white/60">
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">{stats.total} Entities</span>
          <span className="px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400">{stats.books} Books</span>
          <span className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">{stats.papers} Papers</span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">{stats.concepts} Concepts</span>
          <span className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">{stats.swarms} Swarms</span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-navy-900/60 p-3 rounded-xl border border-white/10 glass-card">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {["all", "book", "paper", "concept", "swarm_pattern", "mcp_server"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap font-medium transition-all ${
                selectedType === t
                  ? "bg-cyan-primary text-navy-950 font-semibold shadow-lg shadow-cyan-primary/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {t.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter entities in graph..."
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-primary/60 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2 text-xs text-white/40 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Graph Grid & Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Grid View */}
        <div className="lg:col-span-2 space-y-3">
          <div className="text-xs text-white/40 font-mono flex items-center justify-between px-1">
            <span>Showing {filteredNodes.length} of {nodes.length} entities</span>
            <span>Click card to inspect graph connections</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[720px] overflow-y-auto pr-1">
            {filteredNodes.map((n) => {
              const style = TYPE_COLORS[n.type] || TYPE_COLORS.concept;
              const isSelected = activeNode?.id === n.id;

              return (
                <div
                  key={n.id}
                  onClick={() => setActiveNode(n)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer glass-card flex flex-col justify-between ${
                    isSelected
                      ? "border-cyan-primary bg-cyan-primary/10 shadow-lg shadow-cyan-primary/10 scale-[1.01]"
                      : `${style.border} ${style.bg} hover:border-white/30 hover:bg-white/[0.04]`
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${style.badge}`}>
                        {n.type.replace("_", " ")}
                      </span>
                      {n.domain && (
                        <span className="text-[10px] font-mono text-white/40 truncate max-w-[120px]">
                          {n.domain.replace("domain-", "")}
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-bold mb-1.5 line-clamp-2 ${style.text}`}>
                      {n.label}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                      {n.description}
                    </p>
                  </div>

                  {n.tags && n.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-white/5">
                      {n.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-white/40">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Inspector Drawer */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 glass-card p-6 rounded-2xl border border-white/10 bg-navy-900/80">
            {activeNode ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono uppercase px-2.5 py-0.5 rounded ${TYPE_COLORS[activeNode.type]?.badge || 'bg-white/10 text-white'}`}>
                    {activeNode.type.replace("_", " ")}
                  </span>
                  <Link
                    href={activeNode.href}
                    className="text-xs text-cyan-primary hover:underline font-mono"
                  >
                    View Page →
                  </Link>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">{activeNode.label}</h2>
                <div className="text-xs font-mono text-white/40 mb-4 break-all">ID: {activeNode.id}</div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="font-semibold text-white/80 uppercase tracking-wider text-[10px] mb-1">
                      Definition & Core Intent
                    </div>
                    <p className="text-white/70 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
                      {activeNode.description}
                    </p>
                  </div>

                  {activeNode.domain && (
                    <div>
                      <div className="font-semibold text-white/80 uppercase tracking-wider text-[10px] mb-1">
                        Domain Assignment
                      </div>
                      <div className="text-cyan-primary font-mono bg-cyan-primary/5 px-2.5 py-1.5 rounded border border-cyan-primary/20">
                        {activeNode.domain}
                      </div>
                    </div>
                  )}

                  {activeNode.tags && activeNode.tags.length > 0 && (
                    <div>
                      <div className="font-semibold text-white/80 uppercase tracking-wider text-[10px] mb-1.5">
                        Categorical Tags
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeNode.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10">
                    <Link
                      href={activeNode.href}
                      className="block w-full text-center py-2.5 rounded-lg bg-cyan-primary text-navy-950 font-bold text-xs hover:bg-cyan-primary/90 transition-colors shadow-lg shadow-cyan-primary/20"
                    >
                      Open Full Dossier
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-white/40">
                <div className="text-3xl mb-3">🔭</div>
                <div className="text-sm font-semibold text-white/70 mb-1">Entity Inspector</div>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  Click on any node in the knowledge graph to inspect its properties, tags, and cross-repo bindings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
