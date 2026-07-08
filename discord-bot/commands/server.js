const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "server",
    description: "Show server info and stats",
  },
  async execute(interaction) {
    const guild = interaction.guild;
    await guild.members.fetch();

    const createdAt = `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`;
    const channels = guild.channels.cache.size;
    const roles = guild.roles.cache.size;
    const boosts = guild.premiumSubscriptionCount || 0;
    const owner = await guild.fetchOwner();

    const embed = new EmbedBuilder()
      .setColor(0x06b6d4)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ size: 128 }))
      .addFields(
        { name: "Owner", value: owner.user.tag, inline: true },
        { name: "Members", value: `${guild.memberCount}`, inline: true },
        { name: "Channels", value: `${channels}`, inline: true },
        { name: "Roles", value: `${roles}`, inline: true },
        { name: "Boosts", value: `${boosts}`, inline: true },
        { name: "Created", value: createdAt, inline: true }
      )
      .setFooter({ text: "AETHRECORE" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
