"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface SearchItem {
  id: string;
  type: string;
  label: string;
  description: string;
  domain?: string;
  tags?: string[];
  href: string;
}

interface SearchModalProps {
  items: SearchItem[];
}

export function SearchModal({ items }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = useMemo(() => {
    if (!query.trim() && selectedType === "all") return items.slice(0, 8);
    const q = query.toLowerCase();
    return items.filter((item) => {
      const matchesType = selectedType === "all" || item.type === selectedType;
      const matchesQuery =
        !q ||
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q));
      return matchesType && matchesQuery;
    }).slice(0, 15);
  }, [items, query, selectedType]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:text-zinc-200 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search Knowledge Tree...</span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 border border-zinc-700 rounded text-zinc-400">⌘K</kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
              <svg className="w-5 h-5 text-zinc-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a book, concept, paper, or MCP tool..."
                className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <button onClick={() => setIsOpen(false)} className="text-xs text-zinc-500 hover:text-zinc-300">
                ESC
              </button>
            </div>

            {/* Type Filters */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900/50 border-b border-zinc-800/80 overflow-x-auto text-[11px]">
              {["all", "book", "paper", "concept", "mcp_server", "swarm_pattern"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                    selectedType === t
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  {t.replace("_", " ")}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto divide-y divide-zinc-900 p-2">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500">No matching knowledge nodes found.</div>
              ) : (
                filteredItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-lg hover:bg-zinc-900/80 transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {item.type.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">{item.description}</p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-[9px] px-1.5 py-0.2 bg-zinc-900 text-zinc-500 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2 text-[10px] text-zinc-500 bg-zinc-900/40 border-t border-zinc-800">
              <span>Navigate with arrow keys</span>
              <span>{items.length} nodes indexed</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
