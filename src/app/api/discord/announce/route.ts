import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, message, author } = await req.json();
    if (!title || !message) {
      return NextResponse.json(
        { error: "title and message are required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_ANNOUNCE_WEBHOOK;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Announce webhook not configured" },
        { status: 501 }
      );
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: `📢 ${title}`,
            description: message,
            color: 0xa855f7,
            author: { name: author || "AETHRECORE" },
            footer: { text: "AETHRECORE Website" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Discord webhook error: ${text}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
