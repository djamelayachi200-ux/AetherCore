import { NextResponse } from "next/server";

const BOT_API = process.env.DISCORD_BOT_API_URL || "https://aethrecore-bot-production.up.railway.app";

async function fetchFromBot() {
  try {
    const res = await fetch(`${BOT_API}/api/stats`, { cache: "no-cache" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchFromInvite() {
  try {
    const res = await fetch("https://discord.com/api/v10/invites/5t3hUFVcS", { cache: "no-cache" });
    if (!res.ok) return null;
    const data = await res.json();
    const guild = data.guild;
    const profile = data.profile;
    return {
      name: guild.name,
      icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null,
      memberCount: profile.member_count ?? guild.approximate_member_count,
      onlineCount: profile.online_count ?? guild.approximate_presence_count,
      fromBot: false,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const [botData, inviteData] = await Promise.all([fetchFromBot(), fetchFromInvite()]);

    if (botData) {
      return NextResponse.json({
        ...botData,
        onlineCount: botData.onlineCount > 0 ? botData.onlineCount : (inviteData?.onlineCount ?? 0),
      });
    }

    if (inviteData) {
      return NextResponse.json(inviteData);
    }

    return NextResponse.json({ error: "No data available" }, { status: 503 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
