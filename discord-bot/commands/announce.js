const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: {
    name: "announce",
    description: "Send an announcement to the announce channel (Admin only)",
    options: [
      {
        type: 3,
        name: "title",
        description: "Announcement title",
        required: true,
      },
      {
        type: 3,
        name: "message",
        description: "Announcement content",
        required: true,
      },
      {
        type: 7,
        name: "image",
        description: "Optional image to attach",
        required: false,
      },
    ],
  },
  async execute(interaction, { announceChannelId }) {
    if (
      !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({
        content: "You need Administrator permission to use this command.",
        ephemeral: true,
      });
    }

    const title = interaction.options.getString("title");
    const message = interaction.options.getString("message");
    const image = interaction.options.getAttachment("image");

    const embed = new EmbedBuilder()
      .setColor(0xa855f7)
      .setTitle(`📢 ${title}`)
      .setDescription(message)
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setFooter({ text: "AETHRECORE Announcement" })
      .setTimestamp();

    if (image) embed.setImage(image.url);

    if (announceChannelId) {
      const channel = interaction.guild.channels.cache.get(announceChannelId);
      if (channel) {
        await channel.send({ embeds: [embed] });
        await interaction.reply({
          content: `Announcement sent to <#${announceChannelId}>`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Announce channel not found. Check ANNOUNCE_CHANNEL_ID.",
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        embeds: [embed],
      });
    }
  },
};
