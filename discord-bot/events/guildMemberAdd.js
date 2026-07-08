const { EmbedBuilder } = require("discord.js");

async function handleGuildMemberAdd(member, { channelId }) {
  const channel = channelId ? member.guild.channels.cache.get(channelId) : null;

  try {
    await member.send({
      embeds: [
        new EmbedBuilder()
          .setColor(0xa855f7)
          .setTitle("🎮 Welcome to AETHRECORE!")
          .setDescription(
            `Hey ${member.displayName},\n\nYou've joined the ultimate gaming arena. Check out our website:\nhttps://aethrecore.vercel.app\n\n• Play with the community\n• Compete in tournaments\n• Connect with fellow gamers\n\nSee you in the arena!`
          )
          .setFooter({ text: "AETHRECORE — Where Legends Collide" }),
      ],
    });
  } catch {
    console.log(`Could not DM ${member.displayName}`);
  }

  if (channel) {
    channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(0x22c55e)
          .setAuthor({
            name: `${member.displayName} joined the arena!`,
            iconURL: member.user.displayAvatarURL(),
          })
          .setDescription(
            `Welcome <@${member.id}>! You are **member #${member.guild.memberCount}**. Grab your gear and introduce yourself!`
          )
          .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
          .setFooter({ text: "AETHRECORE Gaming Community" })
          .setTimestamp(),
      ],
    });
  }
}

module.exports = { handleGuildMemberAdd };
