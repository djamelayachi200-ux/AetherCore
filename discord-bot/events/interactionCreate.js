const { EmbedBuilder } = require("discord.js");

const commands = {
  members: require("../commands/members"),
  server: require("../commands/server"),
  ping: require("../commands/ping"),
  announce: require("../commands/announce"),
};

async function handleInteraction(interaction, { announceChannelId }) {
  if (!interaction.isChatInputCommand()) return;

  const handler = commands[interaction.commandName];
  if (!handler) {
    return interaction.reply({
      content: "Unknown command.",
      ephemeral: true,
    });
  }

  try {
    await handler.execute(interaction, { announceChannelId });
  } catch (err) {
    console.error(`Error executing ${interaction.commandName}:`, err.message);
    const reply = {
      content: "An error occurred while running this command.",
      ephemeral: true,
    };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
}

module.exports = { handleInteraction };
