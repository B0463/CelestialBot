"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const discord_js_1 = require("discord.js");
const config = require("../config/bot.json");
const Bot = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildModeration,
        discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
        discord_js_1.GatewayIntentBits.GuildIntegrations,
        discord_js_1.GatewayIntentBits.GuildWebhooks,
        discord_js_1.GatewayIntentBits.GuildInvites,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.GuildPresences,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.DirectMessageReactions,
        discord_js_1.GatewayIntentBits.DirectMessageTyping,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildScheduledEvents,
        discord_js_1.GatewayIntentBits.AutoModerationConfiguration,
        discord_js_1.GatewayIntentBits.AutoModerationExecution
    ]
});
Bot.login(config.token);
Bot.on('ready', () => {
    var _a;
    FarbeLog_1.default.ok.withHour("logged", (_a = Bot.user) === null || _a === void 0 ? void 0 : _a.tag);
});
Bot.on('messageCreate', (msg) => {
    if (msg.author.bot)
        return;
    msg.channel.send(msg.content);
    if (msg.content.substring(0, config.prefix.length) == config.prefix) {
        msg.reply("test");
    }
});
Bot.on("error", (error) => {
    FarbeLog_1.default.error.withHour("client", "error with Bot Client:\n" + error);
});
process.on('uncaughtException', (error) => {
    FarbeLog_1.default.error.withHour("process", `${error.name}:\x1b[0m ${error.message}`);
});
