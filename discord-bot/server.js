const http = require("http");

let _client = null;
let _data = {
  name: null,
  icon: null,
  id: null,
  description: null,
  memberCount: 0,
  onlineCount: 0,
  team: [],
  updatedAt: null,
};

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

function updateCache(client) {
  const guild = client.guilds.cache.first();
  if (!guild) return;
  _client = client;

  const total = guild.memberCount;
  const fromPresence = guild.members.cache.filter(
    (m) =>
      m.presence?.status === "online" ||
      m.presence?.status === "idle" ||
      m.presence?.status === "dnd"
  ).size;

  _data.onlineCount = fromPresence;

  fetchOnlineFromApi(guild.id).then((apiOnline) => {
    if (apiOnline !== null && apiOnline > _data.onlineCount) {
      _data.onlineCount = apiOnline;
    }
  });

  const teamKeywords = ["Admin", "Owner", "Co-Owner", "Developer", "Tech Support", "Mod"];
  const members = guild.members.cache.map((m) => ({
    id: m.id,
    username: m.user.username,
    displayName: m.displayName,
    globalName: m.user.globalName,
    avatar: m.user.displayAvatarURL({ size: 128 }),
    roles: m.roles.cache.map((r) => ({ id: r.id, name: r.name, color: r.hexColor })),
    isTeam: m.roles.cache.some((r) => r.name.includes("AC 〢") && teamKeywords.some((k) => r.name.includes(k))),
    status: m.presence?.status || "offline",
    joinedAt: m.joinedAt?.toISOString(),
  }));

  _data = {
    name: guild.name,
    icon: guild.iconURL({ size: 256 }),
    id: guild.id,
    description: guild.description,
    memberCount: total,
    onlineCount: _data.onlineCount,
    team: members.filter((m) => m.isTeam),
    allMembers: members,
    updatedAt: new Date().toISOString(),
  };
}

function startServer(port) {
  const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/api/stats") {
      res.end(JSON.stringify({
        name: _data.name,
        icon: _data.icon,
        id: _data.id,
        memberCount: _data.memberCount,
        onlineCount: _data.onlineCount,
        updatedAt: _data.updatedAt,
        fromBot: true,
      }));
    } else if (req.url === "/api/team") {
      res.end(JSON.stringify({
        guildName: _data.name,
        guildIcon: _data.icon,
        updatedAt: _data.updatedAt,
        team: _data.team,
        totalMembers: _data.memberCount,
        totalOnline: _data.onlineCount,
      }));
    } else if (req.url === "/api/members") {
      res.end(JSON.stringify({
        guildName: _data.name,
        guildIcon: _data.icon,
        updatedAt: _data.updatedAt,
        members: _data.allMembers || [],
        totalMembers: _data.memberCount,
        totalOnline: _data.onlineCount,
      }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Not found" }));
    }
  });

  server.listen(port, () => {
    console.log(`Bot HTTP server listening on port ${port}`);
  });
}

module.exports = { startServer, updateCache };
