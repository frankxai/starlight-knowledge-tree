import Link from "next/link";

const PATHS = [
  { href: "/paths/ai-architect", label: "AI Architect" },
  { href: "/paths/space-builder", label: "Space Builder" },
  { href: "/paths/bio-human-intelligence", label: "Bio / Human Intelligence" },
  { href: "/paths/creator-founder", label: "Creator-Founder" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-60" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-authority/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border border-cyan-primary/20 bg-cyan-primary/5 text-xs text-cyan-primary font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-primary animate-pulse" />
            Built on Starlight Intelligence Protocol
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Starlight</span>
            <br />
            <span className="text-gradient-cyan">Knowledge Tree</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/60 font-light mb-4 max-w-2xl mx-auto leading-relaxed">
            An open intelligence graph for human capability, scientific knowledge, and contribution paths.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16 text-sm text-white/40">
            <span>Most learning systems track consumption.</span>
            <span className="text-cyan-primary font-medium">Starlight Knowledge Tree tracks capability.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tree" className="btn-primary">
              Explore the Graph →
            </Link>
            <Link href="/contribute" className="btn-secondary">
              Contribute
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent" />
      </section>

      {/* Progression Loop */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-white/90 mb-3">The Progression Loop</h2>
          <p className="text-white/50">How capability becomes identity</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-mono">
          {["Concept", "Skill", "Practice", "Artifact", "Evidence", "Contribution", "Identity"].map(
            (step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-md glass-card text-white/80">{step}</span>
                {i < arr.length - 1 && <span className="text-cyan-primary/50">→</span>}
              </div>
            )
          )}
        </div>
      </section>

      {/* Paths */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-white/90 mb-3">Initial Paths</h2>
          <p className="text-white/50">Four domains. Four maps. One graph.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="glass-card p-6 group"
            >
              <h3 className="text-lg font-semibold text-white/90 group-hover:text-cyan-primary transition-colors mb-2">
                {p.label}
              </h3>
              <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                Explore the path →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Evidence Rule */}
      <section className="py-24 px-6 max-w-3xl mx-auto text-center">
        <div className="glass-card p-10">
          <p className="text-sm text-amber-authority font-medium tracking-widest uppercase mb-6">
            The Rule
          </p>
          <blockquote className="text-xl sm:text-2xl text-white/80 leading-relaxed font-light">
            A skill is not complete because someone watched a video, read a thread, or finished a course.
          </blockquote>
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-white/60 text-lg">
            A skill becomes real when there is{" "}
            <span className="text-cyan-primary font-medium">evidence</span>.
          </p>
        </div>
      </section>
    </>
  );
}
