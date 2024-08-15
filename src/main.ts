import FarbeLog from "./FarbeLog";
import { Client, GatewayIntentBits, GatewayDispatchEvents, Message } from 'discord.js';

const config = require("../config/bot.json");

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

Bot.on('messageCreate', (msg) => {
    if(msg.author.bot) return;
    msg.channel.send(msg.content);
    if(msg.content.substring(0, config.prefix.length) == config.prefix) {msg.reply("test");}
});
Bot.on("error", (error) => {
    FarbeLog.error.withHour("client", "error with Bot Client:\n"+error);
});
process.on('uncaughtException', (error: Error) => {
    FarbeLog.error.withHour("process", `${error.name}:\x1b[0m ${error.message}`);
});