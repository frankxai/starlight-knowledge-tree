import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Paths</h4>
            <ul className="space-y-2">
              {[
                { href: "/paths/ai-architect", label: "AI Architect" },
                { href: "/paths/space-builder", label: "Space Builder" },
                { href: "/paths/bio-human-intelligence", label: "Bio / Human Intelligence" },
                { href: "/paths/creator-founder", label: "Creator-Founder" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Graph</h4>
            <ul className="space-y-2">
              {[
                { href: "/tree", label: "Tree Overview" },
                { href: "/research", label: "Research Radar" },
                { href: "/contribute", label: "Contribute" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Docs</h4>
            <ul className="space-y-2">
              {[
                { href: "https://github.com/frankxai/starlight-knowledge-tree/blob/main/ONTOLOGY.md", label: "Ontology" },
                { href: "https://github.com/frankxai/starlight-knowledge-tree/blob/main/CONTRIBUTING.md", label: "Contributing" },
                { href: "https://github.com/frankxai/starlight-knowledge-tree/blob/main/SECURITY.md", label: "Security" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">Project</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "https://github.com/frankxai/starlight-knowledge-tree", label: "GitHub" },
                { href: "https://github.com/frankxai/starlight-knowledge-tree/blob/main/ROADMAP.md", label: "Roadmap" },
              ].map((l) => (
                <li key={l.href}>
                  {"href" in l && l.href.startsWith("http") ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            Starlight Knowledge Tree — Built on{" "}
            <span className="text-cyan-primary/60">Starlight Intelligence Protocol</span>
          </p>
          <p className="text-xs text-white/20">MIT License · Open Source</p>
        </div>
      </div>
    </footer>
  );
}
