import FarbeLog from "./functions/FarbeLog";
import { Client, GatewayIntentBits, GatewayDispatchEvents, Message } from 'discord.js';
import database from "./functions/database";

const config = require("../config/bot.json");

import commands from "./commands/commands";

const Bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ]
});
Bot.login(config.token);
Bot.on('ready', () => {
    FarbeLog.ok.withHour("logged", Bot.user?.tag);
});

database.inicialize();

Bot.on('messageCreate', async (msg) => {
    commands.init(msg, Bot);
});

Bot.on('rateLimit', (info) => {
    FarbeLog.error.withHour("client", `rate limit timeout: ${info.timeout}ms | limit: ${info.limit} | method: ${info.method} | path: ${info.path}`)
});
Bot.on("error", (error) => {
    FarbeLog.error.withHour("client", "error with Bot Client:\n"+error);
});
process.on('uncaughtException', (error: Error) => {
    FarbeLog.error.withHour("process", `${error.name}:\x1b[0m ${error.message}`);
});

export { config }

export default {
    config
};