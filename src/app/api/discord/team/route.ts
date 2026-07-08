import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CACHE_FILE = path.join(process.cwd(), ".data", "discord-cache.json");

export async function GET() {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return NextResponse.json({ error: "Bot not connected yet" }, { status: 503 });
    }
    const raw = fs.readFileSync(CACHE_FILE, "utf-8");
    const data = JSON.parse(raw);
    const team = (data.members || []).filter((m: any) => m.isTeam);
    return NextResponse.json({
      guildName: data.name,
      guildIcon: data.icon,
      updatedAt: data.updatedAt,
      team,
      totalMembers: data.memberCount,
      totalOnline: data.onlineCount,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
