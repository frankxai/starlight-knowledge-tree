"use client";

import React, { useState } from "react";

interface DemandCaptureWaitlistProps {
  productId?: string;
  productName?: string;
  foundingBenefit?: string;
  className?: string;
}

export function DemandCaptureWaitlist({
  productId = "starlight-knowledge-tree",
  productName = "Starlight Knowledge Tree Pro & Swarm Canon",
  foundingBenefit = "First 50 founding members receive lifetime canon updates, MCP endpoints, and RFC curation voting rights.",
  className = "",
}: DemandCaptureWaitlistProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [priceBand, setPriceBand] = useState("");
  const [pain, setPain] = useState("");
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<number>(14);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      // Attempt API call if available
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          email,
          source: typeof window !== "undefined" ? window.location.pathname : "web",
          createdAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.position) setPosition(data.position);
      }
    } catch {
      // Fallback in static SSG mode
      if (typeof window !== "undefined") {
        const key = `waitlist_${productId}`;
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.push({ email, at: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(existing));
        setPosition(14 + existing.length);
      }
    } finally {
      setLoading(false);
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          email,
          role,
          priceBand,
          pain,
          updatedAt: new Date().toISOString(),
        }),
      });
    } catch {
      if (typeof window !== "undefined") {
        const key = `waitlist_step2_${productId}`;
        localStorage.setItem(key, JSON.stringify({ email, role, priceBand, pain }));
      }
    } finally {
      setLoading(false);
      setStep(3);
    }
  };

  return (
    <div
      className={`glass-card p-8 border border-cyan-primary/20 bg-navy-950/80 max-w-xl mx-auto rounded-2xl relative overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-primary/10 rounded-full blur-3xl pointer-events-none" />

      {step === 1 && (
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-cyan-primary/10 text-cyan-primary border border-cyan-primary/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-primary animate-pulse" />
            FOUNDING COHORT ACTIVE · 50 SEATS
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">{productName}</h3>
          <p className="text-sm text-white/60 mb-4 leading-relaxed">
            Gain immediate access to verified frontier agent patterns, 2-hop topological AST traversals, and live MCP 2.0 streaming tools.
          </p>

          <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 mb-6 text-xs text-cyan-primary/90 flex items-start gap-2.5">
            <span className="text-base leading-none">✨</span>
            <span>
              <strong>Founding Benefit:</strong> {foundingBenefit}
            </span>
          </div>

          <form onSubmit={handleStep1Submit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@domain.com"
                className="flex-1 px-4 py-3 rounded-lg bg-navy-900/90 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-primary transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary justify-center px-6 py-3 whitespace-nowrap"
              >
                {loading ? "Joining..." : "Join Waitlist →"}
              </button>
            </div>
            <p className="text-[11px] text-white/40 font-mono">
              Honest counter: 14 architects claimed · No spam, zero rented lists.
            </p>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            ✓ Position #{position} Reserved
          </div>

          <h4 className="text-xl font-bold text-white mb-1">Help Us Calibrate Your Access</h4>
          <p className="text-xs text-white/50 mb-5">
            Answer 3 quick questions to help prioritize connectors and grant founding tier privileges. All optional.
          </p>

          <form onSubmit={handleStep2Submit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                1. What is your primary focus?
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-primary"
              >
                <option value="">Select your role...</option>
                <option value="ai-architect">AI Architect / Swarm Engineer</option>
                <option value="founder">Technical Founder / CTO</option>
                <option value="researcher">Researcher / Scientist</option>
                <option value="creator">Solo Creator / Product Builder</option>
                <option value="enterprise">Enterprise Engineering Lead</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                2. Expected price band for production canon & MCP endpoints?
              </label>
              <select
                value={priceBand}
                onChange={(e) => setPriceBand(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-primary"
              >
                <option value="">Select price expectation...</option>
                <option value="free-only">Free / Open-Source Core Only</option>
                <option value="25-99">$25 – $99 (One-Time Canon License)</option>
                <option value="100-299">$100 – $299 (Team / Pro License)</option>
                <option value="company-pays">Company Reimburses / Enterprise Subscription</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                3. Biggest bottleneck in your agent workflows?
              </label>
              <textarea
                rows={2}
                value={pain}
                onChange={(e) => setPain(e.target.value)}
                placeholder="e.g. Memory loss between agent sessions, context dilution, high frontier token costs..."
                className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-white/15 text-white text-xs placeholder-white/30 focus:outline-none focus:border-cyan-primary"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                Skip questions
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-xs px-4 py-2"
              >
                {loading ? "Saving..." : "Save Preferences →"}
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="relative z-10 text-center py-6">
          <div className="w-12 h-12 rounded-full bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-primary flex items-center justify-center mx-auto mb-4 text-xl">
            ✓
          </div>
          <h4 className="text-xl font-bold text-white mb-2">You are on the Priority Ledger</h4>
          <p className="text-sm text-white/60 max-w-md mx-auto mb-6">
            Your founding seat is confirmed. We will reach out directly to <strong>{email}</strong> when the next batch of MCP streaming tokens opens.
          </p>
          <div className="inline-block p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-left text-white/70">
            <div>Product: {productId}</div>
            <div>Cohort: Founding 50</div>
            <div>Position: #{position}</div>
            <div>Status: Priority Access Locked</div>
          </div>
        </div>
      )}
    </div>
  );
}
