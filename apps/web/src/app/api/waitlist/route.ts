import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Waitlist storage: Vercel KV (Upstash-compatible REST) when configured via
// KV_REST_API_URL + KV_REST_API_TOKEN. Without a configured store this route
// fails closed. It never returns a position or a count it did not read back
// from storage; the previous build returned seeded constants (position 15,
// count 14) with the write commented out, which faked demand evidence.

const PUBLIC_COUNT_THRESHOLD = 25;

function kvConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function kvPipeline(commands: (string | number)[][]): Promise<unknown[]> {
  const cfg = kvConfig();
  if (!cfg) throw new Error("waitlist storage not configured");
  const res = await fetch(`${cfg.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`waitlist store error: ${res.status}`);
  const body = (await res.json()) as { result?: unknown; error?: string }[];
  return body.map((entry) => {
    if (entry.error) throw new Error(`waitlist store error: ${entry.error}`);
    return entry.result;
  });
}

const setKey = (productId: string) => `waitlist:${productId}:bytime`;
const rowKey = (productId: string, email: string) => `waitlist:${productId}:${email.toLowerCase()}`;

export async function POST(req: Request) {
  if (!kvConfig()) {
    return NextResponse.json(
      { error: "Waitlist signup is not open yet. Storage is not configured." },
      { status: 503 }
    );
  }
  try {
    const body = await req.json();
    const { productId, email, role, priceBand, pain, source } = body ?? {};
    if (!productId || !email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "productId and a valid email are required" }, { status: 400 });
    }
    const now = new Date().toISOString();
    const score = Date.now();
    const [added, rank] = (await kvPipeline([
      ["zadd", setKey(productId), "NX", score, email.toLowerCase()],
      ["zrank", setKey(productId), email.toLowerCase()],
      [
        "hset",
        rowKey(productId, email),
        "email",
        email.toLowerCase(),
        "productId",
        productId,
        "role",
        role ?? "",
        "priceBand",
        priceBand ?? "",
        "pain",
        pain ?? "",
        "source",
        source ?? "web",
        "updatedAt",
        now,
      ],
    ])) as [number, number | null, number];
    // Position is the caller's own rank. The raw total is never returned
    // below the public threshold; GET exposes publicCount only.
    return NextResponse.json({
      success: true,
      duplicate: added === 0,
      position: rank === null ? null : rank + 1,
      productId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const productId = url.searchParams.get("productId") || "starlight-knowledge-tree";
  if (!kvConfig()) {
    return NextResponse.json({ productId, publicCount: null, stage: "building", storage: "not-configured" });
  }
  try {
    const [count] = (await kvPipeline([["zcard", setKey(productId)]])) as [number];
    return NextResponse.json({
      productId,
      publicCount: count >= PUBLIC_COUNT_THRESHOLD ? count : null,
      stage: "building",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
