import { NextResponse } from "next/server";

// Same KV schema as the shared demand-capture package (estate standard):
// waitlist:<productId>:count | :positions (email -> position) | :signals (email -> JSON).
// No KV configured means no signup is accepted -- never a fake success.
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const FOUNDING_COHORT = 50;
const PUBLIC_COUNT_THRESHOLD = 25;

const key = (productId: string, suffix: string) => `waitlist:${productId}:${suffix}`;

async function kv(command: unknown[]): Promise<unknown> {
  if (!KV_URL || !KV_TOKEN) throw new Error("KV not configured");
  const res = await fetch(KV_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV ${res.status}`);
  return (await res.json()).result;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, email, role, priceBand, pain, source } = body ?? {};

    if (!productId || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "productId and a valid email are required" }, { status: 400 });
    }
    if (!KV_URL || !KV_TOKEN) {
      return NextResponse.json(
        { error: "Waitlist storage is not configured on this deployment" },
        { status: 503 }
      );
    }

    const existing = await kv(["hget", key(productId, "positions"), email]);
    let position: number;
    if (existing) {
      position = Number(existing);
    } else {
      position = Number(await kv(["incr", key(productId, "count")]));
      await kv(["hset", key(productId, "positions"), email, String(position)]);
    }
    await kv([
      "hset",
      key(productId, "signals"),
      email,
      JSON.stringify({ productId, email, role, priceBand, pain, source, updatedAt: new Date().toISOString() }),
    ]);

    return NextResponse.json({ success: true, position, productId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const productId = url.searchParams.get("productId") || "starlight-knowledge-tree";

  if (!KV_URL || !KV_TOKEN) {
    return NextResponse.json(
      { productId, count: null, publicCount: null, foundingCohort: FOUNDING_COHORT, foundingSeatsLeft: null, stage: "building", configured: false },
      { status: 503 }
    );
  }

  try {
    const raw = await kv(["get", key(productId, "count")]);
    const count = raw ? Number(raw) : 0;
    return NextResponse.json({
      productId,
      count,
      publicCount: count >= PUBLIC_COUNT_THRESHOLD ? count : null,
      foundingCohort: FOUNDING_COHORT,
      foundingSeatsLeft: Math.max(0, FOUNDING_COHORT - count),
      stage: "building",
      configured: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
