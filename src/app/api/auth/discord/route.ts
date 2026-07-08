import { NextResponse } from "next/server";

export async function GET() {
  const clientId = "1524379193817956442";
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/discord/callback`;

  const url = new URL("https://discord.com/api/oauth2/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "identify guilds guilds.members.read");
  url.searchParams.set("prompt", "consent");

  return NextResponse.redirect(url.toString());
}
