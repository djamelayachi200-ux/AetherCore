const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "ping",
    description: "Check bot latency",
  },
  async execute(interaction) {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    const roundtrip = sent.createdTimestamp - interaction.createdTimestamp;

    const embed = new EmbedBuilder()
      .setColor(0x22c55e)
      .setTitle("🏓 Pong!")
      .addFields(
        {
          name: "Roundtrip Latency",
          value: `${roundtrip}ms`,
          inline: true,
        },
        {
          name: "WebSocket Heartbeat",
          value: `${interaction.client.ws.ping}ms`,
          inline: true,
        }
      )
      .setFooter({ text: "AETHRECORE" })
      .setTimestamp();

    await interaction.editReply({ content: null, embeds: [embed] });
  },
};
