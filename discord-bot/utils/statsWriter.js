const fs = require("fs");
const path = require("path");

const CACHE_FILE = path.join(__dirname, "..", "..", ".data", "discord-cache.json");
const REFRESH_INTERVAL = 60_000;
const TOKEN = process.env.DISCORD_BOT_TOKEN;

async function fetchOnlineFromApi(guildId) {
  if (!TOKEN || !guildId) return null;
  try {
    const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
      headers: { Authorization: `Bot ${TOKEN}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.approximate_presence_count ?? null;
  } catch {
    return null;
  }
}

async function writeStats(client) {
  try {
    const guild = client.guilds.cache.first();
    if (!guild) return;

    await guild.members.fetch();

    const total = guild.memberCount;
    const fromPresence = guild.members.cache.filter(
      (m) =>
        m.presence?.status === "online" ||
        m.presence?.status === "idle" ||
        m.presence?.status === "dnd"
    ).size;

    let onlineCount = fromPresence;
    const apiOnline = await fetchOnlineFromApi(guild.id);
    if (apiOnline !== null && apiOnline > onlineCount) {
      onlineCount = apiOnline;
    }

    const teamKeywords = ["Admin", "Owner", "Co-Owner", "Developer", "Tech Support", "Mod"];
    const members = guild.members.cache.map((m) => ({
      id: m.id,
      username: m.user.username,
      displayName: m.displayName,
      avatar: m.user.displayAvatarURL({ size: 128 }),
      roles: m.roles.cache.map((r) => ({ id: r.id, name: r.name, color: r.hexColor })),
      isTeam: m.roles.cache.some((r) => r.name.includes("AC 〢") && teamKeywords.some((k) => r.name.includes(k))),
      status: m.presence?.status || "offline",
      joinedAt: m.joinedAt?.toISOString(),
    }));

    const data = {
      name: guild.name,
      icon: guild.iconURL({ size: 256 }),
      id: guild.id,
      description: guild.description,
      memberCount: total,
      onlineCount: onlineCount,
      members,
      updatedAt: new Date().toISOString(),
    };

    const dir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("statsWriter error:", err.message);
  }
}

function startStatsWriter(client) {
  writeStats(client);
  setInterval(() => writeStats(client), REFRESH_INTERVAL);
}

module.exports = { startStatsWriter, CACHE_FILE };
