async function ensureStatsChannel(guild, name) {
  const existing = guild.channels.cache.find(
    (ch) => ch.isVoiceBased?.() && ch.name === name
  );
  if (existing) return existing;

  if (name.includes("42") || name.includes("Online")) {
    return guild.channels.create({
      name,
      type: 2,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: ["Connect"],
        },
      ],
    });
  }
  return null;
}

function startStatsUpdater(client, { categoryId }) {
  setInterval(async () => {
    for (const guild of client.guilds.cache.values()) {
      try {
        await guild.members.fetch();
        const total = guild.memberCount;
        const online = guild.members.cache.filter(
          (m) =>
            m.presence?.status === "online" ||
            m.presence?.status === "idle" ||
            m.presence?.status === "dnd"
        ).size;

        const memberChannel = await ensureStatsChannel(
          guild,
          `👥 Members: ${total}`
        );
        const onlineChannel = await ensureStatsChannel(
          guild,
          `🟢 Online: ${online}`
        );

        if (memberChannel && categoryId) {
          await memberChannel.setParent(categoryId).catch(() => {});
        }
        if (onlineChannel && categoryId) {
          await onlineChannel.setParent(categoryId).catch(() => {});
        }
      } catch (err) {
        console.error(`Stats update error in ${guild.name}:`, err.message);
      }
    }
  }, 5 * 60 * 1000);
}

module.exports = { startStatsUpdater };
