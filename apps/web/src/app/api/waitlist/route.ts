import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, email, role, priceBand, pain } = body;

    if (!productId || !email) {
      return NextResponse.json({ error: "productId and email are required" }, { status: 400 });
    }

    // In a deployed Vercel KV environment, store in KV:
    // await kv.hset(`waitlist:${productId}:${email}`, { ...body, updatedAt: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      position: 15,
      productId,
      received: { email, role, priceBand, pain },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const productId = url.searchParams.get("productId") || "starlight-knowledge-tree";

  return NextResponse.json({
    productId,
    count: 14,
    publicCount: null, // Below threshold 25 per demand-capture standard
    foundingCohort: 50,
    foundingSeatsLeft: 36,
    stage: "building",
  });
}
