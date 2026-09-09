"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SearchModal } from "./SearchModal";
import searchIndexData from "../data/search-index.json";

const LINKS = [
  { href: "/tree", label: "Tree" },
  { href: "/graph", label: "Graph Visualizer" },
  { href: "/library", label: "Books & Canon" },
  { href: "/papers", label: "Papers" },
  { href: "/mcp-tools", label: "MCP & Swarms" },
  { href: "/scale", label: "Scale & ROI" },
  { href: "/constellations", label: "Constellations" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-navy-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-6 h-6 rounded-md bg-cyan-primary/10 border border-cyan-primary/20 flex items-center justify-center">
            <span className="text-cyan-primary text-xs font-bold">S</span>
          </div>
          <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors hidden sm:inline">
            Starlight Knowledge Tree
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-xs font-medium transition-colors duration-150",
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? "text-cyan-primary font-semibold"
                  : "text-white/60 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Search Modal + GitHub */}
        <div className="flex items-center gap-3">
          <SearchModal items={searchIndexData as any} />
          <a
            href="https://github.com/frankxai/starlight-knowledge-tree"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-white/70 transition-colors font-mono hidden lg:block"
          >
            GitHub →
          </a>
        </div>
      </div>
    </header>
  );
}
