const config: Config = require("../config/bot.json");
import FarbeLog from "./functions/FarbeLog";
import { Client, GatewayIntentBits } from 'discord.js';
import database from "./functions/database";
import commands from "./commands/commands";

type Config = {
    token: string;
    prefix: string;
    logPath: string;
    UTCOffset: number;
    guildId: string;
    bypassRolesId: string[];
};

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

function hasBypass(msg): Number {
    for(let i=0;i<config.bypassRolesId.length;i++) {
        if(msg.member.roles.cache.has(config.bypassRolesId[i])) return 1;
    }
    return 0;
}

Bot.login(config.token);
Bot.on('ready', () => {
    FarbeLog.ok("logged", Bot.user?.tag);
});

database.inicialize();

Bot.on('messageCreate', async (msg) => {
    commands.init(msg, Bot);
});

Bot.on('rateLimit', (info) => {
    FarbeLog.error("client", `rate limit timeout: ${info.timeout}ms | limit: ${info.limit} | method: ${info.method} | path: ${info.path}`)
});
Bot.on("error", (error) => {
    FarbeLog.error("client", "error with Bot Client:\n"+error);
});
process.on('uncaughtException', (error: Error) => {
    FarbeLog.error("process", `${error.name}:\x1b[0m ${error.message}`);
});

export { config, hasBypass }

FarbeLog.ok("loaded", "main.ts");