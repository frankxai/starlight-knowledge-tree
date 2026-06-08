"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const LINKS = [
  { href: "/tree", label: "Tree" },
  { href: "/paths/ai-architect", label: "Paths" },
  { href: "/research", label: "Research" },
  { href: "/contribute", label: "Contribute" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-navy-900/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-md bg-cyan-primary/10 border border-cyan-primary/20 flex items-center justify-center">
            <span className="text-cyan-primary text-xs font-bold">S</span>
          </div>
          <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
            Knowledge Tree
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm transition-colors duration-150",
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* GitHub */}
        <a
          href="https://github.com/frankxai/starlight-knowledge-tree"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/40 hover:text-white/70 transition-colors font-mono hidden sm:block"
        >
          GitHub →
        </a>
      </div>
    </header>
  );
}
