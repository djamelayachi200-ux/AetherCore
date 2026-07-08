require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const CLIENT_ID = "1524379193817956442";

if (!TOKEN) {
  console.error("DISCORD_BOT_TOKEN not found");
  process.exit(1);
}

const commands = [
  { name: "members", description: "Show current member count and online members" },
  { name: "server", description: "Show server info and stats" },
  { name: "ping", description: "Check bot latency" },
  {
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
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    if (GUILD_ID) {
      console.log(`Registering guild commands for ${GUILD_ID}...`);
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands,
      });
    } else {
      console.log("Registering global commands...");
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    }
    console.log("Commands registered successfully!");
  } catch (err) {
    console.error("Failed to register commands:", err.message);
  }
})();
