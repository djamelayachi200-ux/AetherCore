const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "members",
    description: "Show current member count and online members",
  },
  async execute(interaction) {
    const guild = interaction.guild;
    await guild.members.fetch();

    const total = guild.memberCount;
    const online = guild.members.cache.filter(
      (m) => m.presence?.status === "online"
    ).size;
    const idle = guild.members.cache.filter(
      (m) => m.presence?.status === "idle"
    ).size;
    const dnd = guild.members.cache.filter(
      (m) => m.presence?.status === "dnd"
    ).size;
    const bots = guild.members.cache.filter((m) => m.user.bot).size;
    const humans = total - bots;

    const embed = new EmbedBuilder()
      .setColor(0xa855f7)
      .setTitle("👥 Server Members")
      .setThumbnail(guild.iconURL({ size: 128 }))
      .addFields(
        { name: "Total Members", value: `${total}`, inline: true },
        { name: "Humans", value: `${humans}`, inline: true },
        { name: "Bots", value: `${bots}`, inline: true },
        { name: "🟢 Online", value: `${online}`, inline: true },
        { name: "🟡 Idle", value: `${idle}`, inline: true },
        { name: "🔴 DND", value: `${dnd}`, inline: true }
      )
      .setFooter({ text: "AETHRECORE" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
