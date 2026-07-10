import { NextResponse } from "next/server";

const BOT_API = process.env.DISCORD_BOT_API_URL || "https://aethrecore-bot-production.up.railway.app";

export async function GET() {
  try {
    const res = await fetch(`${BOT_API}/api/members`, { next: { revalidate: 30 } });
    if (!res.ok) return NextResponse.json({ error: "Members fetch failed" }, { status: 503 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
