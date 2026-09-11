import type { Metadata } from "next";
import Link from "next/link";
import * as fs from "fs";
import * as path from "path";

export const metadata: Metadata = {
  title: "Curated Canon & Books — Starlight Knowledge Tree",
  description: "Human-crafted foundational books, mental models, and cross-repo architectural applications.",
};

interface Book {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  year: number;
  domain: string;
  tags: string[];
  summary: string;
  canonical_url?: string;
  key_mental_models?: Array<{ name: string; description: string; application: string }>;
  core_chapters?: Array<{ number: number | string; title: string; takeaway: string }>;
  cross_repo_applications?: Array<{ repo: string; context: string }>;
  quotes?: Array<{ quote: string; source: string }>;
}

function getBooks(): Book[] {
  const filePath = path.resolve(process.cwd(), "../../data/nodes/books.json");
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {}
  }
  return [];
}

export default function LibraryPage() {
  const books = getBooks();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-4 border border-amber-authority/20 bg-amber-authority/5 text-xs text-amber-authority font-medium tracking-wide">
          <span>🏛️</span> Curated Human-Crafted Canon
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Foundational <span className="text-gradient-cyan">Literature & Books</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          The sovereign reading list grounding Starlight intelligence systems, distributed architectures, mythic worldbuilding, and economic power.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8">
        {books.map((book) => (
          <article
            key={book.id}
            className="glass-card p-8 border border-white/10 hover:border-cyan-primary/40 transition-all rounded-2xl bg-navy-900/60"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-primary/80 px-2.5 py-1 rounded bg-cyan-primary/10 border border-cyan-primary/20 mr-3">
                  {book.domain.replace("domain-", "")}
                </span>
                <span className="text-xs text-white/40 font-mono">
                  {book.authors.join(", ")} • {book.year}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {book.title}
                </h2>
                {book.subtitle && (
                  <p className="text-white/50 text-sm mt-1">{book.subtitle}</p>
                )}
              </div>
              {book.canonical_url && (
                <a
                  href={book.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-primary hover:text-white transition-colors font-mono whitespace-nowrap self-start border border-cyan-primary/30 px-3 py-1.5 rounded-lg bg-cyan-primary/5"
                >
                  Reference Source ↗
                </a>
              )}
            </div>

            <p className="text-white/80 text-base leading-relaxed mb-6">
              {book.summary}
            </p>

            {/* Mental Models */}
            {book.key_mental_models && book.key_mental_models.length > 0 && (
              <div className="mb-6 bg-white/[0.02] border border-white/5 rounded-xl p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-authority mb-3">
                  Key Mental Models & Principles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {book.key_mental_models.map((mm, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="font-semibold text-white/90 mb-1">{mm.name}</div>
                      <div className="text-white/60 text-xs mb-1.5">{mm.description}</div>
                      <div className="text-cyan-primary/80 text-xs font-mono">
                        ↳ Starlight: {mm.application}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cross Repo Applications */}
            {book.cross_repo_applications && book.cross_repo_applications.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-white/40 font-mono">Active Repo Grounding:</span>
                {book.cross_repo_applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 font-mono"
                    title={app.context}
                  >
                    📂 {app.repo}
                  </span>
                ))}
              </div>
            )}

            {/* Quote */}
            {book.quotes && book.quotes.length > 0 && (
              <blockquote className="border-l-2 border-cyan-primary/50 pl-4 py-1 text-sm italic text-white/70">
                "{book.quotes[0].quote}"
                <span className="text-xs not-italic text-white/40 ml-2 font-mono">— {book.quotes[0].source}</span>
              </blockquote>
            )}

            {/* Tags */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-white/40 bg-white/[0.03] px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
